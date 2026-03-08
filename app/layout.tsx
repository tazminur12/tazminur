import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tazminur.me";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tazminur Rahman Tanim | Full Stack Web Developer & Next.js Specialist",
    template: "%s | Tazminur Rahman Tanim",
  },
  description:
    "Tazminur Rahman Tanim — Full Stack Web Developer & Next.js Specialist from Bangladesh. Expert in React, Next.js, Node.js, TypeScript, MongoDB & MERN Stack. Founder & CEO of Algowave Agency. Available for freelance projects.",
  keywords: [
    "Tazminur Rahman Tanim",
    "Tazminur Rahman",
    "Tanim Developer",
    "Full Stack Web Developer",
    "Next.js Developer",
    "React Developer",
    "MERN Stack Developer",
    "Node.js Developer",
    "TypeScript Developer",
    "Web Developer Bangladesh",
    "Freelance Web Developer",
    "Portfolio",
    "Algowave Agency",
    "Flyoval Limited",
    "JavaScript Developer",
    "MongoDB Developer",
    "Tailwind CSS",
    "Next.js Specialist",
    "React Next.js Projects",
    "Hire Web Developer",
  ],
  authors: [{ name: "Tazminur Rahman Tanim", url: SITE_URL }],
  creator: "Tazminur Rahman Tanim",
  publisher: "Tazminur Rahman Tanim",
  category: "Technology",
  classification: "Portfolio",
  icons: {
    icon: "/coding.png",
    apple: "/coding.png",
    shortcut: "/coding.png",
  },
  openGraph: {
    title: "Tazminur Rahman Tanim | Full Stack Web Developer & Next.js Specialist",
    description:
      "Full Stack Web Developer specializing in React, Next.js, Node.js & MERN Stack. Founder & CEO of Algowave Agency. Available for freelance projects worldwide.",
    url: SITE_URL,
    siteName: "Tazminur Rahman Tanim — Portfolio",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Tazminur Rahman Tanim - Full Stack Web Developer & Next.js Specialist",
        type: "image/jpeg",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tazminur Rahman Tanim | Full Stack Web Developer & Next.js Specialist",
    description:
      "Full Stack Web Developer specializing in React, Next.js, Node.js & MERN Stack. Available for freelance projects.",
    images: ["/api/og"],
    creator: "@tazminur12",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tazminur Rahman Tanim",
    url: SITE_URL,
    image: `${SITE_URL}/api/og`,
    jobTitle: "Full Stack Web Developer",
    description:
      "Full Stack Web Developer & Next.js Specialist. Founder & CEO of Algowave Agency. Expert in React, Next.js, Node.js, TypeScript, MongoDB & MERN Stack.",
    sameAs: [
      "https://github.com/tazminur12",
      "https://www.linkedin.com/in/tazminur-rahman-tanim-305315336",
      "https://www.facebook.com/tan.im.921025",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "MERN Stack",
      "Full Stack Web Development",
      "Tailwind CSS",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Algowave Agency",
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
