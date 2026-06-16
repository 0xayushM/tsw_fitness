"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * ClassesList - the interactive discipline list.
 *
 * Two concurrent effects on hover:
 *  - A full-width orange panel slides from top-to-bottom inside the row
 *    (pure CSS transform on an absolutely-positioned overlay; the row
 *    clips with overflow-hidden).
 *  - A preview image follows the cursor for as long as a row is hovered.
 *    Implemented with a single `fixed` image element that re-targets its
 *    `src` as the pointer crosses between rows, positioned via transform
 *    so we stay off the paint path.
 *
 * Implementation notes:
 *  - Image tracking uses one shared DOM node rather than per-row images,
 *    so crossing rows never unmounts/remounts anything - just swaps src.
 *  - We animate via `translate3d` for GPU compositing. No rAF throttle
 *    needed because `onMouseMove` naturally syncs with the browser paint.
 *  - `pointer-events-none` on the preview so it never blocks its own
 *    hover target.
 */
export type ClassItem = {
  name: string;
  goal: string;
  duration: string;
  membership: string;
  image: string;
};

export default function ClassesList({ items }: { items: ClassItem[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const previewRef = useRef<HTMLDivElement | null>(null);

  // Gate the portal on mount so SSR and first client render match.
  useEffect(() => setMounted(true), []);

  // Track cursor at the window level (not on the <ul>) so the image keeps
  // following even while the page is being smooth-scrolled or the pointer
  // drifts between sub-elements.
  //
  // The translate chain is:
  //   1. translate3d(clientX, clientY, 0) - moves the *top-left* of the
  //      image to the pointer position (viewport coords, since the node is
  //      portaled to <body>, outside the SmoothScroll transform).
  //   2. translate(-50%, -50%) - re-centers the image on the pointer so it
  //      visually replaces the cursor.
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const node = previewRef.current;
      if (!node) return;
      node.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="relative">
      <ul
        className="w-full border-t border-white/15 sm:cursor-none"
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {items.map((c, i) => (
          <li
            key={c.name}
            onMouseEnter={() => setHoveredIdx(i)}
            className="group relative overflow-hidden border-b border-white/15"
          >
            {/* Orange slide-from-top overlay. Starts above the row, slides
                down to fully cover it on hover. Clipping handled by the
                `overflow-hidden` on the <li>. */}
            <div
              aria-hidden
              className="absolute inset-0 -translate-y-full bg-[var(--color-orange)] transition-transform duration-500 ease-[cubic-bezier(0.625,0.05,0,1)] group-hover:translate-y-0"
            />

            {/* Row content sits above the overlay. */}
            <div className="relative grid grid-cols-[1fr_auto] items-center gap-6 px-2 py-5 sm:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))] sm:py-7">
              <span className="flex items-center gap-5 font-display text-2xl uppercase tracking-wide text-white sm:text-4xl lg:text-5xl">
                <span className="hidden w-10 font-body text-[10px] tracking-[0.3em] text-white/40 group-hover:text-white/80 sm:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {c.name}
              </span>

              {/* Columns - hidden on small screens to keep the row height
                  readable. Opacity shifts subtly on hover so the values
                  stay legible against the orange background. */}
              <Meta label="Goal: " value={c.goal} className="hidden sm:block" />
              <Meta
                label="Duration: "
                value={c.duration}
                className="hidden sm:block"
              />
              <Meta
                label="Membership: "
                value={c.membership}
                className="hidden sm:block"
              />

              {/* Mobile: stash duration inline on the right */}
              <span className="font-body text-[10px] uppercase tracking-[0.35em] text-white/60 group-hover:text-white sm:hidden">
                {c.duration}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {/* Cursor-following preview. Portaled to <body> to escape the
          SmoothScroll wrapper's CSS transform - `position: fixed` is
          scoped to the nearest transformed ancestor, not the viewport,
          so without the portal the node would either clip or scroll. */}
      {mounted &&
        createPortal(
          <div
            ref={previewRef}
            aria-hidden
            className={`pointer-events-none fixed left-0 top-0 z-[100] hidden h-[360px] w-[260px] overflow-hidden rounded-md shadow-2xl transition-opacity duration-200 will-change-transform sm:block ${
              hoveredIdx !== null ? "opacity-100" : "opacity-0"
            }`}
          >
            {hoveredIdx !== null && (
              <Image
                src={items[hoveredIdx].image}
                alt=""
                fill
                sizes="260px"
                className="object-cover"
              />
            )}
          </div>,
          document.body,
        )}
    </div>
  );
}

function Meta({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <span className={`flex flex-col gap-1 ${className}`}>
      <span className="font-body text-[10px] uppercase tracking-[0.35em] text-white/45 group-hover:text-white/70">
        {label}
      </span>
      <span className="font-body text-xs uppercase tracking-[0.3em] text-white group-hover:text-white">
        {value}
      </span>
    </span>
  );
}
