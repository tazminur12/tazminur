import type { Metadata } from "next";
import About from "../../components/About";
import PageTransition from "../../components/PageTransition";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Tazminur Rahman Tanim — a Full Stack Web Developer passionate about building modern web applications with React, Next.js, and Node.js.",
};

export default function AboutPage() {
  return (
    <PageTransition>
      <About />
    </PageTransition>
  );
}
