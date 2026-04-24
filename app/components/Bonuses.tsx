import Image from "next/image";

const BONUSES = [
  {
    tag: "Bonus 01",
    title: "Free Intro Session",
    copy: "One hour, one coach, zero pressure. See if TSW is your vibe.",
    image: "/images/img7.png",
    accent: "var(--color-teal)",
  },
  {
    tag: "Bonus 02",
    title: "Body Composition Scan",
    copy: "Benchmark your progress with monthly InBody analysis.",
    image: "/images/img2.png",
    accent: "var(--color-red)",
  },
  {
    tag: "Bonus 03",
    title: "Nutrition Playbook",
    copy: "A personal meal blueprint designed around your goal.",
    image: "/images/img5.png",
    accent: "var(--color-gold)",
  },
];

// Simple "price" badge styled like Buckler's product tiles
const PRICE_TAGS = ["INCLUDED", "INCLUDED", "INCLUDED"];

export default function Bonuses() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-charcoal)] px-5 pt-16 pb-20 sm:px-10 sm:pt-20 sm:pb-28">
      {/* Section background image + dark scrim */}
      <Image
        src="/images/bonus.png"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="pointer-events-none absolute inset-0 object-cover"
      />

      <div className="relative mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-4">
          <div className="flex items-end justify-between gap-6">
            <div>
              <span className="font-body text-[10px] uppercase tracking-[0.45em] text-white/40">
                / Perks inside /
              </span>
              <h2 className="mt-3 font-display text-[11vw] uppercase leading-[0.9] tracking-tight text-white sm:text-[6vw] lg:text-[4.4vw]">
                Our bonuses
              </h2>
            </div>
            <div className="hidden gap-2 sm:flex">
              {["All", "Starter", "Pro", "Elite", "Open Gym"].map((f, i) => (
                <button
                  key={f}
                  className={`rounded-full border px-3 py-1 font-body text-[10px] uppercase tracking-[0.3em] transition-colors ${
                    i === 0
                      ? "border-[var(--color-gold)] text-[var(--color-gold)]"
                      : "border-white/15 text-white/55 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {BONUSES.map((b, i) => (
            <BonusCard key={b.title} {...b} price={PRICE_TAGS[i]} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="#membership"
            className="inline-flex items-center gap-3 rounded-full border border-white/15 px-5 py-3 font-body text-[10px] uppercase tracking-[0.35em] text-white/80 transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
          >
            View all bonuses
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

function BonusCard({
  tag,
  title,
  copy,
  image,
  accent,
  price,
}: {
  tag: string;
  title: string;
  copy: string;
  image: string;
  accent: string;
  price: string;
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white text-[#0a0a0a] transition-transform duration-300 hover:-translate-y-1">
      <span
        className="absolute left-4 top-4 z-10 rounded-full px-2.5 py-1 font-body text-[9px] uppercase tracking-[0.3em] text-white"
        style={{ backgroundColor: accent }}
      >
        {tag}
      </span>

      <div className="relative aspect-[4/3] w-full bg-[#e8e8e8]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-xl uppercase leading-tight sm:text-2xl">
          {title}
        </h3>
        <p className="font-body text-xs leading-relaxed text-black/60">
          {copy}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-3">
          <span className="font-body text-[10px] uppercase tracking-[0.35em] text-black/55">
            {price}
          </span>
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: accent }}
            aria-hidden
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}
