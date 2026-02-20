"use client";

import { useState } from "react";
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

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
}

const initialMessages: Message[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@techstart.com",
    message:
      "Hi Tazminur, I'd love to discuss a new e-commerce project for our company. Are you available for a call this week?",
    date: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael@dataflow.io",
    message:
      "Great work on the dashboard! We'd like to extend the project with some additional features. Can you send me a quote?",
    date: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily@creativehub.co",
    message:
      "I saw your portfolio and I'm very impressed. We're looking for a developer to rebuild our website from scratch.",
    date: "1 day ago",
    read: true,
  },
  {
    id: 4,
    name: "David Park",
    email: "david@innovatelab.com",
    message:
      "Would you be interested in a long-term contract? We need a full stack developer for our SaaS product.",
    date: "2 days ago",
    read: true,
  },
  {
    id: 5,
    name: "Anna Williams",
    email: "anna@design.co",
    message:
      "Hey! I'm a designer and looking for a developer partner for freelance projects. Let me know if you're interested.",
    date: "3 days ago",
    read: true,
  },
];

export default function DashboardContact() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [selected, setSelected] = useState<Message | null>(null);
  const [search, setSearch] = useState("");

  const unreadCount = messages.filter((m) => !m.read).length;

  const filtered = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase())
  );

  const markRead = (id: number) => {
    setMessages(messages.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  const handleDelete = (id: number) => {
    setMessages(messages.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const markAllRead = () => {
    setMessages(messages.map((m) => ({ ...m, read: true })));
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
            Contact form submissions from your portfolio
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            <HiCheck size={14} />
            Mark all read
          </button>
        )}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-[#0e0e0e] px-4 py-2.5">
        <HiSearch size={16} className="text-zinc-600" />
        <input
          type="text"
          placeholder="Search messages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border-0 bg-transparent text-sm text-zinc-300 outline-none placeholder:text-zinc-700"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Message list */}
        <div className="space-y-2 lg:col-span-2">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-white/[0.04] bg-[#0e0e0e] p-12 text-center text-sm text-zinc-600">
              No messages found.
            </div>
          ) : (
            filtered.map((msg, i) => (
              <motion.button
                key={msg.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => {
                  setSelected(msg);
                  markRead(msg.id);
                }}
                className={`w-full rounded-xl border p-4 text-left transition-all ${
                  selected?.id === msg.id
                    ? "border-cyan-500/30 bg-cyan-500/[0.04]"
                    : "border-white/[0.04] bg-[#0e0e0e] hover:border-white/[0.08]"
                }`}
              >
                <div className="mb-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {!msg.read && (
                      <span className="h-2 w-2 rounded-full bg-cyan-500" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        msg.read ? "text-zinc-400" : "text-white"
                      }`}
                    >
                      {msg.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-700">{msg.date}</span>
                </div>
                <p className="line-clamp-1 text-xs text-zinc-600">
                  {msg.email}
                </p>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-zinc-500">
                  {msg.message}
                </p>
              </motion.button>
            ))
          )}
        </div>

        {/* Message detail */}
        <div className="lg:col-span-3">
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-white/[0.04] bg-[#0e0e0e] p-6"
            >
              {/* Header */}
              <div className="mb-6 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 text-sm font-bold text-white">
                    {selected.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-base font-semibold text-white">
                      {selected.name}
                    </div>
                    <div className="text-xs text-zinc-500">{selected.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="mr-2 text-xs text-zinc-700">
                    {selected.date}
                  </span>
                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.03] text-zinc-600 transition-colors hover:text-red-400"
                    title="Delete"
                  >
                    <HiTrash size={14} />
                  </button>
                  <button
                    onClick={() => setSelected(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.03] text-zinc-600 transition-colors hover:text-white lg:hidden"
                  >
                    <HiX size={14} />
                  </button>
                </div>
              </div>

              {/* Message body */}
              <div className="mb-6 rounded-xl bg-white/[0.02] p-5">
                <p className="text-sm leading-relaxed text-zinc-300">
                  {selected.message}
                </p>
              </div>

              {/* Reply area */}
              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-500">
                  Quick Reply
                </label>
                <textarea
                  rows={3}
                  className="mb-3 w-full resize-none rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-cyan-500/40"
                  placeholder="Type your reply..."
                />
                <div className="flex gap-2">
                  <a
                    href={`mailto:${selected.email}`}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-cyan-500/20"
                  >
                    <HiReply size={14} />
                    Reply via Email
                  </a>
                  <button className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-400 transition-colors hover:text-white">
                    <HiMail size={14} />
                    Send
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex h-full min-h-[300px] items-center justify-center rounded-2xl border border-white/[0.04] bg-[#0e0e0e]">
              <div className="text-center">
                <HiEye size={32} className="mx-auto mb-2 text-zinc-800" />
                <p className="text-sm text-zinc-600">
                  Select a message to view
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
