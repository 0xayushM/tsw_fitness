import SplitReveal from "./SplitReveal";
import SplitHover from "./SplitHover";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[var(--color-charcoal)] pt-28 pt-36 lg:pt-48"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-8xl flex-col items-center px-5 sm:px-8">
        <h1 className="font-display font-bold text-center uppercase leading-[1] tracking-wider text-[16vw] md:text-[13vw]">
          <span className="block text-white">
            {/*
              `inline-block` wrapper sizes itself to the rendered text so the
              strike-through bar below spans exactly the text width (and not
              the full centered block).
            */}
            <span className="relative inline-block">
              <SplitReveal
                mode="chars"
                config={{ chars: { duration: 0.8, stagger: 0.03 } }}
              >
                Stronger Every Day
              </SplitReveal>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-3/5 h-[1vw] -translate-y-1/2 bg-black"
              />
            </span>
          </span>
          <span className="block text-[var(--color-orange)]">
            <SplitReveal
              delay={0.3}
              mode="chars"
              config={{ chars: { duration: 0.5, stagger: 0.03 } }}
            >
              No Excuses
            </SplitReveal>
          </span>
        </h1>
      </div>
      <div className="relative z-0 -mt-[5vw] flex-1 w-full overflow-hidden">
        <video
          className="h-[70vh] md:h-full w-full object-cover"
          src="/video/heroi.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
