import type { Metadata } from "next";
import Contact from "../../components/Contact";
import PageTransition from "../../components/PageTransition";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Tazminur for freelance projects, collaboration, or any web development inquiries.",
};

export default function ContactPage() {
  return (
    <PageTransition>
      <Contact />
    </PageTransition>
  );
}
