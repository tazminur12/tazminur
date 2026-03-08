import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tazminur.me";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Client testimonials and reviews for Tazminur Rahman Tanim — Full Stack Web Developer. See what 30+ happy clients say about working with Tanim on React, Next.js & MERN Stack projects.",
  keywords: [
    "Tazminur Rahman Tanim Reviews",
    "Web Developer Testimonials",
    "Client Reviews Full Stack Developer",
    "Next.js Developer Reviews",
    "React Developer Testimonials",
    "Hire Web Developer Bangladesh",
  ],
  alternates: {
    canonical: `${SITE_URL}/testimonials`,
  },
  openGraph: {
    title: "Testimonials | Tazminur Rahman Tanim — Full Stack Web Developer",
    description:
      "30+ happy clients. See testimonials and reviews for Tazminur Rahman Tanim — React & Next.js Developer.",
    url: `${SITE_URL}/testimonials`,
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "Testimonials for Tazminur Rahman Tanim" }],
  },
};

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
