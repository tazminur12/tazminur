"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiHome,
  HiCollection,
  HiBadgeCheck,
  HiChat,
  HiMail,
  HiMenuAlt2,
  HiX,
  HiArrowLeft,
  HiSearch,
  HiBell,
  HiCog,
} from "react-icons/hi";

const sidebarLinks = [
  { name: "Overview", href: "/dashboard", icon: HiHome },
  { name: "Projects", href: "/dashboard/projects", icon: HiCollection },
  { name: "Certificates", href: "/dashboard/certificates", icon: HiBadgeCheck },
  { name: "Testimonials", href: "/dashboard/testimonials", icon: HiChat },
  { name: "Messages", href: "/dashboard/contact", icon: HiMail },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const currentPage =
    sidebarLinks.find(
      (l) =>
        (l.href === "/dashboard" && pathname === "/dashboard") ||
        (l.href !== "/dashboard" && pathname.startsWith(l.href))
    )?.name ?? "Dashboard";

  return (
    <div className="flex h-screen overflow-hidden bg-[#060606]">
      {/* --- Sidebar (desktop) --- */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/[0.04] bg-[#0a0a0a] lg:flex">
        {/* Brand */}
        <div className="flex h-16 items-center gap-3 border-b border-white/[0.04] px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 text-xs font-bold text-white">
            T
          </div>
          <div>
            <span className="text-sm font-bold text-white">Tanim</span>
            <span className="text-sm font-bold text-zinc-600">.dev</span>
          </div>
          <span className="ml-auto rounded-md bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-400">
            Admin
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
            Menu
          </p>
          {sidebarLinks.map((link) => {
            const isActive =
              (link.href === "/dashboard" && pathname === "/dashboard") ||
              (link.href !== "/dashboard" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "text-zinc-500 hover:bg-white/[0.03] hover:text-zinc-300"
                }`}
              >
                <link.icon
                  size={18}
                  className={isActive ? "text-cyan-400" : "text-zinc-600 group-hover:text-zinc-400"}
                />
                {link.name}
                {isActive && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-white/[0.04] p-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-500 transition-colors hover:bg-white/[0.03] hover:text-white"
          >
            <HiArrowLeft size={16} />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* --- Mobile sidebar overlay --- */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-white/[0.04] bg-[#0a0a0a] lg:hidden"
            >
              <div className="flex h-14 items-center justify-between border-b border-white/[0.04] px-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 text-xs font-bold text-white">
                    T
                  </div>
                  <span className="text-sm font-bold text-white">Dashboard</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.04] text-zinc-500"
                >
                  <HiX size={14} />
                </button>
              </div>
              <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
                {sidebarLinks.map((link) => {
                  const isActive =
                    (link.href === "/dashboard" && pathname === "/dashboard") ||
                    (link.href !== "/dashboard" && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                        isActive
                          ? "bg-cyan-500/10 text-cyan-400"
                          : "text-zinc-500 hover:bg-white/[0.03] hover:text-zinc-300"
                      }`}
                    >
                      <link.icon size={18} />
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
              <div className="border-t border-white/[0.04] p-3">
                <Link
                  href="/"
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-zinc-500 hover:text-white"
                >
                  <HiArrowLeft size={16} />
                  Back to Site
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* --- Main content --- */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center gap-4 border-b border-white/[0.04] bg-[#0a0a0a]/60 px-4 backdrop-blur-md lg:h-16 lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] text-zinc-500 lg:hidden"
          >
            <HiMenuAlt2 size={18} />
          </button>

          <h1 className="text-base font-semibold text-white">{currentPage}</h1>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 sm:flex">
              <HiSearch size={14} className="text-zinc-600" />
              <input
                type="text"
                placeholder="Search..."
                className="w-40 border-0 bg-transparent text-sm text-zinc-300 outline-none placeholder:text-zinc-700"
              />
            </div>
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] text-zinc-500 transition-colors hover:text-white">
              <HiBell size={16} />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-cyan-500" />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] text-zinc-500 transition-colors hover:text-white">
              <HiCog size={16} />
            </button>
            <div className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 text-xs font-bold text-white">
              T
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
