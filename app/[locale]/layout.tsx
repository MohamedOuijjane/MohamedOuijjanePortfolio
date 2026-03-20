import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { satoshi } from "@/lib/fonts";
import "@/styles/globals.css";
import WebVitals from "@/app/_components/WebVitals";
import { BackToTop } from "@/components/BackToTop";
import { Preloader } from "@/components/Preloader";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
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

  // Set the server-side locale context
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${satoshi.variable} font-sans`}>
      <body className="antialiased min-h-screen flex flex-col overflow-x-hidden">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Preloader />
          <WebVitals />
          <main className="flex-1">{children}</main>
          <BackToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
