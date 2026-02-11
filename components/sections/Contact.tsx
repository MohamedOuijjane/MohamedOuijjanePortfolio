"use client";

import { useState } from "react";
import { GithubIcon, LinkedinIcon, ArrowRightIcon } from "@/components/icons";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real app, you'd fetch /api/contact here
    setIsSubmitting(false);
    setFormStatus("success");
  }

  return (
    <section id="contact" className="scroll-mt-24 py-20 pb-32">
      <div className="flex flex-col justify-center">
        <h2 className="mb-6 text-3xl font-bold text-[#0B0F14] md:text-4xl">
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
              onClick={() => setFormStatus("idle")}
              className="mt-6 font-medium text-teal-700 hover:underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition-all focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
                  placeholder="John Doe"
                />
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
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition-all focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
                  placeholder="john@example.com"
                />
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
                required
                rows={5}
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition-all focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
                placeholder="Hello! I'd like to discuss a project..."
              />
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

      <div className="mt-16 flex justify-center gap-8">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 transition-colors hover:text-[#0B0F14]"
        >
          <GithubIcon className="h-6 w-6" />
          <span className="sr-only">GitHub</span>
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 transition-colors hover:text-[#0077b5]"
        >
          <LinkedinIcon className="h-6 w-6" />
          <span className="sr-only">LinkedIn</span>
        </a>
      </div>
    </section>
  );
}
