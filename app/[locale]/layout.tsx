import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import WebVitals from "@/app/_components/WebVitals";
import { BackToTop } from "@/components/BackToTop";
import { Preloader } from "@/components/Preloader";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: {
      default: "Mohamed Ouijjane",
      template: "%s | WeJan",
    },
    description:
      "Full-stack developer portfolio focused on distributed systems, backend architecture, and modern web apps.",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Preloader />
      <WebVitals />
      <main className="flex-1">{children}</main>
      <BackToTop />
    </NextIntlClientProvider>
  );
}
