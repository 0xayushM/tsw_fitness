import Image from "next/image";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "Memberships", href: "#classes" },
  { label: "Plans", href: "#membership" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

type ContactLink = {
  label: string;
  href: string;
  external?: boolean;
  icon?: "instagram" | "map";
};

const CONTACT_LINKS: ContactLink[] = [
  { label: "+91 84489 39595", href: "tel:+918448939595" },
  { label: "customercare@tswfitness.com", href: "mailto:customercare@tswfitness.com" },
  {
    label: "@tswfitness_",
    href: "https://www.instagram.com/tswfitness_/",
    external: true,
    icon: "instagram",
  },
  {
    label: "Find us on Maps",
    href: "https://share.google/zR71KTt6x9wxJ1jkE",
    external: true,
    icon: "map",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-charcoal">
      <div className="mx-auto max-w-[1600px] px-5 py-10 sm:px-10 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-[1fr_auto_auto] sm:items-start">
          {/* Brand */}
          <div className="flex flex-col gap-4">
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
                TSW<span className="text-brand-gold">FITNESS</span>
              </span>
            </div>
            <p className="max-w-xs font-body text-xs leading-relaxed text-white/40">
              It&apos;s not fitness. It&apos;s life.
            </p>
          </div>

          {/* Explore */}
          <div>
            <p className="font-body text-[10px] uppercase tracking-[0.4em] text-white/40">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="font-body text-sm text-white/70 transition-colors hover:text-brand-gold"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="font-body text-[10px] uppercase tracking-[0.4em] text-white/40">
              Connect
            </p>
            <ul className="mt-4 space-y-2.5">
              {CONTACT_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="inline-flex items-center gap-1.5 font-body text-sm text-white/70 transition-colors hover:text-brand-gold"
                  >
                    {l.icon === "instagram" && (
                      <InstagramIcon className="h-3.5 w-3.5" />
                    )}
                    {l.icon === "map" && (
                      <MapPinIcon className="h-3.5 w-3.5" />
                    )}
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.35em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} TSW Fitness. All rights reserved.</span>
          <span>Designed with precision</span>
        </div>
      </div>
    </footer>
  );
}
