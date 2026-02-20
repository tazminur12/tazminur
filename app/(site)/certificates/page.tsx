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
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="fixed inset-x-4 top-[6%] z-50 mx-auto max-h-[88vh] max-w-2xl overflow-y-auto rounded-2xl border border-white/8 bg-[#0c0c0c] shadow-2xl sm:inset-x-auto"
            >
              {/* Close */}
              <button
                onClick={() => setSelected(null)}
                className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-lg bg-black/50 text-zinc-400 backdrop-blur-md transition-colors hover:text-white"
                aria-label="Close modal"
              >
                <HiX size={16} />
              </button>

              {/* Certificate Image */}
              {selected.image && (
                <div className="relative w-full bg-white">
                  <Image
                    src={selected.image}
                    alt={selected.title}
                    width={800}
                    height={560}
                    className="h-auto w-full"
                    sizes="(max-width: 672px) 100vw, 672px"
                  />
                </div>
              )}

              <div className="p-5 sm:p-6">
                {/* Title & Issuer */}
                <div className="mb-5 flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-cyan-500/15 to-purple-500/15">
                    <HiBadgeCheck size={22} className="text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white sm:text-xl">
                      {selected.title}
                    </h3>
                    {selected.issuer && (
                      <p className="text-sm text-zinc-400">{selected.issuer}</p>
                    )}
                  </div>
                </div>

                {/* Details */}
                {(formatDate(selected) || selected.credentialId) && (
                  <div className="mb-5 space-y-2.5 rounded-xl border border-white/6 bg-white/2 p-4">
                    {formatDate(selected) && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-500">Date</span>
                        <span className="text-zinc-300">{formatDate(selected)}</span>
                      </div>
                    )}
                    {selected.credentialId && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-500">Credential ID</span>
                        <span className="font-mono text-xs text-zinc-300">
                          {selected.credentialId}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Skills */}
                {selected.skills && selected.skills.length > 0 && (
                  <div className="mb-5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selected.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-lg bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400"
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
                    className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-purple-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-cyan-500/20"
                  >
                    Show credential
                    <HiExternalLink size={15} />
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
