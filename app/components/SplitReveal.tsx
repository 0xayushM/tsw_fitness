"use client";

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MOTION_CORE_EASE,
  ensureMotionCoreEase,
  registerPluginOnce,
} from "../lib/gsap-helpers";

export type SplitRevealMode = "lines" | "words" | "chars";

type ModeSettings = {
  duration?: number;
  stagger?: number;
};

export type SplitRevealConfig = Partial<Record<SplitRevealMode, ModeSettings>>;

type SplitRevealProps = {
  /** Content to split and reveal. Plain text or inline nodes work best. */
  children: ReactNode;
  /** Extra classes for the wrapper span. */
  className?: string;
  /** How to break the text for animation. */
  mode?: SplitRevealMode;
  /** Per-mode overrides for `duration` / `stagger`. */
  config?: SplitRevealConfig;
  /** Delay (in seconds) before the reveal animation starts. */
  delay?: number;
  /** If true, reveal is triggered when the element enters the viewport. */
  triggerOnScroll?: boolean;
  /**
   * Optional scroll container for the scroll trigger.
   * Pass a CSS selector, an element, or omit to use the window.
   */
  scrollElement?: string | HTMLElement | null;
  /** HTML tag used by SplitText for line / word / char wrappers. */
  tag?: keyof HTMLElementTagNameMap;
};

const DEFAULT_CONFIG: Record<
  SplitRevealMode,
  { duration: number; stagger: number }
> = {
  lines: { duration: 0.8, stagger: 0.08 },
  words: { duration: 0.6, stagger: 0.06 },
  chars: { duration: 0.4, stagger: 0.008 },
};

export default function SplitReveal({
  children,
  className = "",
  mode = "lines",
  config,
  delay = 0,
  triggerOnScroll = false,
  scrollElement,
  tag = "div",
}: SplitRevealProps) {
  const wrapperRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    registerPluginOnce(SplitText, ScrollTrigger);
    ensureMotionCoreEase();

    const node = wrapperRef.current;
    if (!node) return;

    // Resolve the scroll container.
    let resolvedScroller: HTMLElement | null = null;
    if (typeof scrollElement === "string") {
      resolvedScroller = document.querySelector<HTMLElement>(scrollElement);
    } else if (scrollElement instanceof HTMLElement) {
      resolvedScroller = scrollElement;
    }
    const scroller: HTMLElement | Window = resolvedScroller ?? window;

    const split = SplitText.create(node, {
      type: "lines, words, chars",
      tag,
      mask: "lines",
    });

    const targets =
      mode === "lines"
        ? (split.lines ?? [])
        : mode === "words"
          ? (split.words ?? [])
          : (split.chars ?? []);

    if (!targets.length) {
      split.revert();
      return;
    }

    const duration =
      config?.[mode]?.duration ?? DEFAULT_CONFIG[mode].duration;
    const stagger = config?.[mode]?.stagger ?? DEFAULT_CONFIG[mode].stagger;

    gsap.set(targets, { yPercent: 110 });

    const tween = gsap.to(targets, {
      yPercent: 0,
      duration,
      stagger,
      ease: MOTION_CORE_EASE,
      lazy: false,
      delay,
      scrollTrigger: triggerOnScroll
        ? {
            trigger: node,
            scroller,
            start: "top 85%",
          }
        : undefined,
    });

    return () => {
      tween.kill();
      split.revert();
    };
  }, [children, mode, config, delay, triggerOnScroll, scrollElement, tag]);

  return (
    <span
      ref={wrapperRef}
      className={`relative align-baseline ${className}`}
    >
      {children}
    </span>
  );
}
