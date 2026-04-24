"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Which classes work best for a beginner?",
    a: "Our Move Body and TFC sessions are built with scalable movement patterns. Coaches will regress or progress every movement for you — show up on day one and we'll do the rest.",
  },
  {
    q: "How does TSW compare to regular gyms?",
    a: "Every TSW club is staffed with coaches the entire day. You never train without a plan, and you never train alone unless you want to.",
  },
  {
    q: "Can a coach help me decide what my body needs?",
    a: "Yes. Every new member starts with a TSW Check-Up — a one-hour intake covering posture, mobility, strength baselines and goals.",
  },
  {
    q: "Do you sell trainer-led programs online?",
    a: "Our programs are in-club only for now. Members get access to our full written programming through the TSW app.",
  },
  {
    q: "Does TSW have locker and towel service?",
    a: "Every plan includes locker use during your session. Towel service is included on Pro and Elite memberships.",
  },
];

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-charcoal)]">
      {/* Honeycomb hero */}
      <div className="relative bg-honeycomb py-24 sm:py-32">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <span className="font-body text-[10px] uppercase tracking-[0.45em] text-white/55">
                / Today we are the voice /
              </span>
              <p className="mt-4 max-w-md font-display text-2xl uppercase leading-tight text-white sm:text-3xl">
                Today we are the voice of the machines
                <span className="block text-[var(--color-gold)]">
                  that make a big difference.
                </span>
              </p>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-[var(--color-gold)]/30 bg-black/40 p-10 sm:p-14">
                <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[var(--color-gold)] opacity-30 blur-3xl" />
                <p className="font-display text-4xl uppercase leading-[0.95] text-white sm:text-5xl">
                  You move.
                  <span className="block text-[var(--color-gold)]">
                    We engineer.
                  </span>
                </p>
                <p className="mt-5 max-w-sm font-body text-sm leading-relaxed text-white/70">
                  TSW machines, spaces and programs are all engineered with one
                  aim — make your training the most productive hour of your
                  day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mx-auto max-w-[1600px] px-5 pt-20 pb-20 sm:px-10 sm:pt-28 sm:pb-28">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="font-body text-[10px] uppercase tracking-[0.45em] text-white/40">
            / Anything you're wondering /
          </span>
          <h2 className="font-display uppercase leading-[0.9] tracking-tight text-white text-[12vw] sm:text-[6vw] lg:text-[4.5vw]">
            Any questions?
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-white/10 border-y border-white/10">
          {FAQS.map((f, i) => (
            <FaqItem key={i} {...f} />
          ))}
        </div>
      </div>

      {/* "Enhancement Workout Experience" oversized finale */}
      <div className="relative">
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.9)_100%)]"
        />
        <div className="relative mx-auto flex max-w-[1600px] flex-col items-center gap-6 px-5 py-20 text-center sm:px-10 sm:py-28">
          <span className="font-body text-[10px] uppercase tracking-[0.45em] text-[var(--color-gold)]">
            / The Moment /
          </span>
          <h3 className="font-display uppercase leading-[0.88] tracking-tight text-white text-[15vw] sm:text-[12vw] lg:text-[10vw]">
            The Enhancement
            <span className="block text-[var(--color-gold)]">
              Workout Experience
            </span>
          </h3>
          <a
            href="#membership"
            className="mt-4 inline-flex items-center gap-3 rounded-full bg-[var(--color-gold)] px-6 py-3 font-body text-[11px] uppercase tracking-[0.35em] text-black transition-transform hover:-translate-y-0.5"
          >
            Start Your Week
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-black" />
          </a>
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 text-left"
      >
        <span className="font-body text-sm uppercase tracking-[0.15em] text-white sm:text-base">
          {q}
        </span>
        <span
          aria-hidden
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/80 transition-transform"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0)" }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
        </span>
      </button>
      <div
        className="grid overflow-hidden transition-[grid-template-rows] duration-300"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="min-h-0">
          <p className="pt-3 font-body text-sm leading-relaxed text-white/60">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}
