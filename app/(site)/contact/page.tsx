"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../../components/SectionHeading";
import {
  HiMail,
  HiLocationMarker,
  HiPhone,
} from "react-icons/hi";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import { LuSend, LuLoader, LuCircleCheck } from "react-icons/lu";
import Swal from "sweetalert2";

const contactInfo = [
  {
    icon: HiMail,
    label: "Email",
    value: "tanimkhalifa55@gmail.com",
    href: "mailto:tanimkhalifa55@gmail.com",
    accent: "bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20",
  },
  {
    icon: HiPhone,
    label: "Phone",
    value: "+880 1540288717",
    href: "tel:+8801540288717",
    accent: "bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20",
  },
  {
    icon: HiLocationMarker,
    label: "Location",
    value: "Dhaka, Bangladesh",
    href: "#",
    accent: "bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20",
  },
];

const socials = [
  { icon: FaGithub, href: "https://github.com/tazminur12", label: "GitHub" },
  { icon: FaLinkedin, href: "www.linkedin.com/in/tazminur-rahman-tanim-305315336", label: "LinkedIn" },
  { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FaFacebook, href: "https://www.facebook.com/tan.im.921025", label: "Facebook" },
];

const inputClasses =
  "w-full rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-cyan-500/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-cyan-500/10";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(false);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed");
      setSent(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSent(false), 4000);
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you for reaching out. I'll get back to you soon.",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#06b6d4",
      });
    } catch {
      setError(true);
      setTimeout(() => setError(false), 4000);
      Swal.fire({
        icon: "error",
        title: "Failed to Send",
        text: "Something went wrong. Please try again later.",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#06b6d4",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative px-4 py-20 sm:py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Get In Touch"
          subtitle="Have a project in mind? Let's work together"
        />

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-2xl p-5 sm:p-6">
              <h3 className="mb-1 text-base font-semibold text-white sm:text-lg">
                Contact Information
              </h3>
              <p className="mb-6 text-xs text-zinc-500 sm:text-sm">
                Feel free to reach out through any channel
              </p>

              <div className="space-y-3">
                {contactInfo.map((info, i) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.08 }}
                    className="group flex items-center gap-3 rounded-xl p-3 transition-all hover:bg-white/3 sm:gap-4 sm:p-4"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors sm:h-11 sm:w-11 ${info.accent}`}
                    >
                      <info.icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                        {info.label}
                      </div>
                      <div className="truncate text-sm font-medium text-zinc-300 group-hover:text-white">
                        {info.value}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="mt-6 border-t border-white/5 pt-6">
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Follow Me
                </h4>
                <div className="flex gap-2">
                  {socials.map((social, i) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.06 }}
                      whileHover={{ y: -3 }}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-zinc-400 ring-1 ring-white/5 transition-all hover:bg-cyan-500/10 hover:text-cyan-400 hover:ring-cyan-500/20"
                      aria-label={social.label}
                    >
                      <social.icon className="h-4 w-4" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-5 sm:p-6 md:p-8"
            >
              <h3 className="mb-1 text-base font-semibold text-white sm:text-lg">
                Send a Message
              </h3>
              <p className="mb-6 text-xs text-zinc-500 sm:text-sm">
                I&apos;ll get back to you as soon as possible
              </p>

              <div className="space-y-4">
                <div className="grid gap-4 min-[480px]:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-xs font-medium text-zinc-400 sm:text-sm"
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={inputClasses}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-xs font-medium text-zinc-400 sm:text-sm"
                    >
                      Your Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={inputClasses}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-1.5 block text-xs font-medium text-zinc-400 sm:text-sm"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className={inputClasses}
                    placeholder="Project discussion"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-xs font-medium text-zinc-400 sm:text-sm"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className={`${inputClasses} resize-none`}
                    placeholder="Tell me about your project..."
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={sending || sent || error}
                  className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-cyan-500 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/30 active:scale-[0.98] disabled:opacity-70 sm:w-auto sm:text-base"
                >
                  <AnimatePresence mode="wait">
                    {sending ? (
                      <motion.span
                        key="sending"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        <LuLoader className="h-4 w-4 animate-spin" />
                        Sending...
                      </motion.span>
                    ) : sent ? (
                      <motion.span
                        key="sent"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        <LuCircleCheck className="h-4 w-4" />
                        Message Sent!
                      </motion.span>
                    ) : error ? (
                      <motion.span
                        key="error"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 text-red-300"
                      >
                        Failed to send. Try again.
                      </motion.span>
                    ) : (
                      <motion.span
                        key="default"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        Send Message
                        <LuSend className="h-4 w-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
