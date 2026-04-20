import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

const balboa = localFont({
  src: "../public/fonts/balboa-condensed.otf",
  variable: "--font-balboa",
  display: "swap",
});

const avalon = localFont({
  src: "../public/fonts/AvalonBold.ttf",
  variable: "--font-avalon",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TSW Fitness — It's not fitness. It's life.",
  description:
    "TSW Fitness is a high-energy gym built for results. Join 45-minute workouts, expert coaches and world-class equipment across 4 clubs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${balboa.variable} ${avalon.variable} h-full antialiased`}
    >
      <body className="bg-[var(--color-charcoal)] text-[var(--foreground)]">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
