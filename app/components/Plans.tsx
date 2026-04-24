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
    color: "var(--color-teal)",
    foreground: "#0a0a0a",
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
    color: "var(--color-red)",
    foreground: "#ffffff",
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
    color: "var(--color-green)",
    foreground: "#f4f1ea",
    highlight: false,
  },
];

export default function Plans() {
  return (
    <section
      id="membership"
      className="relative bg-[var(--color-charcoal)] px-5 pt-16 pb-20 sm:px-10 sm:pt-20 sm:pb-28"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="font-body text-[10px] uppercase tracking-[0.45em] text-white/40">
            / Join TSW /
          </span>
          <h2 className="font-display uppercase leading-[0.9] tracking-tight text-white text-[12vw] sm:text-[6.5vw] lg:text-[5vw]">
            Membership
          </h2>
          <p className="max-w-xl font-body text-sm leading-relaxed text-white/55">
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
  color,
  foreground,
  highlight,
}: (typeof PLANS)[number]) {
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1"
      style={{ backgroundColor: color, color: foreground }}
    >
      <div className="flex items-center justify-between">
        <p
          className="font-body text-[10px] uppercase tracking-[0.4em]"
          style={{ color: foreground, opacity: 0.75 }}
        >
          {tag}
        </p>
        <span
          className="rounded-full border px-2 py-0.5 font-body text-[9px] uppercase tracking-[0.3em]"
          style={{
            borderColor: foreground === "#0a0a0a" ? "#0a0a0a33" : "#ffffff33",
            color: foreground,
          }}
        >
          {highlight ? "Most Chosen" : "Plan"}
        </span>
      </div>

      <div className="mt-10 flex items-end gap-2">
        <span className="font-display text-6xl uppercase leading-[0.9] sm:text-7xl">
          ₹{price}
        </span>
        <span
          className="pb-2 font-body text-xs uppercase tracking-[0.3em]"
          style={{ color: foreground, opacity: 0.6 }}
        >
          {frequency}
        </span>
      </div>

      <ul
        className="mt-6 space-y-2 border-t pt-6"
        style={{
          borderColor: foreground === "#0a0a0a" ? "#0a0a0a22" : "#ffffff26",
        }}
      >
        {perks.map((perk) => (
          <li
            key={perk}
            className="flex items-center gap-3 font-body text-sm"
            style={{ color: foreground, opacity: 0.9 }}
          >
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: foreground }}
            />
            {perk}
          </li>
        ))}
      </ul>

      <a
        href="#top"
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full border px-4 py-3 font-body text-[11px] uppercase tracking-[0.3em] transition-colors"
        style={{
          borderColor: foreground === "#0a0a0a" ? "#0a0a0a" : foreground,
          backgroundColor: foreground === "#0a0a0a" ? "#0a0a0a" : "transparent",
          color: foreground === "#0a0a0a" ? color : foreground,
        }}
      >
        Choose {tag}
        <span
          aria-hidden
          className="h-1.5 w-1.5 rounded-full"
          style={{
            backgroundColor: foreground === "#0a0a0a" ? color : foreground,
          }}
        />
      </a>
    </article>
  );
}
