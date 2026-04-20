"use client";

import { ReactNode, useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

type RadialGalleryProps = {
  /** Pre-rendered item nodes to display around the circle. */
  items: ReactNode[];
  /** Radius of the circular gallery in pixels. */
  radius?: number;
  /** Duration of one full rotation in seconds. */
  duration?: number;
  /** Rotate in the opposite direction. */
  reversed?: boolean;
  /** Vertical offset of the circle center from the bottom in pixels. */
  offset?: number;
  /** Gap between items in pixels. */
  gap?: number;
  /** Estimated size (width) of each element for spacing calc. */
  elementSize?: number;
  /** Extra classes on the outer container. */
  className?: string;
};

export default function RadialGallery({
  items,
  radius = 600,
  duration = 20,
  reversed = false,
  offset = 0,
  gap = 0,
  elementSize = 100,
  className = "",
}: RadialGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Repeat items enough times to cover the circumference.
  const displayItems = useMemo(() => {
    if (items.length === 0) return [] as { node: ReactNode; key: string }[];
    const circumference = 2 * Math.PI * radius;
    const spacePerItem = elementSize + gap;
    const neededItems = Math.ceil(circumference / spacePerItem);
    const repeats = Math.ceil(neededItems / items.length);
    return Array.from({ length: repeats }, (_, r) =>
      items.map((node, i) => ({ node, key: `${r}-${i}` }))
    ).flat();
  }, [items, radius, elementSize, gap]);

  const angleStep = displayItems.length > 0 ? 360 / displayItems.length : 0;

  // Set up (and tear down) the infinite GSAP rotation tween.
  useEffect(() => {
    if (!containerRef.current) return;
    const tween = gsap.to(containerRef.current, {
      rotation: reversed ? -360 : 360,
      duration,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%",
    });
    tweenRef.current = tween;
    return () => {
      tween.kill();
      tweenRef.current = null;
    };
    // Recreate the tween only when direction flips; duration is live-updated below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reversed]);

  // Live-update duration without recreating the tween.
  useEffect(() => {
    tweenRef.current?.duration(duration);
  }, [duration]);

  return (
    <div
      className={`absolute inset-0 flex items-end justify-center overflow-hidden ${className}`}
    >
      <div
        ref={containerRef}
        className="absolute flex items-center justify-center"
        style={{
          width: radius * 2,
          height: radius * 2,
          bottom: offset - radius,
          left: "50%",
          marginLeft: -radius,
        }}
      >
        {displayItems.map(({ node, key }, i) => (
          <div
            key={key}
            className="absolute top-1/2 left-1/2"
            style={{
              transform: `translate(-50%, -50%) rotate(${
                i * angleStep
              }deg) translate(0, -${radius}px) rotate(90deg)`,
            }}
          >
            <div style={{ transform: "rotate(-90deg)" }}>{node}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
