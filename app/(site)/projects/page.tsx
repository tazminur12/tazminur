import type { Metadata } from "next";
import Projects from "../../components/Projects";
import PageTransition from "../../components/PageTransition";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse Tazminur's portfolio of web development projects — full stack applications, dashboards, APIs, and more.",
};

export default function ProjectsPage() {
  return (
    <PageTransition>
      <Projects />
    </PageTransition>
  );
}
