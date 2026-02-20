"use client";

import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import { HiHeart } from "react-icons/hi";

const socials = [
  { icon: FaGithub, href: "https://github.com", label: "GitHub" },
  { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
];

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <a href="#home" className="text-xl font-bold tracking-tight">
            <span className="gradient-text">Taz</span>
            <span className="text-white">minur</span>
          </a>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-zinc-500 transition-colors hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Social links */}
          <div className="flex gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 transition-colors hover:text-cyan-400"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="flex items-center gap-1 text-sm text-zinc-600">
            &copy; {new Date().getFullYear()} Tazminur. Made with
            <HiHeart className="text-red-500" size={14} />
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
