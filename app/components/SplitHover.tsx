"use client";

import { ReactNode, RefObject, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import {
  MOTION_CORE_EASE,
  ensureMotionCoreEase,
  registerPluginOnce,
} from "../lib/gsap-helpers";

type SplitHoverProps = {
  /** Text / inline content to animate. Plain text works best. */
  children: ReactNode;
  /** Extra classes for the wrapper span. */
  className?: string;
  /**
   * Optional ref to an external element whose hover should drive the effect.
   * If omitted, the component's own wrapper listens for hover.
   */
  hoverTargetRef?: RefObject<HTMLElement | null>;
  /**
   * Per-character stagger duration in seconds.
   * @default 0.35
   */
  duration?: number;
  /**
   * Per-character stagger between chars in seconds.
   * @default 0.02
   */
  stagger?: number;
};

export default function SplitHover({
  children,
  className = "",
  hoverTargetRef,
  duration = 0.5,
  stagger = 0.02,
}: SplitHoverProps) {
  const wrapperRef = useRef<HTMLSpanElement | null>(null);
  const originalRef = useRef<HTMLSpanElement | null>(null);
  const cloneRef = useRef<HTMLSpanElement | null>(null);
  // Only run the character clone/animation on devices that can actually hover
  // with a fine pointer. On touch screens the clone has no way to animate away
  // and would render as duplicated, overlapping text.
  const [hoverable, setHoverable] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setHoverable(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !hoverable) return;

    registerPluginOnce(SplitText);
    ensureMotionCoreEase();

    const triggerNode = hoverTargetRef?.current ?? wrapperRef.current;
    const originalNode = originalRef.current;
    const cloneNode = cloneRef.current;
    if (!triggerNode || !originalNode || !cloneNode) return;

    let timeline: gsap.core.Timeline | null = null;
    let cloneSplit: SplitText | null = null;

    const originalSplit = SplitText.create(originalNode, {
      type: "chars",
      charsClass: "inline-block",
      onSplit: (self) => {
        cloneSplit?.revert();
        cloneSplit = SplitText.create(cloneNode, {
          type: "chars",
          charsClass: "inline-block",
        });

        gsap.set(self.chars, { yPercent: 0 });
        gsap.set(cloneSplit.chars, { yPercent: 100 });

        timeline?.kill();
        timeline = gsap
          .timeline({ paused: true })
          .to(
            self.chars,
            {
              yPercent: -100,
              stagger,
              duration,
              ease: MOTION_CORE_EASE,
            },
            0
          )
          .to(
            cloneSplit.chars,
            {
              yPercent: 0,
              stagger,
              duration,
              ease: MOTION_CORE_EASE,
            },
            0
          );

        return timeline;
      },
    });

    const handleEnter = () => timeline?.play();
    const handleLeave = () => timeline?.reverse();

    triggerNode.addEventListener("mouseenter", handleEnter);
    triggerNode.addEventListener("mouseleave", handleLeave);

    return () => {
      triggerNode.removeEventListener("mouseenter", handleEnter);
      triggerNode.removeEventListener("mouseleave", handleLeave);
      timeline?.kill();
      originalSplit.revert();
      cloneSplit?.revert();
    };
  }, [children, hoverTargetRef, duration, stagger, hoverable]);

  // Touch / no-hover devices: render plain text that wraps naturally (no clone,
  // no overflow clipping) so long button labels never duplicate or get cut off.
  if (!hoverable) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span
      ref={wrapperRef}
      className={`relative inline-flex overflow-hidden align-baseline leading-none ${className}`}
    >
      <span ref={originalRef}>{children}</span>
      <span
        ref={cloneRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {children}
      </span>
    </span>
  );
}
