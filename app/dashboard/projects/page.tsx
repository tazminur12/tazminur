"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiPlus,
  HiPencil,
  HiTrash,
  HiExternalLink,
  HiX,
  HiPhotograph,
  HiSearch,
} from "react-icons/hi";
import { FaGithub } from "react-icons/fa";

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  status: "published" | "draft";
}

const initialProjects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured online store with Stripe integration.",
    category: "Full Stack",
    tags: ["Next.js", "TypeScript", "Prisma", "Stripe"],
    liveUrl: "#",
    githubUrl: "#",
    image: "",
    status: "published",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Real-time collaborative task manager with drag-and-drop.",
    category: "Full Stack",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    liveUrl: "#",
    githubUrl: "#",
    image: "",
    status: "published",
  },
  {
    id: 3,
    title: "Portfolio Dashboard",
    description: "Interactive analytics dashboard with data visualization.",
    category: "Frontend",
    tags: ["React", "Tailwind CSS", "Chart.js"],
    liveUrl: "#",
    githubUrl: "#",
    image: "",
    status: "draft",
  },
];

const emptyProject: Omit<Project, "id"> = {
  title: "",
  description: "",
  category: "Full Stack",
  tags: [],
  liveUrl: "",
  githubUrl: "",
  image: "",
  status: "draft",
};

export default function DashboardProjects() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyProject);
  const [tagInput, setTagInput] = useState("");
  const [search, setSearch] = useState("");

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingProject(null);
    setForm(emptyProject);
    setTagInput("");
    setShowModal(true);
  };

  const openEdit = (p: Project) => {
    setEditingProject(p);
    setForm({ ...p });
    setTagInput("");
    setShowModal(true);
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) {
      setForm({ ...form, tags: [...form.tags, t] });
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setForm({ ...form, tags: form.tags.filter((t) => t !== tag) });
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editingProject) {
      setProjects(
        projects.map((p) =>
          p.id === editingProject.id ? { ...form, id: p.id } : p
        )
      );
    } else {
      setProjects([
        ...projects,
        { ...form, id: Date.now() },
      ]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Projects</h2>
          <p className="text-sm text-zinc-500">
            Manage your portfolio projects
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-cyan-500/20"
        >
          <HiPlus size={16} />
          Add Project
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-[#0e0e0e] px-4 py-2.5">
        <HiSearch size={16} className="text-zinc-600" />
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border-0 bg-transparent text-sm text-zinc-300 outline-none placeholder:text-zinc-700"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-white/[0.04] bg-[#0e0e0e]">
        {/* Table header */}
        <div className="hidden grid-cols-12 gap-4 border-b border-white/[0.04] px-5 py-3 sm:grid">
          <div className="col-span-4 text-xs font-semibold uppercase tracking-wider text-zinc-600">
            Project
          </div>
          <div className="col-span-2 text-xs font-semibold uppercase tracking-wider text-zinc-600">
            Category
          </div>
          <div className="col-span-3 text-xs font-semibold uppercase tracking-wider text-zinc-600">
            Tech Stack
          </div>
          <div className="col-span-1 text-xs font-semibold uppercase tracking-wider text-zinc-600">
            Status
          </div>
          <div className="col-span-2 text-xs font-semibold uppercase tracking-wider text-zinc-600 text-right">
            Actions
          </div>
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="px-5 py-12 text-center text-sm text-zinc-600">
            No projects found.
          </div>
        ) : (
          filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-1 gap-3 border-b border-white/[0.02] px-5 py-4 transition-colors hover:bg-white/[0.01] sm:grid-cols-12 sm:items-center sm:gap-4"
            >
              {/* Project */}
              <div className="sm:col-span-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-sm font-bold text-white/30">
                    {project.title.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">
                      {project.title}
                    </div>
                    <div className="line-clamp-1 text-xs text-zinc-600">
                      {project.description}
                    </div>
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="sm:col-span-2">
                <span className="rounded-full bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-zinc-400">
                  {project.category}
                </span>
              </div>

              {/* Tags */}
              <div className="sm:col-span-3">
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-cyan-500/10 px-2 py-0.5 text-[10px] font-medium text-cyan-400"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-[10px] text-zinc-600">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="sm:col-span-1">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    project.status === "published"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-yellow-500/10 text-yellow-400"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      project.status === "published"
                        ? "bg-green-400"
                        : "bg-yellow-400"
                    }`}
                  />
                  {project.status === "published" ? "Live" : "Draft"}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 sm:col-span-2 sm:justify-end">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.03] text-zinc-600 transition-colors hover:text-cyan-400"
                  title="Live demo"
                >
                  <HiExternalLink size={14} />
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.03] text-zinc-600 transition-colors hover:text-white"
                  title="GitHub"
                >
                  <FaGithub size={14} />
                </a>
                <button
                  onClick={() => openEdit(project)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.03] text-zinc-600 transition-colors hover:text-cyan-400"
                  title="Edit"
                >
                  <HiPencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.03] text-zinc-600 transition-colors hover:text-red-400"
                  title="Delete"
                >
                  <HiTrash size={14} />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* ===== Add/Edit Modal ===== */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="fixed inset-x-4 top-[5%] z-50 mx-auto max-h-[90vh] max-w-lg overflow-y-auto rounded-2xl border border-white/[0.06] bg-[#0e0e0e] p-6 shadow-2xl sm:inset-x-auto"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">
                  {editingProject ? "Edit Project" : "Add New Project"}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] text-zinc-500 hover:text-white"
                >
                  <HiX size={16} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Image upload placeholder */}
                <div className="flex h-36 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-white/[0.06] bg-white/[0.02] transition-colors hover:border-cyan-500/30">
                  <div className="text-center">
                    <HiPhotograph
                      size={28}
                      className="mx-auto mb-1 text-zinc-600"
                    />
                    <p className="text-xs text-zinc-600">
                      Click to upload project image
                    </p>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-cyan-500/40"
                    placeholder="My Awesome Project"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="w-full resize-none rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-cyan-500/40"
                    placeholder="Describe the project..."
                  />
                </div>

                {/* Category + Status */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                      Category
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm({ ...form, category: e.target.value })
                      }
                      className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-500/40"
                    >
                      <option value="Full Stack">Full Stack</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                      Status
                    </label>
                    <select
                      value={form.status}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          status: e.target.value as "published" | "draft",
                        })
                      }
                      className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-500/40"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                    Tech Stack
                  </label>
                  <div className="mb-2 flex flex-wrap gap-1.5">
                    {form.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 rounded-md bg-cyan-500/10 px-2 py-0.5 text-xs font-medium text-cyan-400"
                      >
                        {tag}
                        <button onClick={() => removeTag(tag)}>
                          <HiX size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                      className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-cyan-500/40"
                      placeholder="Add tag..."
                    />
                    <button
                      onClick={addTag}
                      className="rounded-xl bg-white/[0.04] px-4 text-sm text-zinc-400 transition-colors hover:text-white"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* URLs */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                      Live URL
                    </label>
                    <input
                      type="url"
                      value={form.liveUrl}
                      onChange={(e) =>
                        setForm({ ...form, liveUrl: e.target.value })
                      }
                      className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-cyan-500/40"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={form.githubUrl}
                      onChange={(e) =>
                        setForm({ ...form, githubUrl: e.target.value })
                      }
                      className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-cyan-500/40"
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>
              </div>

              {/* Save/Cancel */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.03] py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 py-2.5 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  {editingProject ? "Save Changes" : "Add Project"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
