import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tazminur.me";

export const metadata: Metadata = {
  title: "Contact Me",
  description:
    "Get in touch with Tazminur Rahman Tanim — Full Stack Web Developer. Available for freelance projects, collaborations, and full-time opportunities. Hire a React & Next.js developer today.",
  keywords: [
    "Contact Tazminur Rahman Tanim",
    "Hire Full Stack Developer",
    "Hire Next.js Developer",
    "Hire React Developer",
    "Freelance Web Developer Bangladesh",
    "Web Developer for Hire",
    "MERN Stack Developer Contact",
  ],
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: "Contact | Tazminur Rahman Tanim — Hire Full Stack Web Developer",
    description:
      "Available for freelance projects & collaborations. Contact Tazminur Rahman Tanim — React & Next.js specialist.",
    url: `${SITE_URL}/contact`,
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "Contact Tazminur Rahman Tanim" }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
