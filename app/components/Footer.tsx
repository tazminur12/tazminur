"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import {
  HiMail,
  HiLocationMarker,
  HiPhone,
  HiArrowUp,
} from "react-icons/hi";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Skills", href: "/skills" },
  { name: "Projects", href: "/projects" },
];

const moreLinks = [
  { name: "Certificates", href: "/certificates" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
];

const socials = [
  { icon: FaGithub, href: "https://github.com/tazminur12", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/tazminur-rahman-tanim-305315336", label: "LinkedIn" },
  { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FaFacebook, href: "https://www.facebook.com/tan.im.921025", label: "Facebook" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-white/5 bg-[#080808]">
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 pb-8 pt-16">
        {/* Main grid */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 text-sm font-bold text-white">
                T
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-white">
                  Tanim
                </span>
                <span className="text-lg font-bold tracking-tight text-zinc-500">
                  .dev
                </span>
              </div>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
              Full Stack Web Developer crafting modern, performant web
              applications with clean code and pixel-perfect design.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition-all hover:text-cyan-400 hover:shadow-md hover:shadow-cyan-500/10"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-300">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 transition-colors hover:text-cyan-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-300">
              More
            </h4>
            <ul className="space-y-2.5">
              {moreLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 transition-colors hover:text-cyan-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-300">
              Get In Touch
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:tazminur@example.com"
                  className="flex items-center gap-2.5 text-sm text-zinc-500 transition-colors hover:text-cyan-400"
                >
                  <HiMail size={15} className="shrink-0 text-cyan-500/60" />
                  tazminur@example.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+8801XXXXXXXXX"
                  className="flex items-center gap-2.5 text-sm text-zinc-500 transition-colors hover:text-cyan-400"
                >
                  <HiPhone size={15} className="shrink-0 text-cyan-500/60" />
                  +880 1XXX-XXXXXX
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-zinc-500">
                <HiLocationMarker size={15} className="shrink-0 text-cyan-500/60" />
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 h-px w-full bg-white/5" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} Tazminur Rahman Tanim. All rights reserved.
          </p>
          <p className="text-xs text-zinc-700">
            Designed &amp; Built by{" "}
            <span className="text-zinc-500">Tazminur Rahman Tanim</span>
          </p>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={scrollToTop}
        className="glass absolute -top-5 right-6 flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-all hover:text-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10 sm:right-10"
        aria-label="Back to top"
      >
        <HiArrowUp size={18} />
      </button>
    </footer>
  );
}
