const PLANS = [
  {
    tag: "Starter",
    price: "1,499",
    frequency: "/ month",
    perks: [
      "Access to 1 club",
      "All group classes",
      "Locker & towel service",
      "Body composition scan",
    ],
    highlight: false,
  },
  {
    tag: "Pro",
    price: "2,299",
    frequency: "/ month",
    perks: [
      "Access to all 4 clubs",
      "Unlimited 45-min classes",
      "1 PT session / month",
      "Recovery lounge access",
    ],
    highlight: true,
  },
  {
    tag: "Elite",
    price: "3,499",
    frequency: "/ month",
    perks: [
      "Everything in Pro",
      "4 PT sessions / month",
      "Nutrition playbook",
      "Guest passes x 4",
    ],
    highlight: false,
  },
];

export default function Plans() {
  return (
    <section
      id="membership"
      className="relative bg-[var(--color-charcoal)] px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-8xl">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="font-body text-[10px] uppercase tracking-[0.4em] text-white/50">
            / Join TSW /
          </span>
          <h2 className="font-display text-[14vw] leading-[0.95] tracking-tight text-white sm:text-[72px] lg:text-[96px]">
            MEMBERSHIP
          </h2>
          <p className="max-w-xl font-body text-sm leading-relaxed text-white/60">
            Pick the plan that fits your week. Switch any time. No contracts.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {PLANS.map((plan) => (
            <PlanCard key={plan.tag} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlanCard({
  tag,
  price,
  frequency,
  perks,
  highlight,
}: (typeof PLANS)[number]) {
  return (
    <article
      className={`relative overflow-hidden rounded-2xl border p-6 sm:p-7 ${
        highlight
          ? "border-[var(--color-orange)] bg-[linear-gradient(180deg,rgba(237,93,38,0.14),rgba(11,11,12,1)_60%)]"
          : "border-white/10 bg-[var(--color-charcoal-soft)]"
      }`}
    >
      <div
        aria-hidden
        className={`absolute right-0 top-0 h-16 w-16 ${
          highlight ? "bg-[var(--color-orange)]" : "bg-[var(--color-teal)]"
        }`}
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
      />

      <p className="font-body text-[10px] uppercase tracking-[0.4em] text-white/60">
        {tag}
      </p>
      <div className="mt-6 flex items-end gap-2">
        <span className="font-display text-6xl leading-none text-white sm:text-7xl">
          ₹{price}
        </span>
        <span className="pb-2 font-body text-xs uppercase tracking-[0.3em] text-white/50">
          {frequency}
        </span>
      </div>

      <ul className="mt-6 space-y-2 border-t border-white/10 pt-6">
        {perks.map((perk) => (
          <li
            key={perk}
            className="flex items-center gap-3 font-body text-sm text-white/80"
          >
            <span
              aria-hidden
              className={`inline-block h-1.5 w-1.5 rounded-full ${
                highlight
                  ? "bg-[var(--color-orange)]"
                  : "bg-[var(--color-teal)]"
              }`}
            />
            {perk}
          </li>
        ))}
      </ul>

      <a
        href="#top"
        className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 font-body text-[11px] uppercase tracking-[0.3em] transition-colors ${
          highlight
            ? "bg-[var(--color-orange)] text-white hover:bg-[#ff6a34]"
            : "border border-white/15 text-white/80 hover:border-[var(--color-orange)] hover:text-white"
        }`}
      >
        Choose {tag}
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
      </a>
    </article>
  );
}
