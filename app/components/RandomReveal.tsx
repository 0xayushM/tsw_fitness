"use client";

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerPluginOnce } from "../lib/gsap-helpers";

/**
 * RandomReveal — fades characters in using a random-order stagger, so the
 * glyphs "pop" into place one by one in no particular reading order (the
 * effect seen on TSW Fitness' group-classes circle).
 *
 * Implementation notes:
 *  - We split the text at char granularity and target every character.
 *    SplitText handles mixed content (line breaks, inline nodes) cleanly.
 *  - The only trick is `stagger: { from: "random", amount }`. GSAP shuffles
 *    the stagger delay per target, which is what produces the scrambled
 *    reveal. No manual randomization needed.
 *  - `autoAlpha` hides chars via opacity+visibility before the tween fires,
 *    so there's never a flash of complete text before the animation starts.
 *  - ScrollTrigger fires once on viewport entry. ScrollSmoother picks up
 *    the trigger automatically — no `scroller` override required.
 */
type RandomRevealProps = {
  children: ReactNode;
  className?: string;
  /** Total time (seconds) over which all characters complete their staggered start. */
  amount?: number;
  /** Per-character fade duration. */
  duration?: number;
  /** Delay (seconds) before the reveal starts once the element enters view. */
  delay?: number;
  /** Disable the viewport trigger and run on mount instead. */
  triggerOnScroll?: boolean;
};

export default function RandomReveal({
  children,
  className = "",
  amount = 1.2,
  duration = 0.35,
  delay = 0,
  triggerOnScroll = true,
}: RandomRevealProps) {
  const wrapperRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    registerPluginOnce(SplitText, ScrollTrigger);

    const node = wrapperRef.current;
    if (!node) return;

    const split = SplitText.create(node, {
      type: "lines, words, chars",
      tag: "span",
    });

    const chars = split.chars ?? [];
    if (!chars.length) {
      split.revert();
      return;
    }

    gsap.set(chars, { autoAlpha: 0 });

    const tween = gsap.to(chars, {
      autoAlpha: 1,
      duration,
      ease: "power1.out",
      delay,
      stagger: { amount, from: "random" },
      scrollTrigger: triggerOnScroll
        ? {
            trigger: node,
            start: "top 85%",
            // Replay every time the element enters the viewport (from
            // either direction), and reset chars to invisible when it
            // leaves so the next entry plays the full scramble again.
            toggleActions: "restart reset restart reset",
          }
        : undefined,
    });

    return () => {
      tween.kill();
      split.revert();
    };
  }, [children, amount, duration, delay, triggerOnScroll]);

  return (
    <span ref={wrapperRef} className={`relative align-baseline ${className}`}>
      {children}
    </span>
  );
}
