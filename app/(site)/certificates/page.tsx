"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SectionHeading from "../../components/SectionHeading";
import TiltCard from "../../components/motion/TiltCard";
import MagneticButton from "../../components/motion/MagneticButton";
import { HiExternalLink, HiX, HiCalendar, HiBadgeCheck, HiSparkles } from "react-icons/hi";
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

function formatDate(cert: Certificate) {
  const issue = [cert.issueMonth, cert.issueYear].filter(Boolean).join(" ");
  const exp = [cert.expirationMonth, cert.expirationYear].filter(Boolean).join(" ");
  if (issue && exp) return `Issued ${issue} · Expires ${exp}`;
  if (issue) return `Issued ${issue}`;
  if (cert.date) return cert.date;
  return "Verified Credential";
}

export default function CertificatesPage() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Certificate | null>(null);

  useEffect(() => {
    fetch("/api/certificates")
      .then((res) => res.json())
      .then((data) => setCerts(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Failed to load certificates:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="certificates" className="relative px-4 py-20 sm:py-28 min-h-screen antigravity-bg">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-950/20 px-3.5 py-1.5 text-xs font-mono text-cyan-300 mb-4 backdrop-blur-md"
          >
            <HiSparkles className="text-cyan-400" />
            <span>AUTHENTICATED ACCREDITATIONS</span>
          </motion.div>

          <SectionHeading
            title="Certifications & Accreditations"
            subtitle="Verified credentials issued by accredited engineering platforms and global institutions."
          />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-28 text-cyan-400">
            <LuLoader className="h-8 w-8 animate-spin mb-3" />
            <span className="font-mono text-xs tracking-wider uppercase text-zinc-400">
              Querying Trust Ledger...
            </span>
          </div>
        ) : certs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-28 text-center"
          >
            <PiCertificateBold className="mb-4 h-14 w-14 text-zinc-600" />
            <p className="text-sm font-mono text-zinc-400">No active certificates found.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certs.map((cert, index) => (
              <motion.div
                key={cert._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
              >
                <TiltCard
                  onClick={() => setSelected(cert)}
                  className="p-5 h-full flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Certificate Thumbnail */}
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-4 border border-white/10 bg-[#060810]">
                      {cert.image ? (
                        <Image
                          src={cert.image}
                          alt={cert.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-106"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-linear-to-br from-purple-500/10 to-cyan-500/10">
                          <PiCertificateBold size={44} className="text-purple-400/40" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-linear-to-t from-[#010103] via-transparent to-transparent opacity-80" />

                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 px-2.5 py-0.5 text-[10px] font-mono font-medium text-emerald-300 backdrop-blur-md">
                        <HiBadgeCheck size={13} className="text-emerald-400" />
                        <span>VERIFIED</span>
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400 mb-2">{cert.issuer}</p>

                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mb-4 font-mono">
                      <HiCalendar size={13} className="text-zinc-500" />
                      <span>{formatDate(cert)}</span>
                    </div>

                    {cert.skills && cert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {cert.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-mono text-zinc-400"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/8 text-xs font-mono">
                    <span className="text-[11px] text-zinc-400 group-hover:text-cyan-400 transition-colors">
                      Inspect Credential &rarr;
                    </span>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/30 transition-colors"
                        aria-label="Verify Certificate"
                      >
                        <HiExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        )}

        {/* Certificate Inspection Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl"
            >
              <motion.div
                initial={{ scale: 0.92, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.92, y: 20 }}
                transition={{ type: "spring", stiffness: 280, damping: 26 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl"
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-zinc-400 hover:text-white border border-white/10"
                  aria-label="Close modal"
                >
                  <HiX size={16} />
                </button>

                {selected.image && (
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-6 border border-white/10">
                    <Image
                      src={selected.image}
                      alt={selected.title}
                      fill
                      className="object-contain bg-black/60"
                    />
                  </div>
                )}

                <div className="flex items-center gap-2 mb-2">
                  <span className="rounded-full bg-emerald-500/20 border border-emerald-400/40 px-3 py-0.5 text-xs font-mono text-emerald-300 flex items-center gap-1.5">
                    <HiBadgeCheck size={14} />
                    Verified Accredited
                  </span>
                  <span className="text-xs font-mono text-cyan-400">{selected.issuer}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                  {selected.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 font-mono mb-4">
                  {formatDate(selected)}
                </p>

                {selected.credentialId && (
                  <div className="mb-4 p-3 rounded-xl bg-white/5 border border-white/8 font-mono text-xs text-zinc-300">
                    <span className="text-zinc-500">CREDENTIAL ID: </span>
                    <span className="text-cyan-300">{selected.credentialId}</span>
                  </div>
                )}

                {selected.credentialUrl && (
                  <div className="pt-4 border-t border-white/10 flex justify-end">
                    <MagneticButton intensity={0.25}>
                      <a
                        href={selected.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-cyan-500 to-purple-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/25"
                      >
                        <HiExternalLink size={14} />
                        <span>Verify Issuing Authority</span>
                      </a>
                    </MagneticButton>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
