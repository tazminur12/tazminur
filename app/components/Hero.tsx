"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { HiArrowRight, HiMail, HiDownload, HiSparkles } from "react-icons/hi";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import { SiNextdotjs, SiTypescript } from "react-icons/si";
import MagneticButton from "./motion/MagneticButton";

const roles = [
  "Full Stack Web Developer",
  "Next.js 16 Specialist",
  "MERN Stack Architect",
  "Founder & CEO, Algowave",
];

function KineticTypewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index];
    const speed = deleting ? 35 : 75;

    if (!deleting && text === current) {
      const pause = setTimeout(() => setDeleting(true), 2200);
      return () => clearTimeout(pause);
    }

    if (deleting && text === "") {
      const next = setTimeout(() => {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }, speed);
      return () => clearTimeout(next);
    }

    const timer = setTimeout(() => {
      setText(
        deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [text, deleting, index, words]);

  return (
    <span className="inline-flex items-center text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-teal-300 to-purple-400">
      {text}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="ml-1 inline-block h-6 sm:h-7 w-[2px] bg-cyan-400 shadow-[0_0_8px_#06b6d4]"
      />
    </span>
  );
}

const socials = [
  { icon: FaGithub, href: "https://github.com/tazminur12", label: "GitHub" },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/tazminur-rahman-tanim-305315336",
    label: "LinkedIn",
  },
  { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FaFacebook, href: "https://www.facebook.com/tan.im.921025", label: "Facebook" },
];

const stats = [
  { value: "3+", label: "Years Exp." },
  { value: "50+", label: "Projects" },
  { value: "30+", label: "Clients" },
];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden px-4 pt-8 pb-16 lg:py-24 antigravity-bg"
    >
      {/* Dynamic Background Glow Fields */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-20 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px] animate-pulse-nebula" />
        <div className="absolute -right-20 bottom-10 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[130px] animate-pulse-nebula" />
        <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/5 blur-[90px]" />

        {/* Precision Coordinate Star-Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: High-Impact Typography & CTAs (7 Cols) */}
          <div className="order-2 text-center lg:order-1 lg:col-span-7 lg:text-left">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-cyan-400/25 bg-cyan-950/30 px-4 py-1.5 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              </span>
              <span className="font-mono text-xs font-medium tracking-wide text-cyan-300">
                AVAILABLE FOR FREELANCE & CONTRACTS
              </span>
            </motion.div>

            {/* Main Aurora Typography */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="mb-2 text-sm sm:text-base font-mono uppercase tracking-widest text-zinc-400">
                Hello, I&apos;m Tazminur Rahman
              </p>
              <h1 className="mb-4 text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight text-white">
                Engineering <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-zinc-200 to-zinc-400">
                  Weightless Digital
                </span>{" "}
                <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-teal-300 to-purple-400">
                  Experiences.
                </span>
              </h1>
            </motion.div>

            {/* Kinetic Role Switcher */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 flex h-9 items-center justify-center text-lg sm:text-2xl font-semibold text-zinc-300 lg:justify-start"
            >
              <span className="mr-2.5 font-mono text-cyan-400">&gt;</span>
              <KineticTypewriter words={roles} />
            </motion.div>

            {/* Bio Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto mb-9 max-w-xl text-base sm:text-lg leading-relaxed text-zinc-400 lg:mx-0"
            >
              Crafting scalable, high-performance web applications with clean Next.js 16
              architecture, modern TypeScript standards, and sleek physics-based micro-interactions.
            </motion.p>

            {/* Magnetic CTA Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-10 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 lg:justify-start"
            >
              <MagneticButton intensity={0.35}>
                <Link
                  href="/projects"
                  className="group relative inline-flex items-center gap-2 rounded-full bg-linear-to-r from-cyan-500 via-teal-500 to-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-cyan-500/25 transition-all duration-300 hover:shadow-cyan-500/40 hover:scale-102"
                >
                  <HiSparkles size={16} />
                  <span>View Projects</span>
                  <HiArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </MagneticButton>

              <MagneticButton intensity={0.25}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full glass-panel hover:bg-white/10 px-6 py-3.5 text-sm font-medium text-zinc-200 border border-white/10 transition-all hover:border-cyan-500/30"
                >
                  <HiMail size={16} className="text-cyan-400" />
                  <span>Contact Me</span>
                </Link>
              </MagneticButton>

              <MagneticButton intensity={0.25}>
                <a
                  href="https://drive.google.com/file/d/1tF52nFZzYk5XOIrwqXKpi2Mecr_mKVAB/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full glass-panel hover:bg-white/10 px-6 py-3.5 text-sm font-medium text-zinc-200 border border-white/10 transition-all hover:border-purple-500/30"
                >
                  <HiDownload size={16} className="text-purple-400" />
                  <span>Resume</span>
                </a>
              </MagneticButton>
            </motion.div>

            {/* Social Links & Numeric Metrics Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center lg:justify-start"
            >
              {/* Social Buttons */}
              <div className="flex items-center gap-2.5">
                {socials.map((social) => (
                  <MagneticButton key={social.label} intensity={0.3}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-xl glass-panel text-zinc-400 transition-all duration-200 hover:border-cyan-400/40 hover:text-cyan-300 hover:shadow-lg hover:shadow-cyan-500/15"
                      aria-label={social.label}
                    >
                      <social.icon size={17} />
                    </a>
                  </MagneticButton>
                ))}
              </div>

              <div className="hidden h-7 w-px bg-white/10 sm:block" />

              {/* Stats Counters */}
              <div className="flex items-center gap-7">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center sm:text-left">
                    <div className="text-xl sm:text-2xl font-black tracking-tight text-white">
                      {stat.value}
                    </div>
                    <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Orbital 3D Profile Portal & Satellite Badges (5 Cols) */}
          <div className="order-1 flex justify-center lg:order-2 lg:col-span-5">
            <div className="relative flex items-center justify-center">
              {/* Gravitational Orbital Track Rings */}
              <div className="absolute h-[340px] w-[340px] sm:h-[420px] sm:w-[420px] lg:h-[460px] lg:w-[460px] rounded-full border border-cyan-500/15 animate-[spin_32s_linear_infinite]" />
              <div className="absolute h-[420px] w-[420px] sm:h-[500px] sm:w-[500px] lg:h-[540px] lg:w-[540px] rounded-full border border-purple-500/10 border-dashed animate-[spin_50s_linear_infinite_reverse]" />

              {/* Ambient Radial Backlight Glow */}
              <div className="absolute -inset-6 rounded-full bg-linear-to-tr from-cyan-500/25 via-teal-500/15 to-purple-600/25 blur-3xl opacity-60" />

              {/* Central Profile Portal Frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative h-64 w-64 sm:h-80 sm:w-80 lg:h-[370px] lg:w-[370px] rounded-3xl p-2 glass-panel-elevated aurora-border overflow-hidden shadow-2xl shadow-black/80"
              >
                <div className="relative h-full w-full rounded-2xl overflow-hidden bg-black/40">
                  <Image
                    src="/tanim.jpeg"
                    alt="Tazminur Rahman Tanim"
                    fill
                    className="object-cover scale-102 transition-transform duration-700 hover:scale-108"
                    priority
                    sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 370px"
                  />
                  {/* Atmospheric Vignette Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#030305] via-transparent to-transparent opacity-60" />
                </div>
              </motion.div>

              {/* Satellite Floating Badge 1: Next.js 16 (Top-Right Orbit) */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: [0, -12, 0],
                        rotate: [0, 1.5, 0],
                      }
                }
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 glass-panel px-3.5 py-2.5 rounded-2xl flex items-center gap-3 border border-white/10 shadow-xl backdrop-blur-xl"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
                  <SiNextdotjs size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Next.js 16</div>
                  <div className="text-[10px] font-mono text-zinc-400">App Router & RSC</div>
                </div>
              </motion.div>

              {/* Satellite Floating Badge 2: Full-Stack Architecture (Bottom-Left Orbit) */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: [0, 14, 0],
                        rotate: [0, -1.5, 0],
                      }
                }
                transition={{
                  duration: 6.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8,
                }}
                className="absolute -bottom-5 -left-3 sm:-bottom-6 sm:-left-6 glass-panel px-3.5 py-2.5 rounded-2xl flex items-center gap-3 border border-white/10 shadow-xl backdrop-blur-xl"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300 border border-purple-400/30">
                  <SiTypescript size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Strict TypeScript</div>
                  <div className="text-[10px] font-mono text-zinc-400">Zero-Type-Drift</div>
                </div>
              </motion.div>

              {/* Satellite Floating Badge 3: 3+ Years Experience (Top-Left Micro Tag) */}
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
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
                className="absolute top-1/2 -left-6 sm:-left-10 -translate-y-1/2 hidden min-[480px]:flex items-center gap-2 rounded-xl glass-panel-elevated px-3 py-1.5 border border-cyan-400/30 shadow-lg"
              >
                <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
                <span className="text-[11px] font-bold text-white">3+ Years Pro</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
