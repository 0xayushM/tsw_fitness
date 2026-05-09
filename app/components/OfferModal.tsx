"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ScrollSmoother } from "gsap/ScrollSmoother";

function scrollToContact() {
  const target = document.getElementById("contact");
  if (!target) return;
  // Same pattern as HashLinkRouter — use the shared GSAP module instance,
  // NOT window.ScrollSmoother (which doesn't exist and falls back to native
  // scrollIntoView, which fights the virtual scroll and breaks positioning).
  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(target, true);
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function OfferModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(t);
  }, []);

  // Portal into document.body to escape ScrollSmoother's CSS transform,
  // which would otherwise break position:fixed relative to the viewport.
  if (!mounted || !open) return null;

  const handleContactUs = () => {
    setOpen(false);
    // Small delay lets React flush the unmount before GSAP scrolls
    setTimeout(scrollToContact, 80);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.78)" }}
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/15 bg-[#111111] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] sm:max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          aria-label="Close offer"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/70 font-body text-base text-white/90 backdrop-blur transition-colors hover:bg-black hover:text-white"
        >
          ✕
        </button>

        {/* Offer image */}
        <div className="relative w-full" style={{ aspectRatio: "9/10" }}>
          <Image
            src="/gallery/mothersday_offer.jpeg"
            alt="Mother's Day Special Offer at TSW Fitness"
            fill
            sizes="(max-width: 640px) 100vw, 512px"
            className="object-cover object-top"
            priority
          />
        </div>

        {/* CTA strip */}
        <div className="flex items-center gap-3 bg-[#0d0d0d] px-5 py-4">
          <button
            onClick={handleContactUs}
            className="flex-1 rounded-full bg-brand-gold py-3.5 text-center font-body text-[11px] uppercase tracking-[0.35em] text-white transition-opacity hover:opacity-90"
          >
            Contact Us
          </button>
          <button
            onClick={() => setOpen(false)}
            className="shrink-0 rounded-full border border-white/15 px-5 py-3.5 font-body text-[10px] uppercase tracking-[0.3em] text-white/55 transition-colors hover:border-white/30 hover:text-white/80"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
