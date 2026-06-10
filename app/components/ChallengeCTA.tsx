"use client";

import Link from "next/link";
import { useRef } from "react";

export default function ChallengeCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0d0d0d] px-5 py-20 sm:px-10 sm:py-28"
    >
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(ellipse_at_50%_50%,rgba(237,93,38,0.12),transparent_65%)]"
      />
      {/* Top border line with glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/50 to-transparent" />

      <div className="relative mx-auto max-w-[1600px]">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* LEFT: Copy */}
          <div>
            {/* Label */}
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/8 px-4 py-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-gold)]" />
              <span className="font-body text-[9px] uppercase tracking-[0.5em] text-[var(--color-gold)]">
                Now Open · June 23 · 15 Spots Only
              </span>
            </div>

            <h2 className="font-display text-[13vw] uppercase leading-[0.85] tracking-tight text-white sm:text-[7vw] lg:text-[5.5vw]">
              <span className="block">6-Week</span>
              <span className="block text-[var(--color-gold)]">Transformation</span>
              <span className="block">Challenge</span>
            </h2>

            <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-white/60">
              The only structured programme in Paschim Vihar with all three pillars —
              fitness, nutrition, and accountability — plus a{" "}
              <span className="text-white font-medium">₹3,000 money-back guarantee</span> if you show up and do the work.
            </p>

            {/* Three pillars mini-badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              {["⚡ Fitness", "🥗 Nutrition", "🎯 Accountability"].map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 font-body text-[10px] uppercase tracking-[0.3em] text-white/60"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT: Card */}
          <div className="flex flex-col gap-5">
            {/* Main offer card */}
            <div className="relative overflow-hidden rounded-3xl border border-[var(--color-gold)]/40 bg-gradient-to-b from-[#1a1005] to-[#0f0f0f] p-8 shadow-[0_0_60px_-20px_rgba(237,93,38,0.4)]">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[var(--color-gold)]/10 blur-3xl"
              />
              <div className="relative grid grid-cols-2 gap-5 sm:grid-cols-4">
                {[
                  { num: "6", sub: "Weeks" },
                  { num: "18", sub: "Sessions" },
                  { num: "15", sub: "Spots max" },
                  { num: "₹3K", sub: "Guarantee" },
                ].map(({ num, sub }) => (
                  <div key={sub} className="flex flex-col items-center gap-1 text-center">
                    <span className="font-display text-4xl leading-none text-white">{num}</span>
                    <span className="font-body text-[9px] uppercase tracking-[0.35em] text-white/40">{sub}</span>
                  </div>
                ))}
              </div>

              <div className="relative mt-6 border-t border-white/[0.08] pt-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-[0.35em] text-white/35">Investment</p>
                    <p className="mt-1 font-display text-5xl uppercase leading-none text-white">₹6,999</p>
                    <p className="mt-1 font-body text-xs text-white/35">One-time · Perceived value ₹12,500+</p>
                  </div>
                  <div className="text-right">
                    <p className="font-body text-[10px] uppercase tracking-[0.3em] text-emerald-400">
                      Worst case:
                    </p>
                    <p className="font-body text-xs text-white/60">18 free workouts</p>
                    <p className="mt-1 font-body text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
                      Best case:
                    </p>
                    <p className="font-body text-xs text-white/60">Life changes</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/challenge"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-gold)] py-4 font-body text-[11px] uppercase tracking-[0.4em] text-white shadow-[0_0_30px_rgba(237,93,38,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(237,93,38,0.5)]"
                  >
                    Claim Your Spot
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </Link>
                  <Link
                    href="/challenge#offer"
                    className="flex-1 inline-flex items-center justify-center rounded-full border border-white/15 py-4 font-body text-[11px] uppercase tracking-[0.4em] text-white/60 transition-colors hover:border-white/30 hover:text-white"
                  >
                    See Full Offer
                  </Link>
                </div>
              </div>
            </div>

            {/* Checklist teaser */}
            <div className="rounded-2xl border border-white/10 bg-[#111111] p-6">
              <p className="mb-4 font-body text-[10px] uppercase tracking-[0.4em] text-white/35">
                What&apos;s included
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Full gym access 24/7",
                  "Personalised workout plan",
                  "Personalised diet plan",
                  "Steam room access",
                  "Weekly trainer check-in",
                  "Progress tracking (Day 1 & 42)",
                  "WhatsApp accountability group",
                  "No PT charges",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-full bg-[var(--color-gold)]/20 text-[8px] font-bold text-[var(--color-gold)] grid place-items-center">
                      ✓
                    </span>
                    <span className="font-body text-[11px] leading-tight text-white/55">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/30 to-transparent" />
    </section>
  );
}
