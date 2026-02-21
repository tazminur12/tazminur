import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tazminur.me";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tazminur Rahman Tanim | Full Stack Web Developer",
    template: "%s | Tazminur Rahman Tanim",
  },
  description:
    "Full Stack Web Developer specializing in React, Next.js, Node.js, and modern web technologies. Building performant, scalable web applications with clean code.",
  keywords: [
    "Full Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Portfolio",
    "Tazminur Rahman Tanim",
  ],
  authors: [{ name: "Tazminur Rahman Tanim" }],
  icons: {
    icon: "/coding.png",
    apple: "/coding.png",
  },
  openGraph: {
    title: "Tazminur Rahman Tanim | Full Stack Web Developer",
    description:
      "Full Stack Web Developer specializing in React, Next.js, Node.js, and modern web technologies.",
    url: SITE_URL,
    siteName: "Tazminur Rahman Tanim",
    images: [
      {
        url: "/api/og",
        width: 800,
        height: 800,
        alt: "Tazminur Rahman Tanim - Full Stack Web Developer",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tazminur Rahman Tanim | Full Stack Web Developer",
    description:
      "Full Stack Web Developer specializing in React, Next.js, Node.js, and modern web technologies.",
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
