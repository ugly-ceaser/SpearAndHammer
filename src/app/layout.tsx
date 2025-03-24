import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
        suppressHydrationWarning
      >
        <Navbar />
        <main className="mt-[15vh]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

