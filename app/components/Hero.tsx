"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowRight, HiMail, HiDownload } from "react-icons/hi";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

const roles = [
  "Full Stack Web Developer",
  "MERN Stack Developer",
  "Founder & CEO, Algowave",
  "Next.js Specialist",
];

function TypeWriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index];
    const speed = deleting ? 40 : 80;

    if (!deleting && text === current) {
      const pause = setTimeout(() => setDeleting(true), 2000);
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
    <span className="gradient-text">
      {text}
      <span className="animate-pulse text-cyan-400">|</span>
    </span>
  );
}

function useProfilePicture() {
  const [profileUrl, setProfileUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/settings/profile-picture")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setProfileUrl(data.url || "");
      })
      .catch(() => {
        if (!cancelled) setProfileUrl("");
      });
    return () => { cancelled = true; };
  }, []);

  return profileUrl;
}

const socials = [
  { icon: FaGithub, href: "https://github.com/tazminur12", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/tazminur-rahman-tanim-305315336", label: "LinkedIn" },
  { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FaFacebook, href: "https://www.facebook.com/tan.im.921025", label: "Facebook" },
];

const stats = [
  { value: "3+", label: "Years Exp." },
  { value: "50+", label: "Projects" },
  { value: "30+", label: "Clients" },
];

export default function Hero() {
  const profileUrl = useProfilePicture();
  const isLoading = profileUrl === null;
  const imgSrc = profileUrl || "";

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-64px)] items-center overflow-hidden px-4 md:min-h-[calc(100vh-72px)]"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-20 h-[500px] w-[500px] rounded-full bg-cyan-500/4 blur-[100px]" />
        <div className="absolute -right-20 bottom-20 h-[500px] w-[500px] rounded-full bg-purple-500/4 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/2 blur-[80px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — Text content */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/6 px-4 py-1.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-sm font-medium text-cyan-400">
                Available for Freelance Work
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="mb-2 text-base font-medium text-zinc-500 sm:text-lg">
                Hello, I&apos;m
              </p>
              <h1 className="mb-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                <span className="text-white">Tazminur Rahman</span>
                <br />
                <span className="text-white">Tanim</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6 h-9 text-xl font-semibold sm:text-2xl"
            >
              <TypeWriter words={roles} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8 max-w-lg text-base leading-relaxed text-zinc-500 lg:mx-0 mx-auto"
            >
              I craft modern, high-performance web applications with clean
              architecture and intuitive user experiences. Turning complex
              problems into elegant digital solutions.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-10 flex flex-col items-center gap-3 sm:flex-row lg:justify-start sm:justify-center"
            >
              <Link
                href="/projects"
                className="group flex items-center gap-2 rounded-full bg-linear-to-r from-cyan-500 to-purple-600 px-7 py-3 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-cyan-500/20"
              >
                View Projects
                <HiArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 rounded-full border border-white/8 bg-white/3 px-7 py-3 text-sm font-medium text-zinc-300 transition-all hover:border-white/15 hover:text-white"
              >
                <HiMail size={16} />
                Contact Me
              </Link>
              <a
                href="https://drive.google.com/file/d/1tF52nFZzYk5XOIrwqXKpi2Mecr_mKVAB/view"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/8 bg-white/3 px-7 py-3 text-sm font-medium text-zinc-300 transition-all hover:border-white/15 hover:text-white"
              >
                <HiDownload size={16} />
                Resume
              </a>
            </motion.div>

            {/* Social + Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col items-center gap-6 sm:flex-row lg:justify-start sm:justify-center"
            >
              <div className="flex items-center gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/6 bg-white/2 text-zinc-500 transition-all hover:border-cyan-500/30 hover:text-cyan-400"
                    aria-label={social.label}
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>

              <div className="hidden h-6 w-px bg-white/6 sm:block" />

              <div className="flex items-center gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-lg font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs text-zinc-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Profile image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 flex justify-center lg:order-2"
          >
            <div className="relative">
              {/* Glow ring behind image */}
              <div className="absolute -inset-4 rounded-full bg-linear-to-br from-cyan-500/20 via-transparent to-purple-500/20 blur-2xl" />

              {/* Profile image container */}
              <div className="relative h-64 w-64 overflow-hidden rounded-full border-2 border-white/6 sm:h-80 sm:w-80 lg:h-[360px] lg:w-[360px]">
                {isLoading ? (
                  <div className="absolute inset-0 animate-pulse bg-linear-to-br from-cyan-500/10 to-purple-500/10" />
                ) : imgSrc ? (
                  <Image
                    src={imgSrc}
                    alt="Tazminur Rahman Tanim"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 360px"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-cyan-500/10 to-purple-500/10">
                    <span className="text-6xl font-bold text-white/6 sm:text-7xl">
                      TRT
                    </span>
                  </div>
                )}
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-2 top-8 rounded-xl border border-white/6 bg-[#0e0e0e]/90 px-3 py-2 backdrop-blur-md sm:-right-4"
              >
                <div className="text-xs font-semibold text-white">3+ Years</div>
                <div className="text-[10px] text-zinc-500">Experience</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-2 bottom-12 rounded-xl border border-white/6 bg-[#0e0e0e]/90 px-3 py-2 backdrop-blur-md sm:-left-4"
              >
                <div className="text-xs font-semibold text-white">50+ Projects</div>
                <div className="text-[10px] text-zinc-500">Completed</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex h-9 w-5 items-start justify-center rounded-full border border-zinc-800 p-1"
        >
          <div className="h-1.5 w-0.5 rounded-full bg-cyan-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
