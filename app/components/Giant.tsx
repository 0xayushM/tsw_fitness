import MagicRings from "./MagicRings";
import SplitReveal from "./SplitReveal";
import Image from "next/image";

/**
 * "The Giant" hero — full-bleed MagicRings shader backdrop with the
 * flagship-club tagline floating in the middle.
 *
 * Layout:
 *  - Outer section is sized by viewport height so the rings have room to
 *    breathe (clamped via min-h to stay sensible on short screens).
 *  - MagicRings sits absolutely in the back, headings sit on a relative,
 *    z-indexed flex column on top — text is `pointer-events-none` so the
 *    canvas underneath still receives mouse events (parallax / hover).
 */
export default function Giant() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-charcoal)]">
      <div className="relative h-[80vh] min-h-[520px] w-full">
        {/* Shader backdrop */}
        <div className="absolute inset-0">
          <MagicRings
            color="#ff7a45"
            colorTwo="#ff743c"
            ringCount={7}
            speed={1}
            attenuation={10}
            lineThickness={1}
            baseRadius={0.35}
            radiusStep={0.2}
            scaleRate={0.1}
            opacity={1}
            blur={0}
            noiseAmount={0.1}
            rotation={0}
            ringGap={1.5}
            fadeIn={0.7}
            fadeOut={0.5}
            followMouse={false}
            mouseInfluence={0.2}
            hoverScale={1.1}
            parallax={0.05}
            clickBurst={false}
          />
        </div>

        {/* Headings overlay — pointer-events-none so the canvas underneath
            still receives hover/click for parallax + burst effects. */}
        <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center gap-4 px-5 text-center">
          
          <h2 className="text-chrome font-display uppercase tracking-tight text-[16vw] sm:text-[11vw] lg:text-[9vw]">
            The Second
          </h2>
          <h2 className="text-chrome -mt-24 font-display uppercase tracking-tight text-[16vw] sm:text-[11vw] lg:text-[9vw]">
            Wind
          </h2>
          <p className="font-body text-[11px] uppercase tracking-[0.4em] text-white/70">
            Meet the TSW flagship club
          </p>
        </div>
      </div>
    </section>
  );
}
