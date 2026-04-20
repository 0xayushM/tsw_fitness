import Image from "next/image";
import RadialGallery from "./RadialGallery";
import SplitReveal from "./SplitReveal";

const GALLERY_IMAGES = [
  "/images/img1.png",
  "/images/img2.png",
  "/images/img3.png",
  "/images/img4.png",
  "/images/img5.png",
  "/images/img6.png",
  "/images/img7.png",
];

const GALLERY_ITEMS = GALLERY_IMAGES.map((src) => (
  <div
    key={src}
    className="relative h-48 w-48 overflow-hidden rounded-xl border border-white/25 bg-neutral-800 shadow-[0_20px_60px_-20px_rgba(237,93,38,0.25)] ring-1 ring-black/50 sm:h-56 sm:w-56"
  >
    <Image
      src={src}
      alt="TSW Fitness"
      fill
      sizes="224px"
      className="object-cover"
      loading="eager"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
  </div>
));

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[var(--color-charcoal)] pt-28 sm:pt-32 md:pt-36 lg:pt-48"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(237,93,38,0.18),transparent_55%),radial-gradient(circle_at_20%_80%,rgba(46,169,188,0.12),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(48,50,138,0.18),transparent_45%)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-8xl flex-col items-center px-5 sm:px-8">
        <h1 className="font-display font-bold text-center uppercase leading-[1] tracking-wider text-[12vw]">
          <span className="block text-white">
            <SplitReveal mode="chars" config={{ chars: { duration: 0.5, stagger: 0.03 } }}>
              Stronger Every Day
            </SplitReveal>
          </span>
          <span className="block text-[var(--color-orange)]">
            <SplitReveal delay={0.5} mode="chars" config={{ chars: { duration: 0.5, stagger: 0.03 } }}>
              No Excuses
            </SplitReveal>
          </span>
        </h1>

        <p className="mt-4 max-w-md text-center font-body text-xs uppercase tracking-[0.35em] text-white/60 sm:text-sm">
          Train with intent · Move with purpose · Live the TSW way
        </p>

        {/* <div className="mt-10 flex w-full max-w-3xl items-center justify-between border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.4em] text-white/50 sm:text-xs">
          <span>4 Clubs</span>
          <span className="hidden sm:block">45 Min Workouts</span>
          <span>Expert Coaches</span>
        </div> */}
      </div>

      {/* Radial image carousel anchored to the bottom of the hero. */}
      <div className="pointer-events-none relative z-0 mt-8 flex-1 min-h-[400px]">
        <RadialGallery
          items={GALLERY_ITEMS}
          radius={3200}
          duration={300}
          offset={-2950}
          gap={80}
          elementSize={220}
        />
        {/* Fade the bottom edge of the arc into the section background. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[var(--color-charcoal)]"
        />
      </div>
    </section>
  );
}
