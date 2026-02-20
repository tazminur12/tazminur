"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  HiMail,
  HiTrash,
  HiReply,
  HiEye,
  HiX,
  HiSearch,
  HiCheck,
} from "react-icons/hi";
import { LuLoader } from "react-icons/lu";
import Swal from "sweetalert2";

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

function timeAgo(dateStr: string) {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

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

export default function DashboardContact() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const unreadCount = messages.filter((m) => !m.read).length;

  const filtered = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase())
  );

  const markRead = async (msg: Message) => {
    if (msg.read) return;
    try {
      await fetch(`/api/messages/${msg._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });
      setMessages((prev) =>
        prev.map((m) => (m._id === msg._id ? { ...m, read: true } : m))
      );
    } catch {
      console.error("Failed to mark as read");
    }
  };

  const markAllRead = async () => {
    try {
      await fetch("/api/messages/read-all", { method: "PUT" });
      setMessages((prev) => prev.map((m) => ({ ...m, read: true })));
      toast("success", "All messages marked as read");
    } catch {
      toast("error", "Failed to mark all as read");
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Message?",
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
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      if (selected?._id === id) setSelected(null);
      await fetchMessages();
      toast("success", "Message deleted");
    } catch {
      toast("error", "Failed to delete message");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">
            Messages
            {unreadCount > 0 && (
              <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan-500 px-1.5 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </h2>
          <p className="text-sm text-zinc-500">
            Contact form submissions from your portfolio ({messages.length})
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 rounded-xl border border-white/6 bg-white/3 px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            <HiCheck size={14} />
            Mark all read
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-white/6 bg-[#0e0e0e] px-4 py-2.5">
        <HiSearch size={16} className="text-zinc-600" />
        <input
          type="text"
          placeholder="Search messages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border-0 bg-transparent text-sm text-zinc-300 outline-none placeholder:text-zinc-700"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <LuLoader className="h-5 w-5 animate-spin text-zinc-500" />
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="space-y-2 lg:col-span-2">
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-white/4 bg-[#0e0e0e] p-12 text-center text-sm text-zinc-600">
                {search ? "No messages match your search." : "No messages yet."}
              </div>
            ) : (
              filtered.map((msg, i) => (
                <motion.button
                  key={msg._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => {
                    setSelected(msg);
                    markRead(msg);
                  }}
                  className={`w-full rounded-xl border p-4 text-left transition-all ${
                    selected?._id === msg._id
                      ? "border-cyan-500/30 bg-cyan-500/4"
                      : "border-white/4 bg-[#0e0e0e] hover:border-white/8"
                  }`}
                >
                  <div className="mb-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {!msg.read && (
                        <span className="h-2 w-2 shrink-0 rounded-full bg-cyan-500" />
                      )}
                      <span
                        className={`truncate text-sm font-medium ${
                          msg.read ? "text-zinc-400" : "text-white"
                        }`}
                      >
                        {msg.name}
                      </span>
                    </div>
                    <span className="shrink-0 text-[10px] text-zinc-700">
                      {timeAgo(msg.createdAt)}
                    </span>
                  </div>
                  {msg.subject && (
                    <p className="line-clamp-1 text-xs font-medium text-zinc-500">
                      {msg.subject}
                    </p>
                  )}
                  <p className="mt-0.5 line-clamp-1 text-xs text-zinc-600">
                    {msg.email}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-zinc-500">
                    {msg.message}
                  </p>
                </motion.button>
              ))
            )}
          </div>

          <div className="lg:col-span-3">
            {selected ? (
              <motion.div
                key={selected._id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-white/4 bg-[#0e0e0e] p-6"
              >
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-cyan-500 to-purple-600 text-sm font-bold text-white">
                      {selected.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-base font-semibold text-white">
                        {selected.name}
                      </div>
                      <div className="truncate text-xs text-zinc-500">
                        {selected.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="mr-2 shrink-0 text-xs text-zinc-700">
                      {timeAgo(selected.createdAt)}
                    </span>
                    <button
                      onClick={() => handleDelete(selected._id)}
                      disabled={deleting === selected._id}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/3 text-zinc-600 transition-colors hover:text-red-400 disabled:opacity-50"
                      title="Delete"
                    >
                      {deleting === selected._id ? (
                        <LuLoader size={14} className="animate-spin" />
                      ) : (
                        <HiTrash size={14} />
                      )}
                    </button>
                    <button
                      onClick={() => setSelected(null)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/3 text-zinc-600 transition-colors hover:text-white lg:hidden"
                      aria-label="Close"
                    >
                      <HiX size={14} />
                    </button>
                  </div>
                </div>

                {selected.subject && (
                  <div className="mb-4 text-sm font-medium text-zinc-300">
                    Subject: {selected.subject}
                  </div>
                )}

                <div className="mb-6 rounded-xl bg-white/2 p-5">
                  <p className="text-sm leading-relaxed text-zinc-300">
                    {selected.message}
                  </p>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${selected.subject || "Your message"}`}
                    className="flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-purple-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-cyan-500/20"
                  >
                    <HiReply size={14} />
                    Reply via Email
                  </a>
                </div>
              </motion.div>
            ) : (
              <div className="flex h-full min-h-[300px] items-center justify-center rounded-2xl border border-white/4 bg-[#0e0e0e]">
                <div className="text-center">
                  {messages.length === 0 ? (
                    <>
                      <HiMail size={32} className="mx-auto mb-2 text-zinc-800" />
                      <p className="text-sm text-zinc-600">
                        No messages yet. They&apos;ll appear here when someone contacts you.
                      </p>
                    </>
                  ) : (
                    <>
                      <HiEye size={32} className="mx-auto mb-2 text-zinc-800" />
                      <p className="text-sm text-zinc-600">
                        Select a message to view
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
