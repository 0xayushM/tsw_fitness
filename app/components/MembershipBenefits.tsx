import Image from "next/image";

const BENEFITS = [
  {
    title: "Premium Equipment",
    image: "/images/img2.png",
    color: "var(--color-teal)",
  },
  {
    title: "Recovery Spaces",
    image: "/images/img5.png",
    color: "var(--color-blue)",
  },
];

export default function MembershipBenefits() {
  return (
    <section
      id="about"
      className="relative bg-[var(--color-charcoal)] px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="max-w-8xl">
        <div className="flex flex-col gap-3">
          <span className="font-body text-[10px] uppercase tracking-[0.4em] text-white/50">
            / Why TSW /
          </span>
          <h2 className="font-display text-[13vw] leading-[0.95] tracking-tight sm:text-[72px] lg:text-[96px]">
            <span className="block text-white">MEMBERSHIP WITH</span>
            <span className="mt-2 flex items-center justify-center gap-4 text-[var(--color-orange)]">
              <span
                aria-hidden
                className="inline-block h-[2px] w-12 bg-[var(--color-orange)] sm:w-20"
              />
              BEST BENEFITS
              <span
                aria-hidden
                className="inline-block h-[2px] w-12 bg-[var(--color-orange)] sm:w-20"
              />
            </span>
          </h2>
          <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-white/60">
            Unlimited access to 4 clubs, 45-minute focused classes, recovery
            zones and coaches who know your name. One membership. Every
            advantage.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 sm:gap-6">
          {BENEFITS.map((b) => (
            <BenefitCard key={b.title} {...b} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitCard({
  title,
  image,
  color,
}: {
  title: string;
  image: string;
  color: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-charcoal-soft)]">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-6">
        <h3 className="font-display text-2xl uppercase tracking-wide text-white sm:text-3xl">
          {title}
        </h3>
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: color }}
          aria-hidden
        />
      </div>
    </div>
  );
}
