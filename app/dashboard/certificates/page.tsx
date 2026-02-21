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
} from "react-icons/hi";
import { LuLoader } from "react-icons/lu";
import Swal from "sweetalert2";

interface Certificate {
  _id: string;
  title: string;
  issuer: string;
  issueMonth: string;
  issueYear: string;
  expirationMonth: string;
  expirationYear: string;
  credentialId: string;
  credentialUrl: string;
  skills: string[];
  image: string;
  date: string;
  order: number;
}

interface CertForm {
  title: string;
  issuer: string;
  issueMonth: string;
  issueYear: string;
  expirationMonth: string;
  expirationYear: string;
  credentialId: string;
  credentialUrl: string;
  skills: string[];
  order: number;
}

const SKILL_SUGGESTIONS = [
  "React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS",
  "Tailwind CSS", "Bootstrap", "Sass", "Material UI", "Chakra UI", "Shadcn UI",
  "Node.js", "Express.js", "NestJS", "Fastify",
  "MongoDB", "PostgreSQL", "MySQL", "Redis", "Prisma", "Mongoose", "Supabase",
  "Firebase", "AWS", "Azure", "Google Cloud", "Vercel", "Netlify", "Docker", "Kubernetes",
  "Git", "GitHub", "GitLab",
  "Redux", "Zustand", "React Query", "SWR", "Axios",
  "GraphQL", "REST API", "tRPC", "Socket.io",
  "Python", "Django", "Flask", "FastAPI",
  "PHP", "Laravel",
  "Java", "Spring Boot",
  "C#", ".NET",
  "Go", "Rust",
  "React Native", "Flutter", "Dart",
  "Framer Motion", "GSAP", "Three.js",
  "Jest", "Vitest", "Cypress", "Playwright",
  "Stripe", "PayPal", "Razorpay",
  "Cloudinary", "S3", "Uploadthing",
  "NextAuth", "Clerk", "Auth0", "JWT",
  "Figma", "Adobe XD",
  "Linux", "Networking", "Cybersecurity", "Cloud Computing",
  "Machine Learning", "Data Science", "AI", "Deep Learning",
  "Agile", "Scrum", "DevOps", "CI/CD",
];

const emptyForm: CertForm = {
  title: "",
  issuer: "",
  issueMonth: "",
  issueYear: "",
  expirationMonth: "",
  expirationYear: "",
  credentialId: "",
  credentialUrl: "",
  skills: [],
  order: 0,
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) => String(currentYear - i));

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

export default function DashboardCertificates() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Certificate | null>(null);
  const [form, setForm] = useState<CertForm>(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [skillInput, setSkillInput] = useState("");
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const skillSuggestionsRef = useRef<HTMLDivElement>(null);

  const fetchCerts = useCallback(async () => {
    try {
      const res = await fetch("/api/certificates");
      const data = await res.json();
      setCerts(data);
    } catch (err) {
      console.error("Failed to fetch certificates:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCerts();
  }, [fetchCerts]);

  const openAdd = () => {
    setEditing(null);
    const nextOrder = certs.length > 0
      ? Math.max(...certs.map((c) => c.order || 0)) + 1
      : 1;
    setForm({ ...emptyForm, order: nextOrder });
    setImageFile(null);
    setImagePreview("");
    setSkillInput("");
    setShowModal(true);
  };

  const openEdit = (c: Certificate) => {
    setEditing(c);
    setForm({
      title: c.title,
      issuer: c.issuer,
      issueMonth: c.issueMonth || "",
      issueYear: c.issueYear || "",
      expirationMonth: c.expirationMonth || "",
      expirationYear: c.expirationYear || "",
      credentialId: c.credentialId || "",
      credentialUrl: c.credentialUrl,
      skills: c.skills || [],
      order: c.order,
    });
    setImageFile(null);
    setImagePreview(c.image || "");
    setSkillInput("");
    setShowModal(true);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const filteredSkillSuggestions = SKILL_SUGGESTIONS.filter(
    (s) =>
      !form.skills.includes(s) &&
      s.toLowerCase().includes(skillInput.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        skillSuggestionsRef.current &&
        !skillSuggestionsRef.current.contains(e.target as Node)
      ) {
        setShowSkillSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addSkill = (value?: string) => {
    const trimmed = (value ?? skillInput).trim();
    if (trimmed && !form.skills.includes(trimmed)) {
      setForm({ ...form, skills: [...form.skills, trimmed] });
    }
    setSkillInput("");
    setShowSkillSuggestions(false);
  };

  const removeSkill = (skill: string) => {
    setForm({ ...form, skills: form.skills.filter((s) => s !== skill) });
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      toast("error", "Certificate name is required");
      return;
    }
    setSaving(true);

    try {
      const fd = new globalThis.FormData();
      fd.append("title", form.title);
      fd.append("issuer", form.issuer);
      fd.append("issueMonth", form.issueMonth);
      fd.append("issueYear", form.issueYear);
      fd.append("expirationMonth", form.expirationMonth);
      fd.append("expirationYear", form.expirationYear);
      fd.append("credentialId", form.credentialId);
      fd.append("credentialUrl", form.credentialUrl);
      fd.append("skills", form.skills.join(","));
      fd.append("order", String(form.order));
      if (imageFile) {
        fd.append("image", imageFile);
      }

      const url = editing
        ? `/api/certificates/${editing._id}`
        : "/api/certificates";
      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, { method, body: fd });
      if (!res.ok) throw new Error("Failed to save");

      await fetchCerts();
      setShowModal(false);
      toast(
        "success",
        editing ? "Certificate updated!" : "Certificate added!"
      );
    } catch {
      toast("error", "Failed to save certificate. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Certificate?",
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
      const res = await fetch(`/api/certificates/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      await fetchCerts();
      toast("success", "Certificate deleted!");
    } catch {
      toast("error", "Failed to delete certificate.");
    } finally {
      setDeleting(null);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-white/6 bg-white/3 px-4 py-2.5 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 transition-colors";

  const selectCls =
    "w-full appearance-none rounded-xl border border-white/6 bg-white/3 px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 transition-colors";

  const labelCls = "mb-1.5 block text-xs font-medium text-zinc-400";

  const formatDate = (cert: Certificate) => {
    const issue = [cert.issueMonth, cert.issueYear].filter(Boolean).join(" ");
    const exp = [cert.expirationMonth, cert.expirationYear].filter(Boolean).join(" ");
    if (issue && exp) return `Issued ${issue} · Expires ${exp}`;
    if (issue) return `Issued ${issue}`;
    if (cert.date) return cert.date;
    return "";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">
            Licenses & Certifications
          </h2>
          <p className="text-sm text-zinc-500">
            Manage your certifications and achievements ({certs.length})
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-purple-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-cyan-500/20"
        >
          <HiPlus size={16} />
          Add Certification
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <LuLoader className="h-5 w-5 animate-spin text-zinc-500" />
        </div>
      ) : certs.length === 0 ? (
        <div className="rounded-2xl border border-white/4 bg-[#0e0e0e] px-5 py-12 text-center text-sm text-zinc-600">
          No certificates yet. Add your first one!
        </div>
      ) : (
        <div className="space-y-3">
          {certs.map((cert, i) => (
            <motion.div
              key={cert._id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group flex gap-4 rounded-2xl border border-white/4 bg-[#0e0e0e] p-4 transition-all hover:border-white/8 sm:p-5"
            >
              {/* Position Badge */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-cyan-500/20 to-purple-600/20 text-sm font-bold text-cyan-400 sm:h-9 sm:w-9">
                {cert.order || i + 1}
              </div>

              {/* Thumbnail */}
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/6 bg-white/3 sm:h-16 sm:w-16">
                {cert.image ? (
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <HiPhotograph size={20} className="text-white/10" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-white sm:text-base">
                  {cert.title}
                </h3>
                {cert.issuer && (
                  <p className="text-xs text-zinc-400 sm:text-sm">
                    {cert.issuer}
                  </p>
                )}
                {formatDate(cert) && (
                  <p className="mt-0.5 text-xs text-zinc-600">
                    {formatDate(cert)}
                  </p>
                )}
                {cert.credentialId && (
                  <p className="mt-0.5 text-xs text-zinc-600">
                    Credential ID: {cert.credentialId}
                  </p>
                )}

                {/* Skills */}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-cyan-500/10 px-2 py-0.5 text-[10px] font-medium text-cyan-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="mt-3 flex items-center gap-1.5">
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-7 items-center gap-1.5 rounded-lg bg-white/3 px-2.5 text-[11px] text-zinc-500 transition-colors hover:text-cyan-400"
                    >
                      <HiExternalLink size={12} />
                      Show credential
                    </a>
                  )}
                  <button
                    onClick={() => openEdit(cert)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/3 text-zinc-600 transition-colors hover:text-cyan-400"
                    aria-label="Edit certificate"
                  >
                    <HiPencil size={13} />
                  </button>
                  <button
                    onClick={() => handleDelete(cert._id)}
                    disabled={deleting === cert._id}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/3 text-zinc-600 transition-colors hover:text-red-400 disabled:opacity-50"
                    aria-label="Delete certificate"
                  >
                    {deleting === cert._id ? (
                      <LuLoader size={13} className="animate-spin" />
                    ) : (
                      <HiTrash size={13} />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* LinkedIn-style Modal */}
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
              className="fixed inset-x-4 top-[5%] z-50 mx-auto max-h-[90vh] max-w-lg overflow-y-auto rounded-2xl border border-white/6 bg-[#0e0e0e] shadow-2xl sm:inset-x-auto"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/6 bg-[#0e0e0e] px-6 py-4">
                <h3 className="text-lg font-bold text-white">
                  {editing ? "Edit Certification" : "Add Certification"}
                </h3>
                <button
                  onClick={() => !saving && setShowModal(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/4 text-zinc-500 hover:text-white"
                  aria-label="Close modal"
                >
                  <HiX size={16} />
                </button>
              </div>

              <div className="space-y-5 p-6">
                {/* Name + Priority */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
                  <div className="sm:col-span-3">
                    <label className={labelCls}>
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                      className={inputCls}
                      placeholder="Ex: Microsoft Certified Network Associate Security"
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Priority</label>
                    <input
                      type="number"
                      min={1}
                      value={form.order || ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          order: parseInt(e.target.value) || 0,
                        })
                      }
                      className={inputCls}
                      placeholder="1"
                    />
                    <p className="mt-1 text-[10px] text-zinc-600">
                      1 = first
                    </p>
                  </div>
                </div>

                {/* Issuing Organization */}
                <div>
                  <label className={labelCls}>Issuing Organization</label>
                  <input
                    type="text"
                    value={form.issuer}
                    onChange={(e) =>
                      setForm({ ...form, issuer: e.target.value })
                    }
                    className={inputCls}
                    placeholder="Ex: Microsoft"
                  />
                </div>

                {/* Issue Date */}
                <div>
                  <label className={labelCls}>Issue Date</label>
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={form.issueMonth}
                      onChange={(e) =>
                        setForm({ ...form, issueMonth: e.target.value })
                      }
                      className={selectCls}
                      aria-label="Issue month"
                    >
                      <option value="">Month</option>
                      {MONTHS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                    <select
                      value={form.issueYear}
                      onChange={(e) =>
                        setForm({ ...form, issueYear: e.target.value })
                      }
                      className={selectCls}
                      aria-label="Issue year"
                    >
                      <option value="">Year</option>
                      {YEARS.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Expiration Date */}
                <div>
                  <label className={labelCls}>Expiration Date</label>
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={form.expirationMonth}
                      onChange={(e) =>
                        setForm({ ...form, expirationMonth: e.target.value })
                      }
                      className={selectCls}
                      aria-label="Expiration month"
                    >
                      <option value="">Month</option>
                      {MONTHS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                    <select
                      value={form.expirationYear}
                      onChange={(e) =>
                        setForm({ ...form, expirationYear: e.target.value })
                      }
                      className={selectCls}
                      aria-label="Expiration year"
                    >
                      <option value="">Year</option>
                      {YEARS.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Credential ID */}
                <div>
                  <label className={labelCls}>Credential ID</label>
                  <input
                    type="text"
                    value={form.credentialId}
                    onChange={(e) =>
                      setForm({ ...form, credentialId: e.target.value })
                    }
                    className={inputCls}
                    placeholder="Ex: WEB11-1097"
                  />
                </div>

                {/* Credential URL */}
                <div>
                  <label className={labelCls}>Credential URL</label>
                  <input
                    type="url"
                    value={form.credentialUrl}
                    onChange={(e) =>
                      setForm({ ...form, credentialUrl: e.target.value })
                    }
                    className={inputCls}
                    placeholder="https://..."
                  />
                </div>

                {/* Skills */}
                <div>
                  <label className={labelCls}>Skills</label>
                  <p className="mb-2 text-[11px] text-zinc-600">
                    Associate skills to this certification. Type to search or
                    select from suggestions.
                  </p>

                  {form.skills.length > 0 && (
                    <div className="mb-2.5 flex flex-wrap gap-2">
                      {form.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1 rounded-lg bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-400"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="ml-0.5 text-cyan-400/60 transition-colors hover:text-cyan-300"
                            aria-label={`Remove ${skill}`}
                          >
                            <HiX size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="relative" ref={skillSuggestionsRef}>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => {
                          setSkillInput(e.target.value);
                          setShowSkillSuggestions(true);
                        }}
                        onFocus={() => setShowSkillSuggestions(true)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === ",") {
                            e.preventDefault();
                            addSkill();
                          }
                          if (e.key === "Escape") setShowSkillSuggestions(false);
                        }}
                        className={inputCls}
                        placeholder="Type or select skill..."
                      />
                      <button
                        type="button"
                        onClick={() => addSkill()}
                        disabled={!skillInput.trim()}
                        className="shrink-0 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2.5 text-xs font-medium text-cyan-400 transition-colors hover:bg-cyan-500/20 disabled:opacity-40"
                      >
                        Add
                      </button>
                    </div>

                    <AnimatePresence>
                      {showSkillSuggestions &&
                        filteredSkillSuggestions.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.15 }}
                            className="absolute z-50 mt-1.5 max-h-48 w-full overflow-y-auto rounded-xl border border-white/10 bg-zinc-900 shadow-2xl"
                          >
                            {filteredSkillSuggestions.slice(0, 20).map((s) => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => addSkill(s)}
                                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-zinc-300 transition-colors hover:bg-cyan-500/10 hover:text-cyan-400"
                              >
                                <HiPlus
                                  size={12}
                                  className="shrink-0 text-cyan-500/60"
                                />
                                {s}
                              </button>
                            ))}
                          </motion.div>
                        )}
                    </AnimatePresence>

                    {!showSkillSuggestions && form.skills.length === 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {SKILL_SUGGESTIONS.slice(0, 8).map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => addSkill(s)}
                            className="rounded-lg border border-white/6 bg-white/3 px-2.5 py-1 text-[11px] text-zinc-500 transition-colors hover:border-cyan-500/30 hover:text-cyan-400"
                          >
                            + {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Media / Image Upload */}
                <div>
                  <label className={labelCls}>Media</label>
                  <p className="mb-2 text-[11px] text-zinc-600">
                    Add certificate image, screenshot, or document preview.
                  </p>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    aria-label="Upload certificate media"
                  />

                  {imagePreview ? (
                    <div className="relative overflow-hidden rounded-xl border border-white/6">
                      <div className="relative aspect-video w-full bg-white">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          fill
                          className="object-contain"
                          sizes="(max-width: 512px) 100vw, 512px"
                        />
                      </div>
                      <div className="flex items-center justify-between border-t border-white/6 bg-white/2 px-3 py-2">
                        <span className="truncate text-xs text-zinc-500">
                          {imageFile?.name || "Current image"}
                        </span>
                        <div className="flex gap-1.5">
                          <button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            className="rounded-lg bg-white/4 px-2.5 py-1 text-[11px] text-zinc-400 transition-colors hover:text-white"
                          >
                            Replace
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setImageFile(null);
                              setImagePreview("");
                              if (fileRef.current) fileRef.current.value = "";
                            }}
                            className="rounded-lg bg-white/4 px-2.5 py-1 text-[11px] text-red-400 transition-colors hover:text-red-300"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="flex w-full items-center gap-3 rounded-xl border-2 border-dashed border-white/8 bg-white/2 px-4 py-4 transition-all hover:border-cyan-500/30 hover:bg-white/3"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/4">
                        <HiPhotograph size={20} className="text-zinc-500" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-zinc-300">
                          Add media
                        </p>
                        <p className="text-[11px] text-zinc-600">
                          Images, screenshots, documents
                        </p>
                      </div>
                    </button>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 flex gap-3 border-t border-white/6 bg-[#0e0e0e] px-6 py-4">
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
                  ) : editing ? (
                    "Save Changes"
                  ) : (
                    "Add Certification"
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
