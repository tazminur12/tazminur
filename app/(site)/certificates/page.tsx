import type { Metadata } from "next";
import Certificates from "../../components/Certificates";
import PageTransition from "../../components/PageTransition";

export const metadata: Metadata = {
  title: "Certificates",
  description:
    "Professional certifications and achievements earned by Tazminur in web development, cloud computing, and more.",
};

export default function CertificatesPage() {
  return (
    <PageTransition>
      <Certificates />
    </PageTransition>
  );
}
