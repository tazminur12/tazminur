"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../../components/SectionHeading";
import TiltCard from "../../components/motion/TiltCard";
import MagneticButton from "../../components/motion/MagneticButton";
import {
  HiMail,
  HiLocationMarker,
  HiPhone,
  HiSparkles,
} from "react-icons/hi";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import { LuSend, LuLoader, LuCircleCheck } from "react-icons/lu";
import Swal from "sweetalert2";

const contactInfo = [
  {
    icon: HiMail,
    label: "Direct Email",
    value: "tanimkhalifa55@gmail.com",
    href: "mailto:tanimkhalifa55@gmail.com",
    accent: "text-cyan-400 border-cyan-400/30 bg-cyan-500/10",
  },
  {
    icon: HiPhone,
    label: "Voice / WhatsApp",
    value: "+880 1540288717",
    href: "tel:+8801540288717",
    accent: "text-emerald-400 border-emerald-400/30 bg-emerald-500/10",
  },
  {
    icon: HiLocationMarker,
    label: "Base Coordinates",
    value: "Dhaka, Bangladesh [UTC+6]",
    href: "#",
    accent: "text-purple-400 border-purple-400/30 bg-purple-500/10",
  },
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

const inputClasses =
  "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-cyan-400 focus:bg-white/[0.06] focus:ring-4 focus:ring-cyan-500/10 backdrop-blur-md";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed");

      setSent(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSent(false), 5000);

      Swal.fire({
        icon: "success",
        title: "Transmission Established",
        text: "Thank you for reaching out. Your message has been routed to my primary terminal.",
        background: "#080a12",
        color: "#fff",
        confirmButtonColor: "#06b6d4",
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Transmission Failed",
        text: "Could not route message. Please try sending directly to tanimkhalifa55@gmail.com",
        background: "#080a12",
        color: "#fff",
        confirmButtonColor: "#06b6d4",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative px-4 py-20 sm:py-28 min-h-screen antigravity-bg">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-950/20 px-3.5 py-1.5 text-xs font-mono text-cyan-300 mb-4 backdrop-blur-md"
          >
            <HiSparkles className="text-cyan-400" />
            <span>TRANSMISSION TERMINAL</span>
          </motion.div>

          <SectionHeading
            title="Initiate Contact"
            subtitle="Available for worldwide remote contracts, advisory, and high-impact web architectures."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Coordinates (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {contactInfo.map((info) => (
              <TiltCard key={info.label} className="p-5">
                <a
                  href={info.href}
                  className="flex items-center gap-4 group"
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${info.accent}`}
                  >
                    <info.icon size={22} />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-zinc-400">{info.label}</div>
                    <div className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {info.value}
                    </div>
                  </div>
                </a>
              </TiltCard>
            ))}

            {/* Social Grid */}
            <TiltCard className="p-6">
              <div className="text-xs font-mono text-zinc-400 mb-4 uppercase tracking-wider">
                Digital Presence & Repositories
              </div>
              <div className="grid grid-cols-4 gap-3">
                {socials.map((social) => (
                  <MagneticButton key={social.label} intensity={0.3}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-full items-center justify-center rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all"
                      aria-label={social.label}
                    >
                      <social.icon size={18} />
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Holographic Glass Form (7 cols) */}
          <div className="lg:col-span-7">
            <TiltCard className="p-7 sm:p-10 aurora-border">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Vance"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-2">
                    Subject / Objective *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="New Project Inquiry / Next.js Consultation"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-2">
                    Project Specifications *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your vision, timeline, and architectural requirements..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-[11px] font-mono text-zinc-500 hidden sm:block">
                    * ALL TRANSMISSIONS ARE ENCRYPTED
                  </div>

                  <MagneticButton intensity={0.25}>
                    <button
                      type="submit"
                      disabled={sending}
                      className="group inline-flex items-center gap-2.5 rounded-full bg-linear-to-r from-cyan-500 via-teal-500 to-purple-600 px-8 py-3.5 text-xs font-bold text-white shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 disabled:opacity-60 transition-all cursor-pointer"
                    >
                      {sending ? (
                        <>
                          <LuLoader className="animate-spin" size={15} />
                          <span>Routing Signal...</span>
                        </>
                      ) : sent ? (
                        <>
                          <LuCircleCheck size={15} className="text-emerald-300" />
                          <span>Delivered</span>
                        </>
                      ) : (
                        <>
                          <LuSend size={15} className="transition-transform group-hover:translate-x-1" />
                          <span>Broadcast Message</span>
                        </>
                      )}
                    </button>
                  </MagneticButton>
                </div>
              </form>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
