"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  HiCollection,
  HiBadgeCheck,
  HiChat,
  HiMail,
  HiSparkles,
  HiArrowRight,
  HiPlus,
} from "react-icons/hi";
import { LuLoader, LuActivity, LuServer, LuShieldCheck } from "react-icons/lu";
import Link from "next/link";
import TiltCard from "../components/motion/TiltCard";
import MagneticButton from "../components/motion/MagneticButton";

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
    label: "Active Projects",
    icon: HiCollection,
    color: "from-cyan-400 to-blue-500",
    glow: "rgba(6, 182, 212, 0.2)",
    href: "/dashboard/projects",
  },
  {
    key: "certificates" as const,
    label: "Accreditations",
    icon: HiBadgeCheck,
    color: "from-purple-400 to-pink-500",
    glow: "rgba(168, 85, 247, 0.2)",
    href: "/dashboard/certificates",
  },
  {
    key: "testimonials" as const,
    label: "Client Reviews",
    icon: HiChat,
    color: "from-amber-400 to-orange-500",
    glow: "rgba(245, 158, 11, 0.2)",
    href: "/dashboard/testimonials",
  },
  {
    key: "messages" as const,
    label: "Inbox Inquiries",
    icon: HiMail,
    color: "from-emerald-400 to-teal-500",
    glow: "rgba(16, 185, 129, 0.2)",
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
  project: "bg-cyan-400 shadow-[0_0_8px_#06b6d4]",
  certificate: "bg-purple-400 shadow-[0_0_8px_#a855f7]",
  testimonial: "bg-amber-400 shadow-[0_0_8px_#f59e0b]",
  message: "bg-emerald-400 shadow-[0_0_8px_#10b981]",
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
      <div className="flex flex-col items-center justify-center py-32 text-cyan-400">
        <LuLoader className="h-8 w-8 animate-spin mb-3" />
        <span className="font-mono text-xs text-zinc-400">CONNECTING TO ORBITAL KERNEL...</span>
      </div>
    );
  }

  const counts = stats?.counts ?? { projects: 0, certificates: 0, testimonials: 0, messages: 0 };
  const activity = stats?.activity ?? [];
  const unread = stats?.unreadMessages ?? 0;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ─── Hero Overview Banner ─── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel-elevated aurora-border p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-950/20 px-3 py-1 text-[11px] font-mono text-cyan-300 mb-2">
            <HiSparkles /> SESSION ACTIVE // LEVEL 4 ROOT
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Welcome back, <span className="gradient-text">Tanim</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            All database nodes operational. Next.js 16 cluster responding with sub-millisecond latency.
          </p>
        </div>

        {/* Quick Launch Button */}
        <div className="flex items-center gap-3">
          <MagneticButton intensity={0.25}>
            <Link
              href="/dashboard/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-linear-to-r from-cyan-500 to-purple-600 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:scale-102 transition-transform"
            >
              <HiPlus size={16} />
              <span>Add Artifact</span>
            </Link>
          </MagneticButton>
        </div>
      </motion.div>

      {/* ─── Metric Matrix Cards ─── */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cardMeta.map((card, i) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <TiltCard className="p-6 h-full flex flex-col justify-between">
              <Link href={card.href} className="block">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br ${card.color} text-white shadow-lg`}
                  >
                    <card.icon size={20} />
                  </div>
                  {card.key === "messages" && unread > 0 ? (
                    <span className="rounded-full bg-cyan-500/20 border border-cyan-400/40 px-2.5 py-0.5 text-[10px] font-mono font-bold text-cyan-300 animate-pulse">
                      {unread} NEW
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-zinc-500">
                      0{i + 1} {"//"}
                    </span>
                  )}
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {counts[card.key]}
                  </div>
                  <div className="text-xs font-mono text-zinc-400 mt-1 uppercase tracking-wider">
                    {card.label}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/6 text-[11px] font-mono text-cyan-400">
                  <span>Open Ledger</span>
                  <HiArrowRight size={12} />
                </div>
              </Link>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      {/* ─── Real-Time Telemetry & Activity Stream ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Activity Stream (8 cols) */}
        <div className="lg:col-span-8">
          <TiltCard className="p-6 sm:p-7">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/8">
              <div className="flex items-center gap-2.5">
                <LuActivity className="text-cyan-400" size={18} />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Real-Time Audit Ledger
                </h3>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">EVENT FEED</span>
            </div>

            {activity.length === 0 ? (
              <div className="py-12 text-center text-xs font-mono text-zinc-500">
                NO RECENT TELEMETRY EVENTS RECORDED
              </div>
            ) : (
              <div className="space-y-3">
                {activity.map((act, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/6 hover:border-cyan-400/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                          activityColors[act.type] || "bg-zinc-500"
                        }`}
                      />
                      <p className="text-xs sm:text-sm text-zinc-300">
                        {act.text}{" "}
                        <span className="font-bold text-white">{act.item}</span>
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 shrink-0">
                      {timeAgo(act.time)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </TiltCard>
        </div>

        {/* System Health Nodes (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <TiltCard className="p-6">
            <div className="flex items-center gap-2 mb-4 text-emerald-400">
              <LuServer size={18} />
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Cluster Health
              </h4>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between py-2 border-b border-white/6">
                <span className="text-zinc-500">Next.js Edge</span>
                <span className="text-emerald-400">ONLINE [200]</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/6">
                <span className="text-zinc-500">MongoDB Atlas</span>
                <span className="text-emerald-400">STABLE [PRIMARY]</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/6">
                <span className="text-zinc-500">Cloudinary Media</span>
                <span className="text-cyan-400">CDN ROUTED</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-zinc-500">JWT Gatekeeper</span>
                <span className="text-purple-400">JOSE v6 VERIFIED</span>
              </div>
            </div>
          </TiltCard>

          <TiltCard className="p-6">
            <div className="flex items-center gap-2 mb-3 text-cyan-400">
              <LuShieldCheck size={18} />
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Security Enclave
              </h4>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans mb-3">
              Route middleware actively enforcing HttpOnly cookie validation on all `/dashboard` endpoints.
            </p>
            <div className="text-[10px] font-mono text-emerald-400">
              &bull; 0 UNAUTHORIZED INTRUSIONS
            </div>
          </TiltCard>
        </div>
      </div>
    </div>
  );
}
