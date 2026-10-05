"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import { HiArrowUp, HiSparkles, HiHeart } from "react-icons/hi";
import MagneticButton from "./motion/MagneticButton";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Skills", href: "/skills" },
  { name: "Projects", href: "/projects" },
];

const secondaryLinks = [
  { name: "Certificates", href: "/certificates" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
  { name: "Dashboard", href: "/dashboard" },
];

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

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/6 bg-[#010103] overflow-hidden">
      {/* Top Ambient Glow Line */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-cyan-400/50 to-transparent" />

      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[300px] w-[600px] rounded-full bg-cyan-500/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-16 pb-12">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-cyan-400 via-teal-500 to-purple-600 text-sm font-black text-white shadow-lg shadow-cyan-500/25">
                T
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white">
                  Tanim
                </span>
                <span className="text-lg font-black tracking-tight text-cyan-400">
                  .dev
                </span>
              </div>
            </Link>

            <p className="max-w-sm text-xs sm:text-sm leading-relaxed text-zinc-400">
              Full Stack Web Developer &amp; Founder of Algowave Agency. Engineering weightless, high-throughput digital systems with Next.js 16, TypeScript, and fluid physical ergonomics.
            </p>

            <div className="flex items-center gap-2.5 pt-2">
              {socials.map((social) => (
                <MagneticButton key={social.label} intensity={0.25}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl glass-panel text-zinc-400 hover:text-cyan-300 hover:border-cyan-400/40 transition-all shadow-sm"
                    aria-label={social.label}
                  >
                    <social.icon size={16} />
                  </a>
                </MagneticButton>
              ))}
            </div>
          </div>

          {/* Quick Navigation (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="mb-4 text-xs font-mono font-bold uppercase tracking-widest text-zinc-300 flex items-center gap-1.5">
              <HiSparkles className="text-cyan-400" size={13} />
              <span>Navigation</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
                  >
                    <span>&gt;</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Secondary & Portals (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="mb-4 text-xs font-mono font-bold uppercase tracking-widest text-zinc-300">
              Artifacts
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {secondaryLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
                  >
                    <span>&gt;</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Back to Top & Direct Line (2 cols) */}
          <div className="lg:col-span-2 flex flex-col justify-between items-start lg:items-end">
            <div>
              <h4 className="mb-4 text-xs font-mono font-bold uppercase tracking-widest text-zinc-300">
                Direct Line
              </h4>
              <a
                href="mailto:tanimkhalifa55@gmail.com"
                className="text-xs font-mono text-cyan-400 hover:underline block break-all"
              >
                tanimkhalifa55@gmail.com
              </a>
            </div>

            <div className="pt-6">
              <MagneticButton intensity={0.3}>
                <button
                  onClick={scrollToTop}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl glass-panel text-zinc-300 hover:text-white hover:border-cyan-400/40 transition-all cursor-pointer shadow-lg"
                  aria-label="Scroll back to top"
                >
                  <HiArrowUp size={18} />
                </button>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="mt-14 pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <p>
            &copy; {new Date().getFullYear()} Tazminur Rahman Tanim. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
            <span>Engineered with Next.js 16 &amp; Framer Motion</span>
            <HiHeart className="text-cyan-400" size={12} />
          </div>
        </div>
      </div>
    </footer>
  );
}
