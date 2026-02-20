"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { HiExternalLink } from "react-icons/hi";

const certificates = [
  {
    title: "Full Stack Web Development",
    issuer: "Coursera",
    date: "2024",
    credential: "#",
    color: "from-cyan-500/20 to-blue-500/20",
  },
  {
    title: "React Developer Certificate",
    issuer: "Meta",
    date: "2024",
    credential: "#",
    color: "from-blue-500/20 to-purple-500/20",
  },
  {
    title: "Node.js Backend Development",
    issuer: "Udemy",
    date: "2023",
    credential: "#",
    color: "from-green-500/20 to-cyan-500/20",
  },
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2023",
    credential: "#",
    color: "from-orange-500/20 to-yellow-500/20",
  },
  {
    title: "JavaScript Algorithms",
    issuer: "freeCodeCamp",
    date: "2023",
    credential: "#",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "2022",
    credential: "#",
    color: "from-pink-500/20 to-rose-500/20",
  },
];

export default function Certificates() {
  return (
    <section id="certificates" className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Certificates"
          subtitle="Professional certifications and achievements"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass glass-hover glow-hover group overflow-hidden rounded-2xl transition-all"
            >
              {/* Certificate visual */}
              <div
                className={`flex h-36 items-center justify-center bg-gradient-to-br ${cert.color}`}
              >
                <div className="text-center">
                  <div className="mb-1 text-3xl font-bold text-white/20">
                    {cert.issuer.charAt(0)}
                  </div>
                  <div className="text-xs font-medium text-white/40">
                    Certificate
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="mb-1 font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  {cert.title}
                </h3>
                <p className="mb-3 text-sm text-zinc-500">
                  {cert.issuer} &middot; {cert.date}
                </p>
                <a
                  href={cert.credential}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
                >
                  View Credential
                  <HiExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
