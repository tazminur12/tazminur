"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../../components/SectionHeading";
import TiltCard from "../../components/motion/TiltCard";
import MagneticButton from "../../components/motion/MagneticButton";
import {
  HiChevronLeft,
  HiChevronRight,
  HiStar,
  HiSparkles,
  HiBadgeCheck,
} from "react-icons/hi";
import { FaQuoteLeft } from "react-icons/fa";
import { LuLoader, LuUsers } from "react-icons/lu";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    fetch("/api/testimonials?status=published")
      .then((res) => res.json())
      .then((data) => setTestimonials(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Failed to load testimonials:", err))
      .finally(() => setLoading(false));
  }, []);

  const paginate = useCallback(
    (dir: number) => {
      if (testimonials.length === 0) return;
      setDirection(dir);
      setCurrent(
        (prev) => (prev + dir + testimonials.length) % testimonials.length
      );
    },
    [testimonials.length]
  );

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => paginate(1), 7000);
    return () => clearInterval(timer);
  }, [paginate, testimonials.length]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 60 : -60,
      opacity: 0,
      scale: 0.96,
    }),
  };

  return (
    <section
      id="testimonials"
      className="relative min-h-screen px-4 pt-8 pb-24 sm:py-28 antigravity-bg"
    >
      {/* Background Multi-Orb Glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[550px] w-[550px] rounded-full bg-linear-to-tr from-cyan-500/10 via-purple-600/10 to-emerald-500/10 blur-[140px] animate-pulse-nebula" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header Section */}
        <div className="text-center mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-950/20 px-3.5 py-1.5 text-xs font-mono text-cyan-300 mb-4 backdrop-blur-md"
          >
            <HiSparkles className="text-cyan-400" />
            <span>ENDORSEMENTS & TELEMETRY</span>
          </motion.div>

          <SectionHeading
            title="Client Testimonials & Feedback"
            subtitle="Verified reviews and impressions from engineering leaders, startup founders, and global collaborators."
          />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-cyan-400">
            <LuLoader className="h-8 w-8 animate-spin mb-3" />
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
              Loading Verified Reviews...
            </span>
          </div>
        ) : testimonials.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <LuUsers className="mb-4 h-14 w-14 text-zinc-600" />
            <p className="text-sm font-mono text-zinc-400">
              No published testimonials found in the ledger.
            </p>
          </motion.div>
        ) : (
          <div>
            {/* ─── Hero Spotlight Slider ─── */}
            <div className="relative mb-16">
              <div className="min-h-[340px] sm:min-h-[300px]">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <TiltCard className="p-8 sm:p-12 aurora-border">
                      <div className="flex flex-col gap-6 sm:gap-8">
                        {/* Rating Stars + Holographic Quote */}
                        <div className="flex items-center justify-between">
                          <div className="flex gap-1.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <HiStar
                                key={i}
                                className={`h-5 w-5 ${
                                  i < testimonials[current].rating
                                    ? "text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                                    : "text-zinc-700"
                                }`}
                              />
                            ))}
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[11px] font-mono text-emerald-300">
                              <HiBadgeCheck size={14} className="text-emerald-400" />
                              VERIFIED PARTNER
                            </span>
                            <FaQuoteLeft className="h-8 w-8 text-cyan-400/20" />
                          </div>
                        </div>

                        {/* Quote Content */}
                        <p className="text-lg sm:text-2xl font-medium leading-relaxed text-zinc-200 italic">
                          &ldquo;{testimonials[current].content}&rdquo;
                        </p>

                        {/* Author Profile */}
                        <div className="flex items-center gap-4 pt-6 border-t border-white/8">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 via-teal-500 to-purple-600 text-base font-black text-white shadow-lg shadow-cyan-500/25">
                            {testimonials[current].name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-base font-bold text-white flex items-center gap-2">
                              <span>{testimonials[current].name}</span>
                              <span className="sm:hidden text-emerald-400">
                                <HiBadgeCheck size={14} />
                              </span>
                            </div>
                            <div className="text-xs font-mono text-cyan-400">
                              {testimonials[current].role || "Client Collaborator"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slider Controls */}
              {testimonials.length > 1 && (
                <div className="mt-8 flex items-center justify-between sm:justify-center gap-4">
                  <MagneticButton intensity={0.3}>
                    <button
                      onClick={() => paginate(-1)}
                      className="glass-panel flex h-11 w-11 items-center justify-center rounded-full text-zinc-300 hover:text-white hover:border-cyan-400/40 transition-all cursor-pointer"
                      aria-label="Previous testimonial"
                    >
                      <HiChevronLeft size={20} />
                    </button>
                  </MagneticButton>

                  {/* Dot Indicators */}
                  <div className="flex items-center gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setDirection(i > current ? 1 : -1);
                          setCurrent(i);
                        }}
                        className="relative flex h-6 items-center justify-center cursor-pointer"
                        aria-label={`Go to review ${i + 1}`}
                      >
                        <motion.div
                          className="h-1.5 rounded-full"
                          animate={{
                            width: i === current ? 32 : 8,
                            backgroundColor:
                              i === current ? "#06b6d4" : "rgba(255,255,255,0.2)",
                            boxShadow:
                              i === current ? "0 0 10px #06b6d4" : "none",
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </button>
                    ))}
                  </div>

                  <MagneticButton intensity={0.3}>
                    <button
                      onClick={() => paginate(1)}
                      className="glass-panel flex h-11 w-11 items-center justify-center rounded-full text-zinc-300 hover:text-white hover:border-cyan-400/40 transition-all cursor-pointer"
                      aria-label="Next testimonial"
                    >
                      <HiChevronRight size={20} />
                    </button>
                  </MagneticButton>
                </div>
              )}
            </div>

            {/* ─── Grid View for All Testimonials ─── */}
            {testimonials.length > 1 && (
              <div className="mt-20">
                <div className="text-center mb-8">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                    ARCHIVE // ALL REVIEWS
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {testimonials.map((item, idx) => (
                    <TiltCard key={item._id} className="p-6 h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex gap-1">
                            {Array.from({ length: item.rating }).map((_, starIdx) => (
                              <HiStar
                                key={starIdx}
                                className="h-4 w-4 text-amber-400"
                              />
                            ))}
                          </div>
                          <span className="text-[10px] font-mono text-zinc-500">
                            0{idx + 1} {"//"}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic mb-5">
                          &ldquo;{item.content}&rdquo;
                        </p>
                      </div>

                      <div className="flex items-center gap-3 pt-3 border-t border-white/6">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white">
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">
                            {item.name}
                          </div>
                          <div className="text-[10px] font-mono text-cyan-400">
                            {item.role || "Client"}
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
