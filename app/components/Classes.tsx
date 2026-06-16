import Image from "next/image";
import SplitReveal from "./SplitReveal";
import SplitHover from "./SplitHover";
import ClassesList, { type ClassItem } from "./ClassesList";

const CLASSES: ClassItem[] = [
  {
    name: "Strength Training",
    goal: "Build Muscle",
    duration: "60 MIN",
    membership: "Exclusive",
    image: "/images/strength_training.jpg",
  },
  {
    name: "Crossfit Training",
    goal: "Burn Fat",
    duration: "60 MIN",
    membership: "Exclusive",
    image: "/images/crossfit.jpg",
  },
  {
    name: "MMA",
    goal: "Get Stronger",
    duration: "60 MIN",
    membership: "Premium",
    image: "/images/mma.jpg",
  },
  {
    name: "Sport Training",
    goal: "Performance",
    duration: "60 MIN",
    membership: "Exclusive",
    image: "/images/sport_training.jpg",
  },
  {
    name: "Yoga",
    goal: "Mobility",
    duration: "60 MIN",
    membership: "Super",
    image: "/images/yoga.jpg",
  },
  {
    name: "HIIT",
    goal: "Burn Fat",
    duration: "30 MIN",
    membership: "Premium",
    image: "/images/hiit.jpg",
  },
  {
    name: "Dance Classes",
    goal: "Move Better",
    duration: "45 MIN",
    membership: "Super",
    image: "/images/dance.jpg",
  },
  {
    name: "Muscle Endurance",
    goal: "Stamina",
    duration: "45 MIN",
    membership: "Premium",
    image: "/images/muscle_endurance.jpg",
  },
  {
    name: "Aerobic",
    goal: "Cardio Base",
    duration: "45 MIN",
    membership: "Super",
    image: "/images/aerobic.jpg",
  },
  {
    name: "Endurance Training",
    goal: "Go Longer",
    duration: "60 MIN",
    membership: "Exclusive",
    image: "/images/endurance.jpg",
  },
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
    name: "Trial Experience",
    tag: "1 Month",
    copy: "No strings attached. 30 days of full gym access, steam room, and a week-one workout plan - so you know exactly what you're committing to.",
    cta: "View Trial Details",
    image: "/images/cardio.jpg",
    bg: "#76767663",
    fg: "#ffffff",
    accent: "#ffffff",
  },
  {
    name: "Transformation Starter",
    tag: "3 Months",
    copy: "Three months is the minimum for real results. Full access, personalised diet plan, and a programme updated every month.",
    cta: "View 3-Month Plan",
    image: "/images/duet.jpg",
    bg: "#76767663",
    fg: "#ffffff",
    accent: "#ffffff",
  },
  {
    name: "Serious Athlete Pack",
    tag: "6 Months",
    copy: "MMA, Yoga, monthly progress tracking, and coaching that knows your name. Six months of every tool for the ones training with intent.",
    cta: "View 6-Month Pack",
    image: "/images/prime.jpg",
    bg: "#76767663",
    fg: "#ffffff",
    accent: "#ffffff",
  },
  {
    name: "TSW Elite Membership",
    tag: "1 Year",
    copy: "One flat price. Every class, every perk, every single month - for an entire year. The maths are simple: ₹41 a day for everything.",
    cta: "Claim Elite Membership",
    image: "/images/infinite.jpg",
    bg: "#76767663",
    fg: "#ffffff",
    accent: "#ED5D26",
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
            / Our Memberships /
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

        {/* Colored series cards - 2×2 grid with image-as-background */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {SERIES.map((s) => (
            <SeriesCard key={s.name} {...s} />
          ))}
        </div>

        {/* Our Classes - headline left, bracketed blurb top-right */}
        <div className="mt-24 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-16">
          <h3 className="font-display uppercase tracking-tight text-white text-[18vw] sm:text-[14vw] lg:text-[11vw]">
          <SplitReveal
                mode="chars"
                config={{ chars: { duration: 0.8, stagger: 0.03 } }}
              >
            Our Classes
            </SplitReveal>
          </h3>
          <p className="flex max-w-xs items-start gap-2 font-body text-xs leading-relaxed text-white/70 lg:pt-4">
            <span aria-hidden className="font-display text-white/50">
              [
            </span>
            <span>
              Coaches trained in-house. Programming refreshed every six weeks.
              Pick what fits today - every class, every club, every time.
            </span>
            <span aria-hidden className="font-display text-white/50">
              ]
            </span>
          </p>
        </div>

        {/* Full-width interactive list with slide-from-top hover + cursor image */}
        <div className="mt-12 lg:mt-16">
          <ClassesList items={CLASSES} />
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
            Membership · {tag}
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
