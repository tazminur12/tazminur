"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiExternalLink,
  HiCode,
  HiSparkles,
  HiX,
  HiArrowRight,
  HiTerminal,
  HiOutlineGlobeAlt,
} from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import TiltCard from "./motion/TiltCard";
import MagneticButton from "./motion/MagneticButton";

export interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
}

export default function BentoGrid({ projects }: { projects: Project[] }) {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const displayProjects = projects && projects.length > 0 ? projects : [];

  if (displayProjects.length === 0) {
    return null;
  }

  // Symmetrical responsive grid:
  // If 4 projects, renders an impeccably balanced 2x2 grid.
  // If 3 or 6 projects, renders a 3-column grid.
  const gridLayoutClass =
    displayProjects.length === 4
      ? "grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 max-w-5xl mx-auto"
      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 max-w-6xl mx-auto";

  return (
    <section className="relative px-4 py-20 sm:py-24 max-w-6xl mx-auto">
      {/* ─── Section Header ─── */}
      <div className="text-center mb-14 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-950/20 px-3.5 py-1.5 text-xs font-mono text-cyan-300 mb-4 backdrop-blur-md"
        >
          <HiSparkles className="text-cyan-400" />
          <span>FEATURED WORK & CASE STUDIES</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4"
        >
          Featured{" "}
          <span className="gradient-text">Projects</span>
        </motion.h2>

        <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          A curated selection of modern, high-performance web applications built with clean Next.js architecture and production best practices.
        </p>
      </div>

      {/* ─── Uniform & Symmetrical Project Grid ─── */}
      <div className={gridLayoutClass}>
        {displayProjects.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.45 }}
            className="h-full"
          >
            <TiltCard
              onClick={() => setActiveModalProject(project)}
              className="p-5 sm:p-6 flex flex-col justify-between h-full cursor-pointer"
            >
              <div>
                {/* 1. Consistent Aspect-Ratio Image Viewport */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-5 border border-white/10 bg-[#060812]">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index < 2}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-linear-to-br from-cyan-500/10 to-purple-600/10">
                      <HiCode size={40} className="text-cyan-400/40" />
                    </div>
                  )}

                  {/* Gradient Vignette */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#010103] via-black/20 to-transparent opacity-80" />

                  {/* Top-Left Category Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="rounded-full bg-cyan-500/20 border border-cyan-400/40 px-3 py-1 text-[11px] font-mono font-bold text-cyan-300 backdrop-blur-md shadow-sm">
                      {project.category || "Full Stack"}
                    </span>
                  </div>

                  {/* Top-Right Live Status Indicator */}
                  {project.liveUrl && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 px-2.5 py-1 text-[10px] font-mono text-emerald-300 backdrop-blur-md shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Live</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* 2. Uniform Typography */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed mb-4 min-h-[2.5rem]">
                  {project.description}
                </p>

                {/* 3. Tech Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-5 min-h-[26px]">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-white/5 border border-white/10 px-2.5 py-0.5 text-[11px] font-mono text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="rounded-lg bg-white/5 border border-white/10 px-2 py-0.5 text-[11px] font-mono text-zinc-500">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* 4. Footer Action Bar (Pinned cleanly to bottom) */}
              <div className="pt-4 border-t border-white/8 flex items-center justify-between text-xs font-mono mt-auto">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModalProject(project);
                  }}
                  className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer group/btn"
                >
                  <span>View Case Study</span>
                  <HiArrowRight
                    size={12}
                    className="transition-transform group-hover/btn:translate-x-1"
                  />
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-all"
                      aria-label="GitHub Repository"
                    >
                      <FaGithub size={14} />
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 text-xs font-semibold transition-all shadow-sm"
                    >
                      <HiExternalLink size={13} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      {/* ─── Bottom CTA: Explore All Projects ─── */}
      <div className="mt-14 text-center">
        <MagneticButton intensity={0.25}>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full glass-panel hover:bg-white/10 px-8 py-3.5 text-xs font-semibold text-zinc-200 border border-white/10 transition-all hover:border-cyan-400/40 hover:text-white shadow-lg"
          >
            <span>Explore All Projects Archive</span>
            <HiArrowRight size={13} />
          </Link>
        </MagneticButton>
      </div>

      {/* ─── Immersive Telemetry Detail Modal ─── */}
      <AnimatePresence>
        {activeModalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-zinc-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <HiX size={18} />
              </button>

              {/* Modal Image Viewport */}
              {activeModalProject.image && (
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-6 border border-white/10 bg-[#060812]">
                  <Image
                    src={activeModalProject.image}
                    alt={activeModalProject.title}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              )}

              {/* Category Badge */}
              <div className="mb-3">
                <span className="rounded-full bg-cyan-500/20 border border-cyan-400/40 px-3.5 py-1 text-xs font-mono font-bold text-cyan-300">
                  {activeModalProject.category || "Full Stack"}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                {activeModalProject.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 whitespace-pre-line">
                {activeModalProject.description}
              </p>

              {/* Technologies */}
              {activeModalProject.tags && activeModalProject.tags.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <HiTerminal className="text-cyan-400" />
                    <span>Engineered Technologies</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-white/5 border border-white/10 px-3 py-1 text-xs text-zinc-300 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                {activeModalProject.liveUrl && (
                  <MagneticButton intensity={0.25}>
                    <a
                      href={activeModalProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-cyan-500 via-teal-500 to-purple-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-102"
                    >
                      <HiOutlineGlobeAlt size={15} />
                      <span>Launch Live Website</span>
                    </a>
                  </MagneticButton>
                )}

                {activeModalProject.githubUrl && (
                  <MagneticButton intensity={0.25}>
                    <a
                      href={activeModalProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full glass-panel hover:bg-white/10 px-6 py-2.5 text-xs font-medium text-zinc-300 border border-white/10 transition-all hover:text-white"
                    >
                      <FaGithub size={14} />
                      <span>View Repository</span>
                    </a>
                  </MagneticButton>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
