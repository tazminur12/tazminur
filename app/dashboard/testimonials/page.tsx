"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiPlus,
  HiPencil,
  HiTrash,
  HiX,
  HiStar,
} from "react-icons/hi";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  status: "published" | "draft";
}

const initialTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechStart",
    content: "Tazminur delivered an exceptional e-commerce platform that exceeded our expectations.",
    rating: 5,
    status: "published",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager, DataFlow",
    content: "Working with Tazminur was a fantastic experience. He understood our requirements perfectly.",
    rating: 5,
    status: "published",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Founder, CreativeHub",
    content: "Tazminur's full stack expertise is remarkable. He built our entire platform from scratch.",
    rating: 5,
    status: "draft",
  },
];

const emptyTestimonial: Omit<Testimonial, "id"> = {
  name: "",
  role: "",
  content: "",
  rating: 5,
  status: "draft",
};

export default function DashboardTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState(emptyTestimonial);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyTestimonial);
    setShowModal(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({ ...t });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.content.trim()) return;
    if (editing) {
      setTestimonials(
        testimonials.map((t) => (t.id === editing.id ? { ...form, id: t.id } : t))
      );
    } else {
      setTestimonials([...testimonials, { ...form, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    setTestimonials(testimonials.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Testimonials</h2>
          <p className="text-sm text-zinc-500">
            Manage client reviews and feedback
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-cyan-500/20"
        >
          <HiPlus size={16} />
          Add Testimonial
        </button>
      </div>

      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="group rounded-2xl border border-white/[0.04] bg-[#0e0e0e] p-5 transition-all hover:border-white/[0.08]"
          >
            {/* Rating + Status */}
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

            {/* Content */}
            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-zinc-400">
              &ldquo;{t.content}&rdquo;
            </p>

            {/* Author */}
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 text-xs font-bold text-white">
                {t.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-medium text-white">{t.name}</div>
                <div className="text-xs text-zinc-600">{t.role}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-1.5 border-t border-white/[0.04] pt-3">
              <button
                onClick={() => openEdit(t)}
                className="flex h-8 items-center gap-1.5 rounded-lg bg-white/[0.03] px-3 text-xs text-zinc-500 transition-colors hover:text-cyan-400"
              >
                <HiPencil size={12} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(t.id)}
                className="flex h-8 items-center gap-1.5 rounded-lg bg-white/[0.03] px-3 text-xs text-zinc-500 transition-colors hover:text-red-400"
              >
                <HiTrash size={12} />
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
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
              className="fixed inset-x-4 top-[10%] z-50 mx-auto max-w-md rounded-2xl border border-white/[0.06] bg-[#0e0e0e] p-6 shadow-2xl sm:inset-x-auto"
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">
                  {editing ? "Edit Testimonial" : "Add Testimonial"}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] text-zinc-500 hover:text-white"
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
                      className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-cyan-500/40"
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
                      className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-cyan-500/40"
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
                    className="w-full resize-none rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-cyan-500/40"
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
                          onClick={() => setForm({ ...form, rating: star })}
                          className="transition-colors"
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
                      className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-500/40"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.03] py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 py-2.5 text-sm font-medium text-white"
                >
                  {editing ? "Save Changes" : "Add Testimonial"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
