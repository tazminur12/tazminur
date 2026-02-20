"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="mb-16 text-center"
    >
      <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
        <span className="gradient-text">{title}</span>
      </h2>
      <p className="mx-auto max-w-lg text-zinc-500">{subtitle}</p>
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600" />
    </motion.div>
  );
}
