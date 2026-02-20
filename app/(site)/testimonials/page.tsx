import type { Metadata } from "next";
import Testimonials from "../../components/Testimonials";
import PageTransition from "../../components/PageTransition";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read what clients say about working with Tazminur — reviews and feedback from satisfied clients and collaborators.",
};

export default function TestimonialsPage() {
  return (
    <PageTransition>
      <Testimonials />
    </PageTransition>
  );
}
