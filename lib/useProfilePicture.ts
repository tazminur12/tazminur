"use client";

import { useEffect, useState } from "react";

const CACHE_KEY = "profilePictureUrl";
const CACHE_TTL = 1000 * 60 * 10; // 10 minutes

export function useProfilePicture() {
  const [profileUrl, setProfileUrl] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const { url, ts } = JSON.parse(cached);
          if (Date.now() - ts < CACHE_TTL) return url;
        }
      } catch {}
    }
    return null;
  });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/settings/profile-picture")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          const url = data.url || "";
          setProfileUrl(url);
          try {
            sessionStorage.setItem(CACHE_KEY, JSON.stringify({ url, ts: Date.now() }));
          } catch {}
        }
      })
      .catch(() => {
        if (!cancelled) setProfileUrl((prev) => prev ?? "");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return profileUrl;
}
