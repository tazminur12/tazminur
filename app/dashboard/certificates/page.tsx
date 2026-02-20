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
} from "react-icons/hi";

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  image: string;
}

const initialCerts: Certificate[] = [
  {
    id: 1,
    title: "Full Stack Web Development",
    issuer: "Coursera",
    date: "2024",
    credentialUrl: "#",
    image: "",
  },
  {
    id: 2,
    title: "React Developer Certificate",
    issuer: "Meta",
    date: "2024",
    credentialUrl: "#",
    image: "",
  },
  {
    id: 3,
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2023",
    credentialUrl: "#",
    image: "",
  },
];

const emptyCert: Omit<Certificate, "id"> = {
  title: "",
  issuer: "",
  date: "",
  credentialUrl: "",
  image: "",
};

export default function DashboardCertificates() {
  const [certs, setCerts] = useState<Certificate[]>(initialCerts);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Certificate | null>(null);
  const [form, setForm] = useState(emptyCert);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyCert);
    setShowModal(true);
  };

  const openEdit = (c: Certificate) => {
    setEditing(c);
    setForm({ ...c });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editing) {
      setCerts(certs.map((c) => (c.id === editing.id ? { ...form, id: c.id } : c)));
    } else {
      setCerts([...certs, { ...form, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    setCerts(certs.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Certificates</h2>
          <p className="text-sm text-zinc-500">
            Manage your certifications and achievements
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-cyan-500/20"
        >
          <HiPlus size={16} />
          Add Certificate
        </button>
      </div>

      {/* Card grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certs.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="group overflow-hidden rounded-2xl border border-white/[0.04] bg-[#0e0e0e] transition-all hover:border-white/[0.08]"
          >
            {/* Image area */}
            <div className="flex h-32 items-center justify-center bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
              <HiPhotograph size={28} className="text-white/10" />
            </div>

            <div className="p-4">
              <h3 className="mb-0.5 text-sm font-semibold text-white">
                {cert.title}
              </h3>
              <p className="mb-3 text-xs text-zinc-600">
                {cert.issuer} &middot; {cert.date}
              </p>

              <div className="flex items-center gap-1.5">
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 items-center gap-1.5 rounded-lg bg-white/[0.03] px-3 text-xs text-zinc-500 transition-colors hover:text-cyan-400"
                >
                  <HiExternalLink size={12} />
                  View
                </a>
                <button
                  onClick={() => openEdit(cert)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.03] text-zinc-600 transition-colors hover:text-cyan-400"
                >
                  <HiPencil size={13} />
                </button>
                <button
                  onClick={() => handleDelete(cert.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.03] text-zinc-600 transition-colors hover:text-red-400"
                >
                  <HiTrash size={13} />
                </button>
              </div>
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
                  {editing ? "Edit Certificate" : "Add Certificate"}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] text-zinc-500 hover:text-white"
                >
                  <HiX size={16} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex h-28 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-white/[0.06] bg-white/[0.02] transition-colors hover:border-cyan-500/30">
                  <div className="text-center">
                    <HiPhotograph size={24} className="mx-auto mb-1 text-zinc-600" />
                    <p className="text-xs text-zinc-600">Upload certificate image</p>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-400">Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-cyan-500/40"
                    placeholder="Certificate title"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-zinc-400">Issuer</label>
                    <input
                      type="text"
                      value={form.issuer}
                      onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                      className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-cyan-500/40"
                      placeholder="e.g. Coursera"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-zinc-400">Date</label>
                    <input
                      type="text"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-cyan-500/40"
                      placeholder="2024"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-400">Credential URL</label>
                  <input
                    type="url"
                    value={form.credentialUrl}
                    onChange={(e) => setForm({ ...form, credentialUrl: e.target.value })}
                    className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-cyan-500/40"
                    placeholder="https://..."
                  />
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
                  {editing ? "Save Changes" : "Add Certificate"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
