"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const fillTextRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;

    const overlay = overlayRef.current;
    const text = textRef.current;
    const fillText = fillTextRef.current;
    const barFill = barFillRef.current;
    const percentEl = percentRef.current;

    if (!overlay || !text || !fillText || !barFill || !percentEl) return;

    document.body.style.overflow = "hidden";

    const progress = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(overlay, {
          yPercent: 100,
          duration: 0.85,
          ease: "power3.inOut",
          onComplete: () => {
            overlay.style.display = "none";
            document.body.style.overflow = "";
          },
        });
      },
    });

    // Text entrance
    tl.fromTo(
      text,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );

    // Smooth bar + text fill over 3.2 s
    tl.to(
      progress,
      {
        value: 100,
        duration: 2.5,
        ease: "power1.inOut",
        onUpdate() {
          const pct = Math.round(progress.value);
          percentEl.textContent = `${pct}%`;
          // vertical bar fills upward
          barFill.style.transform = `scaleY(${pct / 100})`;
          // text fills left-to-right black over white
          fillText.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
        },
      },
      "-=0.1"
    );

    tl.to({}, { duration: 0.3 });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-[var(--color-orange)]"
      style={{ willChange: "transform" }}
    >
      {/* ── Vertical bar — left edge ── */}
      <div className="absolute left-0 top-0 h-full w-[5px] bg-black/15">
        <div
          ref={barFillRef}
          className="absolute bottom-0 left-0 w-full bg-black origin-bottom"
          style={{ height: "100%", transform: "scaleY(0)" }}
        />
      </div>

      {/* ── Text — bottom right ── */}
      <div
        ref={textRef}
        className="absolute bottom-10 right-8 select-none text-right"
        style={{ opacity: 0 }}
      >
        {/* White outline ghost */}
        <div
          className="font-agharti leading-none tracking-none text-transparent"
          style={{
            fontSize: "clamp(8rem, 20vw, 15rem)",
            textShadow: "0 0 1px rgba(255,255,255,0.9)",
          }}
          aria-hidden
        >
          TSW
        </div>

        {/* Black fill layer — clips left-to-right */}
        <div
          ref={fillTextRef}
          className="font-agharti leading-none tracking-none absolute inset-0 text-right"
          style={{
            fontSize: "clamp(8rem, 20vw, 15rem)",
            color: "#0a0a0a",
            clipPath: "inset(0 100% 0 0)",
          }}
          aria-hidden
        >
          TSW
        </div>

        <span className="sr-only">TSW Fitness — loading</span>

        {/* Percentage */}
        <div className="mt-3 font-agharti text-[11px] tracking-[0.35em] text-black/40 uppercase">
          <span ref={percentRef}>0%</span>
        </div>
      </div>
    </div>
  );
}
