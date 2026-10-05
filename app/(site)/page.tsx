"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiArrowRight,
  HiMail,
  HiStar,
  HiLightningBolt,
  HiGlobe,
  HiDeviceMobile,
  HiDatabase,
  HiCog,
} from "react-icons/hi";
import { FaQuoteLeft } from "react-icons/fa";
import Hero from "../components/Hero";
import BentoGrid, { Project } from "../components/BentoGrid";
import TiltCard from "../components/motion/TiltCard";
import MagneticButton from "../components/motion/MagneticButton";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

const services = [
  {
    icon: HiGlobe,
    title: "Full Stack Web Engineering",
    description:
      "Enterprise-grade React 19 & Next.js 16 architectures built with scalable serverless endpoints, atomic state, and edge caching.",
    accent: "from-cyan-500 to-blue-500",
  },
  {
    icon: HiDeviceMobile,
    title: "Fluid 3D UI & Ergonomics",
    description:
      "Awwwards-caliber interfaces featuring zero-gravity physical micro-interactions, Framer Motion springs, and responsive precision.",
    accent: "from-purple-500 to-pink-500",
  },
  {
    icon: HiDatabase,
    title: "Scalable Data & API Design",
    description:
      "High-throughput REST and GraphQL pipelines engineered with MongoDB Atlas, Mongoose schemas, and automated indexes.",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    icon: HiCog,
    title: "Cloud & DevSecOps",
    description:
      "Continuous CI/CD deployments on Vercel, Dockerized environments, SSL hardening, and automated performance optimization.",
    accent: "from-amber-500 to-orange-500",
  },
];

const stats = [
  { value: "50+", label: "Systems Deployed" },
  { value: "3+", label: "Years Experience" },
  { value: "30+", label: "Satisfied Clients" },
  { value: "10+", label: "Verified Licenses" },
];

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch("/api/projects?status=published")
      .then((r) => r.json())
      .then((d) => setProjects(Array.isArray(d) ? d : []))
      .catch(() => {});

    fetch("/api/testimonials?status=published")
      .then((r) => r.json())
      .then((d) => setTestimonials(Array.isArray(d) ? d.slice(0, 3) : []))
      .catch(() => {});
  }, []);

  return (
    <>
      {/* ─── Hero Section ─── */}
      <Hero />

      {/* ─── Sci-Fi Stats Telemetry Strip ─── */}
      <section className="relative border-y border-white/6 bg-[#04060a]/90 backdrop-blur-xl">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:py-12 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="text-center relative group"
            >
              <div className="text-3xl sm:text-5xl font-black text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                {stat.value}
              </div>
              <div className="mt-1.5 text-xs sm:text-sm font-mono tracking-wider uppercase text-zinc-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Bento Grid Showcase ─── */}
      <BentoGrid projects={projects} />

      {/* ─── Engineering Services ─── */}
      <section className="relative px-4 py-24 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-950/20 px-3.5 py-1 text-xs font-mono text-cyan-300 mb-3">
              <HiLightningBolt className="text-cyan-400" />
              CAPABILITIES & SERVICES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
              Full-Stack{" "}
              <span className="gradient-text">Competencies</span>
            </h2>
            <p className="text-zinc-400 max-w-md mx-auto text-sm sm:text-base">
              End-to-end digital craft tailored to high-growth teams and visionary products.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <TiltCard className="p-6 h-full flex flex-col justify-between">
                  <div>
                    <div
                      className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${service.accent} text-white shadow-lg`}
                    >
                      <service.icon size={24} />
                    </div>
                    <h3 className="mb-2.5 text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-1.5 text-[11px] font-mono text-cyan-400">
                    <span>EXPLORE STACK</span>
                    <HiArrowRight size={11} />
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Client Testimonials Matrix ─── */}
      {testimonials.length > 0 && (
        <section className="relative px-4 py-24 sm:py-28 border-t border-white/6 bg-[#03050a]/60">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-950/20 px-3.5 py-1 text-xs font-mono text-purple-300 mb-3">
                ENDORSEMENTS
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
                Client <span className="gradient-text">Telemetry</span>
              </h2>
              <p className="text-zinc-400 max-w-md mx-auto text-sm">
                Feedback from engineering leaders, founders, and long-term collaborators.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <TiltCard className="p-6 h-full flex flex-col justify-between">
                    <div>
                      <FaQuoteLeft size={24} className="mb-4 text-cyan-400/30" />
                      <p className="mb-6 text-xs sm:text-sm leading-relaxed text-zinc-300 italic">
                        &ldquo;{t.content}&rdquo;
                      </p>
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <HiStar
                            key={idx}
                            size={14}
                            className={idx < t.rating ? "text-amber-400" : "text-zinc-700"}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-white/8">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-purple-600 text-sm font-bold text-white shadow-md">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{t.name}</div>
                        {t.role && <div className="text-xs text-zinc-400 font-mono">{t.role}</div>}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/testimonials"
                className="group inline-flex items-center gap-2 rounded-full glass-panel hover:bg-white/10 px-6 py-2.5 text-xs font-semibold text-zinc-300 border border-white/10 transition-all hover:text-white"
              >
                <span>Read All Testimonials</span>
                <HiArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── Holographic Mission Launch CTA ─── */}
      <section className="relative overflow-hidden px-4 py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[450px] w-[600px] rounded-full bg-linear-to-r from-cyan-500/10 via-purple-600/10 to-emerald-500/10 blur-[130px]" />
        </div>

        <div className="relative mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel-elevated aurora-border rounded-3xl p-8 sm:p-14 text-center shadow-2xl"
          >
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 via-teal-500 to-purple-600 shadow-lg shadow-cyan-500/25">
              <HiMail size={26} className="text-white" />
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Initiate Next-Gen <br />
              <span className="gradient-text">Collaboration</span>
            </h2>

            <p className="mx-auto mb-8 max-w-lg text-sm sm:text-base text-zinc-300 leading-relaxed">
              Have an ambitious vision or require architectural mastery on your next web application?
              Let&apos;s build an unforgettable experience together.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton intensity={0.35}>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-linear-to-r from-cyan-500 via-teal-500 to-purple-600 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-cyan-500/30 hover:scale-103 transition-all"
                >
                  <span>Start A Project</span>
                  <HiArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticButton>

              <MagneticButton intensity={0.25}>
                <a
                  href="mailto:tanimkhalifa55@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full glass-panel hover:bg-white/10 px-7 py-3.5 text-sm font-medium text-zinc-200 border border-white/10 transition-all hover:text-white"
                >
                  <HiMail size={16} className="text-cyan-400" />
                  <span>tanimkhalifa55@gmail.com</span>
                </a>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
