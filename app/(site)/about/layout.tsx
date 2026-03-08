import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tazminur.me";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn about Tazminur Rahman Tanim — Full Stack Web Developer, MERN Stack Developer, Founder & CEO of Algowave Agency, and MERN Stack Developer at Flyoval Limited. 3+ years of experience, 50+ projects delivered.",
  keywords: [
    "About Tazminur Rahman Tanim",
    "Tazminur Rahman Tanim Developer",
    "Full Stack Developer Bangladesh",
    "MERN Stack Developer",
    "Algowave Agency CEO",
    "Flyoval Limited Developer",
    "Next.js React Developer",
    "Web Developer Portfolio",
  ],
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "About Tazminur Rahman Tanim | Full Stack Web Developer",
    description:
      "3+ years of experience building modern web applications. Founder & CEO of Algowave Agency. MERN Stack Developer at Flyoval Limited.",
    url: `${SITE_URL}/about`,
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "About Tazminur Rahman Tanim" }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
