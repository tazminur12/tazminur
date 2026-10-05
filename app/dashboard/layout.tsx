"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiHome,
  HiCollection,
  HiBadgeCheck,
  HiChat,
  HiMail,
  HiMenu,
  HiX,
  HiArrowLeft,
  HiPhotograph,
  HiLogout,
  HiSparkles,
} from "react-icons/hi";

const sidebarLinks = [
  { name: "Overview Telemetry", href: "/dashboard", icon: HiHome },
  { name: "Profile Visual", href: "/dashboard/picture", icon: HiPhotograph },
  { name: "Projects Ledger", href: "/dashboard/projects", icon: HiCollection },
  { name: "Certifications", href: "/dashboard/certificates", icon: HiBadgeCheck },
  { name: "Testimonials", href: "/dashboard/testimonials", icon: HiChat },
  { name: "Inbox Transmissions", href: "/dashboard/contact", icon: HiMail },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/dashboard/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/dashboard/login");
    router.refresh();
  };

  const currentPage =
    sidebarLinks.find(
      (l) =>
        (l.href === "/dashboard" && pathname === "/dashboard") ||
        (l.href !== "/dashboard" && pathname.startsWith(l.href))
    )?.name ?? "Mission Control";

  return (
    <div className="flex h-screen overflow-hidden bg-[#020204] text-zinc-200">
      {/* ─── Desktop Sci-Fi Sidebar ─── */}
      <aside className="hidden w-72 shrink-0 flex-col border-r border-white/6 bg-[#05060b]/90 backdrop-blur-3xl lg:flex">
        {/* Brand Terminal Header */}
        <div className="flex h-20 items-center justify-between border-b border-white/6 px-6">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-cyan-400 via-teal-500 to-purple-600 text-sm font-black text-white shadow-lg shadow-cyan-500/25">
              T
              <span className="absolute -inset-0.5 rounded-xl bg-cyan-400 opacity-20 blur-xs" />
            </div>
            <div>
              <div className="text-sm font-black tracking-wider text-white">ORBITAL OS</div>
              <div className="text-[10px] font-mono text-cyan-400">CONTROL CENTER v2.4</div>
            </div>
          </div>
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            PRIMARY DIRECTIVES
          </p>

          {sidebarLinks.map((link) => {
            const isActive =
              (link.href === "/dashboard" && pathname === "/dashboard") ||
              (link.href !== "/dashboard" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative flex items-center gap-3.5 rounded-2xl px-4 py-3 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-cyan-500/15 text-cyan-300 border border-cyan-400/40 shadow-sm shadow-cyan-500/15"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSidebarIndicator"
                    className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-cyan-400 shadow-[0_0_10px_#06b6d4]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <link.icon
                  size={18}
                  className={isActive ? "text-cyan-400" : "text-zinc-500"}
                />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="space-y-2 border-t border-white/6 p-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-medium text-zinc-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <HiArrowLeft size={16} />
            <span>Return to Portfolio</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-medium text-red-400/80 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <HiLogout size={16} />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* ─── Mobile Sidebar ─── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-white/8 bg-[#05060b] p-4 lg:hidden"
            >
              <div className="flex h-14 items-center justify-between border-b border-white/8 px-2 mb-4">
                <span className="text-sm font-bold text-white">ORBITAL OS</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white"
                >
                  <HiX size={18} />
                </button>
              </div>

              <nav className="flex-1 space-y-1 overflow-y-auto">
                {sidebarLinks.map((link) => {
                  const isActive =
                    (link.href === "/dashboard" && pathname === "/dashboard") ||
                    (link.href !== "/dashboard" && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-semibold ${
                        isActive
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30"
                          : "text-zinc-400"
                      }`}
                    >
                      <link.icon size={18} />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ─── Main Content Shell ─── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Telemetry Header */}
        <header className="flex h-20 items-center justify-between border-b border-white/6 px-6 sm:px-8 bg-[#040508]/80 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl bg-white/5 border border-white/8 text-zinc-400 hover:text-white lg:hidden"
            >
              <HiMenu size={20} />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>{currentPage}</span>
                <HiSparkles className="text-cyan-400" size={16} />
              </h1>
              <div className="text-[10px] font-mono text-zinc-500">
                HOST: TAZMINUR.ME // ATLAS CLUSTER ACTIVE
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-[11px] font-mono font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>TELEMETRY SYNCHRONIZED</span>
            </div>
          </div>
        </header>

        {/* Viewport Content */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 antigravity-bg">
          {children}
        </main>
      </div>
    </div>
  );
}
