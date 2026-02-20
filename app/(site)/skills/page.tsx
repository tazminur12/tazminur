import type { Metadata } from "next";
import Skills from "../../components/Skills";
import PageTransition from "../../components/PageTransition";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Explore the technologies and tools Tazminur works with — React, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL, Docker, and more.",
};

export default function SkillsPage() {
  return (
    <PageTransition>
      <Skills />
    </PageTransition>
  );
}
