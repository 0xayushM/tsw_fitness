import Image from "next/image";
import SplitReveal from "./SplitReveal";
import SplitHover from "./SplitHover";

const CLASSES = [
  { name: "TFC", duration: "45 MIN" },
  { name: "PT / Personal", duration: "60 MIN" },
  { name: "Couples", duration: "45 MIN" },
  { name: "Move Body", duration: "50 MIN" },
  { name: "Bootcamp", duration: "45 MIN" },
  { name: "Body Shift", duration: "45 MIN" },
  { name: "Yoga", duration: "60 MIN" },
  { name: "Pilates", duration: "45 MIN" },
  { name: "Box Fit", duration: "45 MIN" },
  { name: "Spin Ride", duration: "45 MIN" },
  { name: "HIIT", duration: "30 MIN" },
  { name: "Barre", duration: "45 MIN" },
];

type Series = {
  name: string;
  tag: string;
  copy: string;
  cta: string;
  image: string;
  bg: string;
  fg: string;
  accent: string;
};

const SERIES: Series[] = [
  {
    name: "Cardio Series",
    tag: "01",
    copy: "Engine-building sessions designed to raise your output without burning you out. Climbers, rowers, bikes — programmed with intention.",
    cta: "See the Cardio Series",
    image: "/images/cardio.jpg",
    bg: "#76767663",
    fg: "#ffffff",
    accent: "#ffffff",
  },
  {
    name: "Duet Series",
    tag: "02",
    copy: "Train with a partner. Shared timers, mirrored movements, zero excuses. Sessions built for two bodies, one goal.",
    cta: "Discover the Duet Series",
    image: "/images/duet.jpg",
    bg: "#76767663",
    fg: "#ffffff",
    accent: "#ffffff",
  },
  {
    name: "Prime Series",
    tag: "03",
    copy: "Heavy, deliberate strength work. Progressive overload under a coach's eye — the way you always wanted to lift.",
    cta: "Step into the Prime Series",
    image: "/images/prime.jpg",
    bg: "#76767663",
    fg: "#ffffff",
    accent: "#ffffff",
  },
  {
    name: "Infinite Series",
    tag: "04",
    copy: "Open-gym programming for members who want total freedom — with a written plan waiting when you arrive.",
    cta: "Explore the Infinite Series",
    image: "/images/infinite.jpg",
    bg: "#76767663",
    fg: "#ffffff",
    accent: "#ffffff",
  },
];

export default function Classes() {
  return (
    <section
      id="classes"
      className="relative overflow-hidden bg-[var(--color-charcoal)] px-5 pt-16 pb-20 sm:px-10 sm:pt-20 sm:pb-28"
    >
      {/* Section background image + dark scrim. Sits below content because the
          content wrapper has `relative`; the image + overlay are absolute. */}
      <Image
        src="/images/classes.png"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="pointer-events-none absolute inset-0 object-cover"
      />

      <div className="relative mx-auto max-w-[1600px]">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="font-body text-[10px] uppercase tracking-[0.45em] text-white/40">
            / Our Series /
          </span>
          <h1 className="mt-6 font-display uppercase tracking-tight text-white text-7xl md:text-8xl lg:text-[12vw]">
            <span className="block flex items-center">
              <SplitReveal
                mode="chars"
                triggerOnScroll
                config={{ chars: { duration: 0.8, stagger: 0.03 } }}
              >
                Transform the way
              </SplitReveal>
            </span>
            <span className="block leading-[1] -mt-1 md:-mt-4 text-[var(--color-gold)]">
              <SplitReveal
                delay={0.2}
                mode="chars"
                triggerOnScroll
                config={{ chars: { duration: 0.8, stagger: 0.03 } }}
              >
                You train
              </SplitReveal>
            </span>
          </h1>
        </div>

        {/* Colored series cards — 2×2 grid with image-as-background */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {SERIES.map((s) => (
            <SeriesCard key={s.name} {...s} />
          ))}
        </div>

        {/* Our Machines / Classes list */}
        <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-16">
          <div>
            <span className="font-body text-[10px] uppercase tracking-[0.4em] text-white/40">
              / Our Classes /
            </span>
            <h3 className="mt-3 font-display text-[11vw] uppercase leading-[0.9] tracking-tight text-white sm:text-[56px] lg:text-[72px]">
              Twelve disciplines,
              <span className="block text-[var(--color-gold)]">one pass.</span>
            </h3>
            <p className="mt-5 max-w-sm font-body text-sm leading-relaxed text-white/55">
              Coaches trained in-house. Programming refreshed every six weeks.
              Pick what fits today — every class, every club, every time.
            </p>
          </div>

          <ul className="divide-y divide-white/10 border-y border-white/10">
            {CLASSES.map((c, i) => (
              <li
                key={c.name}
                className="group flex items-center justify-between py-3.5 transition-colors hover:bg-white/[0.02]"
              >
                <span className="flex items-center gap-4 font-display text-xl uppercase tracking-wide text-white sm:text-2xl">
                  <span className="w-8 font-body text-[10px] tracking-[0.3em] text-white/35">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {c.name}
                </span>
                <span className="flex items-center gap-3 font-body text-[10px] uppercase tracking-[0.35em] text-white/50 transition-colors group-hover:text-[var(--color-gold)]">
                  {c.duration}
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-white/35 transition-colors group-hover:bg-[var(--color-gold)]"
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function SeriesCard({ name, tag, copy, cta, image, bg, fg, accent }: Series) {
  return (
    <article
      className="group relative overflow-hidden rounded-2xl aspect-[5/4] sm:aspect-[6/5] lg:aspect-[7/5]"
      style={{ backgroundColor: bg, color: fg }}
    >
      {/* Full-bleed background image */}
      <Image
        src={image}
        alt={name}
        fill
        sizes="(min-width: 640px) 50vw, 100vw"
        className="absolute inset-0 object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />

      {/* Left-to-right gradient: dark on the left where the copy sits,
          fading to transparent on the right so the image reads through. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0) 90%)",
        }}
      />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-between gap-6 p-6 sm:p-8">
        <div className="flex items-start justify-between">
          <span
            className="font-body text-[10px] uppercase tracking-[0.4em]"
            style={{ color: fg, opacity: 0.75 }}
          >
            Series · {tag}
          </span>
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: accent }}
            aria-hidden
          />
        </div>

        <div className="max-w-[70%] sm:max-w-[60%]">
          <h3 className="font-display uppercase leading-[0.9] tracking-tight text-[9vw] sm:text-[4.5vw] lg:text-[3vw]">
            <SplitHover>{name}</SplitHover>
          </h3>
          <p
            className="mt-3 font-body text-sm leading-relaxed"
            style={{ color: fg, opacity: 0.85 }}
          >
            {copy}
          </p>
        </div>

        <a
          href="#membership"
          className="inline-flex w-fit items-center gap-3 rounded-full border px-4 py-2 font-body text-[10px] uppercase tracking-[0.35em] transition-colors"
          style={{ borderColor: `${accent}66`, color: fg }}
        >
          <SplitHover>{cta}</SplitHover>
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: accent }}
          />
        </a>
      </div>
    </article>
  );
}
