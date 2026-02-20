"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { HiChevronLeft, HiChevronRight, HiStar } from "react-icons/hi";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart",
    content:
      "Tazminur delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise made the entire process smooth and efficient.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Product Manager, DataFlow",
    content:
      "Working with Tazminur was a fantastic experience. He understood our requirements perfectly and delivered a high-quality dashboard application on time and within budget.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Founder, CreativeHub",
    content:
      "Tazminur's full stack expertise is remarkable. He built our entire platform from scratch with a beautiful UI and robust backend. Highly recommended!",
    rating: 5,
  },
  {
    name: "David Park",
    role: "CTO, InnovateLab",
    content:
      "The API architecture Tazminur designed was clean, scalable, and well-documented. His deep understanding of backend systems is truly impressive.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrent(
        (prev) => (prev + dir + testimonials.length) % testimonials.length
      );
    },
    []
  );

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [paginate]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 200 : -200,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="relative px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          title="Testimonials"
          subtitle="What clients say about working with me"
        />

        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="glass rounded-2xl p-8 sm:p-12"
              >
                {/* Stars */}
                <div className="mb-6 flex gap-1">
                  {Array.from({ length: testimonials[current].rating }).map(
                    (_, i) => (
                      <HiStar key={i} className="text-yellow-400" size={20} />
                    )
                  )}
                </div>

                {/* Quote */}
                <p className="mb-8 text-lg leading-relaxed text-zinc-300 sm:text-xl">
                  &ldquo;{testimonials[current].content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 text-lg font-bold text-white">
                    {testimonials[current].name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {testimonials[current].name}
                    </div>
                    <div className="text-sm text-zinc-500">
                      {testimonials[current].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => paginate(-1)}
              className="glass flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-colors hover:text-white"
              aria-label="Previous testimonial"
            >
              <HiChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    i === current
                      ? "w-8 bg-cyan-400"
                      : "w-2 bg-zinc-700 hover:bg-zinc-500"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              className="glass flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-colors hover:text-white"
              aria-label="Next testimonial"
            >
              <HiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
