import Image from "next/image";
import SplitReveal from "./SplitReveal";

/**
 * Reusable "active promotion" slot. When the offer ends, swap OFFER data
 * or remove the component from page.tsx entirely — nothing else needs changing.
 */
const OFFER = {
  eyebrow: "Active Offer",
  badge: "Limited Time",
  headline: "This Mother's Day",
  subheadline: "Bollywood Dance\nFitness Session",
  body: "A fun, coach-led Bollywood session made just for Moms. Gentle stretches, high-energy dance — zero experience needed. Bring Mum, feel amazing.",
  details: [
    { label: "When", value: "Saturday & Sunday" },
    { label: "Timings", value: "4:00–5:00 PM · 5:00–6:00 PM" },
    { label: "Price", value: "₹399 per session" },
    { label: "Venue", value: "TSW Fitness, Paschim Vihar" },
  ],
  image: "/gallery/mothersday_offer.jpeg",
  cta: "Book Your Spot",
  ctaHref: "#contact",
};

export default function CurrentOffer() {
  return (
    <section className="relative overflow-hidden bg-[#0d0a07] px-5 py-16 sm:px-10 sm:py-20">
      {/* Warm glow behind content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(237,93,38,0.09) 0%, transparent 70%)",
        }}
      />

      {/* Top accent line */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-40"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <div className="relative mx-auto max-w-[1600px]">
        {/* Section label */}
        <div className="mb-10 flex items-center gap-4">
          <span className="font-body text-[10px] uppercase tracking-[0.45em] text-white/40">
            / {OFFER.eyebrow} /
          </span>
          <span className="rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-3 py-1 font-body text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
            {OFFER.badge}
          </span>
        </div>

        {/* Two-col layout: content left, image right */}
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_420px] lg:gap-16 xl:grid-cols-[1fr_480px]">
          {/* Left — text content */}
          <div>
            <p className="font-body text-sm uppercase tracking-[0.35em] text-[var(--color-gold)]/80">
              {OFFER.headline}
            </p>

            <h2 className="mt-3 font-display uppercase leading-[0.88] tracking-tight text-white text-[12vw] sm:text-[7vw] lg:text-[5.5vw]">
              <SplitReveal mode="chars" triggerOnScroll config={{ chars: { duration: 0.7, stagger: 0.025 } }}>
                {OFFER.subheadline.split("\n")[0]}
              </SplitReveal>
              <span className="block text-[var(--color-gold)]">
                <SplitReveal
                  delay={0.15}
                  mode="chars"
                  triggerOnScroll
                  config={{ chars: { duration: 0.7, stagger: 0.025 } }}
                >
                  {OFFER.subheadline.split("\n")[1]}
                </SplitReveal>
              </span>
            </h2>

            <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-white/60">
              {OFFER.body}
            </p>

            {/* Detail chips */}
            <div className="mt-8 flex flex-wrap gap-3">
              {OFFER.details.map((d) => (
                <div
                  key={d.label}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5"
                >
                  <span className="block font-body text-[9px] uppercase tracking-[0.35em] text-white/35">
                    {d.label}
                  </span>
                  <span className="mt-0.5 block font-body text-xs font-semibold text-white/85">
                    {d.value}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href={OFFER.ctaHref}
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-[var(--color-gold)] px-7 py-3.5 font-body text-[11px] uppercase tracking-[0.35em] text-white transition-transform hover:-translate-y-0.5 hover:opacity-90"
            >
              {OFFER.cta}
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-white"
              />
            </a>
          </div>

          {/* Right — offer image */}
          <div className="relative mx-auto w-full max-w-[420px] lg:mx-0">
            {/* Soft glow behind the card */}
            <div
              aria-hidden
              className="absolute -inset-4 rounded-3xl blur-2xl"
              style={{ background: "rgba(237,93,38,0.12)" }}
            />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <Image
                src={OFFER.image}
                alt="Mother's Day Bollywood Dance Fitness Session at TSW Fitness"
                width={480}
                height={580}
                className="w-full object-cover"
                sizes="(max-width: 1024px) 90vw, 480px"
              />
            </div>

            {/* Floating price badge */}
            <div className="absolute -bottom-4 -right-2 rounded-2xl border border-[var(--color-gold)]/30 bg-[#0d0a07] px-5 py-3 shadow-xl">
              <span className="block font-body text-[9px] uppercase tracking-[0.35em] text-white/40">
                Only
              </span>
              <span className="font-display text-3xl uppercase leading-none tracking-tight text-[var(--color-gold)]">
                ₹399
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
