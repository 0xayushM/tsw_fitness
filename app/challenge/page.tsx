"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import SplitReveal from "../components/SplitReveal";
import SplitHover from "../components/SplitHover";
import HorizontalTransforms from "../components/HorizontalTransforms";

/* ════════════════════════════════════════════════════════════════════════════
   TSW FITNESS - 6-WEEK TRANSFORMATION CHALLENGE  ·  /challenge
   Conversion landing page. VSL-led, structured on a proven application funnel.
   All photo/video assets are intentionally left as labelled <MediaSlot/> boxes.
   See MEDIA-NEEDED.md for the full shot list.
═════════════════════════════════════════════════════════════════════════════ */

const APPLY = "#apply";
const BATCH_DATE = "June 22, 2026";
const PRICE = "₹6,999";
const GUARANTEE = "₹3,000";
const SPOTS = 15;

// ── Countdown ────────────────────────────────────────────────────────────────
const DEADLINE = new Date("2026-06-22T22:59:59+05:30").getTime();

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
  // Start with a deterministic value so server and first client render match,
  // then compute the real countdown after mount to avoid hydration mismatch.
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    setT(calc());
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return t;
}

// ── Animated counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ to, duration = 1800 }: { to: number; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            // ease-out
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.floor(eased * to));
            if (p < 1) requestAnimationFrame(tick);
            else setVal(to);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{val}</span>;
}

// ── Reveal-on-scroll wrapper (fade + rise) ─────────────────────────────────────
function Rise({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .8s ease ${delay}s, transform .9s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ── Timer block ────────────────────────────────────────────────────────────────
function TimerBlock({ compact, onLight }: { compact?: boolean; onLight?: boolean }) {
  const { d, h, m, s } = useCountdown();
  const units = [
    { v: d, l: "Days" },
    { v: h, l: "Hrs" },
    { v: m, l: "Min" },
    { v: s, l: "Sec" },
  ];
  const num = onLight ? "text-black" : "text-white";
  const lab = onLight ? "text-black/40" : "text-white/35";
  const sep = onLight ? "text-black/25" : "text-white/25";
  return (
    <div className="flex items-center gap-2">
      {units.map(({ v, l }, i) => (
        <React.Fragment key={l}>
          <div className={`flex flex-col items-center ${compact ? "min-w-[36px]" : "min-w-[52px]"}`}>
            <span className={`font-display tabular-nums leading-none ${num} ${compact ? "text-xl" : "text-4xl"}`}>
              {String(v).padStart(2, "0")}
            </span>
            <span className={`mt-0.5 font-body text-[8px] uppercase tracking-[0.3em] ${lab}`}>{l}</span>
          </div>
          {i < 3 && <span className={`font-display ${sep} ${compact ? "text-base" : "text-2xl"}`}>:</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

// ── MEDIA SLOT - labelled placeholder for images / video ───────────────────────
function MediaSlot({
  id,
  label,
  ratio = "3/4",
  kind = "image",
  className = "",
  rounded = "rounded-3xl",
}: {
  id: string;
  label: string;
  ratio?: string;
  kind?: "image" | "video";
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden border border-dashed border-[var(--color-gold)]/25 bg-[#101010] ${rounded} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(237,93,38,0.5) 0 1px, transparent 1px 11px)",
        }}
      />
      <div className="relative z-10 flex max-w-[88%] flex-col items-center gap-2 px-4 text-center">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10">
          {kind === "video" ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#ED5D26">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="#ED5D26" strokeWidth="1.6">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" fill="#ED5D26" stroke="none" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          )}
        </span>
        <span className="font-body text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]/80">
          {kind} · {id}
        </span>
        <span className="font-body text-[11px] leading-snug text-white/45">{label}</span>
      </div>
    </div>
  );
}

// ── Hero VSL video (poster thumbnail from first frame, audio on, tap to play) ──
function HeroVSL() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.play();
    setPlaying(true);
  };
  return (
    <div className="relative overflow-hidden rounded-[20px] bg-[#101010]" style={{ aspectRatio: "4/5" }}>
      <video
        ref={videoRef}
        src="/challenge/founder_video.mp4#t=0.1"
        className="absolute inset-0 h-full w-full object-cover"
        controls={playing}
        playsInline
        preload="metadata"
      />
      {!playing && (
        <button onClick={play} aria-label="Play video" className="group absolute inset-0 z-10 flex items-center justify-center">
          <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-gold)] shadow-[0_0_45px_rgba(237,93,38,0.7)] transition-transform group-hover:scale-110">
            <span aria-hidden className="absolute h-20 w-20 animate-ping rounded-full bg-[var(--color-gold)]/30" />
            <svg viewBox="0 0 24 24" className="relative ml-1 h-8 w-8" fill="#fff">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
      {/* live tag */}
      <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 font-body text-[9px] uppercase tracking-[0.25em] text-white/80 backdrop-blur">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" /> Now enrolling
      </span>
    </div>
  );
}

// ── Icons ───────────────────────────────────────────────────────────────────────
const Star = ({ light }: { light?: boolean }) => (
  <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" fill={light ? "#fff" : "#ED5D26"}>
    <path d="M8 1l1.8 4.1H14l-3.5 2.6 1.3 4.1L8 9.5l-3.8 2.3 1.3-4.1L2 5.1h4.2z" />
  </svg>
);
const Check = ({ c = "#ED5D26" }: { c?: string }) => (
  <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" fill="none">
    <circle cx="10" cy="10" r="9" fill={c} fillOpacity=".15" stroke={c} strokeWidth="1.3" />
    <path d="M6.5 10l2.5 2.5 4.5-5" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const X = () => (
  <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" fill="none">
    <circle cx="10" cy="10" r="9" fill="#ef4444" fillOpacity=".12" stroke="#ef4444" strokeWidth="1.3" />
    <path d="M7 7l6 6M13 7l-6 6" stroke="#ef4444" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

// ── Apply button (reusable) ─────────────────────────────────────────────────────
function ApplyBtn({ children, full, secondary }: { children: React.ReactNode; full?: boolean; secondary?: boolean }) {
  if (secondary) {
    return (
      <a
        href={APPLY}
        className={`inline-flex items-center justify-center gap-3 rounded-full border border-white/20 px-7 py-4 text-center font-body text-[11px] uppercase tracking-[0.25em] text-white/65 transition-colors hover:border-white/40 hover:text-white sm:px-8 sm:tracking-[0.4em] ${full ? "w-full" : ""}`}
      >
        <SplitHover>{children}</SplitHover>
      </a>
    );
  }
  return (
    <a
      href={APPLY}
      className={`inline-flex items-center justify-center gap-3 rounded-full bg-[var(--color-gold)] px-7 py-4 text-center font-body text-[11px] uppercase tracking-[0.25em] text-white shadow-[0_0_40px_rgba(237,93,38,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_60px_rgba(237,93,38,0.6)] sm:px-8 sm:tracking-[0.4em] ${full ? "w-full" : ""}`}
    >
      <SplitHover>{children}</SplitHover>
      <span className="h-1.5 w-1.5 rounded-full bg-white" />
    </a>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: `Is the ${GUARANTEE} guarantee just for showing up?`,
    a: "No - you earn it. Attend all 18 sessions (3×/week for 6 weeks) AND show measurable progress in any 2 of 6 tracked categories: weight or body-fat reduction, inch loss, strength gain, full attendance, endurance improvement, or Day 1 vs Day 42 photos. Your trainer assesses it on Day 42 using real numbers, not opinion.",
  },
  {
    q: "I've started and quit before. Why would this be different?",
    a: "Because every past attempt was probably missing at least one of three things: a workout plan built for your goal, a nutrition plan built for your life, and someone who actually notices when you don't show up. The Challenge gives you all three from Day 1 - plus a 15-person batch where quietly disappearing isn't an option.",
  },
  {
    q: "What if I'm a complete beginner?",
    a: "Your plan starts from where you are on Day 1 - not where we wish you were. You'll never be handed a machine and left alone. You walk in with a written plan and a trainer who knows your name.",
  },
  {
    q: "Is the diet plan personalised or a generic PDF?",
    a: "Personalised. Built around your body, your goal, your food preferences and your schedule - with a grocery list and an eating-out guide. It is not downloaded from Google or copied from another member.",
  },
  {
    q: "Do I have to train at a fixed time every day?",
    a: "No. The floor is open and you train on your schedule across the week. The only fixed touchpoint is your weekly 1:1 trainer check-in, which the two of you book together.",
  },
  {
    q: "When do I pay?",
    a: "Not now. You apply, we call you within 24 hours to confirm your spot and answer questions, and you only pay once you've decided to lock in your place in the batch.",
  },
];

const COMPARISON: [string, string, string][] = [
  ["Workout plan", "Generic or none", "Personalised to your goal, updated weekly"],
  ["Nutrition support", "Not included", "Personalised diet plan, grocery list & eating-out guide"],
  ["Accountability", "Nobody checks", "Weekly 1:1 trainer check-in + WhatsApp group"],
  ["Progress tracking", "You guess", "Day 1 & Day 42 measurements - real numbers"],
  ["Structure", "Open-ended, easy to drift", "6 weeks, 18 sessions - clear start and finish"],
  ["Skin in the game", "Pay and pray", `${GUARANTEE} back if you attend all sessions + show progress`],
];

const TESTIMONIALS = [
  { name: "Priya S.", q: "Three gyms before this. TSW was the first to hand me an actual plan.", stat: "−6 kg · 18/18" },
  { name: "Rahul M.", q: "The WhatsApp group kept me showing up on the days I wanted to quit.", stat: "+4 kg lean" },
  { name: "Anjali K.", q: "The diet plan fit my veg meals and office lunches. That's why it stuck.", stat: `−5 kg · ${GUARANTEE} earned` },
  { name: "Vikram T.", q: "Every session my trainer knew my numbers and what to push. Game changer.", stat: "−7 kg · 18/18" },
  { name: "Sneha R.", q: "The Day 1 vs Day 42 numbers don't lie. First time I had proof it worked.", stat: "−4 kg · 18/18" },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-white/[0.07] overflow-hidden rounded-3xl border border-white/10 bg-[#111111]">
      {FAQS.map((f, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-start justify-between gap-6 px-7 py-5 text-left hover:bg-white/[0.02]"
          >
            <span className="font-body text-sm font-semibold text-white">{f.q}</span>
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/40 transition-transform duration-300"
              style={{ transform: open === i ? "rotate(45deg)" : "none" }}
            >
              <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M6 1v10M1 6h10" />
              </svg>
            </span>
          </button>
          <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open === i ? "320px" : "0" }}>
            <p className="px-7 pb-6 font-body text-sm leading-relaxed text-white/50">{f.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Sticky CTA bar ──────────────────────────────────────────────────────────────
function StickyBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 760);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const { d, h, m, s } = useCountdown();
  if (!show) return null;
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--color-gold)]/20 bg-[#0a0a0a]/96 backdrop-blur"
      style={{ animation: "slideUp .3s ease both" }}
    >
      <style>{`@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}`}</style>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3 sm:px-10">
        <div className="hidden items-center gap-4 sm:flex">
          <span className="font-body text-xs text-white/40">Applications close in:</span>
          <span className="font-display text-lg text-white">
            {String(d).padStart(2, "0")}d {String(h).padStart(2, "0")}h {String(m).padStart(2, "0")}m {String(s).padStart(2, "0")}s
          </span>
          <span className="font-body text-xs text-white/30">· {SPOTS} spots · Starts {BATCH_DATE}</span>
        </div>
        <a
          href={APPLY}
          className="ml-auto inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-6 py-3 font-body text-[11px] uppercase tracking-[0.35em] text-white shadow-[0_0_20px_rgba(237,93,38,0.4)] hover:opacity-90"
        >
          <SplitHover>Apply Now - {PRICE}</SplitHover>
        </a>
      </div>
    </div>
  );
}

// ── Section eyebrow ──────────────────────────────────────────────────────────────
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="font-body text-[10px] uppercase tracking-[0.45em] text-white/30">/ {children} /</span>;
}

// ── Cursor spotlight (follows mouse inside its parent) ──────────────────────────
function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const move = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect();
      el.style.background = `radial-gradient(560px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(237,93,38,0.18), transparent 60%)`;
    };
    parent.addEventListener("mousemove", move);
    return () => parent.removeEventListener("mousemove", move);
  }, []);
  return <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 z-[1]" />;
}

// ── Magnetic wrapper (element drifts toward the cursor) ─────────────────────────
function Magnetic({ children, className = "", strength = 0.4 }: { children: React.ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const reset = () => {
      el.style.transform = "translate(0,0)";
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", reset);
    };
  }, [strength]);
  return (
    <div ref={ref} className={`transition-transform duration-300 ease-out ${className}`}>
      {children}
    </div>
  );
}

// ── Results marquee strip ───────────────────────────────────────────────────────
function ResultsMarquee() {
  const tokens = [
    "−6 KG IN 6 WEEKS",
    "PERSONALISED TRAINING PLAN",
    "WEEKLY 1:1 COACHING",
    "₹3,000 MONEY-BACK GUARANTEE",
    "18 COACHED SESSIONS",
    "DAY 1 → DAY 42 TRACKED",
    "ONLY 15 SPOTS",
  ];
  const Row = () => (
    <div className="flex shrink-0 items-center">
      {tokens.map((tok) => (
        <span key={tok} className="flex items-center">
          <span className="px-6 font-display text-sm uppercase tracking-[0.2em] text-white/60">{tok}</span>
          <svg viewBox="0 0 16 16" className="h-2.5 w-2.5 shrink-0" fill="#ED5D26">
            <path d="M8 1l1.8 4.1H14l-3.5 2.6 1.3 4.1L8 9.5l-3.8 2.3 1.3-4.1L2 5.1h4.2z" />
          </svg>
        </span>
      ))}
    </div>
  );
  return (
    <div className="flex w-max animate-marquee marquee-gpu">
      <Row />
      <Row />
    </div>
  );
}

// ── Page scroll progress bar (fixed, top) ──────────────────────────────────────
function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fn = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? window.scrollY / h : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    window.addEventListener("resize", fn);
    return () => {
      window.removeEventListener("scroll", fn);
      window.removeEventListener("resize", fn);
    };
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent">
      <div ref={ref} className="h-full origin-left bg-[var(--color-gold)]" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}

// ── 3D tilt-on-hover card ───────────────────────────────────────────────────────
function Tilt({ children, className = "", max = 8 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${-py * max}deg) rotateY(${px * max}deg) translateZ(0)`;
    };
    const reset = () => {
      el.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", reset);
    };
  }, [max]);
  return (
    <div ref={ref} className={`transition-transform duration-300 ease-out [transform-style:preserve-3d] ${className}`}>
      {children}
    </div>
  );
}

// ── Line that draws in horizontally when scrolled into view ─────────────────────
function GrowLine({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}>
      <div
        className="h-full w-full origin-left bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold)]/30"
        style={{ transform: shown ? "scaleX(1)" : "scaleX(0)", transition: "transform 1.5s cubic-bezier(.16,1,.3,1)" }}
      />
    </div>
  );
}

// ── Inclusion line icons ────────────────────────────────────────────────────────
function Ico({ name, className = "h-6 w-6" }: { name: string; className?: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<string, React.ReactNode> = {
    dumbbell: <><path d="M6.5 6.5l11 11" {...p} /><path d="M4 9l-1.5-1.5M2.5 7.5l2-2 2 2-2 2zM20 15l1.5 1.5M21.5 16.5l-2 2-2-2 2-2z" {...p} /><path d="M8 8l-2 2 2 2M16 16l2-2-2-2" {...p} /></>,
    plate: <><circle cx="12" cy="12" r="8.5" {...p} /><circle cx="12" cy="12" r="4" {...p} /></>,
    chat: <><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4L3 21l1.1-3.6A8.4 8.4 0 1 1 21 11.5z" {...p} /><path d="M8.5 11.5h7M8.5 8.5h4" {...p} /></>,
    clock: <><circle cx="12" cy="12" r="9" {...p} /><path d="M12 7v5l3 2" {...p} /></>,
    steam: <><path d="M12 21c4 0 7-2.5 7-6 0-4-7-12-7-12S5 11 5 15c0 3.5 3 6 7 6z" {...p} /></>,
    chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" {...p} /></>,
    users: <><circle cx="9" cy="8" r="3.2" {...p} /><path d="M3.5 20a5.5 5.5 0 0 1 11 0M16 6a3 3 0 0 1 0 6M18 20a5.5 5.5 0 0 0-3-5" {...p} /></>,
    ticket: <><path d="M3 9a2 2 0 0 0 0 6v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2a2 2 0 0 1 0-6V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" {...p} /><path d="M14 5v14" {...p} strokeDasharray="2 2" /></>,
    car: <><path d="M5 16l1.5-5A2 2 0 0 1 8.4 9.6h7.2a2 2 0 0 1 1.9 1.4L19 16M4 16h16v3h-2v-1H6v1H4z" {...p} /><circle cx="7.5" cy="16.5" r="1" {...p} /><circle cx="16.5" cy="16.5" r="1" {...p} /></>,
    award: <><circle cx="12" cy="9" r="5" {...p} /><path d="M9 13.5L7.5 21l4.5-2.5L16.5 21 15 13.5" {...p} /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" {...p} /><path d="M9 12l2 2 4-4" {...p} /></>,
  };
  return (
    <svg viewBox="0 0 24 24" className={className} style={{ color: "#ED5D26" }}>
      {paths[name]}
    </svg>
  );
}

// ── Money counter (counts up, comma-formatted, ₹ prefix) ────────────────────────
function MoneyCounter({ to, duration = 1500, className = "" }: { to: number; duration?: number; className?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.floor(eased * to));
            if (p < 1) requestAnimationFrame(tick);
            else setVal(to);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);
  return (
    <span ref={ref} className={className}>
      ₹{val.toLocaleString("en-IN")}
    </span>
  );
}

// ── Animated value meter (you pay vs you save) ──────────────────────────────────
function ValueMeter({ pay, total }: { pay: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const payPct = (pay / total) * 100;
  return (
    <div ref={ref}>
      <div className="flex h-4 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full bg-[var(--color-gold)]"
          style={{ width: shown ? `${payPct}%` : "0%", transition: "width 1.4s cubic-bezier(.16,1,.3,1)" }}
        />
        <div
          className="h-full bg-emerald-500/30"
          style={{ width: shown ? `${100 - payPct}%` : "0%", transition: "width 1.4s cubic-bezier(.16,1,.3,1) .1s" }}
        />
      </div>
      <div className="mt-2 flex justify-between font-body text-[10px] uppercase tracking-[0.25em]">
        <span className="text-[var(--color-gold)]">You pay {Math.round(payPct)}%</span>
        <span className="text-emerald-400">You save {Math.round(100 - payPct)}%</span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
export default function ChallengePage() {
  const [slots] = useState(SPOTS);
  const [form, setForm] = useState({ name: "", phone: "", goal: "", gym: "", time: "" });
  const [done, setDone] = useState(false);
  const heroVidRef = useRef<HTMLDivElement>(null);

  // Parallax on hero
  useEffect(() => {
    const fn = () => {
      if (heroVidRef.current) heroVidRef.current.style.transform = `translateY(${window.scrollY * 0.18}px)`;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const clientVisitor =
      typeof window !== "undefined"
        ? {
            href: window.location.href,
            path: window.location.pathname,
            referrer: document.referrer || "",
            language: navigator.language ?? "",
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? "",
            viewport_w: String(window.innerWidth),
            viewport_h: String(window.innerHeight),
          }
        : {};

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_name: "6-week-challenge",
          data: {
            ...form,
            source: "6-week-challenge",
            ...clientVisitor,
          },
        }),
      });
    } catch {}
    setDone(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-16 text-white">
      <ScrollProgress />

      <div style={{ zoom: 0.9 }}>

      {/* ══ NAVBAR ═══════════════════════════════════════════════════════════ */}
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/90 to-transparent" />
        <nav className="relative mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 sm:px-10">
          <Link href="/" className="flex items-center gap-2">
            <span className="relative block h-8 w-8">
              <Image src="/logo.png" alt="TSW Fitness" fill sizes="32px" className="object-contain" />
            </span>
            <span className="font-display text-xl tracking-tighter">
              TSW<span className="text-[var(--color-gold)]">FITNESS</span>
            </span>
          </Link>
          <div className="flex items-center gap-5">
            <div className="hidden sm:block">
              <TimerBlock compact />
            </div>
            <a
              href={APPLY}
              className="rounded-full bg-[var(--color-gold)] px-5 py-2.5 font-body text-[10px] uppercase tracking-[0.35em] text-white hover:opacity-90"
            >
              <SplitHover>Apply Now</SplitHover>
            </a>
          </div>
        </nav>
      </header>

      {/* ══ 1. HERO - EDITORIAL VSL SPLIT ════════════════════════════════════ */}
      <section className="relative min-h-[100svh] overflow-hidden bg-[#070707]">
        <style>{`
          @keyframes growLine { from { transform: scaleX(0); } to { transform: scaleX(1); } }
          @keyframes heroFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
          @keyframes scrollHint { 0% { transform: translateY(0); opacity: .6 } 50% { transform: translateY(7px); opacity: 1 } 100% { transform: translateY(0); opacity: .6 } }
        `}</style>

        {/* layered background: dim video + orange glow + grid + spotlight */}
        <div ref={heroVidRef} className="absolute inset-0 z-0 scale-110">
          <video className="h-full w-full object-cover opacity-[0.14]" src="/video/heroi.mp4" autoPlay muted loop playsInline preload="auto" aria-hidden />
        </div>
        <div aria-hidden className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_72%_28%,rgba(237,93,38,0.22),transparent_55%)]" />
        <div
          aria-hidden
          className="absolute inset-0 z-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
        <Spotlight />
        {/* legibility scrim behind the left copy */}
        <div aria-hidden className="absolute inset-y-0 left-0 z-[2] w-full bg-gradient-to-r from-black via-black/70 to-transparent lg:w-[62%]" />

        {/* editorial frame index */}
        <div className="absolute left-5 top-24 z-10 hidden font-body text-[10px] uppercase tracking-[0.4em] text-white/25 sm:left-10 lg:block">
          (01) - The 6-Week Challenge
        </div>

        <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1500px] items-center gap-12 px-5 pt-32 pb-24 sm:px-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16 lg:pb-28">
          {/* ── LEFT: copy ──────────────────────────────────────────────── */}
          <div className="text-left">
            <Rise>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-4 py-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-gold)]" />
                <span className="font-body text-[9px] uppercase tracking-[0.4em] text-[var(--color-gold)]">
                  Paschim Vihar · Batch 1 closes soon · {slots} spots
                </span>
              </div>
            </Rise>

            <h1 className="mt-6 font-display uppercase leading-[0.95] tracking-tight text-white" style={{ fontSize: "clamp(2.9rem, 6.4vw, 6.4rem)" }}>
              <span className="block">
                <SplitReveal mode="chars" config={{ chars: { duration: 0.8, stagger: 0.018 } }}>Transform Your Body</SplitReveal>
              </span>
              <span className="block">
                <SplitReveal mode="chars" delay={0.12} config={{ chars: { duration: 0.8, stagger: 0.018 } }}>In Just 6 Weeks</SplitReveal>
              </span>
              <span className="relative mt-2 block w-fit">
                <span className="block text-[var(--color-gold)]">
                  <SplitReveal mode="chars" delay={0.26} config={{ chars: { duration: 0.8, stagger: 0.018 } }}>And get your Money Back.</SplitReveal>
                </span>
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[4px] w-full origin-left rounded-full bg-[var(--color-gold)]"
                  style={{ animation: "growLine .9s cubic-bezier(.16,1,.3,1) 1.1s both" }}
                />
              </span>
            </h1>

            <Rise delay={0.15}>
              <p className="mt-7 max-w-xl font-body text-lg leading-relaxed text-white/80">
                Paschim Vihar&apos;s only structured 6-week challenge built on all three pillars -{" "}
                <span className="font-semibold text-white">training, nutrition &amp; weekly 1:1 coaching</span>. Do the work and
                you&apos;ll see real change, and we hand you <span className="font-semibold text-[var(--color-gold)]">{GUARANTEE} back in membership credits</span>. Simple.
              </p>
            </Rise>

            <Rise delay={0.2}>
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} />
                    ))}
                  </div>
                  <span className="font-body text-xs text-white/65">
                    <span className="font-semibold text-white">4.9</span> · 50+ member reviews
                  </span>
                </div>
                <span className="hidden h-3 w-px bg-white/15 sm:block" />
                <span className="font-body text-xs text-white/45">Highest-rated transformation programme in the area</span>
              </div>
            </Rise>

            <Rise delay={0.26}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <a
                    href={APPLY}
                    className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-gold)] px-9 py-4 font-body text-[12px] uppercase tracking-[0.3em] text-white shadow-[0_0_45px_rgba(237,93,38,0.45)] transition-shadow hover:shadow-[0_0_70px_rgba(237,93,38,0.7)]"
                  >
                    <SplitHover>Claim Your Spot - {PRICE}</SplitHover>
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
                      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </span>
                  </a>
                </Magnetic>
                <a href="#proof" className="font-body text-[11px] uppercase tracking-[0.3em] text-white/55 underline-offset-8 transition-colors hover:text-white hover:underline">
                  See transformations
                </a>
              </div>
              <p className="mt-4 font-body text-[11px] text-white/35">
                No payment now · We call within 24 hours · Batch starts {BATCH_DATE}
              </p>
            </Rise>

            {/* inline stat chips */}
            <Rise delay={0.32}>
              <div className="mt-9 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-7">
                {[
                  ["18", "Coached sessions"],
                  ["3×", "Per week"],
                  [GUARANTEE, "Money-back"],
                  ["15", "Spots only"],
                ].map(([n, l]) => (
                  <div key={l} className="flex flex-col">
                    <span className="font-display text-3xl leading-none text-white">{n}</span>
                    <span className="mt-1 font-body text-[9px] uppercase tracking-[0.3em] text-white/35">{l}</span>
                  </div>
                ))}
              </div>
            </Rise>
          </div>

          {/* ── RIGHT: VSL video card ───────────────────────────────────── */}
          <Rise delay={0.2} className="relative">
            <div style={{ animation: "heroFloat 7s ease-in-out infinite" }}>
              <p className="mb-3 flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.35em] text-[var(--color-gold)]">
                <span className="inline-block h-px w-8 bg-[var(--color-gold)]" />
                Watch - 2 min · how it works
              </p>
              <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-[#0d0d0d] p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
                <HeroVSL />
              </div>

              {/* floating result badge */}
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-[var(--color-gold)]/30 bg-[#111111]/95 px-5 py-4 shadow-2xl backdrop-blur sm:block">
                <p className="font-display text-3xl leading-none text-[var(--color-gold)]">−6 kg</p>
                <p className="mt-1 font-body text-[9px] uppercase tracking-[0.3em] text-white/45">avg. in 6 weeks*</p>
              </div>
            </div>
          </Rise>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
          <span className="font-body text-[9px] uppercase tracking-[0.4em] text-white/30">Scroll</span>
          <svg viewBox="0 0 16 24" className="h-5 w-4" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" style={{ animation: "scrollHint 1.8s ease-in-out infinite" }}>
            <path d="M8 2v14M3 11l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* bottom results marquee + countdown */}
        <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-black/50 backdrop-blur">
          <div className="flex items-center">
            <div className="hidden shrink-0 items-center gap-3 border-r border-white/10 px-6 py-3.5 sm:flex">
              <span className="font-body text-[9px] uppercase tracking-[0.3em] text-white/40">Closes in</span>
              <TimerBlock compact />
            </div>
            <div className="relative flex-1 overflow-hidden py-3.5">
              <ResultsMarquee />
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. TRUST STRIP - marquee ═════════════════════════════════════════ */}
      <section className="border-y border-white/[0.06] bg-[#0d0d0d] py-5">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 text-center">
          {[
            ["200+", "Members coached"],
            ["4.9★", "Average rating"],
            ["18", "Sessions per batch"],
            [`${GUARANTEE}`, "Money-back guarantee"],
            ["15", "Spots per batch"],
          ].map(([n, l]) => (
            <div key={l} className="flex items-baseline gap-2">
              <span className="font-display text-2xl text-[var(--color-gold)]">{n}</span>
              <span className="font-body text-[10px] uppercase tracking-[0.3em] text-white/40">{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 2. PRICING SNAPSHOT (mirror of section 8 offer) ═════════════════ */}
      <section className="relative overflow-hidden bg-[#0a0a0a] px-5 py-24 sm:px-10">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_50%_0%,rgba(237,93,38,0.1),transparent_60%)]" />
        <div className="relative mx-auto max-w-[1300px]">
          {/* fast-action bonuses */}
          <Rise>
            <div className="relative overflow-hidden rounded-3xl border border-dashed border-[var(--color-gold)]/40 bg-[#0f0c08] p-7 sm:p-8">
              <div aria-hidden className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-[var(--color-gold)]/10 blur-3xl" />
              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-md">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)]/15 px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-gold)]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-gold)]" /> Fast-action bonuses
                  </span>
                  <h3 className="mt-4 font-display text-2xl uppercase leading-tight text-white sm:text-3xl">
                    Lock your spot before the batch fills - get these free
                  </h3>
                  <p className="mt-2 font-body text-sm text-white/50">
                    Bonuses are only for members who confirm before the 15 spots are gone. Once the batch is full, they&apos;re off the table.
                  </p>
                </div>
                <ul className="grid w-full max-w-md gap-3">
                  {[
                    ["Day 1 body-composition scan", "₹1,000"],
                    ["Supplement & recovery starter guide", "₹800"],
                    ["2 extra guest passes for friends", "₹1,000"],
                  ].map(([item, val]) => (
                    <li key={item} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#141414] px-5 py-3.5">
                      <span className="flex items-center gap-3 font-body text-sm text-white/80">
                        <Check />
                        {item}
                      </span>
                      <span className="shrink-0 font-body text-xs text-white/30 line-through">{val}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Rise>

          {/* price reveal panel */}
          <Rise delay={0.1} className="mt-5">
            <div className="relative overflow-hidden rounded-3xl border border-[var(--color-gold)]/35 bg-gradient-to-br from-[#1c1207] via-[#0f0f0f] to-[#0f0f0f] shadow-[0_0_80px_-30px_rgba(237,93,38,0.6)]">
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--color-gold)]/12 blur-3xl" />
              <div className="relative grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
                {/* left: value breakdown */}
                <div>
                  <p className="font-body text-[10px] uppercase tracking-[0.35em] text-white/35">If you bought it all separately</p>
                  <p className="mt-2 font-display text-4xl text-white/30 line-through">₹14,500+</p>
                  <div className="mt-6">
                    <ValueMeter pay={6999} total={14500} />
                  </div>
                  <p className="mt-5 font-body text-sm leading-relaxed text-white/55">
                    The Challenge bundles every plan, every session and every perk into a single price - so you commit once and never get nickel-and-dimed.
                  </p>
                </div>

                {/* right: price + CTA */}
                <div className="flex flex-col justify-center lg:border-l lg:border-white/10 lg:pl-12">
                  <div className="flex items-center gap-3">
                    <p className="font-body text-[10px] uppercase tracking-[0.35em] text-[var(--color-gold)]">You pay today</p>
                    <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-400">
                      Save ₹7,500 · 52% off
                    </span>
                  </div>
                  <MoneyCounter to={6999} className="mt-2 block font-display leading-none text-[var(--color-gold)] text-[clamp(3.5rem,9vw,6rem)]" />
                  <Magnetic className="mt-6 w-fit">
                    <a
                      href={APPLY}
                      className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-gold)] px-9 py-4 font-body text-[12px] uppercase tracking-[0.3em] text-white shadow-[0_0_40px_rgba(237,93,38,0.45)] transition-shadow hover:shadow-[0_0_70px_rgba(237,93,38,0.7)]"
                    >
                      <SplitHover>Claim Your Spot</SplitHover>
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
                        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
                      </span>
                    </a>
                  </Magnetic>
                  <p className="mt-3 font-body text-[11px] text-white/35">No payment now · we call within 24 hours to confirm</p>
                  <p className="mt-4 border-l-2 border-[var(--color-gold)]/40 pl-3 font-body text-[11px] leading-relaxed text-white/45">
                    Only 15 spots - because every member gets a coach who tracks them personally. We can&apos;t fake that at scale, so the batch is capped.
                  </p>
                </div>
              </div>

              {/* bottom strip */}
              <div className="relative grid grid-cols-2 divide-x divide-y divide-white/[0.07] border-t border-white/[0.07] sm:grid-cols-4 sm:divide-y-0">
                <div className="col-span-2 flex flex-col items-center justify-center gap-1.5 px-3 py-5 text-center sm:col-span-1">
                  <span className="font-body text-[9px] uppercase tracking-[0.3em] text-white/35">Closes in</span>
                  <TimerBlock compact />
                </div>
                <div className="flex flex-col items-center justify-center gap-1 px-3 py-5 text-center">
                  <span className="font-body text-[9px] uppercase tracking-[0.3em] text-white/35">Batch starts</span>
                  <span className="font-display text-lg uppercase text-white">{BATCH_DATE}</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 px-3 py-5 text-center">
                  <span className="font-body text-[9px] uppercase tracking-[0.3em] text-white/35">Spots left</span>
                  <span className="font-display text-3xl text-[var(--color-gold)]">{slots}</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 px-3 py-5 text-center">
                  <span className="font-body text-[9px] uppercase tracking-[0.3em] text-white/35">Guarantee</span>
                  <span className="font-display text-lg uppercase text-white">{GUARANTEE} back in membership credits</span>
                </div>
              </div>
            </div>

            {/* worst / best case */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#111111] p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 font-display text-sm text-emerald-400">≥</span>
                <div>
                  <p className="font-body text-[9px] uppercase tracking-[0.3em] text-emerald-400">Worst case</p>
                  <p className="mt-1 font-display text-lg text-white">18 fully coached sessions</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/[0.06] p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)]/15">
                  <Ico name="shield" className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-body text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)]">Best case</p>
                  <p className="mt-1 font-display text-lg text-white">A new body + {GUARANTEE} back</p>
                </div>
              </div>
            </div>
          </Rise>
        </div>
      </section>

      </div>

      {/* ══ 3. TRANSFORMATIONS - GSAP pinned horizontal scroll (not zoomed: GSAP pin needs true viewport px) ═══════════════ */}
      <HorizontalTransforms />

      <div style={{ zoom: 0.9 }}>

      {/* ══ 4. PAIN - "why isn't it working?" ════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0d0d0d] px-5 py-24 sm:px-10">
        <div className="mx-auto grid max-w-[1300px] items-center gap-12 lg:grid-cols-2">
          <Rise>
            <Eyebrow>If this sounds like you</Eyebrow>
            <h2 className="mt-5 font-display uppercase leading-[1.04] tracking-tight text-white" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
              <SplitReveal mode="words" triggerOnScroll config={{ words: { duration: 0.7, stagger: 0.05 } }}>
                &ldquo;I keep starting. I keep stopping. Nothing sticks.&rdquo;
              </SplitReveal>
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                "You buy a membership in January and stop going by February.",
                "You train hard but have no idea if you're actually eating right.",
                "Nobody at your gym would notice if you never came back.",
                "You've watched the same belly fat refuse to move for years.",
                "You're not lazy - you've just never had a real plan and a real coach.",
              ].map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-gold)]" />
                  <span className="font-body text-base leading-relaxed text-white/60">{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl border border-[var(--color-gold)]/25 bg-[var(--color-gold)]/[0.06] p-6">
              <p className="font-body text-base leading-relaxed text-white/75">
                You&apos;re not broken, and you don&apos;t lack willpower. You&apos;ve been missing a complete system - a plan
                built for your body, food built for your life, and someone who actually checks that you showed up.
              </p>
              <p className="mt-3 font-body text-sm font-semibold text-[var(--color-gold)]">That is exactly what the 6-Week Challenge gives you.</p>
            </div>
          </Rise>

          <Rise delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#101010]" style={{ aspectRatio: "4/5" }}>
              <Image
                src="/challenge/pain.png"
                alt="Member mid-session, focused"
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Rise>
        </div>
      </section>

      {/* ══ 5. COMPARISON TABLE ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0a0a0a] px-5 py-24 sm:px-10">
        <div className="mx-auto max-w-[1200px]">
          <Rise className="mb-12 text-center">
            <Eyebrow>The difference</Eyebrow>
            <h2 className="mt-5 font-display text-[8vw] uppercase leading-[1.04] tracking-tight text-white sm:text-5xl">
              <SplitReveal mode="chars" triggerOnScroll config={{ chars: { duration: 0.8, stagger: 0.02 } }}>
                Why This Works When Other Gyms Don&apos;t
              </SplitReveal>
            </h2>
          </Rise>

          {/* desktop / tablet: 3-column table */}
          <Rise className="hidden overflow-hidden rounded-3xl border border-white/10 md:block">
            <div className="grid grid-cols-[1.2fr_1fr_1.3fr] bg-[#141414]">
              <div className="px-6 py-4" />
              <div className="border-l border-white/[0.07] px-6 py-4">
                <span className="font-body text-[10px] uppercase tracking-[0.3em] text-white/40">A typical gym</span>
              </div>
              <div className="border-l border-[var(--color-gold)]/30 bg-[var(--color-gold)]/5 px-6 py-4">
                <span className="font-body text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]">TSW 6-Week Challenge</span>
              </div>
            </div>

            {COMPARISON.map(([feat, bad, good], i) => (
              <div
                key={feat}
                className={`grid grid-cols-[1.2fr_1fr_1.3fr] border-t border-white/[0.06] ${i % 2 === 0 ? "bg-[#111111]" : "bg-[#0f0f0f]"}`}
              >
                <div className="flex items-center px-6 py-5 font-body text-sm font-semibold text-white/60">{feat}</div>
                <div className="flex items-center gap-3 border-l border-white/[0.06] px-6 py-5">
                  <X />
                  <span className="font-body text-sm text-white/40">{bad}</span>
                </div>
                <div className="flex items-center gap-3 border-l border-[var(--color-gold)]/20 bg-[var(--color-gold)]/[0.03] px-6 py-5">
                  <Check />
                  <span className="font-body text-sm text-white/80">{good}</span>
                </div>
              </div>
            ))}
          </Rise>

          {/* mobile: stacked per-feature cards */}
          <div className="space-y-4 md:hidden">
            {COMPARISON.map(([feat, bad, good], i) => (
              <Rise key={feat} delay={i * 0.05}>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111]">
                  <p className="border-b border-white/[0.07] bg-[#161616] px-5 py-3 font-body text-sm font-semibold text-white">{feat}</p>
                  <div className="flex items-start gap-3 px-5 py-4">
                    <X />
                    <div>
                      <p className="font-body text-[9px] uppercase tracking-[0.3em] text-white/30">A typical gym</p>
                      <p className="mt-0.5 font-body text-sm text-white/45">{bad}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 border-t border-[var(--color-gold)]/15 bg-[var(--color-gold)]/[0.05] px-5 py-4">
                    <Check />
                    <div>
                      <p className="font-body text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)]">TSW 6-Week Challenge</p>
                      <p className="mt-0.5 font-body text-sm text-white/85">{good}</p>
                    </div>
                  </div>
                </div>
              </Rise>
            ))}
          </div>

          <Rise className="mt-9 text-center">
            <ApplyBtn>Start the Challenge - {PRICE}</ApplyBtn>
          </Rise>
        </div>
      </section>

      {/* ══ 6. 3 PILLARS ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0d0d0d] px-5 py-24 sm:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Rise className="mb-14 text-center">
            <Eyebrow>Built on three pillars</Eyebrow>
            <h2 className="mt-5 font-display text-[8vw] uppercase leading-[1.04] tracking-tight text-white sm:text-5xl">
              <SplitReveal mode="chars" triggerOnScroll config={{ chars: { duration: 0.8, stagger: 0.02 } }}>
                Everything Most Gyms Leave Out
              </SplitReveal>
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-sm text-white/45">
              Real change needs all three working together. Drop any one and you&apos;re back to starting and stopping.
            </p>
          </Rise>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "Training",
                d: "A personalised workout plan built for your goal and your level - adjusted every week as you get stronger. No copy-paste routines.",
                slot: "pillar-training",
              },
              {
                n: "02",
                t: "Nutrition",
                d: "A diet plan built around your food, your schedule and your preferences - with a grocery list and an eating-out guide you can actually follow.",
                slot: "pillar-nutrition",
              },
              {
                n: "03",
                t: "Accountability",
                d: "A weekly 1:1 trainer check-in and a 15-person batch where you can't quietly disappear. Someone is always watching your progress.",
                slot: "pillar-accountability",
              },
            ].map((p, i) => (
              <Rise key={p.t} delay={i * 0.08}>
                <Tilt className="h-full">
                  <div className="group h-full overflow-hidden rounded-3xl border border-white/10 bg-[#111111] transition-colors hover:border-[var(--color-gold)]/40">
                    <div className="relative bg-[#101010]" style={{ aspectRatio: "4/3" }}>
                      <Image
                        src={`/challenge/${p.slot}.png`}
                        alt={`${p.t} pillar`}
                        fill
                        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-7">
                      <span className="font-display text-3xl text-[var(--color-gold)]/40">{p.n}</span>
                      <h3 className="mt-2 font-display text-2xl uppercase text-white">{p.t}</h3>
                      <p className="mt-3 font-body text-sm leading-relaxed text-white/55">{p.d}</p>
                    </div>
                  </div>
                </Tilt>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6.5 QUALIFICATION - who it's for / not for + honesty ════════════ */}
      <section className="relative overflow-hidden bg-[#0a0a0a] px-5 py-24 sm:px-10">
        <div className="mx-auto max-w-[1100px]">
          <Rise className="mb-12 text-center">
            <Eyebrow>Let&apos;s be honest</Eyebrow>
            <h2 className="mt-5 font-display text-[8vw] uppercase leading-[1.04] tracking-tight text-white sm:text-5xl">
              <SplitReveal mode="chars" triggerOnScroll config={{ chars: { duration: 0.8, stagger: 0.02 } }}>
                This Challenge Isn&apos;t For Everyone
              </SplitReveal>
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-sm text-white/45">
              We keep batches to 15 people, so we&apos;re picky on purpose. Read both lists honestly before you apply.
            </p>
          </Rise>

          <div className="grid gap-5 md:grid-cols-2">
            <Rise>
              <div className="h-full rounded-3xl border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/[0.05] p-7">
                <p className="font-body text-[10px] font-semibold uppercase tracking-[0.35em] text-[var(--color-gold)]">This is for you if…</p>
                <ul className="mt-5 space-y-3.5">
                  {[
                    "You can commit to 3 sessions a week for 6 weeks.",
                    "You're done with random workouts and want a real plan.",
                    "You actually want someone holding you accountable.",
                    "You're ready to start now - not \"someday\".",
                    "You want results you can measure, not just a vibe.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check c="#4CAF50" />
                      <span className="font-body text-sm leading-relaxed text-white/75">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Rise>
            <Rise delay={0.1}>
              <div className="h-full rounded-3xl border border-white/10 bg-[#111111] p-7">
                <p className="font-body text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40">This is NOT for you if…</p>
                <ul className="mt-5 space-y-3.5">
                  {[
                    "You just want the cheapest gym in the area.",
                    "You expect results with zero effort.",
                    "You'll only show up when it's convenient.",
                    "You're not willing to follow a nutrition plan.",
                    "You quit the moment things get hard.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <X />
                      <span className="font-body text-sm leading-relaxed text-white/45">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Rise>
          </div>

          {/* damaging admission */}
          <Rise delay={0.15}>
            <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-white/10 bg-[#0d0d0d] p-6 text-center">
              <p className="font-body text-sm leading-relaxed text-white/60">
                Straight up: we don&apos;t have a juice bar, a pool, or the lowest price in Paschim Vihar. What we have is a
                coaching system that actually works - <span className="text-white">if you put in the work, we&apos;ll match it every step.</span>
              </p>
            </div>
          </Rise>
        </div>
      </section>

      {/* ══ 7. STATS BAR ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[var(--color-gold)] px-5 py-16 sm:px-10">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,0,0,0.1),transparent_70%)]" />
        <div className="relative mx-auto max-w-[1400px]">
          <p className="mb-8 text-center font-body text-[10px] uppercase tracking-[0.5em] text-black/50">The programme by the numbers</p>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { to: 18, suffix: "", label: "Coached sessions" },
              { to: 3, suffix: "×/wk", label: "Training frequency" },
              { to: 42, suffix: " days", label: "Total duration" },
              { to: 15, suffix: "", label: "Spots per batch" },
            ].map(({ to, suffix, label }) => (
              <div key={label} className="flex flex-col items-center gap-1 text-center">
                <span className="font-display leading-none text-black" style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}>
                  <AnimatedCounter to={to} />
                  {suffix}
                </span>
                <span className="font-body text-[10px] uppercase tracking-[0.4em] text-black/50">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 8. VALUE STACK - bento + value meter ═════════════════════════════ */}
      <section id="offer" className="relative overflow-hidden bg-[#0a0a0a] px-5 py-24 sm:px-10">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_50%_0%,rgba(237,93,38,0.1),transparent_60%)]" />
        <div className="relative mx-auto max-w-[1300px]">
          {/* header */}
          <Rise className="mx-auto max-w-2xl text-center">
            <Eyebrow>Everything you get</Eyebrow>
            <h2 className="mt-5 font-display uppercase leading-[1.04] tracking-tight text-white" style={{ fontSize: "clamp(2.4rem, 6.5vw, 5.5rem)" }}>
              <SplitReveal mode="chars" triggerOnScroll config={{ chars: { duration: 0.8, stagger: 0.02 } }}>Everything Included.</SplitReveal>
              <span className="mt-1 block text-[var(--color-gold)]">
                <SplitReveal mode="chars" triggerOnScroll delay={0.1} config={{ chars: { duration: 0.8, stagger: 0.02 } }}>One Simple Price.</SplitReveal>
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-md font-body text-sm leading-relaxed text-white/55">
              No upsells. No hidden PT charges. No paying extra for your diet plan. It&apos;s all in your {PRICE}.
            </p>
          </Rise>

          {/* featured 3 deliverables */}
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {[
              { icon: "dumbbell", t: "Personalised Training Plan", d: "Built for your goal and your level - and updated every single week as you get stronger.", v: "₹2,000 value" },
              { icon: "plate", t: "Personalised Nutrition Plan", d: "Around your food, schedule and preferences - with a grocery list and an eating-out guide.", v: "₹2,500 value" },
              { icon: "chat", t: "Weekly 1:1 Coaching × 6", d: "A dedicated trainer who knows your name and your numbers, checking in with you every week.", v: "₹3,000 value" },
            ].map((c, i) => (
              <Rise key={c.t} delay={i * 0.08}>
                <Tilt className="h-full" max={6}>
                  <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#141414] to-[#0e0e0e] p-7 transition-colors hover:border-[var(--color-gold)]/40">
                    <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[var(--color-gold)]/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10">
                      <Ico name={c.icon} className="h-7 w-7" />
                    </div>
                    <h3 className="mt-5 font-display text-2xl uppercase leading-tight text-white">{c.t}</h3>
                    <p className="mt-3 font-body text-sm leading-relaxed text-white/55">{c.d}</p>
                    <span className="mt-5 inline-block rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-body text-[10px] uppercase tracking-[0.25em] text-white/40">
                      {c.v}
                    </span>
                  </div>
                </Tilt>
              </Rise>
            ))}
          </div>

          {/* secondary inclusions */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "clock", t: "Full gym access", s: "7 days a week", v: "₹4,000" },
              { icon: "steam", t: "Steam & recovery", s: "Unwind and repair", v: "₹1,500" },
              { icon: "chart", t: "Progress tracking", s: "Day 1 & Day 42", v: "₹500" },
              { icon: "users", t: "Accountability group", s: "Private WhatsApp", v: "Included" },
              { icon: "ticket", t: "1 guest pass", s: "Bring a friend", v: "₹500" },
              { icon: "car", t: "Covered parking", s: "Hassle-free", v: "₹500" },
              { icon: "award", t: "Completion certificate", s: "Earn your finish", v: "Included" },
              { icon: "shield", t: "No PT charges, ever", s: "Zero upsells", v: "Included" },
            ].map((c, i) => (
              <Rise key={c.t} delay={i * 0.04}>
                <div className="group flex h-full items-start gap-4 rounded-2xl border border-white/[0.07] bg-[#111111] p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--color-gold)]/30">
                  <Ico name={c.icon} className="mt-0.5 h-6 w-6 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-body text-sm font-semibold text-white">{c.t}</p>
                    <p className="font-body text-xs text-white/40">{c.s}</p>
                    <span className="mt-2 inline-block font-body text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold)]/70">{c.v}</span>
                  </div>
                </div>
              </Rise>
            ))}
          </div>

          {/* fast-action bonuses */}
          <Rise delay={0.08} className="mt-5">
            <div className="relative overflow-hidden rounded-3xl border border-dashed border-[var(--color-gold)]/40 bg-[#0f0c08] p-7 sm:p-8">
              <div aria-hidden className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-[var(--color-gold)]/10 blur-3xl" />
              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-md">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)]/15 px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-gold)]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-gold)]" /> Fast-action bonuses
                  </span>
                  <h3 className="mt-4 font-display text-2xl uppercase leading-tight text-white sm:text-3xl">
                    Lock your spot before the batch fills - get these free
                  </h3>
                  <p className="mt-2 font-body text-sm text-white/50">
                    Bonuses are only for members who confirm before the 15 spots are gone. Once the batch is full, they&apos;re off the table.
                  </p>
                </div>
                <ul className="grid w-full max-w-md gap-3">
                  {[
                    ["Day 1 body-composition scan", "₹1,000"],
                    ["Supplement & recovery starter guide", "₹800"],
                    ["2 extra guest passes for friends", "₹1,000"],
                  ].map(([item, val]) => (
                    <li key={item} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#141414] px-5 py-3.5">
                      <span className="flex items-center gap-3 font-body text-sm text-white/80">
                        <Check />
                        {item}
                      </span>
                      <span className="shrink-0 font-body text-xs text-white/30 line-through">{val}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Rise>

          {/* price reveal panel */}
          <Rise delay={0.1} className="mt-5">
            <div className="relative overflow-hidden rounded-3xl border border-[var(--color-gold)]/35 bg-gradient-to-br from-[#1c1207] via-[#0f0f0f] to-[#0f0f0f] shadow-[0_0_80px_-30px_rgba(237,93,38,0.6)]">
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--color-gold)]/12 blur-3xl" />
              <div className="relative grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
                {/* left: value breakdown */}
                <div>
                  <p className="font-body text-[10px] uppercase tracking-[0.35em] text-white/35">If you bought it all separately</p>
                  <p className="mt-2 font-display text-4xl text-white/30 line-through">₹14,500+</p>
                  <div className="mt-6">
                    <ValueMeter pay={6999} total={14500} />
                  </div>
                  <p className="mt-5 font-body text-sm leading-relaxed text-white/55">
                    The Challenge bundles every plan, every session and every perk into a single price - so you commit once and never get nickel-and-dimed.
                  </p>
                </div>

                {/* right: price + CTA */}
                <div className="flex flex-col justify-center lg:border-l lg:border-white/10 lg:pl-12">
                  <div className="flex items-center gap-3">
                    <p className="font-body text-[10px] uppercase tracking-[0.35em] text-[var(--color-gold)]">You pay today</p>
                    <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-400">
                      Save ₹7,500 · 52% off
                    </span>
                  </div>
                  <MoneyCounter to={6999} className="mt-2 block font-display leading-none text-[var(--color-gold)] text-[clamp(3.5rem,9vw,6rem)]" />
                  <Magnetic className="mt-6 w-fit">
                    <a
                      href={APPLY}
                      className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-gold)] px-9 py-4 font-body text-[12px] uppercase tracking-[0.3em] text-white shadow-[0_0_40px_rgba(237,93,38,0.45)] transition-shadow hover:shadow-[0_0_70px_rgba(237,93,38,0.7)]"
                    >
                      <SplitHover>Claim Your Spot</SplitHover>
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
                        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
                      </span>
                    </a>
                  </Magnetic>
                  <p className="mt-3 font-body text-[11px] text-white/35">No payment now · we call within 24 hours to confirm</p>
                  <p className="mt-4 border-l-2 border-[var(--color-gold)]/40 pl-3 font-body text-[11px] leading-relaxed text-white/45">
                    Only 15 spots - because every member gets a coach who tracks them personally. We can&apos;t fake that at scale, so the batch is capped.
                  </p>
                </div>
              </div>

              {/* bottom strip */}
              <div className="relative grid grid-cols-2 divide-x divide-y divide-white/[0.07] border-t border-white/[0.07] sm:grid-cols-4 sm:divide-y-0">
                <div className="col-span-2 flex flex-col items-center justify-center gap-1.5 px-3 py-5 text-center sm:col-span-1">
                  <span className="font-body text-[9px] uppercase tracking-[0.3em] text-white/35">Closes in</span>
                  <TimerBlock compact />
                </div>
                <div className="flex flex-col items-center justify-center gap-1 px-3 py-5 text-center">
                  <span className="font-body text-[9px] uppercase tracking-[0.3em] text-white/35">Batch starts</span>
                  <span className="font-display text-lg uppercase text-white">{BATCH_DATE}</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 px-3 py-5 text-center">
                  <span className="font-body text-[9px] uppercase tracking-[0.3em] text-white/35">Spots left</span>
                  <span className="font-display text-3xl text-[var(--color-gold)]">{slots}</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 px-3 py-5 text-center">
                  <span className="font-body text-[9px] uppercase tracking-[0.3em] text-white/35">Guarantee</span>
                  <span className="font-display text-lg uppercase text-white">{GUARANTEE} back</span>
                </div>
              </div>
            </div>

            {/* worst / best case */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#111111] p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 font-display text-sm text-emerald-400">≥</span>
                <div>
                  <p className="font-body text-[9px] uppercase tracking-[0.3em] text-emerald-400">Worst case</p>
                  <p className="mt-1 font-display text-lg text-white">18 fully coached sessions</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/[0.06] p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)]/15">
                  <Ico name="shield" className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-body text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)]">Best case</p>
                  <p className="mt-1 font-display text-lg text-white">A new body + {GUARANTEE} back</p>
                </div>
              </div>
            </div>
          </Rise>
        </div>
      </section>

      {/* ══ 9. VIDEO TESTIMONIALS ═════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0d0d0d] px-5 py-24 sm:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Rise className="mb-14 text-center">
            <Eyebrow>See what members say</Eyebrow>
            <h2 className="mt-5 font-display text-[8vw] uppercase tracking-tight text-white sm:text-5xl">
              <SplitReveal mode="chars" triggerOnScroll config={{ chars: { duration: 0.8, stagger: 0.02 } }}>
                Real Stories. Real Results.
              </SplitReveal>
            </h2>
            <p className="mx-auto mt-4 max-w-lg font-body text-sm text-white/40">
              In their own words - members who finished the Challenge.
            </p>
          </Rise>

        </div>

        {/* auto-scrolling testimonial row (pauses on hover) */}
        <div className="group relative">
          {/* edge fades */}
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0d0d0d] to-transparent" />
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0d0d0d] to-transparent" />
          <div className="flex w-max animate-marquee marquee-gpu gap-5 group-hover:[animation-play-state:paused]">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((c, i) => (
              <div key={i} className="w-72 shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-[#111111] transition-colors hover:border-[var(--color-gold)]/40 sm:w-80">
                <div className="p-5">
                  <div className="mb-3 flex gap-0.5">
                    {[...Array(5)].map((_, k) => (
                      <Star key={k} />
                    ))}
                  </div>
                  <p className="font-body text-sm leading-relaxed text-white/65">&ldquo;{c.q}&rdquo;</p>
                  <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-4">
                    <span className="font-body text-xs font-semibold text-white">{c.name}</span>
                    <span className="font-display text-sm text-[var(--color-gold)]">{c.stat}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 10. TIMELINE ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0a0a0a] px-5 py-24 sm:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Rise className="mb-14 text-center">
            <Eyebrow>Your 5-step journey</Eyebrow>
            <h2 className="mt-5 font-display text-[8vw] uppercase tracking-tight text-white sm:text-5xl">
              <SplitReveal mode="chars" triggerOnScroll config={{ chars: { duration: 0.8, stagger: 0.02 } }}>
                From Application to Transformation
              </SplitReveal>
            </h2>
          </Rise>
          <div className="relative grid gap-8 sm:grid-cols-5 sm:gap-0">
            <div className="pointer-events-none absolute left-0 right-0 top-10 hidden h-px bg-white/10 sm:block" />
            <GrowLine className="pointer-events-none absolute left-0 right-0 top-10 hidden h-[2px] sm:block" />
            {[
              { n: "01", title: "Apply", desc: "Fill the 60-second form. We call within 24 hours to confirm your spot." },
              { n: "02", title: "Day 1", desc: "Full assessment. Personalised workout + diet plan in hand. Baseline photos and measurements." },
              { n: "03", title: "Weeks 1–4", desc: "Train 3×/week. Weekly 1:1 check-in. Nutrition adjusted as you go." },
              { n: "04", title: "Weeks 5–6", desc: "Final push. Maximum effort. Your trainer tracks every session." },
              { n: "05", title: "Day 42", desc: "Final measurements. Results assessed. Guarantee evaluated. Certificate earned." },
            ].map((s, i) => (
              <Rise key={s.n} delay={i * 0.08}>
                <div className="relative flex flex-col items-center gap-4 px-3 text-center">
                  <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-[var(--color-gold)]/30 bg-[#0a0a0a]">
                    <span className="font-display text-3xl text-[var(--color-gold)]">{s.n}</span>
                  </div>
                  <h3 className="font-display text-2xl uppercase text-white">{s.title}</h3>
                  <p className="font-body text-xs leading-relaxed text-white/45">{s.desc}</p>
                </div>
              </Rise>
            ))}
          </div>
          <Rise className="mt-12 text-center">
            <ApplyBtn>Apply for Batch 1</ApplyBtn>
          </Rise>
        </div>
      </section>

      {/* ══ 11. COACHES ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0d0d0d] px-5 py-24 sm:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Rise className="mb-14 text-center">
            <Eyebrow>Coaching that actually shows up</Eyebrow>
            <h2 className="mt-5 font-display text-[8vw] uppercase tracking-tight text-white sm:text-5xl">
              <SplitReveal mode="chars" triggerOnScroll config={{ chars: { duration: 0.8, stagger: 0.02 } }}>
                Meet Your Coaches
              </SplitReveal>
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-sm text-white/45">
              You&apos;re assigned a dedicated trainer who knows your name, your numbers and your plan. With 15 members max per batch, you get real attention.
            </p>
          </Rise>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Hari Chhetri",
                spec: "Personal training & sport nutrition",
                img: "/trainer/hari_chhetri.PNG",
                experience: "17 years experience",
                trained: "500+ results delivered",
                certs: ["GFFI Academy — Personal Fitness Training, Sport Nutrition"],
              },
              {
                name: "Manoj Kumar",
                spec: "Strength & programming",
                img: "/trainer/manoj_kumar.png",
                experience: "7+ years experience",
                trained: "120+ members trained",
                certs: ["GGFI Fitness Academy"],
              },
              {
                name: "Amit Kumar",
                spec: "Functional training & yoga",
                img: "/trainer/amit_kumar.png",
                experience: "3+ years experience (Yoga 2+ years)",
                trained: "70+ members trained",
                certs: ["K11 School of Fitness Science", "Masters in Yoga (M.A)"],
              },
              {
                name: "Jatin Khatri",
                spec: "Strength & conditioning",
                img: "/trainer/jatin_khatri.png",
                experience: "4 years experience",
                trained: "100+ members trained",
                certs: ["GGFI — Gold Gym Fitness Institute"],
              },
              
              {
                name: "Ajay",
                spec: "Fat-loss & conditioning",
                img: "/trainer/ajay_rana.png",
                experience: "2 years experience",
                trained: "100+ members trained",
                certs: ["K11 School of Fitness Science"],
              },
              {
                name: "Neha",
                spec: "Women's training & combat fitness",
                img: "/trainer/neha.png",
                experience: "5 years experience · 3 years army training",
                trained: "50+ results delivered",
                certs: ["2× Silver Medalist"],
              },
            ].map((c, i) => (
              <Rise key={c.name} delay={i * 0.07}>
                <Tilt>
                  <div className="group h-full overflow-hidden rounded-3xl border border-white/10 bg-[#111111] transition-colors hover:border-[var(--color-gold)]/40">
                    <div className="relative bg-[#101010]" style={{ aspectRatio: "3/4" }}>
                      <Image
                        src={c.img}
                        alt={`${c.name} - TSW coach`}
                        fill
                        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-2xl md:text-3xl uppercase text-white">{c.name}</h3>
                      <p className="mt-1 font-body text-[10px] md:text-xs uppercase tracking-[0.3em] text-[var(--color-gold)]">{c.spec}</p>
                      <div className="mt-3 space-y-1 font-body text-xs md:text-sm text-white/55">
                        <p>{c.experience}</p>
                        <p>{c.trained}</p>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {c.certs.map((cert) => (
                          <span
                            key={cert}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-body text-[10px] uppercase tracking-wider text-white/60"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Tilt>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 12. FOUNDER QUOTE ═════════════════════════════════════════════════ */}
      {/* <section className="relative overflow-hidden bg-[#0a0a0a] px-5 py-24 sm:px-10">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[var(--color-gold)]/20 to-transparent" />
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Rise>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#101010]" style={{ aspectRatio: "4/5" }}>
              <video
                src="/challenge/founder_video.mp4#t=0.1"
                className="absolute inset-0 h-full w-full object-cover"
                controls
                playsInline
                preload="metadata"
              />
            </div>
          </Rise>
          <Rise delay={0.1}>
            <Eyebrow>A note from the founder</Eyebrow>
            <blockquote className="mt-6 font-display uppercase leading-[1.05] tracking-tight text-white" style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.8rem)" }}>
              <SplitReveal mode="words" triggerOnScroll config={{ words: { duration: 0.6, stagger: 0.04 } }}>
                &ldquo;We got tired of watching people pay for a membership, get handed a machine, and quietly quit. So we built the opposite - a plan, a coach, and a guarantee.&rdquo;
              </SplitReveal>
            </blockquote>
            <p className="mt-7 font-body text-sm text-white/55">
              Replace with the founder&apos;s name and title. Add a signature image and a one-line credential.
            </p>
            <p className="mt-1 font-body text-[11px] uppercase tracking-[0.3em] text-white/30">Founder · TSW Fitness</p>
          </Rise>
        </div>
      </section> */}

      {/* ══ 13. GUARANTEE ═════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0d0d0d] px-5 py-24 sm:px-10">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_50%_0%,rgba(237,93,38,0.1),transparent_60%)]" />
        <div className="relative mx-auto max-w-[1200px]">
          {/* header + rotating seal */}
          <Rise className="flex flex-col items-center text-center">
            <Eyebrow>The guarantee</Eyebrow>
            <h2 className="mt-5 font-display uppercase leading-[1.04] tracking-tight text-white" style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)" }}>
              <span className="block">
                <SplitReveal mode="chars" triggerOnScroll config={{ chars: { duration: 0.8, stagger: 0.02 } }}>Achieve your goal.</SplitReveal>
              </span>
              <span className="block text-[var(--color-gold)]">
                <SplitReveal mode="chars" triggerOnScroll delay={0.15} config={{ chars: { duration: 0.8, stagger: 0.02 } }}>
                  And Get {GUARANTEE} Back in membership credits.
                </SplitReveal>
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-body text-sm leading-relaxed text-white/55">
              This isn&apos;t a marketing line - it&apos;s a written commitment. Hit both conditions below and we credit{" "}
              <span className="text-white">{GUARANTEE}{" "}</span> toward your membership. We can put that in writing because the
              system works when you actually show up - we&apos;ve watched it happen, batch after batch.
            </p>
          </Rise>

          {/* rotating seal */}
          <Rise delay={0.1} className="mt-12 flex justify-center">
            <div className="relative h-40 w-40">
              <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-[spin_22s_linear_infinite]">
                <defs>
                  <path id="sealPath" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
                </defs>
                <text fill="rgba(255,255,255,0.4)" fontSize="12.5" letterSpacing="3.2" style={{ textTransform: "uppercase" }}>
                  <textPath href="#sealPath">MONEY-BACK GUARANTEE · TSW FITNESS · RESULTS OR REFUND · </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 m-auto flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10">
                <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="#ED5D26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                <span className="mt-1 font-display text-lg text-white">{GUARANTEE}</span>
              </div>
            </div>
          </Rise>

          {/* 3-step process */}
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            <Rise>
              <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-[#111111] p-7">
                <span className="font-display text-5xl text-white/10">01</span>
                <p className="-mt-4 font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-gold)]">Condition 1 - Attendance</p>
                <p className="mt-3 font-body text-sm leading-relaxed text-white/55">
                  Attend all 18 sessions - 3 per week, 6 weeks, zero missed. Tracked by your trainer every single session.
                </p>
              </div>
            </Rise>
            <Rise delay={0.08}>
              <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-[#111111] p-7">
                <span className="font-display text-5xl text-white/10">02</span>
                <p className="-mt-4 font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-gold)]">Condition 2 - Progress (any 2 of 6)</p>
                <ul className="mt-3 space-y-2">
                  {[
                    "Body weight / body-fat % drop",
                    "Visible inch loss",
                    "Strength gain in key lifts",
                    "Full attendance - 18/18",
                    "Better endurance score",
                    "Day 1 vs Day 42 photos",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check c="#4CAF50" />
                      <span className="font-body text-xs text-white/55">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Rise>
            <Rise delay={0.16}>
              <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--color-gold)]/35 bg-gradient-to-b from-[#1a1005] to-[#0f0f0f] p-7">
                <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[var(--color-gold)]/12 blur-2xl" />
                <span className="font-display text-5xl text-[var(--color-gold)]/25">✓</span>
                <p className="-mt-3 font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-gold)]">Result - {GUARANTEE} credit</p>
                <p className="mt-3 font-body text-sm leading-relaxed text-white/70">
                  Credited toward any TSW membership. Assessed by your coach on Day 42 using your actual measurements - not opinion.
                </p>
                <a
                  href={APPLY}
                  className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-[var(--color-gold)] px-6 py-3 font-body text-[10px] uppercase tracking-[0.3em] text-white transition-all hover:-translate-y-0.5"
                >
                  <SplitHover>Start &amp; claim it</SplitHover>
                </a>
              </div>
            </Rise>
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center font-body text-[10px] italic text-white/20">
            *T&amp;C apply. Full terms at reception. Progress assessed through Day 1 vs Day 42 measurements, performance tracking, attendance records and trainer evaluation.
          </p>
        </div>
      </section>

      {/* ══ 14. FAQ ═══════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#0a0a0a] px-5 py-24 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <Rise className="mb-12 text-center">
            <Eyebrow>Questions we hear every day</Eyebrow>
            <h2 className="mt-5 font-display text-[8vw] uppercase tracking-tight text-white sm:text-5xl">
              <SplitReveal mode="chars" triggerOnScroll config={{ chars: { duration: 0.8, stagger: 0.02 } }}>You Asked</SplitReveal>
            </h2>
          </Rise>
          <Rise>
            <FAQ />
          </Rise>
        </div>
      </section>

      {/* ══ 15. APPLY FORM ════════════════════════════════════════════════════ */}
      <section id="apply" className="relative overflow-hidden bg-[#0d0d0d] px-5 py-24 sm:px-10">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-[radial-gradient(circle_at_50%_100%,rgba(237,93,38,0.1),transparent_60%)]" />
        <div className="relative mx-auto max-w-xl">
          <div className="mb-10 overflow-hidden rounded-2xl border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/8 p-5">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.4em] text-[var(--color-gold)]">Applications close in</p>
                <p className="mt-1 font-body text-sm text-white/55">
                  Batch 1 · {BATCH_DATE} · <span className="font-semibold text-white">{slots} spots only</span>
                </p>
              </div>
              <TimerBlock />
            </div>
          </div>

          <div className="text-center">
            <h2 className="font-display text-5xl uppercase leading-[1.04] tracking-tight text-white sm:text-6xl">
              <SplitReveal mode="chars" triggerOnScroll config={{ chars: { duration: 0.8, stagger: 0.02 } }}>Claim Your Spot</SplitReveal>
            </h2>
            <p className="mt-4 font-body text-sm text-white/40">No payment now. We call to confirm. You decide.</p>
          </div>

          <div className="mt-10">
            {done ? (
              <div className="rounded-3xl border border-[var(--color-gold)]/40 bg-[#111111] p-12 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-gold)]/15">
                  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="#ED5D26" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                </div>
                <h3 className="font-display text-3xl uppercase text-white">Application Received</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-white/50">
                  We&apos;ll call you within 24 hours to confirm your spot. Your transformation starts {BATCH_DATE}.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-[#111111] p-8 sm:p-10">
                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block font-body text-[10px] uppercase tracking-[0.35em] text-white/35">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 font-body text-sm text-white placeholder-white/20 outline-none transition focus:border-[var(--color-gold)]/50 focus:ring-1 focus:ring-[var(--color-gold)]/20"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-body text-[10px] uppercase tracking-[0.35em] text-white/35">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 font-body text-sm text-white placeholder-white/20 outline-none transition focus:border-[var(--color-gold)]/50 focus:ring-1 focus:ring-[var(--color-gold)]/20"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-body text-[10px] uppercase tracking-[0.35em] text-white/35">Main Goal *</label>
                    <select
                      required
                      value={form.goal}
                      onChange={(e) => setForm({ ...form, goal: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-[#111111] px-4 py-3.5 font-body text-sm text-white outline-none transition focus:border-[var(--color-gold)]/50 focus:ring-1 focus:ring-[var(--color-gold)]/20"
                    >
                      <option value="" disabled>
                        Select your goal
                      </option>
                      <option value="fat-loss">Fat loss</option>
                      <option value="muscle-gain">Muscle gain</option>
                      <option value="general-fitness">General fitness</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block font-body text-[10px] uppercase tracking-[0.35em] text-white/35">Been to a gym before?</label>
                    <div className="flex gap-3">
                      {["Yes", "No"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setForm({ ...form, gym: opt })}
                          className={`flex-1 rounded-xl border py-3.5 font-body text-sm uppercase tracking-widest transition-colors ${
                            form.gym === opt
                              ? "border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold)]"
                              : "border-white/10 text-white/40 hover:border-white/20"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block font-body text-[10px] uppercase tracking-[0.35em] text-white/35">Best time to call?</label>
                    <div className="flex gap-2">
                      {["Morning", "Afternoon", "Evening"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setForm({ ...form, time: opt })}
                          className={`flex-1 rounded-xl border py-3.5 font-body text-xs uppercase tracking-widest transition-colors ${
                            form.time === opt
                              ? "border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold)]"
                              : "border-white/10 text-white/40 hover:border-white/20"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-8 w-full rounded-full bg-[var(--color-gold)] py-4 font-body text-[11px] uppercase tracking-[0.25em] text-white shadow-[0_0_30px_rgba(237,93,38,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(237,93,38,0.55)] sm:tracking-[0.4em]"
                >
                  <SplitHover>Apply for Batch 1</SplitHover>
                </button>
                <p className="mt-4 text-center font-body text-[10px] text-white/20">
                  No payment now · We call within 2 hrs · Only {slots} spots
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════════════════════ */}
      <footer className="border-t border-white/[0.07] px-5 py-8 sm:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4">
          <Link href="/" className="font-display text-lg tracking-tighter text-white">
            TSW<span className="text-[var(--color-gold)]">FITNESS</span>
          </Link>
          <p className="font-body text-[10px] uppercase tracking-[0.35em] text-white/20">TSW Fitness · Paschim Vihar · New Delhi</p>
          <p className="font-body text-[10px] text-white/15">*T&amp;C apply. See application form for full details.</p>
        </div>
      </footer>

      <StickyBar />
      </div>
    </div>
  );
}
