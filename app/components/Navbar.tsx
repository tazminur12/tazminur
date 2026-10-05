"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiMenuAlt3,
  HiX,
  HiDownload,
  HiSparkles,
  HiHome,
  HiUser,
  HiLightningBolt,
  HiCollection,
  HiBadgeCheck,
  HiChat,
  HiMail,
} from "react-icons/hi";

const navLinks = [
  { name: "Home", href: "/", icon: HiHome },
  { name: "About", href: "/about", icon: HiUser },
  { name: "Skills", href: "/skills", icon: HiLightningBolt },
  { name: "Projects", href: "/projects", icon: HiCollection },
  { name: "Certificates", href: "/certificates", icon: HiBadgeCheck },
  { name: "Testimonials", href: "/testimonials", icon: HiChat },
  { name: "Contact", href: "/contact", icon: HiMail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ─── Floating Cyber-Pill Container ─── */}
      <header className="fixed top-3.5 sm:top-5 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
        <motion.nav
          initial={{ y: -70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className={`pointer-events-auto relative flex items-center justify-between gap-2 sm:gap-4 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-500 w-full max-w-6xl ${
            scrolled
              ? "glass-panel-elevated shadow-2xl shadow-black/90 border border-white/14"
              : "glass-panel shadow-xl shadow-black/60 border border-white/8"
          }`}
        >
          {/* Ambient Neon Backlight Halo */}
          <div className="pointer-events-none absolute -inset-1 rounded-full bg-linear-to-r from-cyan-500/15 via-purple-500/10 to-cyan-500/15 blur-md opacity-70 transition-opacity duration-500" />

          {/* ─── Left: Brand Identity ─── */}
          <Link
            href="/"
            className="group relative z-10 flex items-center gap-2.5 shrink-0 pl-1"
          >
            <div className="relative flex h-8 sm:h-9 w-8 sm:w-9 items-center justify-center rounded-xl bg-linear-to-br from-cyan-400 via-teal-500 to-purple-600 text-xs sm:text-sm font-black text-white shadow-md shadow-cyan-500/25 transition-transform duration-300 group-hover:scale-105">
              T
              <span className="absolute -inset-0.5 rounded-xl bg-cyan-400 opacity-20 blur-xs transition-opacity group-hover:opacity-75" />
            </div>

            <div className="flex items-center">
              <span className="text-sm sm:text-base font-extrabold tracking-tight text-white">
                Tanim
              </span>
              <span className="text-sm sm:text-base font-bold tracking-tight text-cyan-400">
                .dev
              </span>
            </div>
          </Link>

          {/* ─── Center: Desktop Navigation Links ─── */}
          <div className="relative z-10 hidden lg:flex items-center shrink-0">
            <div className="flex items-center rounded-full border border-white/8 bg-white/[0.02] p-1 shadow-inner backdrop-blur-xl">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavbarPill"
                        className="absolute inset-0 rounded-full bg-linear-to-r from-cyan-500/25 via-purple-500/20 to-cyan-500/25 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ─── Right: Action Cluster ─── */}
          <div className="relative z-10 flex items-center gap-2 sm:gap-2.5 shrink-0 pr-1 sm:pr-1.5">
            {/* Live Availability Status */}
            <div className="hidden 2xl:flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-mono font-medium text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              </span>
              <span>Available for Hire</span>
            </div>

            {/* Resume Action */}
            <a
              href="https://drive.google.com/file/d/1tF52nFZzYk5XOIrwqXKpi2Mecr_mKVAB/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-1.5 text-xs font-mono font-medium text-zinc-300 transition-all hover:border-cyan-400/40 hover:text-white"
            >
              <HiDownload size={13} className="text-cyan-400" />
              <span>Resume</span>
            </a>

            {/* Hire Me CTA Button */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-cyan-500 via-teal-500 to-purple-600 px-3.5 sm:px-4 py-1.5 text-xs font-bold text-white shadow-md shadow-cyan-500/20 transition-all duration-300 hover:shadow-cyan-500/40 hover:scale-102"
            >
              <HiSparkles size={13} />
              <span>Hire Me</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:text-white hover:border-cyan-400/30 transition-all lg:hidden cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <HiX size={18} /> : <HiMenuAlt3 size={18} />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* ─── Mobile Expanding Glass Drawer ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xl lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer Shell */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 z-50 flex h-full w-[300px] flex-col border-l border-white/10 bg-[#05060a]/95 backdrop-blur-3xl shadow-2xl lg:hidden"
            >
              {/* Drawer Header */}
              <div className="flex h-18 items-center justify-between border-b border-white/8 px-6">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-cyan-400 via-teal-500 to-purple-600 text-xs font-black text-white">
                    T
                  </div>
                  <span className="text-sm font-bold text-white">Tanim.dev</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-zinc-400 hover:text-white border border-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <HiX size={16} />
                </button>
              </div>

              {/* Status Indicator inside Mobile Drawer */}
              <div className="px-6 pt-5 pb-2">
                <div className="flex items-center gap-2 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-2 text-xs font-mono text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span>Available for New Projects</span>
                </div>
              </div>

              {/* Navigation Links List */}
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="space-y-1.5">
                  {navLinks.map((link, i) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;
                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-3.5 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                            isActive
                              ? "bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 shadow-sm shadow-cyan-500/15"
                              : "text-zinc-400 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <Icon
                            size={18}
                            className={
                              isActive ? "text-cyan-400" : "text-zinc-500"
                            }
                          />
                          <span>{link.name}</span>
                          {isActive && (
                            <div className="ml-auto h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Drawer Bottom Actions */}
              <div className="space-y-3 border-t border-white/8 p-5">
                <a
                  href="https://drive.google.com/file/d/1tF52nFZzYk5XOIrwqXKpi2Mecr_mKVAB/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 py-2.5 text-xs font-mono font-medium text-zinc-300 transition-all hover:bg-white/10 hover:text-white"
                >
                  <HiDownload size={14} className="text-cyan-400" />
                  <span>Download Resume</span>
                </a>

                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-cyan-500 via-teal-500 to-purple-600 py-2.5 text-center text-xs font-bold text-white shadow-lg shadow-cyan-500/25 transition-transform active:scale-98"
                >
                  <HiSparkles size={14} />
                  <span>Hire Me Now</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
