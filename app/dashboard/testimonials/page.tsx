"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiPlus,
  HiPencil,
  HiTrash,
  HiX,
  HiStar,
} from "react-icons/hi";
import { LuLoader } from "react-icons/lu";
import Swal from "sweetalert2";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  status: "published" | "draft";
  order: number;
}

type TestimonialForm = Omit<Testimonial, "_id">;

const emptyForm: TestimonialForm = {
  name: "",
  role: "",
  content: "",
  rating: 5,
  status: "draft",
  order: 0,
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

export default function DashboardTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<TestimonialForm>(emptyForm);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchTestimonials = useCallback(async () => {
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      setTestimonials(data);
    } catch (err) {
      console.error("Failed to fetch testimonials:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({
      name: t.name,
      role: t.role,
      content: t.content,
      rating: t.rating,
      status: t.status,
      order: t.order,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast("error", "Client name is required");
      return;
    }
    if (!form.content.trim()) {
      toast("error", "Review content is required");
      return;
    }
    setSaving(true);

    try {
      const url = editing
        ? `/api/testimonials/${editing._id}`
        : "/api/testimonials";
      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to save");

      await fetchTestimonials();
      setShowModal(false);
      toast(
        "success",
        editing ? "Testimonial updated successfully!" : "Testimonial added successfully!"
      );
    } catch {
      toast("error", "Failed to save testimonial. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Testimonial?",
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
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      await fetchTestimonials();
      toast("success", "Testimonial deleted successfully!");
    } catch {
      toast("error", "Failed to delete testimonial.");
    } finally {
      setDeleting(null);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-white/6 bg-white/3 px-4 py-2.5 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Testimonials</h2>
          <p className="text-sm text-zinc-500">
            Manage client reviews and feedback ({testimonials.length})
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-purple-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-cyan-500/20"
        >
          <HiPlus size={16} />
          Add Testimonial
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <LuLoader className="h-5 w-5 animate-spin text-zinc-500" />
        </div>
      ) : testimonials.length === 0 ? (
        <div className="rounded-2xl border border-white/4 bg-[#0e0e0e] px-5 py-12 text-center text-sm text-zinc-600">
          No testimonials yet. Add your first one!
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="group rounded-2xl border border-white/4 bg-[#0e0e0e] p-5 transition-all hover:border-white/8"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <HiStar
                      key={s}
                      size={14}
                      className={s < t.rating ? "text-yellow-400" : "text-zinc-800"}
                    />
                  ))}
                </div>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    t.status === "published"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-yellow-500/10 text-yellow-400"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      t.status === "published" ? "bg-green-400" : "bg-yellow-400"
                    }`}
                  />
                  {t.status === "published" ? "Live" : "Draft"}
                </span>
              </div>

              <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-zinc-400">
                &ldquo;{t.content}&rdquo;
              </p>

              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-cyan-500 to-purple-600 text-xs font-bold text-white">
                  {t.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-white">{t.name}</div>
                  <div className="truncate text-xs text-zinc-600">{t.role}</div>
                </div>
              </div>

              <div className="flex gap-1.5 border-t border-white/4 pt-3">
                <button
                  onClick={() => openEdit(t)}
                  className="flex h-8 items-center gap-1.5 rounded-lg bg-white/3 px-3 text-xs text-zinc-500 transition-colors hover:text-cyan-400"
                >
                  <HiPencil size={12} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t._id)}
                  disabled={deleting === t._id}
                  className="flex h-8 items-center gap-1.5 rounded-lg bg-white/3 px-3 text-xs text-zinc-500 transition-colors hover:text-red-400 disabled:opacity-50"
                >
                  {deleting === t._id ? (
                    <LuLoader size={12} className="animate-spin" />
                  ) : (
                    <HiTrash size={12} />
                  )}
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
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
              className="fixed inset-x-4 top-[10%] z-50 mx-auto max-h-[85vh] max-w-md overflow-y-auto rounded-2xl border border-white/6 bg-[#0e0e0e] p-6 shadow-2xl sm:inset-x-auto"
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">
                  {editing ? "Edit Testimonial" : "Add Testimonial"}
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
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                      Client Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputCls}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                      Role / Company
                    </label>
                    <input
                      type="text"
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      className={inputCls}
                      placeholder="CEO, Company"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                    Review
                  </label>
                  <textarea
                    rows={4}
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className={`${inputCls} resize-none`}
                    placeholder="What did the client say..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                      Rating
                    </label>
                    <div className="flex gap-1 py-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setForm({ ...form, rating: star })}
                          className="transition-colors"
                          aria-label={`${star} star`}
                        >
                          <HiStar
                            size={22}
                            className={
                              star <= form.rating
                                ? "text-yellow-400"
                                : "text-zinc-800"
                            }
                          />
                        </button>
                      ))}
                    </div>
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
              </div>

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
                  disabled={saving || !form.name.trim()}
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
                    "Add Testimonial"
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
