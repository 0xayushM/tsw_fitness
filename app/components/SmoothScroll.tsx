"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

type SmoothScrollProps = {
  children: ReactNode;
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    // Respect users who prefer reduced motion — skip smoother entirely.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let smoother: ReturnType<typeof ScrollSmoother.create> | null = null;

    const ctx = gsap.context(() => {
      smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current!,
        content: contentRef.current!,
        smooth: 1.4,
        effects: true,
        smoothTouch: 0.1,
        normalizeScroll: true,
        ignoreMobileResize: true,
      });
    });

    // Re-measure after all lazy assets (iframes, images) finish loading.
    // Without this, the iframe in the Contact section can cause GSAP to
    // set the scroll spacer to a stale height, producing blank space below
    // the footer.
    const refresh = () => smoother?.refresh();
    window.addEventListener("load", refresh);
    // Second pass for assets that resolve just after the load event.
    const t = setTimeout(refresh, 600);

    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={wrapperRef} id="smooth-wrapper">
      <div ref={contentRef} id="smooth-content">
        {children}
      </div>
    </div>
  );
}
