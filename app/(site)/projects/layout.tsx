import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tazminur.me";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore the portfolio of Tazminur Rahman Tanim — 50+ real-world projects built with React, Next.js, Node.js, MongoDB & TypeScript. Full Stack web applications, MERN stack projects, and modern UI/UX designs.",
  keywords: [
    "Tazminur Rahman Tanim Projects",
    "Next.js Projects Portfolio",
    "React Projects",
    "MERN Stack Projects",
    "Full Stack Projects",
    "Web Developer Portfolio Projects",
    "Node.js Projects",
    "TypeScript Projects",
    "MongoDB Projects",
  ],
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
  openGraph: {
    title: "Projects | Tazminur Rahman Tanim — Full Stack Web Developer",
    description:
      "50+ real-world projects built with React, Next.js, Node.js & MongoDB. View my full stack web development portfolio.",
    url: `${SITE_URL}/projects`,
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "Projects by Tazminur Rahman Tanim" }],
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
