"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiCode,
  HiArrowRight,
  HiExternalLink,
  HiMail,
  HiStar,
  HiLightningBolt,
  HiGlobe,
  HiDeviceMobile,
  HiDatabase,
  HiCog,
} from "react-icons/hi";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiMongodb,
  SiTailwindcss,
  SiDocker,
  SiGit,
  SiExpress,
  SiPostgresql,
  SiPrisma,
  SiFirebase,
} from "react-icons/si";
import { FaQuoteLeft } from "react-icons/fa";
import Hero from "../components/Hero";

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

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const services = [
  {
    icon: HiGlobe,
    title: "Full Stack Web Development",
    description:
      "End-to-end web applications built with modern frameworks, clean architecture, and scalable backends.",
    accent: "from-cyan-500 to-blue-500",
  },
  {
    icon: HiDeviceMobile,
    title: "Responsive UI / UX",
    description:
      "Pixel-perfect, mobile-first interfaces with smooth animations and intuitive user experiences.",
    accent: "from-purple-500 to-pink-500",
  },
  {
    icon: HiDatabase,
    title: "API & Database Design",
    description:
      "RESTful & GraphQL APIs with optimized database schemas for performance and data integrity.",
    accent: "from-emerald-500 to-cyan-500",
  },
  {
    icon: HiCog,
    title: "DevOps & Deployment",
    description:
      "Cloud deployment on AWS & Vercel with CI/CD pipelines, Docker, and monitoring for production-ready apps.",
    accent: "from-orange-500 to-amber-500",
  },
];

const techStack = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Express", icon: SiExpress, color: "#ffffff" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Prisma", icon: SiPrisma, color: "#2D3748" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
];

const stats = [
  { value: "50+", label: "Projects Completed" },
  { value: "3+", label: "Years Experience" },
  { value: "30+", label: "Happy Clients" },
  { value: "10+", label: "Certifications" },
];

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch("/api/projects?status=published")
      .then((r) => r.json())
      .then((d) => setProjects(Array.isArray(d) ? d.slice(0, 3) : []))
      .catch(() => {});

    fetch("/api/testimonials?status=published")
      .then((r) => r.json())
      .then((d) => setTestimonials(Array.isArray(d) ? d.slice(0, 3) : []))
      .catch(() => {});
  }, []);

  return (
    <>
      {/* ─── Hero ─── */}
      <Hero />

      {/* ─── Stats Bar ─── */}
      <section className="relative border-y border-white/4 bg-[#080808]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-10 sm:py-14 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center"
            >
              <div className="text-3xl font-bold text-white sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-zinc-500 sm:text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Services / What I Do ─── */}
      <section className="relative px-4 py-20 sm:py-24 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="mb-14 text-center"
          >
            <span className="mb-4 inline-block rounded-full border border-cyan-500/20 bg-cyan-500/6 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Services
            </span>
            <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              What I{" "}
              <span className="gradient-text">Do</span>
            </h2>
            <p className="mx-auto max-w-xl text-zinc-500">
              From concept to deployment — I deliver complete digital solutions
              tailored to your needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="glass glass-hover glow-hover group relative overflow-hidden rounded-2xl p-6 transition-all"
              >
                <div
                  className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-linear-to-br ${service.accent} opacity-[0.07] blur-2xl transition-opacity group-hover:opacity-15`}
                />
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br ${service.accent}`}
                >
                  <service.icon size={22} className="text-white" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-white">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-500">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Projects ─── */}
      {projects.length > 0 && (
        <section className="relative px-4 py-20 sm:py-24 md:py-28">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/3 blur-[120px]" />
          </div>

          <div className="relative mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="mb-14 text-center"
            >
              <span className="mb-4 inline-block rounded-full border border-cyan-500/20 bg-cyan-500/6 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Portfolio
              </span>
              <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Featured{" "}
                <span className="gradient-text">Projects</span>
              </h2>
              <p className="mx-auto max-w-xl text-zinc-500">
                A selection of my recent work — built with modern tools and best
                practices.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <motion.div
                  key={project._id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="glass glass-hover glow-hover group flex flex-col overflow-hidden rounded-2xl transition-all"
                >
                  <div className="relative aspect-video overflow-hidden bg-white/2">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-linear-to-br from-cyan-500/10 to-purple-500/10">
                        <HiCode size={32} className="text-white/10" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <span className="mb-2 inline-block w-fit rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-cyan-400">
                      {project.category}
                    </span>
                    <h3 className="mb-1.5 text-base font-semibold text-white transition-colors group-hover:text-cyan-400">
                      {project.title}
                    </h3>
                    <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-zinc-500">
                      {project.description}
                    </p>

                    {project.tags && project.tags.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-zinc-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-auto flex items-center gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-cyan-400 transition-all hover:bg-cyan-500/10"
                        >
                          <HiExternalLink size={12} />
                          Live
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-400 transition-all hover:text-white"
                        >
                          <HiCode size={12} />
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-10 text-center"
            >
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/3 px-6 py-2.5 text-sm font-medium text-zinc-300 transition-all hover:border-cyan-500/30 hover:text-white"
              >
                View All Projects
                <HiArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ─── Tech Stack ─── */}
      <section className="relative border-y border-white/4 bg-[#080808] px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <span className="mb-4 inline-block rounded-full border border-cyan-500/20 bg-cyan-500/6 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Tech Stack
            </span>
            <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Technologies I{" "}
              <span className="gradient-text">Work With</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
            }}
            className="grid grid-cols-3 gap-3 min-[480px]:grid-cols-4 sm:grid-cols-6 lg:grid-cols-6"
          >
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                custom={i}
                variants={fadeUp}
                whileHover={{ y: -4, scale: 1.05 }}
                className="glass glass-hover group flex flex-col items-center gap-2.5 rounded-xl px-3 py-5 transition-all sm:gap-3 sm:px-4 sm:py-6"
              >
                <tech.icon
                  size={28}
                  style={{ color: tech.color }}
                  className="transition-transform group-hover:scale-110 sm:text-[32px]"
                />
                <span className="text-xs font-medium text-zinc-500 group-hover:text-white">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <Link
              href="/skills"
              className="group inline-flex items-center gap-2 text-sm font-medium text-cyan-400/70 transition-colors hover:text-cyan-400"
            >
              <HiLightningBolt size={14} />
              View all skills & proficiency
              <HiArrowRight
                size={13}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      {testimonials.length > 0 && (
        <section className="relative px-4 py-20 sm:py-24 md:py-28">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="mb-14 text-center"
            >
              <span className="mb-4 inline-block rounded-full border border-cyan-500/20 bg-cyan-500/6 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Testimonials
              </span>
              <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                What Clients{" "}
                <span className="gradient-text">Say</span>
              </h2>
              <p className="mx-auto max-w-xl text-zinc-500">
                Hear from people I&apos;ve had the pleasure to work with.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t._id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="glass glass-hover relative overflow-hidden rounded-2xl p-6 transition-all"
                >
                  <FaQuoteLeft
                    size={28}
                    className="mb-4 text-cyan-500/15"
                  />
                  <p className="mb-5 text-sm leading-relaxed text-zinc-400">
                    &ldquo;{t.content}&rdquo;
                  </p>

                  <div className="mb-3 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <HiStar
                        key={si}
                        size={14}
                        className={
                          si < t.rating ? "text-amber-400" : "text-zinc-700"
                        }
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-3 border-t border-white/6 pt-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-cyan-500/20 to-purple-500/20 text-sm font-bold text-white">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {t.name}
                      </div>
                      {t.role && (
                        <div className="text-xs text-zinc-500">{t.role}</div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-10 text-center"
            >
              <Link
                href="/testimonials"
                className="group inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/3 px-6 py-2.5 text-sm font-medium text-zinc-300 transition-all hover:border-cyan-500/30 hover:text-white"
              >
                Read All Testimonials
                <HiArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ─── CTA / Contact ─── */}
      <section className="relative overflow-hidden px-4 py-20 sm:py-24 md:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />
          <div className="absolute right-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-purple-500/5 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass glow rounded-3xl border-cyan-500/10 p-8 text-center sm:p-12"
          >
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-500 to-purple-600">
              <HiMail size={26} className="text-white" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              Let&apos;s Build Something{" "}
              <span className="gradient-text">Amazing</span>
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-zinc-500 sm:text-base">
              Have a project in mind or want to collaborate? I&apos;m always open
              to discussing new opportunities and ideas.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="group flex items-center gap-2 rounded-full bg-linear-to-r from-cyan-500 to-purple-600 px-7 py-3 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-cyan-500/20"
              >
                Get In Touch
                <HiArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <a
                href="mailto:tanimkhalifa55@gmail.com"
                className="flex items-center gap-2 rounded-full border border-white/8 bg-white/3 px-7 py-3 text-sm font-medium text-zinc-300 transition-all hover:border-white/15 hover:text-white"
              >
                <HiMail size={16} />
                tanimkhalifa55@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
