import SplitHover from "./SplitHover";
import SplitReveal from "./SplitReveal";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[var(--color-charcoal)]"
    >
      {/* Full-bleed background video */}
      <div className="absolute inset-0 z-0">
        <video
          className="h-full w-full object-cover"
          src="/video/heroi.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,transparent_0%,rgba(0,0,0,0.55)_60%,rgba(0,0,0,0.9)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black" />
      </div>

      {/* Top-left title block — the Buckler hero positioning */}
      <div className="relative z-10 flex flex-1 flex-col justify-end md:justify-end px-5 pt-32 pb-10 sm:px-10 sm:pt-40 sm:pb-16">
        <div className="max-w-full">
          <span className="inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.45em] text-[var(--color-gold)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
            TSW / Fitness Club
          </span>
          <h1 className="mt-6 font-display uppercase tracking-tight text-white text-7xl md:text-8xl lg:text-[12vw]">
            <span className="block flex items-center">
              <SplitReveal
                mode="chars"
                config={{ chars: { duration: 0.8, stagger: 0.03 } }}
              >
                Make Your
              </SplitReveal>
            </span>
            <span className="block leading-[1] -mt-1 md:-mt-4 text-[var(--color-gold)]">
              <SplitReveal
                delay={0.2}
                mode="chars"
                config={{ chars: { duration: 0.8, stagger: 0.03 } }}
              >
                Body Unparalleled
              </SplitReveal>
            </span>
          </h1>
          <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-white/70">
            High-energy training built for real results. 45-minute classes,
            world-class equipment, coaches who know your name — across four
            clubs, every single day.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#membership"
              className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-gold)] px-5 py-3 font-body text-[11px] uppercase tracking-[0.35em] text-black transition-transform hover:-translate-y-0.5"
            >
              <SplitHover>Start Training</SplitHover>
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-black"
              />
            </a>
            <a
              href="#classes"
              className="inline-flex items-center gap-3 rounded-full border border-white/25 px-5 py-3 font-body text-[11px] uppercase tracking-[0.35em] text-white/80 backdrop-blur transition-colors hover:border-white hover:text-white"
            >
              <SplitHover>Our Series</SplitHover>
            </a>
          </div>
        </div>

        {/* Bottom-right meta like Buckler's "awwwards" badge */}
        <div className="mt-16 flex flex-wrap items-end justify-between gap-6">
          <div></div>
          <div className="flex flex-row items-end gap-1">
            <span className="font-body text-[10px] uppercase tracking-[0.45em] text-white/50">
              Est. 2014 · Open 24/7
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
