"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiPhotograph,
  HiUpload,
  HiTrash,
  HiRefresh,
  HiCheckCircle,
  HiEye,
} from "react-icons/hi";
import { LuLoader } from "react-icons/lu";
import Swal from "sweetalert2";

export default function ProfilePicturePage() {
  const [currentUrl, setCurrentUrl] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchPicture = useCallback(async () => {
    try {
      const res = await fetch("/api/settings/profile-picture");
      const data = await res.json();
      setCurrentUrl(data.url || "");
    } catch {
      console.error("Failed to fetch profile picture");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPicture();
  }, [fetchPicture]);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      Swal.fire({
        icon: "error",
        title: "Invalid File",
        text: "Please select an image file (JPG, PNG, WebP, etc.)",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#06b6d4",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "File Too Large",
        text: "Please select an image under 10MB.",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#06b6d4",
      });
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const res = await fetch("/api/settings/profile-picture", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setCurrentUrl(data.url);
      setSelectedFile(null);
      setPreview(null);

      Swal.fire({
        icon: "success",
        title: "Picture Updated!",
        text: "Your profile picture has been updated. It will now appear on the Hero and About sections.",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#06b6d4",
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Something went wrong. Please try again.",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#06b6d4",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Remove Profile Picture?",
      text: "The Hero and About sections will show the fallback avatar.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#374151",
      confirmButtonText: "Yes, remove it",
      background: "#111",
      color: "#fff",
    });

    if (!result.isConfirmed) return;

    setDeleting(true);
    try {
      const res = await fetch("/api/settings/profile-picture", {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      setCurrentUrl("");
      Swal.fire({
        icon: "success",
        title: "Removed!",
        text: "Profile picture has been removed.",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#06b6d4",
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Could not remove the picture. Try again.",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#06b6d4",
      });
    } finally {
      setDeleting(false);
    }
  };

  const cancelPreview = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <LuLoader className="h-8 w-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Profile Picture</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Upload your profile picture. It will appear on the Hero and About
          sections of your site.
        </p>
      </div>

      {/* Current Picture */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-white/6 bg-white/2 p-6"
      >
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-400">
          <HiEye size={16} className="text-cyan-400" />
          Current Picture
        </h3>

        <div className="flex flex-col items-center gap-6 sm:flex-row">
          {/* Hero preview */}
          <div className="text-center">
            <p className="mb-2 text-xs font-medium text-zinc-600">
              Hero Section
            </p>
            <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border-2 border-white/6 sm:h-40 sm:w-40">
              {currentUrl ? (
                <Image
                  src={currentUrl}
                  alt="Profile"
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-cyan-500/10 to-purple-500/10">
                  <span className="text-3xl font-bold text-white/10">TRT</span>
                </div>
              )}
            </div>
          </div>

          {/* About preview */}
          <div className="text-center">
            <p className="mb-2 text-xs font-medium text-zinc-600">
              About Section
            </p>
            <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-2xl border border-white/6 sm:h-40 sm:w-40">
              {currentUrl ? (
                <Image
                  src={currentUrl}
                  alt="Profile"
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-cyan-500/10 to-purple-500/10">
                  <span className="text-3xl font-bold text-white/10">TRT</span>
                </div>
              )}
            </div>
          </div>

          {/* Status info */}
          <div className="flex-1 text-center sm:text-left">
            {currentUrl ? (
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-400">
                  <HiCheckCircle size={14} />
                  Picture Active
                </div>
                <p className="text-xs leading-relaxed text-zinc-500">
                  Your profile picture is live on both the Hero and About
                  sections. Upload a new one to replace it.
                </p>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/20 disabled:opacity-50"
                >
                  {deleting ? (
                    <LuLoader className="h-3 w-3 animate-spin" />
                  ) : (
                    <HiTrash size={13} />
                  )}
                  {deleting ? "Removing..." : "Remove Picture"}
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-zinc-500/10 px-3 py-1.5 text-xs font-medium text-zinc-400">
                  <HiPhotograph size={14} />
                  No Picture
                </div>
                <p className="text-xs leading-relaxed text-zinc-500">
                  Upload a profile picture to personalize your Hero and About
                  sections. A fallback avatar is currently shown.
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Upload Zone */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-white/6 bg-white/2 p-6"
      >
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-400">
          <HiUpload size={16} className="text-cyan-400" />
          Upload New Picture
        </h3>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          aria-label="Upload profile picture"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileSelect(file);
          }}
        />

        <AnimatePresence mode="wait">
          {!preview ? (
            <motion.div
              key="dropzone"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-12 transition-all ${
                dragActive
                  ? "border-cyan-400 bg-cyan-500/6"
                  : "border-white/8 hover:border-white/15 hover:bg-white/2"
              }`}
            >
              <div
                className={`mb-3 flex h-14 w-14 items-center justify-center rounded-full transition-colors ${
                  dragActive
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "bg-white/4 text-zinc-500"
                }`}
              >
                <HiPhotograph size={28} />
              </div>
              <p className="text-sm font-medium text-zinc-300">
                {dragActive
                  ? "Drop your image here"
                  : "Click or drag & drop your image"}
              </p>
              <p className="mt-1 text-xs text-zinc-600">
                JPG, PNG, WebP &bull; Max 10MB &bull; Recommended 400&times;400
                or larger
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-4"
            >
              <div className="flex flex-col items-center gap-6 sm:flex-row">
                {/* Round preview */}
                <div className="text-center">
                  <p className="mb-2 text-xs font-medium text-zinc-600">
                    Preview (Circle)
                  </p>
                  <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full border-2 border-cyan-500/30">
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      className="object-cover"
                      sizes="144px"
                    />
                  </div>
                </div>

                {/* Square preview */}
                <div className="text-center">
                  <p className="mb-2 text-xs font-medium text-zinc-600">
                    Preview (Rounded)
                  </p>
                  <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-2xl border border-cyan-500/30">
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      className="object-cover"
                      sizes="144px"
                    />
                  </div>
                </div>

                {/* File info */}
                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <p className="text-sm font-medium text-white">
                    {selectedFile?.name}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {selectedFile
                      ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
                      : ""}
                  </p>
                  <p className="text-xs text-zinc-600">
                    This will replace your current profile picture on both the
                    Hero and About sections.
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-purple-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-cyan-500/20 disabled:opacity-50"
                >
                  {uploading ? (
                    <>
                      <LuLoader className="h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <HiUpload size={16} />
                      Upload & Apply
                    </>
                  )}
                </button>
                <button
                  onClick={cancelPreview}
                  disabled={uploading}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/8 bg-white/3 px-5 py-3 text-sm font-medium text-zinc-400 transition-all hover:text-white disabled:opacity-50"
                >
                  <HiRefresh size={16} />
                  Choose Different
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border border-cyan-500/10 bg-cyan-500/3 p-5"
      >
        <h4 className="mb-3 text-sm font-semibold text-cyan-400">
          Tips for a Great Profile Picture
        </h4>
        <ul className="space-y-2 text-xs leading-relaxed text-zinc-400">
          <li className="flex items-start gap-2">
            <HiCheckCircle
              size={14}
              className="mt-0.5 shrink-0 text-cyan-500/60"
            />
            Use a high-quality, well-lit headshot with a clean background.
          </li>
          <li className="flex items-start gap-2">
            <HiCheckCircle
              size={14}
              className="mt-0.5 shrink-0 text-cyan-500/60"
            />
            Square images (1:1 ratio) work best — minimum 400&times;400 pixels.
          </li>
          <li className="flex items-start gap-2">
            <HiCheckCircle
              size={14}
              className="mt-0.5 shrink-0 text-cyan-500/60"
            />
            The image is displayed as a circle in the Hero and a rounded square
            in About.
          </li>
          <li className="flex items-start gap-2">
            <HiCheckCircle
              size={14}
              className="mt-0.5 shrink-0 text-cyan-500/60"
            />
            The picture is uploaded to Cloudinary and served via CDN for fast
            loading.
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
