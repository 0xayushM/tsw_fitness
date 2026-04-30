import Image from "next/image";

const CLUBS = [
  { name: "Downtown", detail: "14 Main St · Open 24/7" },
  { name: "Riverside", detail: "88 Quay Rd · Open 5am – 11pm" },
  { name: "Highland", detail: "7 Hill Ave · Open 6am – 11pm" },
  { name: "Westside", detail: "221 West Blvd · Open 24/7" },
];

export default function FindGym() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-charcoal)] px-5 pt-20 pb-16 sm:px-10 sm:pt-28 sm:pb-24">
      <div className="mx-auto max-w-[1600px]">
        {/* Chrome "ROBOZÃO"-style headline */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-chrome font-display uppercase leading-[0.85] tracking-tight text-[16vw] sm:text-[11vw] lg:text-[9vw]">
            The Giant
          </h2>
          <p className="font-body text-[11px] uppercase tracking-[0.4em] text-white/70">
            Meet the TSW flagship club
          </p>
          <p className="mt-1 max-w-xl font-body text-sm leading-relaxed text-white/55">
            Four locations across the city. Same energy. Same standards. One
            membership gets you in, any time — and our downtown club is the
            mothership.
          </p>
          <a
            href="#membership"
            className="mt-3 inline-flex items-center gap-3 rounded-full border border-white/15 px-5 py-2.5 font-body text-[10px] uppercase tracking-[0.35em] text-white/80 transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
          >
            Book a Tour
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]"
            />
          </a>
        </div>

        {/* Hero club image (like the machine showcase in Buckler) */}
        <div className="relative mx-auto mt-12 max-w-5xl">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-white/10 bg-black">
            {/* <Image
              src="/images/img6.png"
              alt="TSW Downtown Club"
              fill
              sizes="(min-width: 1024px) 960px, 100vw"
              className="object-cover opacity-90"
            /> */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.6)_75%)]" />

            {[
              { top: "32%", left: "28%", color: "var(--color-gold)" },
              { top: "58%", left: "62%", color: "var(--color-teal)" },
              { top: "44%", left: "72%", color: "var(--color-red)" },
              { top: "68%", left: "22%", color: "var(--color-cream)" },
            ].map((pin, i) => (
              <span
                key={i}
                className="absolute flex h-4 w-4 items-center justify-center"
                style={{ top: pin.top, left: pin.left }}
              >
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                  style={{ background: pin.color }}
                />
                <span
                  className="relative inline-flex h-2.5 w-2.5 rounded-full"
                  style={{ background: pin.color }}
                />
              </span>
            ))}

            <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/60 px-3 py-1 font-body text-[10px] uppercase tracking-[0.35em] text-white/80 backdrop-blur">
              4 Clubs · 1 Membership
            </div>
          </div>
        </div>

        {/* Clubs list below like Buckler's small product-row under the hero image */}
        <ul className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CLUBS.map((club, i) => (
            <li
              key={club.name}
              className="group flex items-center justify-between rounded-xl border border-white/10 bg-[var(--color-charcoal-soft)] p-4 transition-colors hover:border-[var(--color-gold)]/40"
            >
              <div>
                <p className="font-display text-lg uppercase text-white">
                  {club.name}
                </p>
                <p className="mt-0.5 font-body text-[10px] uppercase tracking-[0.3em] text-white/50">
                  {club.detail}
                </p>
              </div>
              <span className="font-body text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
                0{i + 1}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
