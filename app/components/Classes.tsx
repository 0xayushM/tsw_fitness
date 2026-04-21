import Image from "next/image";

const CLASSES = [
  { name: "TFC", duration: "45 MIN" },
  { name: "PT / Personal", duration: "60 MIN" },
  { name: "Couples", duration: "45 MIN" },
  { name: "Move Body", duration: "50 MIN" },
  { name: "Bootcamp", duration: "45 MIN" },
  { name: "Body Shift", duration: "45 MIN" },
  { name: "Yoga", duration: "60 MIN" },
  { name: "Pilates", duration: "45 MIN" },
  { name: "Box Fit", duration: "45 MIN" },
  { name: "Spin Ride", duration: "45 MIN" },
  { name: "HIIT", duration: "30 MIN" },
  { name: "Barre", duration: "45 MIN" },
];

export default function Classes() {
  return (
    <section
      id="classes"
      className="relative overflow-hidden bg-[var(--color-charcoal)] px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="relative mx-auto grid max-w-8xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <span className="font-body text-[10px] uppercase tracking-[0.4em] text-white/50">
            / Train with us /
          </span>
          <h2 className="mt-3 font-display text-[14vw] leading-[0.9] tracking-tight sm:text-[72px] lg:text-[96px]">
            <span className="block text-white">OUR</span>
            <span className="block text-[var(--color-orange)]">CLASSES</span>
          </h2>

          <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {CLASSES.map((c, i) => (
              <li
                key={c.name}
                className="group flex items-center justify-between py-3.5"
              >
                <span className="flex items-center gap-4 font-display text-xl uppercase tracking-wide text-white sm:text-2xl">
                  <span className="w-6 font-body text-[10px] tracking-[0.3em] text-white/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {c.name}
                </span>
                <span className="flex items-center gap-3 font-body text-[10px] uppercase tracking-[0.35em] text-white/50 transition-colors group-hover:text-[var(--color-orange)]">
                  {c.duration}
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-white/40 transition-colors group-hover:bg-[var(--color-orange)]"
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative hidden lg:block">
          <div className="sticky top-24 overflow-hidden rounded-3xl border border-white/10">
            <div className="relative aspect-[3/4] w-full">
              <Image
                src="/images/img5.png"
                alt="TSW Fitness class floor"
                fill
                sizes="(min-width: 1024px) 420px, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-body text-[10px] uppercase tracking-[0.4em] text-white/60">
                  12 disciplines · 4 clubs
                </p>
                <p className="mt-2 font-display text-3xl uppercase leading-none text-white">
                  Pick a class,
                  <br />
                  <span className="text-[var(--color-orange)]">pick a you.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
