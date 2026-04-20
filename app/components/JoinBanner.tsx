import Image from "next/image";

export default function JoinBanner() {
  return (
    <section className="relative bg-[var(--color-charcoal)] px-5 pb-20 sm:px-8 sm:pb-28">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10">
        <div className="relative aspect-[21/9] w-full">
          <Image
            src="/images/img4.png"
            alt="Inside a TSW Fitness club"
            fill
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-x-0 top-6 flex items-center justify-between px-6 text-[10px] uppercase tracking-[0.35em] text-white/70 sm:text-xs">
            <span>Est. 2014</span>
            <span className="hidden sm:block">TSW / Fitness Club</span>
            <span>Open · 24 / 7</span>
          </div>
        </div>

        <div className="absolute inset-x-0 -bottom-8 flex justify-center sm:-bottom-10">
          <a
            href="#membership"
            className="group relative flex h-36 w-36 items-center justify-center rounded-full bg-[var(--color-orange)] text-white shadow-[0_20px_50px_-12px_rgba(237,93,38,0.55)] transition-transform hover:scale-105 sm:h-44 sm:w-44"
          >
            <span
              aria-hidden
              className="absolute inset-1 rounded-full border border-white/40"
            />
            <span className="font-display text-center text-3xl leading-none sm:text-4xl">
              JOIN
              <br />
              NOW
            </span>
          </a>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-6xl flex-wrap items-center justify-between gap-4 text-[10px] uppercase tracking-[0.4em] text-white/50 sm:mt-20 sm:text-xs">
        <span>Strength</span>
        <span>Mobility</span>
        <span>Conditioning</span>
        <span>Community</span>
      </div>
    </section>
  );
}
