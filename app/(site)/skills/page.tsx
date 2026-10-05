"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../../components/SectionHeading";
import TiltCard from "../../components/motion/TiltCard";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiDocker,
  SiCloudinary,
  SiVercel,
  SiFirebase,
  SiFigma,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { HiSparkles, HiCheckCircle, HiLightningBolt } from "react-icons/hi";
import { IconType } from "react-icons";

interface SkillItem {
  name: string;
  icon: IconType;
  color: string;
  level: number;
  highlight: string;
}

interface DomainCategory {
  id: string;
  name: string;
  tagline: string;
  accent: string;
  borderGlow: string;
  skills: SkillItem[];
}

const domainCategories: DomainCategory[] = [
  {
    id: "frontend",
    name: "Frontend Architecture",
    tagline: "Ultra-fast, interactive client architectures with zero layout shift",
    accent: "from-cyan-400 to-blue-500",
    borderGlow: "rgba(6, 182, 212, 0.4)",
    skills: [
      {
        name: "React 19",
        icon: SiReact,
        color: "#61DAFB",
        level: 96,
        highlight: "Server Components & Concurrent UI",
      },
      {
        name: "Next.js 16",
        icon: SiNextdotjs,
        color: "#FFFFFF",
        level: 95,
        highlight: "App Router, Server Actions & ISR",
      },
      {
        name: "TypeScript",
        icon: SiTypescript,
        color: "#3178C6",
        level: 93,
        highlight: "Strict Typing & Shared Schemas",
      },
      {
        name: "Tailwind CSS v4",
        icon: SiTailwindcss,
        color: "#06B6D4",
        level: 98,
        highlight: "Design Systems, @theme & JIT",
      },
      {
        name: "JavaScript (ESNext)",
        icon: SiJavascript,
        color: "#F7DF1E",
        level: 95,
        highlight: "Asynchronous Pipelines & Web APIs",
      },
      {
        name: "Redux Toolkit",
        icon: SiRedux,
        color: "#764ABC",
        level: 85,
        highlight: "Global State & RTK Query Caching",
      },
    ],
  },
  {
    id: "backend",
    name: "Backend & Systems",
    tagline: "High-throughput server-side pipelines and fault-tolerant data nodes",
    accent: "from-emerald-400 to-teal-500",
    borderGlow: "rgba(16, 185, 129, 0.4)",
    skills: [
      {
        name: "Node.js",
        icon: SiNodedotjs,
        color: "#339933",
        level: 92,
        highlight: "Microservices & Non-blocking I/O",
      },
      {
        name: "Express.js",
        icon: SiExpress,
        color: "#EDEDED",
        level: 90,
        highlight: "REST API Gateways & Middleware",
      },
      {
        name: "MongoDB",
        icon: SiMongodb,
        color: "#47A248",
        level: 88,
        highlight: "Atlas Clusters & Aggregation Pipelines",
      },
      {
        name: "PostgreSQL",
        icon: SiPostgresql,
        color: "#4169E1",
        level: 84,
        highlight: "Relational Schemas, Joins & SQL",
      },
      {
        name: "Prisma ORM",
        icon: SiPrisma,
        color: "#2D3748",
        level: 82,
        highlight: "Type-Safe Queries & Schema Migrations",
      },
    ],
  },
  {
    id: "devops",
    name: "DevOps & Cloud Ecosystem",
    tagline: "Automated continuous delivery, containerization, and cloud hardening",
    accent: "from-purple-400 to-fuchsia-500",
    borderGlow: "rgba(168, 85, 247, 0.4)",
    skills: [
      {
        name: "Docker",
        icon: SiDocker,
        color: "#2496ED",
        level: 86,
        highlight: "Container Clusters & Docker Compose",
      },
      {
        name: "Cloudinary",
        icon: SiCloudinary,
        color: "#3448C5",
        level: 92,
        highlight: "CDN Media Optimization & Transformations",
      },
      {
        name: "Vercel",
        icon: SiVercel,
        color: "#FFFFFF",
        level: 95,
        highlight: "Edge Functions & Automated CI/CD",
      },
      {
        name: "AWS",
        icon: FaAws,
        color: "#FF9900",
        level: 78,
        highlight: "S3 Buckets, EC2 & IAM Policies",
      },
      {
        name: "Firebase",
        icon: SiFirebase,
        color: "#FFCA28",
        level: 85,
        highlight: "Auth, Firestore & Real-Time Sync",
      },
      {
        name: "Figma",
        icon: SiFigma,
        color: "#F24E1E",
        level: 80,
        highlight: "UI Wireframing & Design Tokens",
      },
    ],
  },
];

const filterTabs = [
  { id: "all", label: "All Domains" },
  { id: "frontend", label: "Frontend Architecture" },
  { id: "backend", label: "Backend & Systems" },
  { id: "devops", label: "DevOps & Cloud Ecosystem" },
];

export default function SkillsPage() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const displayedCategories =
    activeTab === "all"
      ? domainCategories
      : domainCategories.filter((cat) => cat.id === activeTab);

  return (
    <section id="skills" className="relative min-h-screen px-4 pt-8 pb-24 sm:py-28 antigravity-bg">
      {/* Background Multi-Orb Glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[550px] w-[550px] rounded-full bg-linear-to-tr from-cyan-500/10 via-purple-600/10 to-emerald-500/10 blur-[140px] animate-pulse-nebula" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ─── Header Section ─── */}
        <div className="text-center mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-950/20 px-3.5 py-1.5 text-xs font-mono text-cyan-300 mb-4 backdrop-blur-md"
          >
            <HiSparkles className="text-cyan-400" />
            <span>KINETIC CAPABILITIES RADAR</span>
          </motion.div>

          <SectionHeading
            title="Skills & Technical Orbit"
            subtitle="A structured breakdown of my full-stack engineering stack, runtime environments, and core architectural competencies."
          />

          {/* ─── Domain Filter Pills with Layout-ID Spring ─── */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8 sm:mt-10">
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative rounded-full px-5 py-2.5 text-xs font-semibold transition-colors duration-200 cursor-pointer ${
                    isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillTab"
                      className="absolute inset-0 rounded-full bg-linear-to-r from-cyan-500/25 via-purple-500/20 to-cyan-500/25 border border-cyan-400/40 shadow-md shadow-cyan-500/20"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── Skill Categories Grid ─── */}
        <div className="space-y-16">
          <AnimatePresence mode="wait">
            {displayedCategories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45 }}
                className="space-y-6"
              >
                {/* Domain Header Strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/8 pb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4]" />
                      <span>{category.name}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                      {category.tagline}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[11px] font-mono text-cyan-300">
                      {category.skills.length} VERIFIED NODES
                    </span>
                  </div>
                </div>

                {/* 3D Interactive Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                    >
                      <TiltCard className="p-5 sm:p-6 h-full flex flex-col justify-between">
                        <div>
                          {/* Top: Icon + Metric Header */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3.5">
                              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/10 group-hover:border-cyan-400/40 group-hover:bg-cyan-500/10 transition-all duration-300 shadow-inner">
                                <skill.icon
                                  style={{ color: skill.color }}
                                  size={24}
                                  className="transition-transform duration-300 group-hover:scale-110"
                                />
                              </div>

                              <div>
                                <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                                  {skill.name}
                                </h4>
                                <span className="text-[11px] font-mono text-zinc-400 line-clamp-1">
                                  {skill.highlight}
                                </span>
                              </div>
                            </div>

                            {/* Percentage Badge */}
                            <div className="text-right">
                              <span className="text-sm font-black font-mono text-cyan-400 tracking-tight">
                                {skill.level}%
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom: Progress Bar with Animated Glow */}
                        <div className="mt-4 pt-3 border-t border-white/6">
                          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-1.5">
                            <span>PROFICIENCY LEVEL</span>
                            <span className="text-emerald-400 font-semibold flex items-center gap-1">
                              <HiCheckCircle size={11} /> PRODUCTION READY
                            </span>
                          </div>

                          <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden p-0.5 border border-white/5">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.1, ease: "easeOut" }}
                              className="h-full rounded-full bg-linear-to-r from-cyan-400 via-teal-400 to-purple-500 shadow-[0_0_10px_rgba(6,182,212,0.45)]"
                            />
                          </div>
                        </div>
                      </TiltCard>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ─── Footer Architectural Note ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <TiltCard className="p-6 max-w-2xl mx-auto aurora-border">
            <div className="flex items-center justify-center gap-2 mb-2 text-cyan-400 font-mono text-xs font-semibold">
              <HiLightningBolt size={15} />
              <span>DYNAMIC SYSTEM CAPABILITIES</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Every technology is evaluated for continuous delivery, automated linting, zero type drift,
              and low memory footprint in high-throughput cloud environments.
            </p>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
