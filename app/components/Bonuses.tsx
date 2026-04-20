import Image from "next/image";

const BONUSES = [
  {
    title: "Free Intro Session",
    copy: "One hour, one coach, zero pressure. See if TSW is your vibe.",
    image: "/images/img7.png",
  },
  {
    title: "Body Composition Scan",
    copy: "Benchmark your progress with monthly InBody analysis.",
    image: "/images/img2.png",
  },
  {
    title: "Nutrition Playbook",
    copy: "A personal meal blueprint designed around your goal.",
    image: "/images/img5.png",
  },
];

export default function Bonuses() {
  return (
    <section className="relative bg-[var(--color-charcoal)] px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="font-body text-[10px] uppercase tracking-[0.4em] text-white/50">
            / Perks inside /
          </span>
          <h2 className="font-display text-[14vw] leading-[0.95] tracking-tight sm:text-[72px] lg:text-[96px]">
            <span className="text-[var(--color-orange)]">BONUSES</span>{" "}
            <span className="text-white">FOR YOU</span>
          </h2>
          <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-white/60">
            Every TSW membership stacks extras on top of great training, so you
            walk in and walk out a step ahead.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {BONUSES.map((b, i) => (
            <BonusCard key={b.title} index={i + 1} {...b} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BonusCard({
  index,
  title,
  copy,
  image,
}: {
  index: number;
  title: string;
  copy: string;
  image: string;
}) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[var(--color-orange)]/60 bg-[var(--color-charcoal-soft)]">
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 640px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-orange)] px-3 py-1 font-body text-[10px] uppercase tracking-[0.3em] text-white">
          Bonus 0{index}
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <h3 className="font-display text-2xl uppercase leading-tight text-white sm:text-3xl">
          {title}
        </h3>
        <p className="mt-2 max-w-xs font-body text-xs leading-relaxed text-white/70 sm:text-sm">
          {copy}
        </p>
      </div>
    </article>
  );
}
