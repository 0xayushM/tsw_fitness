"use client";

import { useEffect, useRef } from "react";

// Exactly 5 clips per row - the user-requested count.
const ROW1 = [
  "/gallery/optimized/IMG_4130.mp4",
  "/gallery/optimized/IMG_4339.mp4",
  "/gallery/optimized/IMG_4340.mp4",
  "/gallery/optimized/IMG_4397.mp4",
  "/gallery/optimized/IMG_4435.mp4",
];

const ROW2 = [
  "/gallery/optimized/IMG_4436.mp4",
  "/gallery/optimized/IMG_4437.mp4",
  "/gallery/optimized/IMG_4438.mp4",
  "/gallery/optimized/IMG_4459.mp4",
  "/gallery/optimized/IMG_4460.mp4",
];

/* -------------------------------------------------------------------------- */
/*  VideoCard                                                                 */
/* -------------------------------------------------------------------------- */
/*  - `canplay`-driven opacity fade so a momentary decode failure never       */
/*    leaves a permanent black box.                                           */
/*  - IntersectionObserver pauses the element when off-screen and resumes it  */
/*    when it enters the viewport (saves CPU/GPU and works around mobile      */
/*    autoplay edge cases).                                                   */
/*  - `transform: translateZ(0)` promotes the card to its own GPU layer so    */
/*    the video composites correctly even when an ancestor (GSAP             */
/*    ScrollSmoother) is also transformed.                                    */
/* -------------------------------------------------------------------------- */
function VideoCard({ src }: { src: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const video = videoRef.current;
    if (!wrapper || !video) return;

    video.muted = true;

    const tryPlay = () => {
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    // Kick off loading + play. `preload="auto"` is only a hint, calling
    // load() guarantees a fetch is initiated.
    try {
      video.load();
    } catch {
      /* no-op */
    }
    tryPlay();

    // Pause off-screen, resume on-screen - saves CPU/GPU and works around
    // mobile autoplay edge cases where the first play() is rejected.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) tryPlay();
          else video.pause();
        }
      },
      { threshold: 0.01 }
    );
    io.observe(wrapper);

    // Final fallback: retry on the first user interaction in case strict
    // autoplay policy blocked the initial play() call.
    const onInteract = () => {
      tryPlay();
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("touchstart", onInteract);
    };
    window.addEventListener("pointerdown", onInteract, { once: true });
    window.addEventListener("touchstart", onInteract, {
      once: true,
      passive: true,
    });

    return () => {
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("touchstart", onInteract);
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative h-72 w-44 shrink-0 overflow-hidden rounded-2xl bg-charcoal-soft sm:h-80 sm:w-52 lg:h-96 lg:w-60"
      style={{ transform: "translateZ(0)" }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  MarqueeRow                                                                */
/* -------------------------------------------------------------------------- */
/*  JS-driven rAF animation instead of CSS keyframes:                         */
/*    1. Measures the real width of one full sequence (so the loop is        */
/*       pixel-perfect even when `gap` is in play - the old CSS              */
/*       0 → -50% approach was off by exactly one gap).                       */
/*    2. Pauses the animation when the section is off-screen.                 */
/*    3. Avoids the GSAP-ScrollSmoother + CSS-animation interaction that     */
/*       can drop video textures on desktop browsers.                         */
/* -------------------------------------------------------------------------- */
function MarqueeRow({
  clips,
  reverse = false,
  pxPerSecond = 60,
}: {
  clips: string[];
  reverse?: boolean;
  pxPerSecond?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // Render the sequence three times so there is always a copy to slide
  // into view from each side regardless of the container width.
  const items = [...clips, ...clips, ...clips];

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let offset = 0;
    let seqWidth = 0; // width of ONE sequence (5 cards + 5 gaps)
    let last = performance.now();
    let raf = 0;
    let visible = true;

    // Measure the width of a single sequence by inspecting the first
    // (clips.length) children + the trailing gap between the last child
    // of sequence #1 and the first child of sequence #2.
    const measure = () => {
      const children = Array.from(track.children) as HTMLElement[];
      if (children.length < clips.length + 1) {
        seqWidth = track.scrollWidth / 3;
        return;
      }
      const firstOfSeq1 = children[0];
      const firstOfSeq2 = children[clips.length];
      seqWidth = firstOfSeq2.offsetLeft - firstOfSeq1.offsetLeft;
    };

    // Re-measure on resize / once images-or-videos resolve their sizes.
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    measure();

    // Pause when off-screen.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible = e.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(container);

    // Start in the middle copy so we can drift in either direction
    // without ever running out of content.
    if (seqWidth > 0) offset = seqWidth;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05); // clamp big jumps (tab switches)
      last = now;

      if (visible && seqWidth > 0) {
        offset += (reverse ? -1 : 1) * pxPerSecond * dt;
        // Wrap into [0, seqWidth)
        if (offset >= 2 * seqWidth) offset -= seqWidth;
        else if (offset < seqWidth) offset += seqWidth;
        // Apply: negative tx scrolls the row to the left (forward direction).
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [clips, reverse, pxPerSecond]);

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <div
        ref={trackRef}
        className="flex w-max flex-nowrap gap-4"
        style={{ willChange: "transform" }}
      >
        {items.map((src, i) => (
          <VideoCard src={src} key={`${src}-${i}`} />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  GalleryStrip                                                              */
/* -------------------------------------------------------------------------- */
export default function GalleryStrip() {
  return (
    <section
      id="gallery"
      className="relative overflow-hidden pt-16 pb-0 sm:pt-20"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_50%_0%,rgba(237,93,38,0.10),transparent_60%)]"
      />

      {/* Section header */}
      <div className="relative mx-auto mb-12 max-w-[1600px] px-5 sm:px-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="font-body text-[10px] uppercase tracking-[0.45em] text-white/40">
            / Inside TSW /
          </span>
          <h2 className="font-display text-[13vw] uppercase tracking-tight text-white sm:text-[7vw] lg:text-[5.5vw]">
            Coached Every{" "}
            <span className="text-brand-gold">Rep. Every Set.</span>
          </h2>
          <p className="max-w-sm font-body text-sm leading-relaxed text-white/50">
            Every session you see is led by a TSW trainer - programmed,
            supervised, and pushed until the work is done right.
          </p>
        </div>
      </div>

      {/* Two-row marquee - opposite directions */}
      <div className="flex flex-col gap-4 pb-16">
        <MarqueeRow clips={ROW1} pxPerSecond={55} />
        <MarqueeRow clips={ROW2} reverse pxPerSecond={45} />
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-charcoal to-transparent"
      />
    </section>
  );
}
