"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  HiCode,
  HiBriefcase,
  HiAcademicCap,
  HiUsers,
  HiArrowRight,
  HiDownload,
  HiCheckCircle,
  HiSparkles,
  HiLightningBolt,
  HiShieldCheck,
  HiGlobe,
} from "react-icons/hi";
import {
  SiNextdotjs,
  SiTypescript,
  SiMongodb,
  SiTailwindcss,
} from "react-icons/si";
import SectionHeading from "../../components/SectionHeading";
import TiltCard from "../../components/motion/TiltCard";
import MagneticButton from "../../components/motion/MagneticButton";

const stats = [
  {
    icon: HiCode,
    label: "Projects Completed",
    value: "50+",
    color: "from-cyan-400 to-blue-500",
    detail: "High-impact web apps",
  },
  {
    icon: HiBriefcase,
    label: "Years Experience",
    value: "3+",
    color: "from-purple-400 to-pink-500",
    detail: "Continuous production code",
  },
  {
    icon: HiAcademicCap,
    label: "Certifications",
    value: "10+",
    color: "from-amber-400 to-orange-500",
    detail: "Verified credentials",
  },
  {
    icon: HiUsers,
    label: "Happy Clients",
    value: "30+",
    color: "from-emerald-400 to-teal-500",
    detail: "Worldwide collaborators",
  },
];

const experience = [
  {
    role: "Founder & CEO",
    company: "Algowave Agency",
    period: "2024 — Present",
    tag: "Leadership & Enterprise Architecture",
    description:
      "Directing Algowave Agency — a high-velocity digital agency delivering scalable full-stack web architectures, product design, and digital acceleration strategies for startups and enterprise clients worldwide.",
    achievements: [
      "Orchestrated 20+ bespoke client deployments with zero critical downtime.",
      "Architected enterprise Next.js systems with serverless backends and edge caching.",
    ],
  },
  {
    role: "MERN Stack Developer",
    company: "Flyoval Limited",
    period: "Aug 2025 — Present",
    tag: "Core Engineering",
    description:
      "Engineering robust full-stack solutions using React, Next.js, Node.js, and MongoDB Atlas. Collaborating within agile cross-functional pods to deploy scalable features, RESTful microservices, and secure auth flows.",
    achievements: [
      "Optimized MongoDB aggregation pipelines, slashing database query latency by 35%.",
      "Built resilient modular UI design systems adhering to strict accessibility standards.",
    ],
  },
];

const coreCapabilities = [
  {
    title: "Next.js 16 & React 19 Ecosystems",
    desc: "Server Components (RSC), Streaming SSR, ISR, and modern React compiler ergonomics.",
    icon: SiNextdotjs,
    color: "text-white",
  },
  {
    title: "Strict Full-Stack TypeScript",
    desc: "End-to-end type safety, shared Zod schemas, zero type drift, and predictive DX.",
    icon: SiTypescript,
    color: "text-cyan-400",
  },
  {
    title: "Scalable Database & Pipeline Design",
    desc: "MongoDB Atlas aggregation, PostgreSQL relational models, indexing, and Prisma ORM.",
    icon: SiMongodb,
    color: "text-emerald-400",
  },
  {
    title: "Fluid 3D UI & Micro-Interactions",
    desc: "Physics-based Framer Motion springs, GPU-accelerated transforms, and OLED glassmorphism.",
    icon: SiTailwindcss,
    color: "text-cyan-400",
  },
  {
    title: "REST & GraphQL API Gateways",
    desc: "Stateless microservices, secure JWT/JOSE authentication, and webhook telemetry.",
    icon: HiLightningBolt,
    color: "text-amber-400",
  },
  {
    title: "DevSecOps & Cloud Hardening",
    desc: "Docker containerization, CI/CD automated test suites, Edge middleware, and AWS/Vercel pipelines.",
    icon: HiShieldCheck,
    color: "text-purple-400",
  },
];

export default function AboutPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="relative min-h-screen px-4 pt-8 pb-24 sm:py-28 antigravity-bg">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[550px] w-[550px] rounded-full bg-linear-to-tr from-cyan-500/10 via-purple-600/10 to-emerald-500/10 blur-[140px] animate-pulse-nebula" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ─── Header Section ─── */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-950/20 px-3.5 py-1.5 text-xs font-mono text-cyan-300 mb-4 backdrop-blur-md"
          >
            <HiSparkles className="text-cyan-400" />
            <span>ENGINEERING PROFILE & BIOGRAPHY</span>
          </motion.div>

          <SectionHeading
            title="Get to Know Who I Am"
            subtitle="Bridging the gap between ambitious product visions, resilient full-stack architectures, and zero-gravity UI ergonomics."
          />
        </div>

        {/* ─── Profile Portal & Bio Split ─── */}
        <div className="mb-24 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: Orbital 3D Framed Profile Portal (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:col-span-5"
          >
            <div className="relative flex items-center justify-center">
              {/* Counter-rotating orbital rings */}
              <div className="absolute h-[320px] w-[320px] sm:h-[400px] sm:w-[400px] rounded-full border border-cyan-500/15 animate-[spin_35s_linear_infinite]" />
              <div className="absolute h-[390px] w-[390px] sm:h-[480px] sm:w-[480px] rounded-full border border-purple-500/10 border-dashed animate-[spin_50s_linear_infinite_reverse]" />

              {/* Ambient radial halo */}
              <div className="absolute -inset-4 rounded-3xl bg-linear-to-tr from-cyan-500/20 via-transparent to-purple-600/20 blur-2xl opacity-70" />

              {/* Main Profile Frame */}
              <div className="relative h-72 w-72 sm:h-88 sm:w-88 rounded-3xl p-2 glass-panel-elevated aurora-border overflow-hidden shadow-2xl">
                <div className="relative h-full w-full rounded-2xl overflow-hidden bg-black/40">
                  <Image
                    src="/tanim.jpeg"
                    alt="Tazminur Rahman Tanim"
                    fill
                    className="object-cover scale-102 transition-transform duration-700 hover:scale-108"
                    sizes="(max-width: 640px) 288px, 352px"
                    priority
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#010103] via-transparent to-transparent opacity-75" />
                </div>
              </div>

              {/* Satellite Floating Badge 1: Next.js 16 (Top-Right) */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: [0, -10, 0],
                        rotate: [0, 1.5, 0],
                      }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-3 -right-3 sm:-right-4 glass-panel px-3.5 py-2 rounded-2xl flex items-center gap-2.5 border border-white/10 shadow-xl backdrop-blur-xl"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  <SiNextdotjs size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Next.js 16</div>
                  <div className="text-[10px] font-mono text-zinc-400">RSC Architecture</div>
                </div>
              </motion.div>

              {/* Satellite Floating Badge 2: TypeScript & MERN (Bottom-Left) */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: [0, 12, 0],
                        rotate: [0, -1.5, 0],
                      }
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8,
                }}
                className="absolute -bottom-4 -left-3 sm:-left-6 glass-panel px-3.5 py-2 rounded-2xl flex items-center gap-2.5 border border-white/10 shadow-xl backdrop-blur-xl"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/30">
                  <SiTypescript size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Strict TypeScript</div>
                  <div className="text-[10px] font-mono text-zinc-400">Zero Type Drift</div>
                </div>
              </motion.div>

              {/* Satellite Floating Badge 3: MongoDB Ecosystem (Top-Left) */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: [0, -8, 0],
                        x: [0, 4, 0],
                      }
                }
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2,
                }}
                className="absolute top-1/2 -left-6 sm:-left-8 -translate-y-1/2 hidden min-[480px]:flex items-center gap-2 rounded-xl glass-panel-elevated px-3 py-1.5 border border-cyan-400/30 shadow-lg"
              >
                <SiMongodb className="text-emerald-400" size={16} />
                <span className="text-[11px] font-mono font-bold text-white">Atlas Core</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Dynamic Narrative & Bio (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-5"
          >
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-widest text-cyan-400 uppercase">
              <span>01 // THE ARCHITECT</span>
            </div>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Full Stack Web Developer &amp;{" "}
              <span className="gradient-text">Agency Founder</span>
            </h3>

            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-300">
              <p>
                I&apos;m <span className="font-bold text-white">Tazminur Rahman Tanim</span> — an engineer
                obsessed with building weightless, high-throughput digital systems. Currently, I serve as the{" "}
                <span className="font-semibold text-cyan-300">Founder &amp; CEO of Algowave Agency</span> and engineer production web applications as a{" "}
                <span className="font-semibold text-purple-300">MERN Stack Developer at Flyoval Limited</span>.
              </p>
              <p>
                My engineering philosophy centers on <span className="text-white font-medium">clean modular architecture, server-first data streams, and physics-driven micro-interactions</span>.
                I specialize in taking complex product requirements and distilling them into elegant, type-safe Next.js 16 platforms with sub-second page loads and zero layout shifts.
              </p>
              <p>
                Beyond code, I possess an entrepreneurial drive. At Algowave, I direct a distributed talent pod
                delivering end-to-end digital solutions, branding systems, and growth strategies for ambitious startups and organizations worldwide.
              </p>
            </div>

            {/* Magnetic CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <MagneticButton intensity={0.35}>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-linear-to-r from-cyan-500 via-teal-500 to-purple-600 px-7 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-xl shadow-cyan-500/25 transition-all hover:scale-102 hover:shadow-cyan-500/40"
                >
                  <span>Let&apos;s Work Together</span>
                  <HiArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticButton>

              <MagneticButton intensity={0.25}>
                <a
                  href="https://drive.google.com/file/d/1tF52nFZzYk5XOIrwqXKpi2Mecr_mKVAB/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full glass-panel hover:bg-white/10 px-6 py-3.5 text-xs sm:text-sm font-medium text-zinc-200 border border-white/10 transition-all hover:border-cyan-400/40 hover:text-white"
                >
                  <HiDownload size={15} className="text-cyan-400" />
                  <span>Download Curriculum Vitae</span>
                </a>
              </MagneticButton>
            </div>
          </motion.div>
        </div>

        {/* ─── Bento Metrics Grid ─── */}
        <div className="mb-24">
          <div className="text-center mb-10">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              02 // METRICS & TELEMETRY
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
              >
                <TiltCard className="p-6 h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br ${stat.color} text-white shadow-md`}
                    >
                      <stat.icon size={20} />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">SYS.0{i + 1}</span>
                  </div>

                  <div>
                    <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-zinc-300 mt-1">
                      {stat.label}
                    </div>
                    <div className="text-[11px] font-mono text-cyan-400/80 mt-1">
                      {stat.detail}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── Professional Journey & Experience Timeline ─── */}
        <div className="mb-24 grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Timeline Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="mb-8">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                03 // CAREER TRAJECTORY
              </span>
              <h4 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Professional Journey
              </h4>
            </div>

            <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-[2px] before:bg-linear-to-b before:from-cyan-400 before:via-purple-500 before:to-emerald-400">
              {experience.map((exp, i) => (
                <motion.div
                  key={exp.role}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="relative"
                >
                  {/* Glowing Node Marker */}
                  <div className="absolute -left-[27px] sm:-left-[35px] top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#010103] border-2 border-cyan-400 shadow-[0_0_12px_#06b6d4]">
                    <div className="h-2 w-2 rounded-full bg-cyan-400" />
                  </div>

                  <TiltCard className="p-6 sm:p-7">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h5 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {exp.role}
                      </h5>
                      <span className="rounded-full bg-cyan-500/15 border border-cyan-400/30 px-3 py-0.5 text-xs font-mono font-medium text-cyan-300">
                        {exp.company}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mb-4">
                      <span>{exp.period}</span>
                      <span>&bull;</span>
                      <span className="text-purple-400">{exp.tag}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    <ul className="space-y-2 pt-2 border-t border-white/6 text-xs text-zinc-400">
                      {exp.achievements.map((ach, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <HiCheckCircle className="text-cyan-400 shrink-0 mt-0.5" size={14} />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Technical Competencies & Methodology Matrix (5 cols) */}
          <div className="lg:col-span-5">
            <div className="mb-8">
              <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">
                04 // METHODOLOGY & RADAR
              </span>
              <h4 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Core Architectural Pillars
              </h4>
            </div>

            <div className="space-y-4">
              {coreCapabilities.map((cap, i) => (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <TiltCard className="p-4 sm:p-5">
                    <div className="flex items-start gap-3.5">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shrink-0 mt-0.5">
                        <cap.icon size={20} className={cap.color} />
                      </div>
                      <div>
                        <h6 className="text-sm font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                          {cap.title}
                        </h6>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {cap.desc}
                        </p>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>

            {/* Philosophy Terminal Card */}
            <div className="mt-6">
              <TiltCard className="p-5 aurora-border">
                <div className="flex items-center gap-2 mb-2 text-cyan-400 text-xs font-mono">
                  <HiGlobe size={14} />
                  <span>FOUNDER COMMITMENT</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans italic">
                  &ldquo;We don&apos;t just ship features — we architect enduring digital assets that scale seamlessly with your vision and user demands.&rdquo;
                </p>
                <div className="mt-2 text-[10px] font-mono text-zinc-500">
                  TAZMINUR RAHMAN TANIM &bull; ALGOWAVE AGENCY
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
