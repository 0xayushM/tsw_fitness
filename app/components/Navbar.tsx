import Image from "next/image";
import SplitHover from "./SplitHover";

const LINKS = [
  { label: "Experience", href: "#about" },
  { label: "Series", href: "#classes" },
  { label: "Machines", href: "#membership" },
  { label: "Clubs", href: "#clubs" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/85 via-black/55 to-transparent" />

      <nav className="relative mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 sm:px-10 sm:py-5">
        <a href="#top" className="flex items-center gap-2">
          <span className="relative block h-8 w-8 sm:h-9 sm:w-9">
            <Image
              src="/logo.png"
              alt="TSW Fitness"
              fill
              sizes="36px"
              className="object-contain"
              priority
            />
          </span>
          <span className="font-display text-2xl tracking-tighter text-white sm:text-2xl">
            <SplitHover>TSW</SplitHover>
            <span className="text-[var(--color-gold)]">
              <SplitHover>FITNESS</SplitHover>
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-body text-[11px] uppercase tracking-[0.4em] text-white/80 transition-colors duration-300 hover:text-[var(--color-gold)]"
              >
                <SplitHover>{link.label}</SplitHover>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 sm:gap-5">
          <a
            href="#membership"
            className="group relative inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-body text-[10px] uppercase tracking-[0.35em] text-white backdrop-blur transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] sm:px-5"
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]"
            />
            <SplitHover>Join Now</SplitHover>
          </a>
        </div>
      </nav>
    </header>
  );
}
