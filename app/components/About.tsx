"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiCode,
  HiBriefcase,
  HiAcademicCap,
  HiUsers,
  HiArrowRight,
  HiDownload,
  HiCheckCircle,
} from "react-icons/hi";

const stats = [
  { icon: HiCode, label: "Projects Completed", value: "50+", color: "from-cyan-500 to-blue-500" },
  { icon: HiBriefcase, label: "Years Experience", value: "3+", color: "from-purple-500 to-pink-500" },
  { icon: HiAcademicCap, label: "Certifications", value: "10+", color: "from-amber-500 to-orange-500" },
  { icon: HiUsers, label: "Happy Clients", value: "30+", color: "from-green-500 to-emerald-500" },
];

const experience = [
  {
    role: "Founder & CEO",
    company: "Algowave Agency",
    period: "Present",
    description:
      "Leading Algowave Agency — a digital agency delivering end-to-end web solutions, branding, and digital marketing services to clients globally.",
  },
  {
    role: "MERN Stack Developer",
    company: "Flyoval Limited",
    period: "Aug 2025 — Present",
    description:
      "Building and maintaining full stack web applications using MongoDB, Express.js, React, and Node.js. Collaborating with cross-functional teams to deliver scalable, production-ready solutions.",
  },
];

const expertise = [
  "React & Next.js Applications",
  "RESTful & GraphQL APIs",
  "Database Design & Optimization",
  "Responsive & Accessible UI",
  "Cloud Deployment (AWS, Vercel)",
  "Performance Optimization",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function About() {
  return (
    <section id="about" className="relative px-4 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-cyan-500/20 bg-cyan-500/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            About Me
          </span>
          <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Get to know{" "}
            <span className="gradient-text">who I am</span>
          </h2>
          <p className="mx-auto max-w-xl text-zinc-500">
            A passionate developer dedicated to turning ideas into elegant,
            high-performance digital experiences.
          </p>
        </motion.div>

        {/* --- Top: Profile + Intro --- */}
        <div className="mb-20 grid items-center gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="flex justify-center lg:col-span-2"
          >
            <div className="relative">
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20 blur-2xl" />
              <div className="relative h-72 w-72 overflow-hidden rounded-2xl border border-white/[0.06] sm:h-80 sm:w-80">
                <Image
                  src="/profile.jpg"
                  alt="Tazminur Rahman Tanim"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 288px, 320px"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
                  <span className="text-7xl font-bold text-white/[0.04]">
                    TRT
                  </span>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 rounded-xl border border-white/[0.06] bg-[#111]/90 px-4 py-2.5 backdrop-blur-md"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600">
                    <HiCode size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">3+ Years</div>
                    <div className="text-[10px] text-zinc-500">
                      of Coding
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Intro text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-cyan-400">
              Who I Am
            </h3>
            <h4 className="mb-5 text-2xl font-bold leading-snug text-white sm:text-3xl">
              Full Stack Web Developer &amp;
              <br className="hidden sm:block" /> React / Next.js Specialist
            </h4>
            <div className="space-y-4 text-[15px] leading-relaxed text-zinc-400">
              <p>
                I&apos;m <span className="font-medium text-white">Tazminur Rahman Tanim</span> —
                a Full Stack Web Developer specializing in <span className="font-medium text-white">React &amp; Next.js</span>,
                the <span className="font-medium text-white">Founder &amp; CEO of Algowave Agency</span>,
                and currently working as a <span className="font-medium text-white">MERN Stack Developer at Flyoval Limited</span>.
                My journey started with a curiosity for how the internet works — and it has
                evolved into building real-world products and leading a digital agency.
              </p>
              <p>
                I specialize in the <span className="text-zinc-300">MERN stack (MongoDB, Express.js, React, Node.js)</span>,
                along with Next.js and TypeScript. I believe in writing clean,
                maintainable code and following best practices to deliver
                high-quality solutions that truly serve users and businesses.
              </p>
              <p>
                Beyond development, I&apos;m passionate about entrepreneurship and
                helping businesses grow through technology. At Algowave, I lead a
                team delivering web solutions, branding, and digital marketing to
                clients worldwide.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-2.5 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-cyan-500/20"
              >
                Let&apos;s Work Together
                <HiArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-6 py-2.5 text-sm font-medium text-zinc-300 transition-all hover:border-white/[0.15] hover:text-white"
              >
                <HiDownload size={15} />
                Download CV
              </a>
            </div>
          </motion.div>
        </div>

        {/* --- Stats --- */}
        <div className="mb-20 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="glass glass-hover glow-hover group relative overflow-hidden rounded-2xl p-6 transition-all"
            >
              <div className={`absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br ${stat.color} opacity-[0.06] blur-2xl transition-opacity group-hover:opacity-[0.12]`} />
              <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10`}>
                <stat.icon size={22} className="text-white" />
              </div>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="mt-1 text-sm text-zinc-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* --- Experience + Expertise --- */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Experience timeline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-cyan-400">
              Experience
            </h3>
            <h4 className="mb-8 text-xl font-bold text-white">
              My Professional Journey
            </h4>

            <div className="relative space-y-8 pl-6 before:absolute before:left-0 before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-gradient-to-b before:from-cyan-500/40 before:to-purple-500/40">
              {experience.map((exp, i) => (
                <motion.div
                  key={exp.role}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="relative"
                >
                  <div className="absolute -left-6 top-1.5 flex h-3 w-3 items-center justify-center">
                    <div className="h-3 w-3 rounded-full border-2 border-cyan-400 bg-background" />
                  </div>

                  <div className="glass glass-hover rounded-xl p-5 transition-all">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="text-base font-semibold text-white">
                        {exp.role}
                      </span>
                      <span className="rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-xs font-medium text-cyan-400">
                        {exp.company}
                      </span>
                    </div>
                    <div className="mb-2 text-xs text-zinc-600">{exp.period}</div>
                    <p className="text-sm leading-relaxed text-zinc-400">
                      {exp.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Expertise checklist */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-cyan-400">
              Expertise
            </h3>
            <h4 className="mb-8 text-xl font-bold text-white">
              What I Bring to the Table
            </h4>

            <div className="space-y-3">
              {expertise.map((item, i) => (
                <motion.div
                  key={item}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="glass glass-hover flex items-center gap-3.5 rounded-xl px-5 py-4 transition-all"
                >
                  <HiCheckCircle size={20} className="shrink-0 text-cyan-400" />
                  <span className="text-sm font-medium text-zinc-300">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 rounded-2xl border border-cyan-500/10 bg-cyan-500/[0.03] p-5"
            >
              <p className="text-sm leading-relaxed text-zinc-400">
                <span className="font-semibold text-cyan-400">Core Stack:</span>{" "}
                React, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL,
                Tailwind CSS, Docker, AWS &amp; Vercel.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
