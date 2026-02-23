import { NextResponse } from "next/server";
import { z } from "zod";

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

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const rateLimitStore = new Map<string, RateLimitEntry>();

const ContactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long.")
    .max(60, "Name must be at most 60 characters long."),
  email: z
    .string()
    .email("Please provide a valid email address.")
    .max(120, "Email must be at most 120 characters long."),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters long.")
    .max(2000, "Message must be at most 2000 characters long."),
  honeypot: z
    .string()
    .optional()
    .refine((value) => !value, {
      message: "Spam detected.",
    }),
});

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
          message: "Too many requests. Please try again later.",
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

      const errors: ContactErrors = {
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        message: fieldErrors.message?.[0],
        honeypot: fieldErrors.honeypot?.[0],
      };

      return NextResponse.json(
        {
          ok: false,
          errors,
          message: "Validation failed",
        },
        { status: 400 },
      );
    }

    const validData = parsed.data;

    console.info("[Contact] New message received", {
      ip,
      name: validData.name,
      email: validData.email,
      messageSnippet: validData.message.slice(0, 200),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        ok: true,
        message: "Message sent successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing contact form:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
