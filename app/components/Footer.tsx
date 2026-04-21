import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[var(--color-charcoal)] px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto flex max-w-8xl flex-col items-center gap-8 text-center">
        <div className="flex items-center gap-3">
          <span className="relative block h-10 w-10">
            <Image
              src="/logo.png"
              alt="TSW Fitness"
              fill
              sizes="40px"
              className="object-contain"
            />
          </span>
          <span className="font-display text-xl tracking-[0.25em] text-white">
            TSW<span className="text-[var(--color-orange)]">FITNESS</span>
          </span>
        </div>

        <p className="font-display text-[12vw] leading-[0.9] tracking-tight text-white sm:text-[64px] lg:text-[84px]">
          YOU ARE IN <span className="text-[var(--color-orange)]">CONTROL</span>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 font-body text-[10px] uppercase tracking-[0.35em] text-white/50 sm:text-xs">
          <a href="#about" className="hover:text-white">
            About
          </a>
          <span aria-hidden>·</span>
          <a href="#classes" className="hover:text-white">
            Classes
          </a>
          <span aria-hidden>·</span>
          <a href="#membership" className="hover:text-white">
            Membership
          </a>
          <span aria-hidden>·</span>
          <a href="#clubs" className="hover:text-white">
            Clubs
          </a>
          <span aria-hidden>·</span>
          <a href="mailto:hello@tswfitness.com" className="hover:text-white">
            Contact
          </a>
        </div>

        <div className="flex w-full flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 font-body text-[10px] uppercase tracking-[0.35em] text-white/40 sm:flex-row">
          <span>© {new Date().getFullYear()} TSW Fitness</span>
          <span>It&apos;s not fitness. It&apos;s life.</span>
          <span>Built for TSW</span>
        </div>
      </div>
    </footer>
  );
}
