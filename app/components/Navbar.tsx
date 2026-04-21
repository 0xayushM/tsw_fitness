import Image from "next/image";
import SplitHover from "./SplitHover";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Classes", href: "#classes" },
  { label: "Membership", href: "#membership" },
  { label: "Clubs", href: "#clubs" },
];

export default function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <nav className="mx-auto flex max-w-8xl items-center justify-between px-5 py-4 sm:px-8 sm:py-6">
        <a href="#top" className="flex items-center gap-0">
          <span className="font-display font-bold text-2xl tracking-[0.25em] text-white md:text-2xl lg:text-3xl">
            <SplitHover>TSW</SplitHover>
          </span>
          <span className="relative block h-10 w-10 sm:h-12  sm:w-12">
            <Image
              src="/logo.png"
              alt="TSW Fitness logo"
              fill
              sizes="48px"
              className="object-contain"
              priority
            />
          </span>
          <span className="font-display font-bold text-[var(--color-orange)] text-2xl tracking-[0.25em] md:text-2xl lg:text-3xl">
            <SplitHover>FITNESS</SplitHover>
          </span>
        </a>

        <ul className="hidden items-center gap-8 rounded-full border border-white/20 bg-black/50 justify-center py-2 px-16 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-display font-medium flex items-center justify-center pb-1 text-2xl md:text-2xl lg:text-3xl uppercase tracking-[0.3em] text-white transition-colors duration-300 hover:text-[var(--color-orange)]"
              >
                <SplitHover>{link.label}</SplitHover>
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#membership"
          className="group relative inline-flex items-center overflow-hidden rounded-full px-4 py-2 font-display font-bold text-2xl uppercase tracking-[0.25em] text-[var(--color-orange)] sm:px-5 md:px-8 sm:py-2 md:text-2xl lg:text-2xl"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-[101%] rounded-full bg-[var(--color-orange)] transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-x-0"
          />
          <span className="relative z-10 transition-colors duration-500 group-hover:text-white pb-1">
            <SplitHover>Join Now{" "}[+]</SplitHover>
          </span>
        </a>
      </nav>
    </header>
  );
}
