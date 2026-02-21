"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SectionHeading from "../../components/SectionHeading";
import { HiExternalLink, HiX, HiCalendar, HiBadgeCheck } from "react-icons/hi";
import { PiCertificateBold } from "react-icons/pi";
import { LuLoader } from "react-icons/lu";

interface Certificate {
  _id: string;
  title: string;
  issuer: string;
  issueMonth: string;
  issueYear: string;
  expirationMonth: string;
  expirationYear: string;
  credentialId: string;
  credentialUrl: string;
  skills: string[];
  image: string;
  date: string;
}

const ACCENTS = [
  { accent: "from-cyan-500 to-blue-500", bg: "from-cyan-500/10 to-blue-500/10" },
  { accent: "from-blue-500 to-purple-500", bg: "from-blue-500/10 to-purple-500/10" },
  { accent: "from-emerald-500 to-cyan-500", bg: "from-emerald-500/10 to-cyan-500/10" },
  { accent: "from-orange-500 to-amber-500", bg: "from-orange-500/10 to-amber-500/10" },
  { accent: "from-violet-500 to-pink-500", bg: "from-violet-500/10 to-pink-500/10" },
  { accent: "from-pink-500 to-rose-500", bg: "from-pink-500/10 to-rose-500/10" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

function formatDate(cert: Certificate) {
  const issue = [cert.issueMonth, cert.issueYear].filter(Boolean).join(" ");
  const exp = [cert.expirationMonth, cert.expirationYear].filter(Boolean).join(" ");
  if (issue && exp) return `Issued ${issue} · Expires ${exp}`;
  if (issue) return `Issued ${issue}`;
  if (cert.date) return cert.date;
  return "";
}

export default function Certificates() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Certificate | null>(null);

  useEffect(() => {
    fetch("/api/certificates")
      .then((res) => res.json())
      .then((data) => setCerts(data))
      .catch((err) => console.error("Failed to load certificates:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="certificates" className="relative px-4 py-20 sm:py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Licenses & Certifications"
          subtitle="Professional certifications, licenses, and achievements"
        />

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <LuLoader className="h-6 w-6 animate-spin text-zinc-500" />
          </div>
        ) : certs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <PiCertificateBold className="mb-4 h-12 w-12 text-zinc-600" />
            <p className="text-sm text-zinc-500">No certificates to show yet.</p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {certs.map((cert, i) => {
              const colors = ACCENTS[i % ACCENTS.length];
              const dateStr = formatDate(cert);
              return (
                <motion.div
                  key={cert._id}
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelected(cert)}
                  className="glass glass-hover group flex cursor-pointer flex-col overflow-hidden rounded-2xl transition-all duration-300"
                >
                  {/* Top accent bar */}
                  <div className={`h-1 w-full bg-linear-to-r ${colors.accent}`} />

                  {/* Image area */}
                  <div
                    className={`relative flex items-center justify-center overflow-hidden ${
                      cert.image ? "bg-white" : `aspect-video bg-linear-to-br ${colors.bg}`
                    }`}
                  >
                    {cert.image ? (
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        width={600}
                        height={400}
                        className="h-auto w-full"
                        sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <PiCertificateBold className="h-10 w-10 text-white/15 transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12" />
                    )}
                  </div>

                  {/* Card body */}
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <h3 className="mb-1 text-[15px] font-semibold leading-snug text-white transition-colors group-hover:text-cyan-400 sm:text-base">
                      {cert.title}
                    </h3>

                    {cert.issuer && (
                      <p className="text-xs text-zinc-400 sm:text-sm">
                        {cert.issuer}
                      </p>
                    )}

                    {dateStr && (
                      <p className="mt-1 flex items-center gap-1.5 text-[11px] text-zinc-600">
                        <HiCalendar size={11} className="shrink-0" />
                        {dateStr}
                      </p>
                    )}

                    {/* Skills */}
                    {cert.skills && cert.skills.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {cert.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md bg-cyan-500/10 px-2 py-0.5 text-[10px] font-medium text-cyan-400"
                          >
                            {skill}
                          </span>
                        ))}
                        {cert.skills.length > 3 && (
                          <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-medium text-zinc-500">
                            +{cert.skills.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="mt-auto pt-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400/70 transition-colors group-hover:text-cyan-400">
                        View details
                        <HiExternalLink size={12} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (() => {
          const ci = certs.indexOf(selected);
          const accent = ACCENTS[(ci >= 0 ? ci : 0) % ACCENTS.length];
          const dateStr = formatDate(selected);
          return (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
                onClick={() => setSelected(null)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
                onClick={() => setSelected(null)}
              >
                <div
                  className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e0e] shadow-2xl shadow-black/60"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Accent bar */}
                  <div className={`h-1 w-full bg-linear-to-r ${accent.accent}`} />

                  {/* Close */}
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute right-3 top-4 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-zinc-500 transition-colors hover:bg-white/10 hover:text-white"
                    aria-label="Close modal"
                  >
                    <HiX size={14} />
                  </button>

                  {/* Image */}
                  {selected.image && (
                    <div className="relative mx-4 mt-4 overflow-hidden rounded-xl border border-white/6 bg-white">
                      <Image
                        src={selected.image}
                        alt={selected.title}
                        width={600}
                        height={400}
                        className="h-auto w-full"
                        sizes="(max-width: 448px) 100vw, 400px"
                      />
                    </div>
                  )}

                  <div className="p-4 sm:p-5">
                    {/* Title & Issuer */}
                    <div className="mb-3 flex items-start gap-2.5">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${accent.bg}`}>
                        <HiBadgeCheck size={18} className="text-cyan-400" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold leading-snug text-white sm:text-base">
                          {selected.title}
                        </h3>
                        {selected.issuer && (
                          <p className="text-xs text-zinc-400">{selected.issuer}</p>
                        )}
                      </div>
                    </div>

                    {/* Info rows */}
                    {(dateStr || selected.credentialId) && (
                      <div className="mb-3 space-y-1.5 rounded-xl border border-white/5 bg-white/2 px-3 py-2.5">
                        {dateStr && (
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                              <HiCalendar size={11} />
                              Date
                            </span>
                            <span className="text-[11px] text-zinc-300">{dateStr}</span>
                          </div>
                        )}
                        {selected.credentialId && (
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-zinc-500">Credential ID</span>
                            <span className="font-mono text-[11px] text-zinc-300">
                              {selected.credentialId}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Skills */}
                    {selected.skills && selected.skills.length > 0 && (
                      <div className="mb-4">
                        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                          Skills
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {selected.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-md bg-cyan-500/10 px-2 py-0.5 text-[11px] font-medium text-cyan-400"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Credential link */}
                    {selected.credentialUrl && (
                      <a
                        href={selected.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r ${accent.accent} px-4 py-2 text-xs font-semibold text-white transition-all hover:shadow-lg hover:shadow-cyan-500/15`}
                      >
                        Show credential
                        <HiExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
