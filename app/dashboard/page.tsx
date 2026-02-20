"use client";

import { motion } from "framer-motion";
import {
  HiCollection,
  HiBadgeCheck,
  HiChat,
  HiMail,
  HiTrendingUp,
  HiEye,
  HiCursorClick,
} from "react-icons/hi";
import Link from "next/link";

const statsCards = [
  {
    label: "Total Projects",
    value: "12",
    change: "+2 this month",
    icon: HiCollection,
    color: "from-cyan-500 to-blue-500",
    href: "/dashboard/projects",
  },
  {
    label: "Certificates",
    value: "6",
    change: "+1 this month",
    icon: HiBadgeCheck,
    color: "from-purple-500 to-pink-500",
    href: "/dashboard/certificates",
  },
  {
    label: "Testimonials",
    value: "8",
    change: "+3 this month",
    icon: HiChat,
    color: "from-amber-500 to-orange-500",
    href: "/dashboard/testimonials",
  },
  {
    label: "Messages",
    value: "24",
    change: "5 unread",
    icon: HiMail,
    color: "from-green-500 to-emerald-500",
    href: "/dashboard/contact",
  },
];

const siteStats = [
  { label: "Page Views", value: "4,821", icon: HiEye },
  { label: "Click Rate", value: "12.4%", icon: HiCursorClick },
  { label: "Growth", value: "+28%", icon: HiTrendingUp },
];

const recentActivity = [
  { action: "Added new project", item: "E-Commerce Platform", time: "2 hours ago" },
  { action: "New message from", item: "Sarah Johnson", time: "5 hours ago" },
  { action: "Updated certificate", item: "AWS Cloud Practitioner", time: "1 day ago" },
  { action: "New testimonial by", item: "Michael Chen", time: "2 days ago" },
  { action: "Added new project", item: "Task Management App", time: "3 days ago" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.08 },
  }),
};

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
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

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statsCards.map((card, i) => (
          <motion.div
            key={card.label}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <Link
              href={card.href}
              className="group relative block overflow-hidden rounded-2xl border border-white/[0.04] bg-[#0e0e0e] p-5 transition-all hover:border-white/[0.08]"
            >
              <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${card.color} opacity-[0.06] blur-2xl transition-opacity group-hover:opacity-[0.12]`} />
              <div className="mb-4 flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${card.color}`}>
                  <card.icon size={18} className="text-white" />
                </div>
                <span className="text-[11px] font-medium text-zinc-600">
                  {card.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-white">{card.value}</div>
              <div className="mt-0.5 text-sm text-zinc-500">{card.label}</div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Site stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="rounded-2xl border border-white/[0.04] bg-[#0e0e0e] p-5 lg:col-span-1"
        >
          <h3 className="mb-4 text-sm font-semibold text-zinc-300">
            Site Analytics
          </h3>
          <div className="space-y-4">
            {siteStats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between rounded-xl bg-white/[0.02] px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <stat.icon size={16} className="text-zinc-600" />
                  <span className="text-sm text-zinc-400">{stat.label}</span>
                </div>
                <span className="text-sm font-semibold text-white">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent activity */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="rounded-2xl border border-white/[0.04] bg-[#0e0e0e] p-5 lg:col-span-2"
        >
          <h3 className="mb-4 text-sm font-semibold text-zinc-300">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivity.map((act, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl bg-white/[0.02] px-4 py-3"
              >
                <div className="h-2 w-2 shrink-0 rounded-full bg-cyan-500/40" />
                <p className="flex-1 text-sm text-zinc-400">
                  {act.action}{" "}
                  <span className="font-medium text-zinc-200">{act.item}</span>
                </p>
                <span className="shrink-0 text-xs text-zinc-700">
                  {act.time}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
