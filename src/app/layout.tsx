import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { LoadingProvider } from '@/contexts/LoadingContext';
import { CookieProvider } from '@/context/CookieContext';
import { SessionProvider, ActivityTracker } from '@/context/SessionContext';
import CookieConsent from '@/components/ui/CookieConsent';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { PerformanceTracker } from '@/components/analytics/PerformanceTracker';
import { PageTracker } from '@/components/analytics/PageTracker';
import { ErrorTracker } from '@/components/analytics/ErrorTracker';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Spear & Hammer - Software Engineering & IT Training",
  description: "We bring  top-notch software development services, product engineering, and IT training solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
        suppressHydrationWarning
      >
        <CookieProvider>
          <SessionProvider>
            <LoadingProvider>
              <Navbar />
              <main className="mt-[15vh]">
                {children}
              </main>
              <Footer />
              <CookieConsent />
              <GoogleAnalytics />
              <PerformanceTracker />
              <PageTracker />
              <ActivityTracker />
              <ErrorTracker />
            </LoadingProvider>
          </SessionProvider>
        </CookieProvider>
      </body>
    </html>
  );
}

