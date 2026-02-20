"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
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
import { LuLoader } from "react-icons/lu";
import Swal from "sweetalert2";

interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  status: "published" | "draft";
  order: number;
}

type FormData = Omit<Project, "_id">;

const emptyForm: FormData = {
  title: "",
  description: "",
  category: "Full Stack",
  tags: [],
  liveUrl: "",
  githubUrl: "",
  image: "",
  status: "draft",
  order: 0,
};

export default function DashboardProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [tagInput, setTagInput] = useState("");
  const [search, setSearch] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingProject(null);
    setForm(emptyForm);
    setTagInput("");
    setImageFile(null);
    setImagePreview("");
    setShowModal(true);
  };

  const openEdit = (p: Project) => {
    setEditingProject(p);
    setForm({
      title: p.title,
      description: p.description,
      category: p.category,
      tags: p.tags,
      liveUrl: p.liveUrl,
      githubUrl: p.githubUrl,
      image: p.image,
      status: p.status,
      order: p.order,
    });
    setTagInput("");
    setImageFile(null);
    setImagePreview(p.image || "");
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

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const toast = (icon: "success" | "error", title: string) => {
    Swal.fire({
      icon,
      title,
      background: "#111",
      color: "#fff",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
    });
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      toast("error", "Project title is required");
      return;
    }
    setSaving(true);

    try {
      const fd = new globalThis.FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("category", form.category);
      fd.append("tags", JSON.stringify(form.tags));
      fd.append("liveUrl", form.liveUrl);
      fd.append("githubUrl", form.githubUrl);
      fd.append("status", form.status);
      fd.append("order", String(form.order));
      if (imageFile) {
        fd.append("image", imageFile);
      }

      const url = editingProject
        ? `/api/projects/${editingProject._id}`
        : "/api/projects";
      const method = editingProject ? "PUT" : "POST";

      const res = await fetch(url, { method, body: fd });
      if (!res.ok) throw new Error("Failed to save");

      await fetchProjects();
      setShowModal(false);
      toast(
        "success",
        editingProject ? "Project updated successfully!" : "Project added successfully!"
      );
    } catch {
      toast("error", "Failed to save project. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Project?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3f3f46",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      background: "#111",
      color: "#fff",
    });

    if (!result.isConfirmed) return;
    setDeleting(id);

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      await fetchProjects();
      toast("success", "Project deleted successfully!");
    } catch {
      toast("error", "Failed to delete project.");
    } finally {
      setDeleting(null);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-white/6 bg-white/3 px-4 py-2.5 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Projects</h2>
          <p className="text-sm text-zinc-500">
            Manage your portfolio projects ({projects.length})
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-purple-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-cyan-500/20"
        >
          <HiPlus size={16} />
          Add Project
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 rounded-xl border border-white/6 bg-[#0e0e0e] px-4 py-2.5">
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
      <div className="overflow-hidden rounded-2xl border border-white/4 bg-[#0e0e0e]">
        <div className="hidden grid-cols-12 gap-4 border-b border-white/4 px-5 py-3 sm:grid">
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

        {loading ? (
          <div className="flex items-center justify-center px-5 py-16">
            <LuLoader className="h-5 w-5 animate-spin text-zinc-500" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="px-5 py-12 text-center text-sm text-zinc-600">
            {search ? "No projects match your search." : "No projects yet. Add your first one!"}
          </div>
        ) : (
          filtered.map((project, i) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              className="grid grid-cols-1 gap-3 border-b border-white/2 px-5 py-4 transition-colors hover:bg-white/1 sm:grid-cols-12 sm:items-center sm:gap-4"
            >
              <div className="sm:col-span-4">
                <div className="flex items-center gap-3">
                  {project.image ? (
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-cyan-500/20 to-purple-500/20 text-sm font-bold text-white/30">
                      {project.title.charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-white">
                      {project.title}
                    </div>
                    <div className="line-clamp-1 text-xs text-zinc-600">
                      {project.description}
                    </div>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <span className="rounded-full bg-white/4 px-2.5 py-1 text-xs font-medium text-zinc-400">
                  {project.category}
                </span>
              </div>

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

              <div className="flex items-center gap-1.5 sm:col-span-2 sm:justify-end">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/3 text-zinc-600 transition-colors hover:text-cyan-400"
                    title="Live demo"
                  >
                    <HiExternalLink size={14} />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/3 text-zinc-600 transition-colors hover:text-white"
                    title="GitHub"
                  >
                    <FaGithub size={14} />
                  </a>
                )}
                <button
                  onClick={() => openEdit(project)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/3 text-zinc-600 transition-colors hover:text-cyan-400"
                  title="Edit"
                >
                  <HiPencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  disabled={deleting === project._id}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/3 text-zinc-600 transition-colors hover:text-red-400 disabled:opacity-50"
                  title="Delete"
                >
                  {deleting === project._id ? (
                    <LuLoader size={14} className="animate-spin" />
                  ) : (
                    <HiTrash size={14} />
                  )}
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
              onClick={() => !saving && setShowModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="fixed inset-x-4 top-[5%] z-50 mx-auto max-h-[90vh] max-w-lg overflow-y-auto rounded-2xl border border-white/6 bg-[#0e0e0e] p-6 shadow-2xl sm:inset-x-auto"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">
                  {editingProject ? "Edit Project" : "Add New Project"}
                </h3>
                <button
                  onClick={() => !saving && setShowModal(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/4 text-zinc-500 hover:text-white"
                  aria-label="Close modal"
                >
                  <HiX size={16} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Image upload */}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                  aria-label="Upload project image"
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="relative flex h-36 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-white/6 bg-white/2 transition-colors hover:border-cyan-500/30"
                >
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                      sizes="(max-width: 512px) 100vw, 512px"
                    />
                  ) : (
                    <div className="text-center">
                      <HiPhotograph
                        size={28}
                        className="mx-auto mb-1 text-zinc-600"
                      />
                      <p className="text-xs text-zinc-600">
                        Click to upload project image
                      </p>
                    </div>
                  )}
                </button>

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
                    className={inputCls}
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
                    className={`${inputCls} resize-none`}
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
                      className={inputCls}
                      aria-label="Category"
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
                      className={inputCls}
                      aria-label="Status"
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
                  {form.tags.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-1.5">
                      {form.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 rounded-md bg-cyan-500/10 px-2 py-0.5 text-xs font-medium text-cyan-400"
                        >
                          {tag}
                          <button type="button" onClick={() => removeTag(tag)} aria-label={`Remove ${tag}`}>
                            <HiX size={10} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addTag())
                      }
                      className={`flex-1 ${inputCls}`}
                      placeholder="Add tag..."
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="rounded-xl bg-white/4 px-4 text-sm text-zinc-400 transition-colors hover:text-white"
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
                      className={inputCls}
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
                      className={inputCls}
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>
              </div>

              {/* Save/Cancel */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => !saving && setShowModal(false)}
                  disabled={saving}
                  className="flex-1 rounded-xl border border-white/6 bg-white/3 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:text-white disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !form.title.trim()}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-purple-600 py-2.5 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-cyan-500/20 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <LuLoader size={14} className="animate-spin" />
                      Saving...
                    </>
                  ) : editingProject ? (
                    "Save Changes"
                  ) : (
                    "Add Project"
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
