import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import HashLinkRouter from "./components/HashLinkRouter";
import Loader from "./components/Loader";
import BrewVisitorPing from "./components/BrewVisitorPing";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://tswfitness.com";

const defaultTitle = "TSW Fitness — It's not fitness. It's life.";
const defaultDescription =
  "TSW Fitness is a high-energy gym in New Delhi — expert coaches, 45-minute sessions, and purpose-built training floors. Tours, memberships, and class info.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s · TSW Fitness",
  },
  description: defaultDescription,
  keywords: [
    "TSW Fitness",
    "gym Delhi",
    "gym Paschim Vihar",
    "fitness club",
    "personal training",
    "group classes",
    "New Delhi gym",
  ],
  authors: [{ name: "TSW Fitness", url: siteUrl }],
  creator: "TSW Fitness",
  publisher: "TSW Fitness",
  category: "fitness",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "any" }],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "TSW Fitness",
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: "/gallery/second_floor.jpeg",
        alt: "TSW Fitness training floor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/gallery/second_floor.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

const balboa = localFont({
  src: "../public/fonts/balboa-condensed.otf",
  variable: "--font-balboa",
  display: "swap",
});

const agharti = localFont({
  src: "../public/fonts/agharti-black-condensed.ttf",
  variable: "--font-agharti",
  display: "swap",
});

const ramaGothic = localFont({
  src: "../public/fonts/rama-gothic.otf",
  variable: "--font-rama-gothic",
  display: "swap",
});

const avalon = localFont({
  src: "../public/fonts/AvalonBold.ttf",
  variable: "--font-avalon",
  display: "swap",
});

const britanica = localFont({
  src: "../public/fonts/britanica.ttf",
  variable: "--font-britanica",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${balboa.variable} ${agharti.variable} ${avalon.variable} ${britanica.variable} h-full antialiased`}
    >
      <body className="bg-[var(--color-charcoal)] text-[var(--foreground)]">
        <Loader />
        <HashLinkRouter />
        <SmoothScroll>
          <BrewVisitorPing />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
