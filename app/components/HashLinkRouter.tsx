"use client";

import { useEffect } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";

/**
 * Global click delegate that turns every `<a href="#section-id">` on the page
 * into a smooth in-page scroll, WITHOUT ever appending `#section-id` to the
 * URL bar and WITHOUT pushing a new history entry.
 *
 * Why a single document-level delegate instead of per-component handlers:
 *  - Seven different components already use `<a href="#...">` CTAs. A delegate
 *    means zero edits to those files and zero risk of any future CTA slipping
 *    through with the default browser behavior.
 *
 * Scroll backend selection:
 *  - If GSAP's ScrollSmoother is active (normal path), route through
 *    `smoother.scrollTo(target, true)` so the motion plays back through the
 *    virtualized scroll container the site already uses. A naive
 *    `scrollIntoView` would fight the smoother.
 *  - If ScrollSmoother was skipped (e.g. `prefers-reduced-motion`), fall back
 *    to the browser's native `scrollIntoView({ behavior: "smooth" })`.
 *
 * Things we deliberately leave to the browser:
 *  - Modifier clicks (cmd / ctrl / shift / alt) and non-primary buttons -
 *    users expect those to open in a new tab / window.
 *  - Any anchor whose `href` is just `"#"` (no target) or whose target id
 *    doesn't resolve to a real element.
 *  - Events where another handler already called `preventDefault()`.
 */
export default function HashLinkRouter() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;

      // Only interested in same-document hash links. Skip external links,
      // mailto:, tel:, and anchors that explicitly opt out via target="_blank".
      if (anchor.target && anchor.target !== "" && anchor.target !== "_self") {
        return;
      }
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;

      const id = decodeURIComponent(href.slice(1));
      const target = document.getElementById(id);
      if (!target) return;

      // Prevent the browser from (a) scrolling itself and (b) writing the
      // hash into `location.hash`, which is what the user wanted gone.
      event.preventDefault();

      const smoother = ScrollSmoother.get();
      if (smoother) {
        smoother.scrollTo(target, true);
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
