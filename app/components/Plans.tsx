// Plans are priced as a one-time total for the chosen duration. The
// monthly equivalent is computed below so longer commitments visibly
// reward the user.
type Plan = {
  tag: string;
  months: number;
  price: number;
  perks: string[];
  highlight?: boolean;
};

const PLANS: Plan[] = [
  {
    tag: "1 Month",
    months: 1,
    price: 4000,
    perks: [
      "Access to all clubs",
      "All group classes",
      "Locker & towel service",
    ],
  },
  {
    tag: "3 Months",
    months: 3,
    price: 9000,
    perks: [
      "Access to all clubs",
      "All group classes",
      "Body composition scan",
      "Recovery lounge access",
    ],
  },
  {
    tag: "6 Months",
    months: 6,
    price: 12000,
    perks: [
      "Access to all clubs",
      "Unlimited classes",
      "1 PT session / month",
      "Recovery lounge access",
    ],
  },
  {
    tag: "1 Year",
    months: 12,
    price: 15000,
    perks: [
      "Access to all clubs",
      "Unlimited classes",
      "2 PT sessions / month",
      "Nutrition playbook",
      "Guest passes",
    ],
    highlight: true,
  },
];

const BASE_MONTHLY = PLANS[0].price; // 1-month plan is the reference rate
const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

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

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <PlanCard key={plan.tag} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlanCard({ tag, months, price, perks, highlight }: Plan) {
  // Monthly equivalent = total price spread across the duration. The savings
  // percentage compares against the 1-month base rate, giving longer plans
  // a clear, premium-feeling value pitch without resorting to color soup.
  const monthly = Math.round(price / months);
  const savingsPct =
    months > 1 ? Math.round((1 - monthly / BASE_MONTHLY) * 100) : 0;

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 ${
        highlight
          ? "border-[var(--color-gold)]/60 bg-gradient-to-b from-[#141008] via-[#0e0a05] to-[#0a0a0a] shadow-[0_30px_60px_-30px_rgba(237,93,38,0.45)]"
          : "border-white/10 bg-[#0e0e0e] hover:border-white/20"
      }`}
    >
      {/* Faint gold corner glow on the highlighted card — reads as premium
          without painting the whole card a different color. */}
      {highlight && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[var(--color-gold)]/15 blur-3xl"
        />
      )}

      <div className="relative flex items-center justify-between">
        <p
          className={`font-body text-[10px] uppercase tracking-[0.4em] ${
            highlight ? "text-[var(--color-gold)]" : "text-white/55"
          }`}
        >
          {tag}
        </p>
        {highlight ? (
          <span className="rounded-full border border-[var(--color-gold)]/50 bg-[var(--color-gold)]/10 px-2 py-0.5 font-body text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
            Best Value
          </span>
        ) : savingsPct > 0 ? (
          <span className="rounded-full border border-white/15 px-2 py-0.5 font-body text-[9px] uppercase tracking-[0.3em] text-white/60">
            Save {savingsPct}%
          </span>
        ) : null}
      </div>

      <div className="relative mt-10 flex items-end gap-2">
        <span
          className={`font-display text-5xl uppercase leading-[0.9] sm:text-6xl ${
            highlight ? "text-white" : "text-white"
          }`}
        >
          ₹{formatINR(price)}
        </span>
      </div>
      <p className="relative mt-2 font-body text-xs tracking-wide text-white/50">
        ₹{formatINR(monthly)} / month
        {months > 1 ? (
          <span className="text-white/35">
            {" · billed once for "}
            {tag.toLowerCase()}
          </span>
        ) : null}
      </p>

      <ul className="relative mt-6 space-y-2 border-t border-white/10 pt-6">
        {perks.map((perk) => (
          <li
            key={perk}
            className="flex items-center gap-3 font-body text-sm text-white/80"
          >
            <span
              aria-hidden
              className={`inline-block h-1.5 w-1.5 rounded-full ${
                highlight ? "bg-[var(--color-gold)]" : "bg-white/40"
              }`}
            />
            {perk}
          </li>
        ))}
      </ul>

      <a
        href="#top"
        className={`relative mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 font-body text-[11px] uppercase tracking-[0.3em] transition-colors ${
          highlight
            ? "bg-[var(--color-gold)] text-black hover:bg-[var(--color-gold)]/90"
            : "border border-white/20 text-white hover:border-white/40 hover:bg-white/5"
        }`}
      >
        Choose {tag}
        <span
          aria-hidden
          className={`h-1.5 w-1.5 rounded-full ${
            highlight ? "bg-black" : "bg-[var(--color-gold)]"
          }`}
        />
      </a>
    </article>
  );
}
