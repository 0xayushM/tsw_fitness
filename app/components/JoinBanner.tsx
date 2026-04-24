import Image from "next/image";

const CATEGORIES = [
  { label: "Cardio", image: "/images/img1.png" },
  { label: "Strength", image: "/images/img2.png" },
  { label: "Mobility", image: "/images/img3.png" },
  { label: "Recovery", image: "/images/img4.png" },
  { label: "Performance", image: "/images/img5.png" },
];

// Static partner list shown as a slim logo strip under the cards
const PARTNERS = [
  "FORGE",
  "MARATHON",
  "HEX LAB",
  "MOVEWELL",
  "BLUEFIT",
  "ONWARD",
  "APEX",
  "HOPE",
];

export default function JoinBanner() {
  return (
    <section className="relative bg-[var(--color-charcoal)] px-5 pb-16 sm:px-10 sm:pb-20">
      <div className="mx-auto max-w-[1600px]">
        {/* Category thumbnails row */}
        <div className="rounded-3xl border border-white/10 bg-[var(--color-charcoal-soft)] px-4 py-6 sm:px-8 sm:py-8">
          <div className="flex justify-end">
            <span className="font-body text-[10px] uppercase tracking-[0.4em] text-white/40">
              / 5 Categories
            </span>
          </div>
          <ul className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-5 sm:gap-6">
            {CATEGORIES.map((cat) => (
              <li
                key={cat.label}
                className="group flex flex-col items-center gap-3"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-black">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    sizes="(min-width: 640px) 18vw, 30vw"
                    className="object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <span className="font-body text-[10px] uppercase tracking-[0.35em] text-white/70 transition-colors group-hover:text-[var(--color-gold)]">
                  {cat.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Partner logos strip */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-y border-white/10 py-6 sm:gap-x-14">
          {PARTNERS.map((p) => (
            <span
              key={p}
              className="font-display text-lg uppercase tracking-[0.3em] text-white/35 transition-colors hover:text-white/80 sm:text-xl"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
