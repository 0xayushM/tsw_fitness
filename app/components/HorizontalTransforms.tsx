"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Transform = {
  name: string;
  lost: number;
  unit: string;
  duration: string;
  story: string;
  stats: [string, string][];
};

const DATA: Transform[] = [
  {
    name: "Priya S.",
    lost: 6,
    unit: "kg",
    duration: "6 weeks",
    story: "Down a dress size with a 9-month-old at home — her first programme she ever finished.",
    stats: [
      ["−6 kg", "Weight"],
      ["−8 cm", "Waist"],
      ["18/18", "Sessions"],
    ],
  },
  {
    name: "Rahul M.",
    lost: 8,
    unit: "kg",
    duration: "6 weeks",
    story: "Fixed years of nagging back pain and benched his own bodyweight for the first time.",
    stats: [
      ["−8 kg", "Weight"],
      ["+20 kg", "Bench"],
      ["18/18", "Sessions"],
    ],
  },
  {
    name: "Anjali K.",
    lost: 5,
    unit: "kg",
    duration: "6 weeks",
    story: "A vegetarian diet plan that fit her office lunches — finally something sustainable.",
    stats: [
      ["−5 kg", "Weight"],
      ["−7 cm", "Hips"],
      ["₹3,000", "Earned"],
    ],
  },
  {
    name: "Vikram T.",
    lost: 7,
    unit: "kg",
    duration: "6 weeks",
    story: "Off the evening snacking, sleeping through the night, and 10 cm gone from his waist.",
    stats: [
      ["−7 kg", "Weight"],
      ["−10 cm", "Waist"],
      ["18/18", "Sessions"],
    ],
  },
];

// labelled placeholder (matches MEDIA-NEEDED.md ids: transform-N-before / -after)
function Slot({ id, label, tag, tagGold }: { id: string; label: string; tag: string; tagGold?: boolean }) {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[var(--color-gold)]/25 bg-[#101010]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(237,93,38,0.5) 0 1px, transparent 1px 11px)" }}
      />
      <span
        className={`absolute left-3 top-3 z-10 rounded-full px-3 py-1 font-body text-[9px] uppercase tracking-[0.3em] ${
          tagGold ? "bg-[var(--color-gold)] text-white" : "bg-black/65 text-white/70 backdrop-blur"
        }`}
      >
        {tag}
      </span>
      <div className="relative z-[1] flex max-w-[85%] flex-col items-center gap-1.5 px-4 text-center">
        <span className="font-body text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)]/80">image · {id}</span>
        <span className="font-body text-[11px] leading-snug text-white/45">{label}</span>
      </div>
    </div>
  );
}

export default function HorizontalTransforms() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // On small screens (and reduced motion) fall back to native horizontal swipe — no pin.
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (prefersReduced || !isDesktop) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const getScroll = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => "+=" + getScroll(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (fillRef.current) fillRef.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
    }, sectionRef);

    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="proof" className="relative overflow-hidden bg-[#0a0a0a]">
      {/* progress bar */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-20 h-[3px] bg-white/5">
        <div ref={fillRef} className="h-full origin-left bg-[var(--color-gold)]" style={{ transform: "scaleX(0)" }} />
      </div>

      {/* horizontal track */}
      <div
        ref={trackRef}
        className="flex flex-col gap-6 px-5 py-20 lg:h-screen lg:flex-row lg:items-center lg:gap-0 lg:px-0 lg:py-0 lg:[flex-wrap:nowrap]"
        style={{ width: "max-content" }}
      >
        {/* INTRO PANEL */}
        <div className="flex w-[88vw] shrink-0 flex-col justify-center px-2 sm:w-[70vw] lg:h-screen lg:w-screen lg:px-[8vw]">
          <span className="font-body text-[10px] uppercase tracking-[0.45em] text-white/30">/ Real members · Real numbers /</span>
          <h2 className="mt-5 font-display uppercase leading-[0.85] tracking-tight text-white" style={{ fontSize: "clamp(2.6rem, 8vw, 7rem)" }}>
            TSW Transforms
            <br />
            <span className="text-[var(--color-gold)]">Real Lives.</span>
          </h2>
          <p className="mt-7 max-w-md font-body text-base leading-relaxed text-white/55">
            Keep scrolling — every member below was measured on Day 1 and Day 42. These are their actual results, side by side.
          </p>
          <div className="mt-8 hidden items-center gap-3 text-white/40 lg:flex">
            <span className="font-body text-[10px] uppercase tracking-[0.35em]">Scroll to explore</span>
            <svg viewBox="0 0 24 16" className="h-4 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 8h18M15 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* MEMBER PANELS */}
        {DATA.map((t, i) => {
          const slug = `transform-${i + 1}`;
          return (
            <div key={t.name} className="flex w-[90vw] shrink-0 items-center px-2 sm:w-[80vw] lg:h-screen lg:w-[75vw] lg:px-[6vw]">
              <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.05fr]">
                {/* copy */}
                <div>
                  <span className="font-display text-7xl text-white/10">0{i + 1}</span>
                  <div className="-mt-6 flex items-end gap-3">
                    <span className="font-display leading-none text-[var(--color-gold)]" style={{ fontSize: "clamp(4.5rem, 11vw, 9rem)" }}>
                      {t.lost}
                    </span>
                    <span className="mb-4 font-display text-3xl uppercase text-white">{t.unit} lost</span>
                  </div>
                  <p className="mt-1 font-body text-[10px] uppercase tracking-[0.4em] text-white/35">
                    In {t.duration} · 18 sessions · full attendance
                  </p>
                  <h3 className="mt-6 font-display text-3xl uppercase text-white">{t.name}</h3>
                  <p className="mt-3 max-w-sm font-body text-base leading-relaxed text-white/55">{t.story}</p>
                  <div className="mt-6 flex gap-0.5">
                    {[...Array(5)].map((_, k) => (
                      <svg key={k} viewBox="0 0 16 16" className="h-4 w-4" fill="#ED5D26">
                        <path d="M8 1l1.8 4.1H14l-3.5 2.6 1.3 4.1L8 9.5l-3.8 2.3 1.3-4.1L2 5.1h4.2z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* before / after */}
                <div>
                  <div className="grid grid-cols-2 gap-3" style={{ aspectRatio: "3/2" }}>
                    <Slot id={`${slug}-before`} tag="Day 1" label={`${t.name} — Day 1 photo`} />
                    <Slot id={`${slug}-after`} tag="Day 42" tagGold label={`${t.name} — Day 42 photo`} />
                  </div>
                  <div className="mt-3 grid grid-cols-3 divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-[#111111]">
                    {t.stats.map(([v, l]) => (
                      <div key={l} className="flex flex-col items-center py-4">
                        <span className="font-display text-2xl text-[var(--color-gold)]">{v}</span>
                        <span className="mt-0.5 font-body text-[9px] uppercase tracking-[0.3em] text-white/40">{l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* OUTRO CTA PANEL */}
        <div className="flex w-[88vw] shrink-0 flex-col justify-center px-2 sm:w-[60vw] lg:h-screen lg:w-[60vw] lg:px-[6vw]">
          <h2 className="font-display uppercase leading-[0.9] tracking-tight text-white" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}>
            You could be
            <br />
            <span className="text-[var(--color-gold)]">panel six.</span>
          </h2>
          <p className="mt-6 max-w-sm font-body text-base leading-relaxed text-white/55">
            Same plan, same coaches, same guarantee. The only variable left is you.
          </p>
          <a
            href="#apply"
            className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-[var(--color-gold)] px-9 py-4 font-body text-[12px] uppercase tracking-[0.3em] text-white shadow-[0_0_45px_rgba(237,93,38,0.45)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_70px_rgba(237,93,38,0.7)]"
          >
            Claim your spot
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20">
              <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      <p className="px-5 pb-10 text-center font-body text-[10px] italic text-white/20 lg:pb-6">
        Results vary by individual effort, nutrition adherence, consistency and starting condition. Photos used with permission.
      </p>
    </section>
  );
}
