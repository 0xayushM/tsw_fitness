"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Applications close the night before the batch starts (22 June).
const DEADLINE = new Date("2026-06-21T23:59:59+05:30").getTime();

function useCountdown() {
  const calc = () => {
    const diff = Math.max(0, DEADLINE - Date.now());
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function ChallengeModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { d, h, m, s } = useCountdown();

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => setOpen(false);

  if (!mounted || !open) return null;

  const pad = (n: number) => String(n).padStart(2, "0");

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto p-4"
      style={{ background: "rgba(0,0,0,0.86)", backdropFilter: "blur(4px)" }}
      onClick={handleClose}
    >
      <div
        className="relative my-auto max-h-[94vh] w-full max-w-md overflow-y-auto overflow-x-hidden rounded-3xl border border-[var(--color-gold)]/40 bg-[#0e0e0e] shadow-[0_40px_120px_-20px_rgba(237,93,38,0.45)]"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "modalIn 0.45s cubic-bezier(0.34,1.56,0.64,1) both" }}
      >
        <style>{`
          @keyframes modalIn { from { opacity:0; transform: scale(0.9) translateY(28px); } to { opacity:1; transform: scale(1) translateY(0); } }
          @keyframes ctaPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(237,93,38,0.55); } 50% { box-shadow: 0 0 0 14px rgba(237,93,38,0); } }
          @keyframes shimmer { from { background-position: -180% 0; } to { background-position: 280% 0; } }
        `}</style>

        {/* ── Live urgency bar ─────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-2 bg-[var(--color-gold)] px-4 py-2.5 text-center">
          <span className="font-body text-[9px] font-bold uppercase tracking-[0.3em] text-black/70">Applications close in</span>
          <span className="font-display text-sm tabular-nums tracking-wide text-black">
            {pad(d)}d : {pad(h)}h : {pad(m)}m : {pad(s)}s
          </span>
        </div>

        {/* Gold glow orb */}
        <div aria-hidden className="pointer-events-none absolute -right-20 top-8 h-48 w-48 rounded-full bg-[var(--color-gold)]/15 blur-3xl" />

        {/* Close */}
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-4 top-14 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/8 font-body text-sm text-white/55 backdrop-blur transition-colors hover:bg-white/15 hover:text-white"
        >
          ✕
        </button>

        <div className="relative p-5 sm:p-7">
          {/* Scarcity kicker */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-2.5 py-1 sm:px-3 sm:py-1.5">
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-gold)] opacity-75" />
              <span className="relative inline-flex h-full w-full rounded-full bg-[var(--color-gold)]" />
            </span>
            <span className="font-body text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)] sm:text-[10px] sm:tracking-[0.25em]">
              Only 7 of 15 spots left
            </span>
          </div>

          {/* Hook headline */}
          <h2 className="mt-3 font-display uppercase leading-[0.95] tracking-tight text-white sm:mt-4" style={{ fontSize: "clamp(1.55rem, 6.2vw, 2.6rem)" }}>
            Don&apos;t Start Another
            <br />
            Gym You&apos;ll <span className="text-[var(--color-gold)]">Quit.</span>
          </h2>

          <p className="mt-2.5 font-body text-[12.5px] leading-snug text-white/65 sm:text-sm sm:leading-relaxed">
            6 weeks. A personalised plan, real nutrition and a coach who tracks you weekly. See real change, or take{" "}
            <span className="font-semibold text-white">₹3,000 back in membership credits.</span> Zero risk.
          </p>

          {/* Price anchor */}
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#141414] px-4 py-2.5">
            <div className="flex items-baseline gap-2">
              <span className="font-body text-xs text-white/30 line-through sm:text-sm">₹14,500</span>
              <span className="font-display text-2xl leading-none text-[var(--color-gold)] sm:text-3xl">₹6,999</span>
            </div>
            <span className="ml-auto rounded-full bg-emerald-500/15 px-2.5 py-1 font-body text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-400 sm:text-[10px]">
              Save ₹7,500
            </span>
          </div>

          {/* Seat pips */}
          <div className="mt-3.5">
            <div className="flex gap-1 sm:gap-1.5">
              {Array.from({ length: 15 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 flex-1 rounded-full sm:h-2 ${i < 8 ? "bg-[var(--color-gold)]" : "border border-white/20 bg-white/[0.04]"}`}
                />
              ))}
            </div>
            <p className="mt-2 font-body text-[10px] leading-snug text-white/40">
              <span className="text-white/70">8 already claimed.</span> When 15 fill, this batch closes.
            </p>
          </div>

          {/* Trust row */}
          <div className="mt-3.5 flex items-center justify-center gap-2 border-y border-white/[0.07] py-2.5">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} viewBox="0 0 16 16" className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="#ED5D26">
                  <path d="M8 1l1.8 4.1H14l-3.5 2.6 1.3 4.1L8 9.5l-3.8 2.3 1.3-4.1L2 5.1h4.2z" />
                </svg>
              ))}
            </div>
            <span className="font-body text-[11px] text-white/55 sm:text-xs">
              <span className="font-semibold text-white">4.9</span> · loved by 200+ members
            </span>
          </div>

          {/* Risk reversal */}
          <div className="mt-3.5 grid grid-cols-2 gap-2.5">
            <div className="rounded-xl border border-white/10 bg-[#141414] px-3 py-2 text-center">
              <p className="font-body text-[8px] uppercase tracking-[0.2em] text-emerald-400">Worst case</p>
              <p className="mt-0.5 font-display text-[13px] text-white sm:text-sm">18 coached sessions</p>
            </div>
            <div className="rounded-xl border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/[0.07] px-3 py-2 text-center">
              <p className="font-body text-[8px] uppercase tracking-[0.2em] text-[var(--color-gold)]">Best case</p>
              <p className="mt-0.5 font-display text-[13px] text-white sm:text-sm">New body + ₹3K back</p>
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/challenge"
            onClick={handleClose}
            className="group relative mt-4 flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--color-gold)] py-3.5 font-body text-[11px] font-bold uppercase tracking-[0.2em] text-white sm:text-[12px] sm:tracking-[0.3em]"
            style={{ animation: "ctaPulse 2.2s ease-in-out infinite" }}
          >
            {/* shimmer sweep */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.35) 50%, transparent 65%)",
                backgroundSize: "250% 100%",
                animation: "shimmer 3s linear infinite",
              }}
            />
            <span className="relative">Yes — Claim My Spot</span>
            <span className="relative grid h-5 w-5 place-items-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1 sm:h-6 sm:w-6">
              <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </span>
          </Link>
          <p className="mt-2 text-center font-body text-[10px] text-white/35">No payment now · we call within 24 hrs to confirm</p>

          <button
            onClick={handleClose}
            className="mt-2.5 w-full font-body text-[9px] uppercase tracking-[0.2em] text-white/30 transition-colors hover:text-white/55 sm:text-[10px]"
          >
            No thanks — I&apos;ll stay the same
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
