import Image from "next/image";

const COL_A = [
  { label: "Experience", href: "#about" },
  { label: "Series", href: "#classes" },
  { label: "Machines", href: "#membership" },
  { label: "Contact", href: "#contact" },
];

// const COL_B = [
//   // { label: "Privacy Policy", href: "#" },
//   // { label: "Cookie Policy", href: "#" },
//   // // { label: "Imprint", href: "#" },
//   // { label: "Contact", href: "mailto:hello@tswfitness.com" },
// ];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[var(--color-charcoal)]">
      <div className="mx-auto max-w-[1600px] px-5 py-8 sm:px-10 sm:py-12">
        <div className="grid gap-10 sm:grid-cols-[1fr_auto_auto] sm:items-start">
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
            <span className="font-display text-xl uppercase tracking-[0.2em] text-white">
              TSW<span className="text-[var(--color-gold)]">FITNESS</span>
            </span>
          </div>

          <div>
            <p className="font-body text-[10px] uppercase tracking-[0.4em] text-white/40">
              Explore
            </p>
            <ul className="mt-4 space-y-2">
              {COL_A.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="font-body text-sm text-white/75 transition-colors hover:text-[var(--color-gold)]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* <div>
            <p className="font-body text-[10px] uppercase tracking-[0.4em] text-white/40">
              Legal
            </p>
            <ul className="mt-4 space-y-2">
              {COL_B.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="font-body text-sm text-white/75 transition-colors hover:text-[var(--color-gold)]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.35em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} TSW Fitness</span>
          <span className="text-white/55">
            It&apos;s not fitness. It&apos;s life.
          </span>
          <span>Designed with precision</span>
        </div>
      </div>

      {/* Giant brand wordmark */}
      {/* <div className="relative -mb-[2vw] mt-10 overflow-hidden px-2 sm:px-4">
        <p
          aria-hidden
          className="font-display text-center uppercase leading-[0.8] tracking-[-0.02em] text-white select-none text-[24vw]"
        >
          TSW<span className="text-[var(--color-gold)]">FITNESS</span>
        </p>
      </div> */}
    </footer>
  );
}
