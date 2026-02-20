"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { HiExternalLink } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";

const filters = ["All", "Frontend", "Full Stack", "Backend"];

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured online store with product management, cart, checkout, and payment integration using Stripe.",
    image: "/projects/ecommerce.jpg",
    tags: ["Next.js", "TypeScript", "Prisma", "Stripe"],
    category: "Full Stack",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Task Management App",
    description:
      "Real-time collaborative task manager with drag-and-drop, team workspaces, and progress tracking.",
    image: "/projects/taskapp.jpg",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    category: "Full Stack",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Portfolio Dashboard",
    description:
      "Interactive analytics dashboard with data visualization, real-time charts, and responsive layouts.",
    image: "/projects/dashboard.jpg",
    tags: ["React", "Tailwind CSS", "Chart.js", "REST API"],
    category: "Frontend",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Blog Platform",
    description:
      "SEO-optimized blog with markdown support, commenting system, and content management.",
    image: "/projects/blog.jpg",
    tags: ["Next.js", "MDX", "PostgreSQL", "Prisma"],
    category: "Full Stack",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "API Gateway Service",
    description:
      "Microservice API gateway with authentication, rate limiting, caching, and request routing.",
    image: "/projects/api.jpg",
    tags: ["Node.js", "Express", "Redis", "Docker"],
    category: "Backend",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Weather Application",
    description:
      "Beautiful weather app with location-based forecasts, animated backgrounds, and weekly trends.",
    image: "/projects/weather.jpg",
    tags: ["React", "Tailwind CSS", "OpenWeather API"],
    category: "Frontend",
    liveUrl: "#",
    githubUrl: "#",
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Featured Projects"
          subtitle="A selection of projects I've built and contributed to"
        />

        {/* Filter Buttons */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20"
                  : "glass text-zinc-400 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass glass-hover glow-hover group overflow-hidden rounded-2xl transition-all"
              >
                {/* Image placeholder */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                  <div className="flex h-full items-center justify-center">
                    <span className="text-4xl font-bold text-white/10">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 text-white transition-transform hover:scale-110"
                      aria-label="Live demo"
                    >
                      <HiExternalLink size={18} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-110"
                      aria-label="GitHub repository"
                    >
                      <FaGithub size={18} />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-zinc-400">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
