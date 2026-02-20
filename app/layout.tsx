import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Tazminur | Full Stack Web Developer",
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
    "Tazminur",
  ],
  authors: [{ name: "Tazminur" }],
  openGraph: {
    title: "Tazminur | Full Stack Web Developer",
    description:
      "Full Stack Web Developer specializing in React, Next.js, Node.js, and modern web technologies.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tazminur | Full Stack Web Developer",
    description:
      "Full Stack Web Developer specializing in React, Next.js, Node.js, and modern web technologies.",
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
