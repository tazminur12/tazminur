"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SectionHeading from "../../components/SectionHeading";
import TiltCard from "../../components/motion/TiltCard";
import MagneticButton from "../../components/motion/MagneticButton";
import {
  HiExternalLink,
  HiX,
  HiCode,
  HiSparkles,
  HiArrowRight,
  HiTerminal,
  HiOutlineGlobeAlt,
} from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { BsFolder2Open } from "react-icons/bs";
import { LuLoader } from "react-icons/lu";

interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetch("/api/projects?status=published")
      .then((res) => res.json())
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Failed to load projects:", err))
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean))),
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      className="relative min-h-screen px-4 pt-8 pb-24 sm:py-28 antigravity-bg"
    >
      {/* Background Multi-Orb Glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[550px] w-[550px] rounded-full bg-linear-to-tr from-cyan-500/10 via-purple-600/10 to-emerald-500/10 blur-[140px] animate-pulse-nebula" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ─── Header Section ─── */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-950/20 px-3.5 py-1.5 text-xs font-mono text-cyan-300 mb-4 backdrop-blur-md"
          >
            <HiSparkles className="text-cyan-400" />
            <span>DEPLOYED ARTIFACTS</span>
          </motion.div>

          <SectionHeading
            title="Featured Works & Creations"
            subtitle="Explore high-impact full-stack web applications, scalable enterprise platforms, and client solutions engineered with clean architecture."
          />

          {/* ─── Category Filter Navigation with Spring Sliding Indicator ─── */}
          {categories.length > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8 sm:mt-10">
              {categories.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`relative rounded-full px-5 py-2.5 text-xs font-semibold transition-colors duration-200 cursor-pointer ${
                      isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeProjectCategory"
                        className="absolute inset-0 rounded-full bg-linear-to-r from-cyan-500/25 via-purple-500/20 to-cyan-500/25 border border-cyan-400/40 shadow-md shadow-cyan-500/20"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{filter}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ─── Loading Skeleton / Spinner ─── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-cyan-400">
            <LuLoader className="h-8 w-8 animate-spin mb-3" />
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
              Querying Artifact Index...
            </span>
          </div>
        ) : filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <BsFolder2Open className="mb-4 h-14 w-14 text-zinc-600" />
            <p className="text-sm font-mono text-zinc-400">
              No published artifacts registered in this category.
            </p>
          </motion.div>
        ) : (
          /* ─── Project Grid Showcase ─── */
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="h-full"
                >
                  <TiltCard
                    onClick={() => setSelectedProject(project)}
                    className="p-6 h-full flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      {/* Project Image Preview Container */}
                      <div className="relative h-52 sm:h-56 w-full rounded-2xl overflow-hidden mb-5 border border-white/10 bg-[#060812]">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-linear-to-br from-cyan-500/10 to-purple-600/10">
                            <HiCode size={42} className="text-cyan-400/40" />
                          </div>
                        )}

                        {/* Top Gradient Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-[#010103] via-black/25 to-transparent opacity-80" />

                        {/* Category Tag Badge */}
                        <div className="absolute top-3.5 left-3.5 z-10">
                          <span className="rounded-full bg-cyan-500/20 border border-cyan-400/40 px-3 py-1 text-[11px] font-mono font-bold text-cyan-300 backdrop-blur-md shadow-sm">
                            {project.category || "Full Stack"}
                          </span>
                        </div>
                      </div>

                      {/* Project Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors line-clamp-1">
                        {project.title}
                      </h3>

                      {/* Project Description */}
                      <p className="text-zinc-400 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                        {project.description}
                      </p>

                      {/* Technology Badges */}
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-5">
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

                    {/* Bottom Action Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/8 text-xs font-mono">
                      <span className="text-[11px] text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Details & Telemetry</span>
                        <HiArrowRight size={12} />
                      </span>

                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all border border-white/10"
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
                            className="p-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 transition-all border border-cyan-400/40"
                            aria-label="Live Deployment"
                          >
                            <HiExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ─── Immersive Detail Modal ─── */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
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
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-zinc-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <HiX size={18} />
                </button>

                {/* Preview Image */}
                {selectedProject.image && (
                  <div className="relative h-56 sm:h-72 w-full rounded-2xl overflow-hidden mb-6 border border-white/10 bg-[#060812]">
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                )}

                {/* Category Pill */}
                <div className="mb-3">
                  <span className="rounded-full bg-cyan-500/20 border border-cyan-400/40 px-3.5 py-1 text-xs font-mono font-bold text-cyan-300">
                    {selectedProject.category || "Full Stack"}
                  </span>
                </div>

                {/* Modal Title */}
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                  {selectedProject.title}
                </h3>

                {/* Full Description */}
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 whitespace-pre-line">
                  {selectedProject.description}
                </p>

                {/* Full Stack Technology Pills */}
                {selectedProject.tags && selectedProject.tags.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <HiTerminal className="text-cyan-400" />
                      <span>Engineered With</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
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

                {/* Direct Action Triggers */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                  {selectedProject.liveUrl && (
                    <MagneticButton intensity={0.25}>
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-cyan-500 via-teal-500 to-purple-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-102"
                      >
                        <HiOutlineGlobeAlt size={15} />
                        <span>Launch Live Website</span>
                      </a>
                    </MagneticButton>
                  )}

                  {selectedProject.githubUrl && (
                    <MagneticButton intensity={0.25}>
                      <a
                        href={selectedProject.githubUrl}
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
      </div>
    </section>
  );
}
