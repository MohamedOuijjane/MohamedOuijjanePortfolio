"use client";

import { useState } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { satoshi } from "@/lib/fonts";
import { GlassCard } from "@/components/ui/GlassCard";
import { BorderTrail } from "@/components/ui/border-trail";

type ContactFormStatus = "idle" | "success";

type ContactFieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

type ContactErrorResponse = {
  ok: false;
  message: string;
  errors?: {
    name?: string;
    email?: string;
    message?: string;
    honeypot?: string;
  };
};

type ContactSuccessResponse = {
  ok: true;
  message: string;
};

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<ContactFormStatus>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [globalError, setGlobalError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setGlobalError(null);
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          company,
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | ContactErrorResponse
        | ContactSuccessResponse
        | null;

      if (!response.ok || !data) {
        if (response.status === 429 && data && !("errors" in data)) {
          setGlobalError(
            data.message || "Too many requests. Please try again later.",
          );
        } else if (response.status === 400 && data && "errors" in data) {
          const errors = data.errors ?? {};
          const mappedFieldErrors: ContactFieldErrors = {
            name: errors.name,
            email: errors.email,
            message: errors.message,
          };
          setFieldErrors(mappedFieldErrors);

          if (errors.honeypot) {
            setGlobalError(data.message || "Spam detected.");
          }
        } else if (data) {
          setGlobalError(
            data.message || "Something went wrong. Please try again.",
          );
        } else {
          setGlobalError("Something went wrong. Please try again.");
        }

        setIsSubmitting(false);
        return;
      }

      const successData = data as ContactSuccessResponse;

      if (successData.ok) {
        setFormStatus("success");
        setName("");
        setEmail("");
        setMessage("");
        setCompany("");
        setFieldErrors({});
        setGlobalError(null);
      } else {
        setGlobalError(
          successData.message || "Something went wrong. Please try again.",
        );
      }
    } catch {
      setGlobalError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      className={`scroll-mt-24 pt-20 pb-4 ${satoshi.variable} font-sans -mt-[17.5cm] transform -translate-x-[2cm]`}
    >
      <GlassCard className="relative z-10 transform px-8 py-10 sm:px-12 sm:py-12 lg:px-16 lg:w-[calc(100%+5cm)] lg:-ml-[2cm] lg:-mt-[1cm] lg:pt-[calc(3rem+3cm)] lg:pb-[calc(3rem+2cm)] lg:pl-[calc(4rem+2cm)] lg:pr-[calc(4rem+3cm)]">
        <div className="flex flex-col justify-center">
          <h2 className="mb-6 font-sans text-3xl font-bold text-[#0B0F14] md:text-4xl">
            Get In Touch
          </h2>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column: Personal Information */}
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-2xl font-bold text-[#0B0F14] mb-4">
                Reach out directly
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                I&apos;m open to discussing opportunities, collaborations, and
                interesting projects. Feel free to reach out directly or use the
                form.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <a
                    href="mailto:ouijjanemohamed2024@gmail.com"
                    className="text-base font-semibold text-[#0B0F14] hover:text-teal-700 transition-colors"
                  >
                    ouijjanemohamed2024@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <a
                    href="tel:+212656706270"
                    className="text-base font-semibold text-[#0B0F14] hover:text-teal-700 transition-colors"
                  >
                    +212 656 706 270
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p className="text-base font-semibold text-[#0B0F14]">
                    Morocco
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-sm md:p-10 lg:translate-x-[3cm]">
            <BorderTrail
              size={120}
              className="bg-black opacity-100"
              style={{
                boxShadow:
                  "0 0 25px 8px rgba(0,0,0,0.4), 0 0 50px 15px rgba(0,0,0,0.3)",
              }}
            />
            {formStatus === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#0B0F14]">
                  Message Sent!
                </h3>
                <p className="mt-2 text-gray-600">
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => {
                    setFormStatus("idle");
                    setGlobalError(null);
                    setFieldErrors({});
                  }}
                  className="mt-6 font-medium text-teal-700 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="sr-only"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {globalError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {globalError}
                  </div>
                )}

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-900"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition-all focus:border-white focus:ring-1 focus:ring-white"
                      placeholder="Your name"
                    />
                    {fieldErrors.name && (
                      <p className="text-sm text-red-600">{fieldErrors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-900"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition-all focus:border-white focus:ring-1 focus:ring-white"
                      placeholder="mail@example.com"
                    />
                    {fieldErrors.email && (
                      <p className="text-sm text-red-600">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-gray-900"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition-all focus:border-white focus:ring-1 focus:ring-white"
                    placeholder="Hello! I'd like to discuss a project..."
                  />
                  {fieldErrors.message && (
                    <p className="text-sm text-red-600">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0B0F14] px-8 py-4 text-base font-semibold text-white transition-all hover:bg-[#1a2030] hover:scale-[1.01] disabled:opacity-70"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <ArrowRightIcon className="h-4 w-4" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
