"use client";

import { motion } from "framer-motion";
import { HiCode, HiBriefcase, HiAcademicCap } from "react-icons/hi";

const stats = [
  { icon: HiCode, label: "Projects Completed", value: "50+" },
  { icon: HiBriefcase, label: "Years Experience", value: "3+" },
  { icon: HiAcademicCap, label: "Certifications", value: "10+" },
];

export default function About() {
  return (
    <section id="about" className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="mx-auto max-w-lg text-zinc-500">
            Get to know the person behind the code
          </p>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600" />
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-4 text-2xl font-semibold text-white">
              A passionate developer who loves building things for the web
            </h3>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                I&apos;m a Full Stack Web Developer with expertise in building modern,
                responsive, and scalable web applications. My journey in web development
                started with a curiosity for how things work on the internet, and it has
                evolved into a deep passion for crafting exceptional digital experiences.
              </p>
              <p>
                I specialize in React, Next.js, Node.js, and modern JavaScript/TypeScript
                ecosystems. I believe in writing clean, maintainable code and following
                best practices to deliver high-quality solutions.
              </p>
              <p>
                When I&apos;m not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with the
                developer community.
              </p>
            </div>

            <a
              href="#contact"
              className="mt-8 inline-block rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Let&apos;s Work Together
            </a>
          </motion.div>

          {/* Right: Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="grid gap-4 sm:grid-cols-1"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass glass-hover glow-hover group flex items-center gap-5 rounded-2xl p-6 transition-all"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 transition-colors group-hover:bg-cyan-500/20">
                  <stat.icon size={28} />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-zinc-500">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
