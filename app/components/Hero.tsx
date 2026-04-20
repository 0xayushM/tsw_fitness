import Image from "next/image";

const SIDE_CARDS = [
  { src: "/images/img2.png", tag: "Strength" },
  { src: "/images/img5.png", tag: "Cardio" },
  { src: "/images/img7.png", tag: "Spin" },
  { src: "/images/img4.png", tag: "Functional" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[var(--color-charcoal)] pt-28 pb-16 sm:pt-32 sm:pb-24 lg:max-w-8xl md:pt-36 lg:pt-52"
    >
      {/* <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(237,93,38,0.18),transparent_55%),radial-gradient(circle_at_20%_80%,rgba(46,169,188,0.15),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(48,50,138,0.22),transparent_45%)]"
      /> */}

      <div className="relative mx-auto flex max-w-8xl flex-col items-center px-5 sm:px-8">
        <h1 className="font-display font-bold text-center uppercase leading-[0.9] tracking-wider text-2xl sm:text-3xl md:text-4xl lg:text-[12vw]">
          <span className="block text-white">Stronger Every Day.</span>
          <span className="block text-[var(--color-orange)]">
             No Excuses.
          </span>
        </h1>

        <p className="mt-4 max-w-md text-center font-body text-xs uppercase tracking-[0.35em] text-white/60 sm:text-sm">
          Train with intent · Move with purpose · Live the TSW way
        </p>

        <div className="relative mt-10 grid w-full grid-cols-6 gap-3 sm:mt-14 sm:gap-5">
          <div className="col-span-2 flex flex-col gap-3 sm:gap-5">
            {SIDE_CARDS.slice(0, 2).map((card) => (
              <HeroCard key={card.src} {...card} />
            ))}
          </div>

          <div className="col-span-2 self-center" data-speed="0.85">
            <div className="relative aspect-[3/5] w-full overflow-hidden rounded-[999px] border border-white/10 bg-black">
              <Image
                src="/images/img4.png"
                alt="Person training at TSW Fitness"
                fill
                sizes="(min-width: 1024px) 320px, 40vw"
                className="object-cover grayscale contrast-110 brightness-75"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/30" />
              <div className="absolute inset-x-0 bottom-4 flex justify-center">
                <span className="rounded-full border border-white/30 bg-black/40 px-3 py-1 font-body text-[10px] uppercase tracking-[0.3em] text-white backdrop-blur">
                  Since 2014
                </span>
              </div>
              <div className="absolute inset-x-0 top-4 flex justify-center">
                <span className="rounded-full bg-[var(--color-orange)] px-3 py-1 font-body text-[10px] uppercase tracking-[0.3em] text-white">
                  Live it
                </span>
              </div>
            </div>
          </div>

          <div className="col-span-2 flex flex-col gap-3 sm:gap-5">
            {SIDE_CARDS.slice(2, 4).map((card) => (
              <HeroCard key={card.src} {...card} />
            ))}
          </div>
        </div>

        <div className="mt-10 flex w-full items-center justify-between border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.4em] text-white/50 sm:text-xs">
          <span>4 Clubs</span>
          <span className="hidden sm:block">45 Min Workouts</span>
          <span>Expert Coaches</span>
        </div>
      </div>
    </section>
  );
}

function HeroCard({ src, tag }: { src: string; tag: string }) {
  return (
    <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-white/5 bg-[var(--color-charcoal-soft)]">
      <Image
        src={src}
        alt={tag}
        fill
        sizes="(min-width: 1024px) 180px, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <span className="absolute left-2 top-2 rounded-full border border-white/15 bg-black/40 px-2 py-0.5 font-body text-[9px] uppercase tracking-[0.3em] text-white/80 backdrop-blur">
        {tag}
      </span>
      <div className="absolute bottom-2 right-2 h-2 w-2 rounded-full bg-[var(--color-orange)]" />
    </div>
  );
}
