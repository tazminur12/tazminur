import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tazminur.me";

export const metadata: Metadata = {
  title: "Skills & Technologies",
  description:
    "Technical skills of Tazminur Rahman Tanim — React, Next.js, TypeScript, Node.js, MongoDB, PostgreSQL, Tailwind CSS, Docker, AWS and more. Expert Full Stack Web Developer with modern tech stack.",
  keywords: [
    "Tazminur Rahman Tanim Skills",
    "React Developer Skills",
    "Next.js Skills",
    "Full Stack Developer Tech Stack",
    "MERN Stack Skills",
    "TypeScript Developer",
    "Tailwind CSS Developer",
    "Node.js Skills",
    "MongoDB Developer",
  ],
  alternates: {
    canonical: `${SITE_URL}/skills`,
  },
  openGraph: {
    title: "Skills & Technologies | Tazminur Rahman Tanim",
    description:
      "Expert in React, Next.js, TypeScript, Node.js, MongoDB & more. View the full tech stack of Tazminur Rahman Tanim.",
    url: `${SITE_URL}/skills`,
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "Skills of Tazminur Rahman Tanim" }],
  },
};

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
