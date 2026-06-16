"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ChallengeModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Don't show again if already dismissed this session
    const dismissed = sessionStorage.getItem("challenge-modal-dismissed");
    if (dismissed) return;
    const t = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem("challenge-modal-dismissed", "1");
  };

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.82)" }}
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-[var(--color-gold)]/30 bg-[#0f0f0f] shadow-[0_40px_100px_-20px_rgba(237,93,38,0.35)]"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "modalIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both" }}
      >
        <style>{`
          @keyframes modalIn {
            from { opacity: 0; transform: scale(0.88) translateY(24px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>

        {/* Gold glow orb */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--color-gold)]/15 blur-3xl"
        />

        {/* Close */}
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/8 font-body text-sm text-white/60 backdrop-blur transition-colors hover:bg-white/15 hover:text-white"
        >
          ✕
        </button>

        <div className="relative p-8 sm:p-10">
          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 px-3 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-gold)]" />
            <span className="font-body text-[9px] uppercase tracking-[0.45em] text-[var(--color-gold)]">
              Batch 1 · June 23 · 15 Spots
            </span>
          </div>

          <h2 className="font-display text-[12vw] uppercase leading-[0.85] tracking-tight text-white sm:text-5xl">
            <span className="block">6-Week</span>
            <span className="block text-[var(--color-gold)]">Transform-</span>
            <span className="block">ation</span>
          </h2>

          <p className="mt-5 font-body text-sm leading-relaxed text-white/60">
            ₹6,999 · Personalised plan · Nutrition · Weekly check-ins ·{" "}
            <span className="text-white font-medium">₹3,000 money-back guarantee</span> if you do the work.
          </p>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { num: "18", label: "Sessions" },
              { num: "15", label: "Spots max" },
              { num: "₹3K", label: "Guarantee" },
            ].map(({ num, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 rounded-xl border border-white/8 bg-white/[0.03] py-3"
              >
                <span className="font-display text-2xl leading-none text-white">{num}</span>
                <span className="font-body text-[9px] uppercase tracking-[0.3em] text-white/35">{label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/challenge"
              onClick={handleClose}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-gold)] py-4 font-body text-[11px] uppercase tracking-[0.4em] text-white shadow-[0_0_30px_rgba(237,93,38,0.3)] transition-all hover:opacity-90"
            >
              Claim Your Spot
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </Link>
            <button
              onClick={handleClose}
              className="flex-1 rounded-full border border-white/12 py-4 font-body text-[10px] uppercase tracking-[0.35em] text-white/40 transition-colors hover:border-white/20 hover:text-white/60"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
