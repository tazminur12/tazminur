"use client";

import { motion } from "framer-motion";
import SectionHeading from "../../components/SectionHeading";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaGitAlt,
  FaFigma,
  FaAws,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiExpress,
  SiRedux,
  SiFirebase,
  SiGraphql,
  SiPrisma,
  SiVercel,
} from "react-icons/si";
import { IconType } from "react-icons";

interface Skill {
  name: string;
  icon: IconType;
  color: string;
  level: number;
}

interface SkillCategory {
  title: string;
  description: string;
  accent: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    description: "Building fast, interactive user interfaces",
    accent: "from-cyan-500 to-blue-500",
    skills: [
      { name: "React", icon: FaReact, color: "#61DAFB", level: 95 },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", level: 90 },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6", level: 88 },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", level: 95 },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", level: 92 },
      { name: "Redux", icon: SiRedux, color: "#764ABC", level: 80 },
    ],
  },
  {
    title: "Backend",
    description: "Designing scalable server-side systems",
    accent: "from-emerald-500 to-teal-500",
    skills: [
      { name: "Node.js", icon: FaNodeJs, color: "#339933", level: 90 },
      { name: "Express", icon: SiExpress, color: "#ffffff", level: 88 },
      { name: "Python", icon: FaPython, color: "#3776AB", level: 75 },
      { name: "GraphQL", icon: SiGraphql, color: "#E10098", level: 78 },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248", level: 85 },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", level: 82 },
    ],
  },
  {
    title: "Tools & Platforms",
    description: "DevOps, cloud, and productivity tools",
    accent: "from-purple-500 to-pink-500",
    skills: [
      { name: "Git", icon: FaGitAlt, color: "#F05032", level: 92 },
      { name: "Docker", icon: FaDocker, color: "#2496ED", level: 78 },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28", level: 85 },
      { name: "Prisma", icon: SiPrisma, color: "#2D3748", level: 80 },
      { name: "AWS", icon: FaAws, color: "#FF9900", level: 70 },
      { name: "Vercel", icon: SiVercel, color: "#ffffff", level: 90 },
      { name: "Figma", icon: FaFigma, color: "#F24E1E", level: 75 },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6 }}
      className="group relative"
    >
      <div className="glass glass-hover relative flex items-center gap-3 rounded-2xl p-4 transition-all duration-300 sm:flex-col sm:items-center sm:gap-3 sm:p-5">
        <div
          className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14 sm:rounded-2xl"
          style={{ backgroundColor: `${skill.color}12` }}
        >
          <skill.icon
            className="h-6 w-6 sm:h-7 sm:w-7"
            style={{ color: skill.color }}
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:w-full sm:flex-none sm:items-center sm:gap-2">
          <span className="truncate text-sm font-medium text-zinc-300 transition-colors group-hover:text-white">
            {skill.name}
          </span>

          <div className="flex w-full items-center gap-2 sm:flex-col sm:gap-1">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/5 sm:h-1 sm:w-full">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: skill.color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + index * 0.05,
                  ease: "easeOut",
                }}
              />
            </div>
            <span className="text-[10px] tabular-nums text-zinc-500 sm:text-[11px]">
              {skill.level}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative px-4 py-20 sm:py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="Technologies I work with to bring ideas to life"
        />

        <div className="space-y-10 sm:space-y-14 md:space-y-16">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
            >
              <div className="mb-5 flex items-center gap-3 sm:mb-6">
                <div
                  className={`h-6 w-1 rounded-full bg-linear-to-b ${category.accent}`}
                />
                <div>
                  <h3 className="text-base font-semibold text-zinc-200 sm:text-lg">
                    {category.title}
                  </h3>
                  <p className="text-xs text-zinc-500 sm:text-sm">
                    {category.description}
                  </p>
                </div>
              </div>

              <motion.div
                className="grid grid-cols-1 gap-2.5 min-[480px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                {category.skills.map((skill, i) => (
                  <SkillCard key={skill.name} skill={skill} index={i} />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
