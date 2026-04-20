import Image from "next/image";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-charcoal)] px-5 py-20 sm:px-8 sm:py-28">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10">
        <div className="relative aspect-[5/4] w-full sm:aspect-[16/9]">
          <Image
            src="/images/img2.png"
            alt="TSW Fitness main floor"
            fill
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
          <span className="font-body text-[10px] uppercase tracking-[0.45em] text-white/60">
            / The moment is now /
          </span>
          <h2 className="font-display text-[10vw] leading-[0.9] tracking-tight sm:text-[64px] lg:text-[88px]">
            <span className="block text-white">PUT YOUR FITNESS</span>
            <span className="block">
              <span className="text-[var(--color-orange)]">FIRST</span>{" "}
              <span className="text-white">TODAY</span>
            </span>
          </h2>

          <a
            href="#membership"
            className="group relative mt-4 flex h-40 w-40 items-center justify-center rounded-full bg-[var(--color-orange)] text-white shadow-[0_25px_60px_-10px_rgba(237,93,38,0.6)] transition-transform hover:scale-105 sm:h-48 sm:w-48"
          >
            <span
              aria-hidden
              className="absolute inset-1 rounded-full border border-white/40"
            />
            <span className="font-display text-4xl leading-none sm:text-5xl">
              JOIN
              <br />
              NOW
            </span>
          </a>

          <p className="mt-2 font-body text-[10px] uppercase tracking-[0.4em] text-white/60">
            First week on us
          </p>
        </div>
      </div>
    </section>
  );
}
