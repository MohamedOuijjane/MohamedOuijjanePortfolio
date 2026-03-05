"use client";

import { useState } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { satoshi } from "@/lib/fonts";

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
      className={`scroll-mt-24 py-20 pb-32 ${satoshi.variable} font-sans`}
    >
      <div className="flex flex-col justify-center">
        <h2 className="mb-6 font-sans text-3xl font-bold text-[#0B0F14] md:text-4xl">
          Get In Touch
        </h2>
        <p className="mb-8 max-w-lg text-lg text-gray-600">
          I&apos;m currently looking for new opportunities, my inbox is always
          open. Whether you have a question or just want to say hi, I&apos;ll
          try my best to get back to you!
        </p>
      </div>

      <div className="mt-12 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm md:p-12">
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
            <h3 className="text-2xl font-bold text-[#0B0F14]">Message Sent!</h3>
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition-all focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
                  placeholder="John Doe"
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition-all focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
                  placeholder="john@example.com"
                />
                {fieldErrors.email && (
                  <p className="text-sm text-red-600">{fieldErrors.email}</p>
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
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition-all focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
                placeholder="Hello! I'd like to discuss a project..."
              />
              {fieldErrors.message && (
                <p className="text-sm text-red-600">{fieldErrors.message}</p>
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
    </section>
  );
}
