import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

// Environment variables validation
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_RECEIVER_EMAIL = process.env.CONTACT_RECEIVER_EMAIL;

if (!RESEND_API_KEY) {
  console.error("Missing RESEND_API_KEY environment variable");
}

if (!CONTACT_RECEIVER_EMAIL) {
  console.error("Missing CONTACT_RECEIVER_EMAIL environment variable");
}

const resend = new Resend(RESEND_API_KEY);

type ContactErrors = {
  name?: string;
  email?: string;
  message?: string;
  honeypot?: string;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // Increased to 15 mins for better protection
const RATE_LIMIT_MAX_REQUESTS = 3; // Reduced to 3 to discourage spam

/**
 * Note on Serverless (Vercel):
 * This in-memory store will reset whenever the serverless function cold-starts.
 * For robust production rate limiting, integrate Redis (e.g., Upstash) here.
 */
const rateLimitStore = new Map<string, RateLimitEntry>();

const ContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long.")
    .max(60, "Name must be at most 60 characters long."),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address.")
    .max(120, "Email must be at most 120 characters long."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters long.")
    .max(3000, "Message must be at most 3000 characters long."),
  honeypot: z
    .string()
    .optional()
    .refine((value) => !value, {
      message: "Spam detected.",
    }),
});

// Simple anti-spam heuristic
function isSpammy(text: string): boolean {
  const spamPatterns = [
    /https?:\/\//i, // Links in message
    /crypto/i,
    /casino/i,
    /viagra/i,
    /seo/i,
    /marketing/i,
    /earn money/i,
  ];
  return spamPatterns.some((pattern) => pattern.test(text));
}

function getClientIp(request: Request): string {
  const headers = request.headers;

  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }

  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp;

  return "unknown";
}

function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [ip, entry] of rateLimitStore) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(ip);
    }
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const existing = rateLimitStore.get(ip);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  existing.count += 1;
  rateLimitStore.set(ip, existing);
  return false;
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);

    cleanupRateLimitStore();
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Too many messages sent recently. Please try again in 15 minutes.",
        },
        { status: 429 },
      );
    }

    const rawBody = await request.json().catch(() => ({}));
    const { name, email, message } = rawBody as {
      name?: string;
      email?: string;
      message?: string;
      honeypot?: string;
      company?: string;
    };

    const honeypot = (rawBody?.honeypot ?? rawBody?.company ?? "") as
      | string
      | undefined;

    const parsed = ContactSchema.safeParse({
      name,
      email,
      message,
      honeypot,
    });

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          ok: false,
          message: "Validation failed",
          errors: {
            name: fieldErrors.name?.[0],
            email: fieldErrors.email?.[0],
            message: fieldErrors.message?.[0],
            honeypot: fieldErrors.honeypot?.[0],
          },
        },
        { status: 400 },
      );
    }

    const {
      name: validName,
      email: validEmail,
      message: validMessage,
    } = parsed.data;

    // Reject spammy messages
    if (isSpammy(validMessage)) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Message contains suspicious content. Please try again with a cleaner message.",
        },
        { status: 400 },
      );
    }

    if (!RESEND_API_KEY || !CONTACT_RECEIVER_EMAIL) {
      console.error(
        "[Config Error] Resend API Key or Receiver Email is missing.",
      );
      return NextResponse.json(
        {
          ok: false,
          message: "Service temporarily unavailable. Please try again later.",
        },
        { status: 500 },
      );
    }

    // ALWAYS use onboarding@resend.dev until custom domain is verified
    const fromEmail = "Portfolio <onboarding@resend.dev>";

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: CONTACT_RECEIVER_EMAIL,
      subject: `New message from ${validName}`,
      replyTo: validEmail,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a1a1a; margin: 0; padding: 0; background-color: #f7f7f7;">
            <div style="max-width: 600px; margin: 20px auto; padding: 40px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e1e1e1;">
              <div style="margin-bottom: 32px; text-align: center;">
                <h1 style="color: #000; font-size: 24px; font-weight: 700; margin: 0; letter-spacing: -0.02em;">New Inquiry</h1>
                <p style="color: #666; font-size: 14px; margin-top: 8px;">Received from your portfolio contact form.</p>
              </div>
              
              <div style="margin-bottom: 32px; padding: 24px; background-color: #fafafa; border-radius: 8px; border: 1px solid #efefef;">
                <h2 style="font-size: 12px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px;">Sender Information</h2>
                <div style="margin-bottom: 12px;">
                  <span style="color: #666; font-size: 14px; display: block; margin-bottom: 2px;">Name</span>
                  <span style="color: #000; font-size: 16px; font-weight: 600;">${validName}</span>
                </div>
                <div>
                  <span style="color: #666; font-size: 14px; display: block; margin-bottom: 2px;">Email</span>
                  <a href="mailto:${validEmail}" style="color: #0070f3; font-size: 16px; font-weight: 600; text-decoration: none;">${validEmail}</a>
                </div>
              </div>

              <div style="margin-bottom: 32px;">
                <h2 style="font-size: 12px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px;">Message Content</h2>
                <div style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #eaeaea; white-space: pre-wrap; font-size: 16px; color: #333; line-height: 1.8;">${validMessage}</div>
              </div>

              <div style="padding-top: 24px; border-top: 1px solid #eaeaea; font-size: 12px; color: #999; text-align: center;">
                <p style="margin: 0;">Sent on: ${new Date().toLocaleString("en-GB", { timeZone: "Africa/Casablanca", dateStyle: "full", timeStyle: "medium" })} (Casablanca Time)</p>
                <p style="margin: 8px 0 0;">&copy; ${new Date().getFullYear()} Mohamed Ouijjane. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("[Resend Error] Failed to send email:", error.message);
      return NextResponse.json(
        {
          ok: false,
          message:
            "Could not send your message. Please try again in a few moments.",
        },
        { status: 500 },
      );
    }

    console.info("[Contact Success] Email sent successfully", { id: data?.id });

    return NextResponse.json(
      {
        ok: true,
        message: "Message sent successfully! I'll get back to you soon.",
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("[Unexpected Error] Contact form processing failed:", err);
    return NextResponse.json(
      {
        ok: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 },
    );
  }
}
