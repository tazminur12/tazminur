"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HiMail, HiLockClosed, HiArrowRight } from "react-icons/hi";
import { LuLoader } from "react-icons/lu";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid credentials");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#060606] px-4">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-purple-500/5 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-500 to-purple-600 text-lg font-bold text-white shadow-lg shadow-cyan-500/20">
            T
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Sign in to access the dashboard
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-white/6 bg-white/2 p-6 backdrop-blur-md sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                Email Address
              </label>
              <div className="relative">
                <HiMail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@example.com"
                  className="w-full rounded-xl border border-white/6 bg-white/3 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                Password
              </label>
              <div className="relative">
                <HiLockClosed
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/6 bg-white/3 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-xs font-medium text-red-400"
              >
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !email || !password}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-purple-600 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-cyan-500/20 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <LuLoader className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <HiArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-zinc-600">
          Protected admin area &bull; Tanim.dev
        </p>
      </motion.div>
    </div>
  );
}
