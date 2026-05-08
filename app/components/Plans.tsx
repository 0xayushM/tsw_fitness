import type { ReactNode } from "react";
import SplitReveal from "./SplitReveal";

type Plan = {
  tag: string;
  title: string;
  months: number;
  price: number;
  totalValue: number;
  positioning: string;
  items: {
    key: BenefitKey;
    label: string;
    value: number;
  }[];
  highlight?: boolean;
};

const BENEFIT_ROWS = [
  { key: "access", label: "Full gym access 24/7" },
  { key: "steam", label: "Steam room access" },
  { key: "parking", label: "Parking" },
  { key: "workout", label: "Workout plan" },
  { key: "diet", label: "Personalized diet plan" },
  { key: "mma", label: "Free MMA classes" },
  { key: "yoga", label: "Free Yoga classes" },
  { key: "dance", label: "Free Dance classes" },
  { key: "accountability", label: "Trainer accountability" },
  { key: "tracking", label: "Progress tracking" },
  { key: "guest", label: "Guest passes" },
  { key: "pt", label: "No PT charges" },
] as const;

type BenefitKey = (typeof BENEFIT_ROWS)[number]["key"];

const PLANS: Plan[] = [
  {
    tag: "1 Month",
    title: "The Trial Experience",
    months: 1,
    price: 4000,
    totalValue: 7000,
    positioning: "Try us for a month. No commitment, full experience.",
    items: [
      { key: "access", label: "Full gym access 24/7", value: 4000 },
      { key: "steam", label: "Steam room access", value: 1500 },
      { key: "parking", label: "Parking (covered)", value: 500 },
      { key: "workout", label: "Personalized workout plan — Week 1", value: 1000 },
    ],
  },
  {
    tag: "3 Months",
    title: "The Transformation Starter",
    months: 3,
    price: 9000,
    totalValue: 20000,
    positioning: "Three months is where real change begins to show.",
    items: [
      { key: "access", label: "Full gym access 24/7", value: 9000 },
      { key: "steam", label: "Steam room access", value: 3000 },
      { key: "parking", label: "Parking", value: 1000 },
      { key: "workout", label: "Full workout plan (updated monthly)", value: 3000 },
      { key: "diet", label: "Personalized diet plan", value: 2000 },
      { key: "accountability", label: "WhatsApp check-in with trainer (weekly)", value: 2000 },
    ],
  },
  {
    tag: "6 Months",
    title: "The Serious Athlete Pack",
    months: 6,
    price: 12000,
    totalValue: 38500,
    positioning:
      "Six months is where people stop asking 'are you working out?' and start asking 'what are you doing?'",
    items: [
      { key: "access", label: "Full gym access 24/7", value: 12000 },
      { key: "steam", label: "Steam room access", value: 5000 },
      { key: "parking", label: "Parking", value: 2000 },
      { key: "workout", label: "Full workout plan (updated monthly)", value: 3000 },
      { key: "diet", label: "Personalized diet plan", value: 2000 },
      { key: "mma", label: "Free MMA classes", value: 6000 },
      { key: "yoga", label: "Free Yoga classes", value: 4000 },
      { key: "accountability", label: "WhatsApp accountability — bi-weekly", value: 3000 },
      { key: "tracking", label: "Progress tracking (measurements monthly)", value: 1500 },
    ],
  },
  {
    tag: "1 Year",
    title: "The TSW Elite Membership",
    months: 12,
    price: 15000,
    totalValue: 66000,
    positioning: "One price. Everything included. No hidden charges. Ever.",
    items: [
      { key: "access", label: "Full gym access 24/7", value: 15000 },
      { key: "steam", label: "Steam room access (unlimited)", value: 8000 },
      { key: "parking", label: "Parking", value: 3000 },
      { key: "workout", label: "Full workout plan (updated monthly)", value: 3000 },
      { key: "diet", label: "Personalized diet plan", value: 2000 },
      { key: "mma", label: "Free MMA classes", value: 6000 },
      { key: "yoga", label: "Free Yoga classes", value: 4000 },
      { key: "dance", label: "Free Dance classes", value: 4000 },
      { key: "accountability", label: "WhatsApp accountability — weekly", value: 5000 },
      { key: "tracking", label: "Monthly progress tracking", value: 3000 },
      { key: "guest", label: "1 Guest pass per month", value: 3000 },
      { key: "pt", label: "No PT charges", value: 10000 },
    ],
    highlight: true,
  },
];

const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

const getBenefit = (plan: Plan, key: BenefitKey) =>
  plan.items.find((item) => item.key === key);

export default function Plans() {
  return (
    <section
      id="membership"
      className="relative overflow-hidden bg-[var(--color-charcoal)] px-5 pt-16 pb-20 sm:px-10 sm:pt-20 sm:pb-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_50%_0%,rgba(237,93,38,0.16),transparent_62%)]"
      />
      <div className="mx-auto max-w-[1600px]">
        <div className="relative flex flex-col items-center gap-4 text-center">
          <span className="font-body text-[10px] uppercase tracking-[0.45em] text-white/40">
            / Join TSW /
          </span>
          <h2 className="font-display text-[12vw] uppercase tracking-tight text-white sm:text-[6.5vw] lg:text-[5vw]">
          <SplitReveal
                mode="chars"
                config={{ chars: { duration: 0.8, stagger: 0.03 } }}
              >
            Membership
            </SplitReveal>
          </h2>
          <p className="max-w-xl font-body text-sm leading-relaxed text-white/55">
            Choose your commitment. Every plan shows the full value first, then
            the price you pay today.
          </p>
        </div>

        {/* Mobile stacked cards */}
        <div className="mt-12 lg:hidden">
          {PLANS.map((plan) => (
            <MobilePlanCard key={plan.tag} plan={plan} />
          ))}
        </div>

        {/* Desktop comparison table */}
        <div className="relative mt-16 hidden overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d0d0d] lg:block">
          {/* Plan headers row */}
          <div className="grid grid-cols-[1.08fr_repeat(4,minmax(0,1fr))] border-b border-white/[0.07]">
            <div className="flex min-h-52 flex-col justify-end bg-[#111111] p-6 xl:p-8">
              <span className="font-body text-[10px] uppercase tracking-[0.35em] text-white/35">
                Compare plans
              </span>
              <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-white/45">
                Pick by commitment, then scan exactly what value is included at
                every tier.
              </p>
            </div>
            {PLANS.map((plan) => (
              <PlanHeader key={plan.tag} plan={plan} />
            ))}
          </div>

          {/* Pricing rows */}
          <ComparisonRow
            label="Total Value"
            cells={PLANS.map((plan) => (
              <span key={plan.tag} className="font-body text-sm line-through opacity-40">
                ₹{formatINR(plan.totalValue)}
              </span>
            ))}
          />
          <ComparisonRow
            label="You Pay"
            emphasized
            cells={PLANS.map((plan) => (
              <span
                key={plan.tag}
                className={`font-display text-3xl leading-none ${
                  plan.highlight ? "text-[var(--color-gold)]" : "text-white"
                }`}
              >
                ₹{formatINR(plan.price)}
              </span>
            ))}
          />
          <ComparisonRow
            label="Monthly Effective"
            cells={PLANS.map((plan) => (
              <span key={plan.tag} className="text-white/55">
                ₹{formatINR(Math.round(plan.price / plan.months))} / mo
              </span>
            ))}
          />

          {/* Section divider */}
          <div className="border-y border-white/[0.07] bg-[#111111] px-6 py-4 font-body text-[10px] uppercase tracking-[0.35em] text-white/35 xl:px-8">
            What They Get
          </div>

          {/* Benefit rows */}
          {BENEFIT_ROWS.map((row) => (
            <ComparisonRow
              key={row.key}
              label={row.label}
              cells={PLANS.map((plan) => {
                const benefit = getBenefit(plan, row.key);
                return benefit ? (
                  <span key={plan.tag} className="inline-flex items-center gap-2.5">
                    <span
                      aria-hidden
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold text-white ${
                        plan.highlight ? "bg-[var(--color-gold)]" : "bg-white/15"
                      }`}
                    >
                      ✓
                    </span>
                    <span>
                      {benefit.label}
                      <span className="block text-xs text-white/35">
                        ₹{formatINR(benefit.value)}
                      </span>
                    </span>
                  </span>
                ) : (
                  <span
                    key={plan.tag}
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/5 text-sm text-white/25"
                  >
                    —
                  </span>
                );
              })}
            />
          ))}

          {/* Positioning row */}
          <ComparisonRow
            label="Tagline"
            cells={PLANS.map((plan) => (
              <span key={plan.tag} className="italic text-white/45 leading-relaxed">
                "{plan.positioning}"
              </span>
            ))}
          />
        </div>
      </div>
    </section>
  );
}

function PlanHeader({ plan }: { plan: Plan }) {
  return (
    <div
      className={`relative flex min-h-52 flex-col justify-between border-l border-white/[0.07] p-6 xl:p-8 ${
        plan.highlight
          ? "bg-gradient-to-b from-[#141008] to-[#0a0a0a] shadow-[inset_0_4px_0_var(--color-gold)]"
          : "bg-[#0f0f0f]"
      }`}
    >
      {plan.highlight && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--color-gold)]/10 blur-3xl"
        />
      )}
      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <p
            className={`font-body text-[10px] uppercase tracking-[0.3em] ${
              plan.highlight ? "text-[var(--color-gold)]" : "text-white/40"
            }`}
          >
            {plan.tag}
          </p>
          {plan.highlight && (
            <span className="rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-2.5 py-1 font-body text-[8px] uppercase tracking-[0.25em] text-[var(--color-gold)]">
              Best Value
            </span>
          )}
        </div>
        <h3 className="mt-4 font-display text-2xl uppercase leading-none tracking-tight text-white xl:text-3xl">
          {plan.title}
        </h3>
      </div>
      <a
        href="#contact"
        className={`relative mt-6 inline-flex items-center justify-center rounded-full px-4 py-3 font-body text-[10px] uppercase tracking-[0.28em] transition-colors ${
          plan.highlight
            ? "bg-[var(--color-gold)] text-white hover:bg-[var(--color-gold)]/90"
            : "border border-white/15 text-white hover:border-white/35 hover:bg-white/5"
        }`}
      >
        Choose
      </a>
    </div>
  );
}

function ComparisonRow({
  label,
  cells,
  emphasized,
}: {
  label: string;
  cells: ReactNode[];
  emphasized?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[1.08fr_repeat(4,minmax(0,1fr))] border-b border-white/[0.06] ${
        emphasized ? "bg-white/[0.03]" : ""
      }`}
    >
      <div className="flex items-center px-6 py-5 font-body text-sm font-semibold text-white/50 xl:px-8">
        {label}
      </div>
      {cells.map((cell, index) => {
        const plan = PLANS[index];
        return (
          <div
            key={`${label}-${plan.tag}`}
            className={`flex items-center border-l border-white/[0.06] px-6 py-5 font-body text-sm leading-snug text-white/70 xl:px-8 ${
              plan.highlight ? "bg-[var(--color-gold)]/[0.03]" : ""
            }`}
          >
            {cell}
          </div>
        );
      })}
    </div>
  );
}

function MobilePlanCard({ plan }: { plan: Plan }) {
  const monthly = Math.round(plan.price / plan.months);

  return (
    <article
      className={`relative mb-5 overflow-hidden rounded-[1.75rem] border p-6 ${
        plan.highlight
          ? "border-[var(--color-gold)]/60 bg-gradient-to-b from-[#141008] via-[#0e0a05] to-[#0a0a0a] shadow-[0_30px_60px_-30px_rgba(237,93,38,0.35)]"
          : "border-white/10 bg-[#111111]"
      }`}
    >
      {plan.highlight && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--color-gold)]/10 blur-3xl"
        />
      )}

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p
            className={`font-body text-[10px] uppercase tracking-[0.35em] ${
              plan.highlight ? "text-[var(--color-gold)]" : "text-white/40"
            }`}
          >
            {plan.tag}
          </p>
          <h3 className="mt-4 font-display text-3xl uppercase leading-none text-white">
            {plan.title}
          </h3>
        </div>
        {plan.highlight && (
          <span className="shrink-0 rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-2.5 py-1 font-body text-[8px] uppercase tracking-[0.25em] text-[var(--color-gold)]">
            Best Value
          </span>
        )}
      </div>

      <div className="relative mt-8 rounded-2xl border border-white/10 bg-black/30 p-4">
        <div className="flex items-center justify-between gap-4 font-body text-xs uppercase tracking-[0.25em] text-white/40">
          <span>Total Value</span>
          <span className="line-through">₹{formatINR(plan.totalValue)}</span>
        </div>
        <div className="mt-3 flex items-end justify-between gap-4">
          <span className="font-body text-xs uppercase tracking-[0.25em] text-white/50">
            You Pay
          </span>
          <span
            className={`font-display text-5xl uppercase leading-[0.9] ${
              plan.highlight ? "text-[var(--color-gold)]" : "text-white"
            }`}
          >
            ₹{formatINR(plan.price)}
          </span>
        </div>
        <p className="mt-2 font-body text-xs text-white/40">
          ₹{formatINR(monthly)} / month
        </p>
      </div>

      <ul className="relative mt-6 divide-y divide-white/[0.07] border-y border-white/[0.07]">
        {plan.items.map((item) => (
          <li
            key={item.label}
            className="flex items-start justify-between gap-4 py-3 font-body text-sm text-white/75"
          >
            <span className="flex items-start gap-3">
              <span
                aria-hidden
                className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold text-white ${
                  plan.highlight ? "bg-[var(--color-gold)]" : "bg-white/15"
                }`}
              >
                ✓
              </span>
              {item.label}
            </span>
            <span className="shrink-0 text-white/40">₹{formatINR(item.value)}</span>
          </li>
        ))}
      </ul>

      <p className="relative mt-5 font-body text-sm italic leading-relaxed text-white/45">
        "{plan.positioning}"
      </p>

      <a
        href="#contact"
        className={`relative mt-7 inline-flex w-full items-center justify-center rounded-full px-4 py-3 font-body text-[11px] uppercase tracking-[0.3em] transition-colors ${
          plan.highlight
            ? "bg-[var(--color-gold)] text-white hover:bg-[var(--color-gold)]/90"
            : "border border-white/15 text-white hover:border-white/35 hover:bg-white/5"
        }`}
      >
        Choose {plan.tag}
      </a>
    </article>
  );
}
