import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tazminur.me";

export const metadata: Metadata = {
  title: "Certificates",
  description:
    "Professional certifications of Tazminur Rahman Tanim — 10+ verified certificates in Full Stack Web Development, React, Next.js, Node.js, MongoDB, and modern web technologies.",
  keywords: [
    "Tazminur Rahman Tanim Certificates",
    "Web Developer Certificates",
    "React Certification",
    "Next.js Certification",
    "Full Stack Developer Certification",
    "MERN Stack Certificate",
    "Professional Web Development Certificates",
  ],
  alternates: {
    canonical: `${SITE_URL}/certificates`,
  },
  openGraph: {
    title: "Certificates | Tazminur Rahman Tanim — Full Stack Web Developer",
    description:
      "10+ professional certifications in React, Next.js, Node.js, MongoDB & modern web development.",
    url: `${SITE_URL}/certificates`,
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "Certificates of Tazminur Rahman Tanim" }],
  },
};

export default function CertificatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
