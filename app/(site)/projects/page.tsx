"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SectionHeading from "../../components/SectionHeading";
import { HiExternalLink, HiX, HiCode } from "react-icons/hi";
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

const ACCENTS = [
  "from-cyan-500 to-blue-500",
  "from-purple-500 to-pink-500",
  "from-emerald-500 to-cyan-500",
  "from-orange-500 to-amber-500",
  "from-violet-500 to-fuchsia-500",
  "from-rose-500 to-pink-500",
];

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: () => void;
}) {
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -6 }}
      onClick={onSelect}
      className="glass glass-hover glow-hover group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl transition-all duration-300"
    >
      {/* Top accent */}
      <div className={`h-1 w-full bg-linear-to-r ${accent}`} />

      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-[#0a0a0a]">
        {project.image ? (
          <>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </>
        ) : (
          <div className={`flex h-full items-center justify-center bg-linear-to-br ${accent} opacity-10`}>
            <HiCode size={40} className="text-white" />
          </div>
        )}

        {/* Category badge */}
        <div className="absolute left-3 top-3 z-10">
          <span className="rounded-lg bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
            {project.category}
          </span>
        </div>

        {/* Hover action buttons */}
        <div className="absolute inset-0 z-10 flex items-center justify-center gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 text-white shadow-lg shadow-cyan-500/30 transition-transform hover:scale-110"
              aria-label="Live demo"
            >
              <HiExternalLink size={17} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow-lg transition-transform hover:scale-110"
              aria-label="GitHub repository"
            >
              <FaGithub size={17} />
            </a>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="mb-1.5 text-base font-semibold text-white transition-colors group-hover:text-cyan-400 sm:text-lg">
          {project.title}
        </h3>
        <p className="mb-4 flex-1 line-clamp-2 text-[13px] leading-relaxed text-zinc-500 sm:text-sm">
          {project.description}
        </p>

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-medium text-zinc-400 ring-1 ring-white/5 sm:text-[11px]"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-medium text-zinc-600">
                +{project.tags.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/5 px-4 py-2.5 sm:px-5">
        <span className="text-[11px] text-cyan-400/60 transition-colors group-hover:text-cyan-400">
          View details →
        </span>
        <div className="flex gap-1.5">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex h-7 w-7 items-center justify-center rounded-md bg-white/4 text-zinc-600 transition-colors hover:text-white"
              aria-label="GitHub"
            >
              <FaGithub size={13} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex h-7 w-7 items-center justify-center rounded-md bg-white/4 text-zinc-600 transition-colors hover:text-cyan-400"
              aria-label="Live demo"
            >
              <HiExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    fetch("/api/projects?status=published")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Failed to load projects:", err))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...new Set(projects.map((p) => p.category))];

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative px-4 py-20 sm:py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Featured Projects"
          subtitle="A selection of projects I've built and contributed to"
        />

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <LuLoader className="h-6 w-6 animate-spin text-zinc-500" />
          </div>
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <BsFolder2Open className="mb-4 h-12 w-12 text-zinc-600" />
            <p className="text-sm text-zinc-500">No projects to show yet.</p>
          </motion.div>
        ) : (
          <>
            {categories.length > 2 && (
              <div className="mb-8 flex items-center justify-center sm:mb-10">
                <div className="inline-flex flex-wrap justify-center gap-2 rounded-2xl bg-white/3 p-1.5 ring-1 ring-white/5 sm:gap-1 sm:rounded-full">
                  {categories.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`relative rounded-full px-4 py-1.5 text-xs font-medium transition-all sm:px-5 sm:py-2 sm:text-sm ${
                        activeFilter === filter
                          ? "bg-linear-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <motion.div
              layout
              className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    index={i}
                    onSelect={() => setSelected(project)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (() => {
          const si = projects.indexOf(selected);
          const accent = ACCENTS[(si >= 0 ? si : 0) % ACCENTS.length];
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
                  <div className={`h-1 w-full bg-linear-to-r ${accent}`} />

                  {/* Close */}
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute right-3 top-4 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-zinc-400 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
                    aria-label="Close modal"
                  >
                    <HiX size={14} />
                  </button>

                  {/* Image */}
                  {selected.image ? (
                    <div className="relative mx-4 mt-4 overflow-hidden rounded-xl border border-white/6">
                      <div className="relative aspect-video w-full bg-[#0a0a0a]">
                        <Image
                          src={selected.image}
                          alt={selected.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 448px) 100vw, 400px"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className={`mx-4 mt-4 flex aspect-video items-center justify-center rounded-xl bg-linear-to-br ${accent} opacity-10`}>
                      <HiCode size={40} className="text-white" />
                    </div>
                  )}

                  <div className="p-4 sm:p-5">
                    {/* Category + Title */}
                    <span className="mb-2 inline-block rounded-md bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-400">
                      {selected.category}
                    </span>
                    <h3 className="mb-1 text-sm font-bold text-white sm:text-base">
                      {selected.title}
                    </h3>

                    {selected.description && (
                      <p className="mb-3 line-clamp-3 text-xs leading-relaxed text-zinc-500">
                        {selected.description}
                      </p>
                    )}

                    {/* Tags */}
                    {selected.tags && selected.tags.length > 0 && (
                      <div className="mb-4">
                        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                          Tech Stack
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {selected.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] font-medium text-zinc-300 ring-1 ring-white/6"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex gap-2">
                      {selected.liveUrl && (
                        <a
                          href={selected.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-linear-to-r ${accent} px-4 py-2 text-xs font-semibold text-white transition-all hover:shadow-lg hover:shadow-cyan-500/15`}
                        >
                          <HiExternalLink size={13} />
                          Live Demo
                        </a>
                      )}
                      {selected.githubUrl && (
                        <a
                          href={selected.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/8 bg-white/3 px-4 py-2 text-xs font-semibold text-zinc-300 transition-all hover:border-white/15 hover:text-white"
                        >
                          <FaGithub size={13} />
                          Source Code
                        </a>
                      )}
                    </div>
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
