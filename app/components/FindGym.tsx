import Image from "next/image";

const CLUBS = [
  { name: "Downtown", detail: "14 Main St · Open 24/7" },
  { name: "Riverside", detail: "88 Quay Rd · Open 5am – 11pm" },
  { name: "Highland", detail: "7 Hill Ave · Open 6am – 11pm" },
  { name: "Westside", detail: "221 West Blvd · Open 24/7" },
];

export default function FindGym() {
  return (
    <section className="relative bg-[var(--color-charcoal)] px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-8xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
        <div>
          <span className="font-body text-[10px] uppercase tracking-[0.4em] text-white/50">
            / On your street /
          </span>
          <h2 className="mt-3 font-display text-[14vw] leading-[0.9] tracking-tight sm:text-[64px] lg:text-[84px]">
            <span className="block text-white">FIND YOUR</span>
            <span className="block text-[var(--color-orange)]">
              NEAREST GYM
            </span>
          </h2>
          <p className="mt-5 max-w-md font-body text-sm leading-relaxed text-white/60">
            Four locations across the city. Same energy. Same standards. One
            membership gets you in, any time.
          </p>

          <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {CLUBS.map((club, i) => (
              <li
                key={club.name}
                className="flex items-center justify-between py-4"
              >
                <div>
                  <p className="font-display text-2xl uppercase text-white">
                    {club.name}
                  </p>
                  <p className="mt-0.5 font-body text-[11px] uppercase tracking-[0.3em] text-white/50">
                    {club.detail}
                  </p>
                </div>
                <span className="font-body text-[11px] uppercase tracking-[0.3em] text-[var(--color-orange)]">
                  0{i + 1}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-[var(--color-charcoal-soft)]"
          data-speed="0.9"
        >
          <div className="relative aspect-square w-full">
            <Image
              src="/images/img6.png"
              alt="Map of TSW Fitness clubs"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover opacity-60 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(46,169,188,0.25),transparent_65%)]" />

            {[
              { top: "28%", left: "30%", color: "var(--color-orange)" },
              { top: "58%", left: "62%", color: "var(--color-teal)" },
              { top: "42%", left: "70%", color: "var(--color-blue)" },
              { top: "70%", left: "22%", color: "var(--color-orange)" },
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

            <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 font-body text-[10px] uppercase tracking-[0.35em] text-white/80 backdrop-blur">
              4 Clubs · 1 Membership
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
