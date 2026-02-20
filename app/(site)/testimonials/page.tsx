"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../../components/SectionHeading";
import {
  HiChevronLeft,
  HiChevronRight,
  HiStar,
} from "react-icons/hi";
import { RiDoubleQuotesL } from "react-icons/ri";
import { LuLoader } from "react-icons/lu";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

const ACCENTS = [
  "from-cyan-500 to-blue-500",
  "from-violet-500 to-purple-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-amber-500",
  "from-pink-500 to-rose-500",
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    fetch("/api/testimonials?status=published")
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
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
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [paginate, testimonials.length]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
    }),
  };

  if (loading) {
    return (
      <section id="testimonials" className="relative px-4 py-20 sm:py-24 md:py-28">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            title="Testimonials"
            subtitle="What clients say about working with me"
          />
          <div className="flex items-center justify-center py-20">
            <LuLoader className="h-6 w-6 animate-spin text-zinc-500" />
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section id="testimonials" className="relative px-4 py-20 sm:py-24 md:py-28">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            title="Testimonials"
            subtitle="What clients say about working with me"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-16 text-center text-sm text-zinc-500"
          >
            No testimonials to show yet.
          </motion.p>
        </div>
      </section>
    );
  }

  const t = testimonials[current];
  const accent = ACCENTS[current % ACCENTS.length];

  return (
    <section id="testimonials" className="relative px-4 py-20 sm:py-24 md:py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          title="Testimonials"
          subtitle="What clients say about working with me"
        />

        <div className="relative">
          <div className="min-h-[320px] overflow-hidden sm:min-h-[280px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="glass relative rounded-2xl p-6 sm:p-10 md:p-12"
              >
                <div className={`absolute left-0 top-0 h-1 w-full rounded-t-2xl bg-linear-to-r ${accent}`} />

                <div className="flex flex-col gap-6 sm:gap-8">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-1">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 + i * 0.06 }}
                        >
                          <HiStar className="h-4 w-4 text-amber-400 sm:h-5 sm:w-5" />
                        </motion.div>
                      ))}
                    </div>
                    <RiDoubleQuotesL className="h-8 w-8 text-white/5 sm:h-10 sm:w-10" />
                  </div>

                  <p className="text-base leading-relaxed text-zinc-300 sm:text-lg md:text-xl">
                    &ldquo;{t.content}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 border-t border-white/5 pt-5 sm:gap-4 sm:pt-6">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br text-sm font-bold text-white sm:h-12 sm:w-12 sm:text-base ${accent}`}
                    >
                      {t.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-white sm:text-base">
                        {t.name}
                      </div>
                      <div className="truncate text-xs text-zinc-500 sm:text-sm">
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {testimonials.length > 1 && (
            <div className="mt-6 flex items-center justify-center gap-3 sm:mt-8 sm:gap-4">
              <button
                onClick={() => paginate(-1)}
                className="glass flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition-all hover:text-white active:scale-95 sm:h-10 sm:w-10"
                aria-label="Previous testimonial"
              >
                <HiChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              <div className="flex items-center gap-1.5 sm:gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > current ? 1 : -1);
                      setCurrent(i);
                    }}
                    className="relative flex h-5 items-center justify-center"
                    aria-label={`Go to testimonial ${i + 1}`}
                  >
                    <motion.div
                      className="h-1.5 rounded-full"
                      animate={{
                        width: i === current ? 28 : 8,
                        backgroundColor:
                          i === current
                            ? "rgb(34 211 238)"
                            : "rgb(63 63 70)",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={() => paginate(1)}
                className="glass flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition-all hover:text-white active:scale-95 sm:h-10 sm:w-10"
                aria-label="Next testimonial"
              >
                <HiChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
