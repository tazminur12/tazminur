"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  HiCollection,
  HiBadgeCheck,
  HiChat,
  HiMail,
} from "react-icons/hi";
import { LuLoader } from "react-icons/lu";
import Link from "next/link";

interface Activity {
  type: string;
  text: string;
  item: string;
  time: string;
}

interface Stats {
  counts: {
    projects: number;
    certificates: number;
    testimonials: number;
    messages: number;
  };
  unreadMessages: number;
  activity: Activity[];
}

const cardMeta = [
  {
    key: "projects" as const,
    label: "Total Projects",
    icon: HiCollection,
    color: "from-cyan-500 to-blue-500",
    href: "/dashboard/projects",
  },
  {
    key: "certificates" as const,
    label: "Certificates",
    icon: HiBadgeCheck,
    color: "from-purple-500 to-pink-500",
    href: "/dashboard/certificates",
  },
  {
    key: "testimonials" as const,
    label: "Testimonials",
    icon: HiChat,
    color: "from-amber-500 to-orange-500",
    href: "/dashboard/testimonials",
  },
  {
    key: "messages" as const,
    label: "Messages",
    icon: HiMail,
    color: "from-green-500 to-emerald-500",
    href: "/dashboard/contact",
  },
];

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

const activityColors: Record<string, string> = {
  project: "bg-cyan-500/40",
  certificate: "bg-purple-500/40",
  testimonial: "bg-amber-500/40",
  message: "bg-green-500/40",
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.08 },
  }),
};

export default function DashboardOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to load stats:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <LuLoader className="h-6 w-6 animate-spin text-zinc-500" />
      </div>
    );
  }

  const counts = stats?.counts ?? { projects: 0, certificates: 0, testimonials: 0, messages: 0 };
  const activity = stats?.activity ?? [];
  const unread = stats?.unreadMessages ?? 0;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-white">
          Welcome back, <span className="gradient-text">Tanim</span>
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Here&apos;s what&apos;s happening with your portfolio.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cardMeta.map((card, i) => (
          <motion.div
            key={card.key}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <Link
              href={card.href}
              className="group relative block overflow-hidden rounded-2xl border border-white/4 bg-[#0e0e0e] p-5 transition-all hover:border-white/8"
            >
              <div
                className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-linear-to-br ${card.color} opacity-[0.06] blur-2xl transition-opacity group-hover:opacity-[0.12]`}
              />
              <div className="mb-4 flex items-center justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br ${card.color}`}
                >
                  <card.icon size={18} className="text-white" />
                </div>
                {card.key === "messages" && unread > 0 && (
                  <span className="text-[11px] font-medium text-cyan-400">
                    {unread} unread
                  </span>
                )}
              </div>
              <div className="text-3xl font-bold text-white">
                {counts[card.key]}
              </div>
              <div className="mt-0.5 text-sm text-zinc-500">{card.label}</div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="rounded-2xl border border-white/4 bg-[#0e0e0e] p-5"
      >
        <h3 className="mb-4 text-sm font-semibold text-zinc-300">
          Recent Activity
        </h3>
        {activity.length === 0 ? (
          <p className="py-8 text-center text-sm text-zinc-600">
            No activity yet. Start adding content from the sidebar.
          </p>
        ) : (
          <div className="space-y-3">
            {activity.map((act, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl bg-white/2 px-4 py-3"
              >
                <div
                  className={`h-2 w-2 shrink-0 rounded-full ${activityColors[act.type] || "bg-zinc-500/40"}`}
                />
                <p className="flex-1 text-sm text-zinc-400">
                  {act.text}{" "}
                  <span className="font-medium text-zinc-200">{act.item}</span>
                </p>
                <span className="shrink-0 text-xs text-zinc-700">
                  {timeAgo(act.time)}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
