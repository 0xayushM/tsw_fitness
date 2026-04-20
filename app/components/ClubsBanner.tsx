const ROW_ITEMS = [
  "4 CLUBS",
  "45 MIN WORKOUT",
  "4 CLUBS",
  "45 MIN WORKOUT",
  "4 CLUBS",
  "45 MIN WORKOUT",
];

export default function ClubsBanner() {
  return (
    <section
      id="clubs"
      className="relative overflow-hidden border-y border-white/10 bg-[var(--color-charcoal)] py-10 sm:py-16"
    >
      <MarqueeRow stroke />
      <div className="h-3 sm:h-5" />
      <MarqueeRow stroke={false} reverse />
    </section>
  );
}

function MarqueeRow({
  stroke,
  reverse,
}: {
  stroke?: boolean;
  reverse?: boolean;
}) {
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className={`flex w-max items-center gap-10 whitespace-nowrap ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {[...ROW_ITEMS, ...ROW_ITEMS].map((text, idx) => (
          <span
            key={`${text}-${idx}`}
            className={`font-display text-[14vw] leading-none sm:text-[96px] lg:text-[120px] ${
              stroke
                ? "text-stroke text-white"
                : text.includes("45")
                  ? "text-[var(--color-orange)]"
                  : "text-white"
            }`}
          >
            {text}
            <span
              aria-hidden
              className="mx-6 inline-block h-3 w-3 translate-y-[-1em] rounded-full bg-[var(--color-orange)] align-middle sm:h-4 sm:w-4"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
