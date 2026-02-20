"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX, HiDownload } from "react-icons/hi";
import {
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
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const prevPathname = useState(pathname)[0];
  if (pathname !== prevPathname && mobileOpen) {
    setMobileOpen(false);
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0a]/80 shadow-lg shadow-black/30 backdrop-blur-xl border-b border-white/[0.04]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-[72px]">
            {/* Logo */}
            <Link href="/" className="group relative flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 text-sm font-bold text-white transition-transform group-hover:scale-105">
                T
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-bold tracking-tight text-white">
                  Tanim
                </span>
                <span className="text-lg font-bold tracking-tight text-zinc-500">
                  .dev
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden items-center lg:flex">
              <div className="flex items-center rounded-full border border-white/[0.04] bg-white/[0.02] px-1.5 py-1.5">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`relative rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200 ${
                        isActive
                          ? "text-white"
                          : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNavPill"
                          className="absolute inset-0 rounded-full bg-white/[0.08] ring-1 ring-white/[0.08]"
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="relative z-10">{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[13px] font-medium text-zinc-400 transition-all hover:border-white/[0.15] hover:text-white md:flex"
              >
                <HiDownload size={14} />
                Resume
              </a>
              <Link
                href="/contact"
                className="hidden rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-2 text-[13px] font-medium text-white transition-all hover:shadow-lg hover:shadow-cyan-500/20 md:block"
              >
                Hire Me
              </Link>

              {/* Mobile toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-zinc-400 transition-colors hover:text-white lg:hidden"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <HiX size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <HiMenuAlt3 size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu — full overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 z-50 flex h-full w-[280px] flex-col border-l border-white/[0.04] bg-[#0c0c0c] lg:hidden"
            >
              {/* Mobile header */}
              <div className="flex h-16 items-center justify-between border-b border-white/[0.04] px-5">
                <span className="text-sm font-semibold text-zinc-300">
                  Navigation
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] text-zinc-500 hover:text-white"
                  aria-label="Close menu"
                >
                  <HiX size={16} />
                </button>
              </div>

              {/* Mobile links */}
              <div className="flex-1 overflow-y-auto px-3 py-4">
                <div className="space-y-1">
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
                          className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                            isActive
                              ? "bg-cyan-500/10 text-cyan-400"
                              : "text-zinc-500 hover:bg-white/[0.03] hover:text-white"
                          }`}
                        >
                          <Icon
                            size={18}
                            className={
                              isActive ? "text-cyan-400" : "text-zinc-600"
                            }
                          />
                          {link.name}
                          {isActive && (
                            <div className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400" />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="border-t border-white/[0.04] p-4 space-y-2.5">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] py-2.5 text-sm font-medium text-zinc-400 transition-all hover:text-white"
                >
                  <HiDownload size={15} />
                  Download Resume
                </a>
                <Link
                  href="/contact"
                  className="block w-full rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 py-2.5 text-center text-sm font-medium text-white"
                >
                  Hire Me
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
