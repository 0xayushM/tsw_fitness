"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Lightweight page-view beacons so the Brew dashboard can correlate traffic.
 * Deduped per pathname per browser tab session (sessionStorage).
 */
export default function BrewVisitorPing() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const key = `brew_pv:${pathname}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      /* storage blocked - still attempt one beacon */
    }

    void fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        form_name: "page_view",
        data: {
          path: pathname,
          href: window.location.href,
          referrer: document.referrer || "",
          language: navigator.language ?? "",
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? "",
          viewport_w: String(window.innerWidth),
          viewport_h: String(window.innerHeight),
          ts_client: new Date().toISOString(),
        },
      }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}
