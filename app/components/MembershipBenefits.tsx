import Image from "next/image";

const EXPERIENCES = [
  {
    tag: "TSW Check-Up",
    title: "Diagnose the body",
    copy: "A full intake with our head coach: posture, mobility, baseline strength.",
    image: "/images/img2.png",
  },
  {
    tag: "TSW Private",
    title: "Coach by your side",
    copy: "One-on-one programming that adapts to your weeks, not the other way.",
    image: "/images/img5.png",
  },
];

export default function MembershipBenefits() {
  return (
    <section
      id="about"
      className="relative bg-[var(--color-charcoal)] px-5 pt-24 pb-16 sm:px-10 sm:pt-32 sm:pb-20"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="font-body text-[10px] uppercase tracking-[0.45em] text-white/40">
            / TSW Fitness /
          </span>
          <h2 className="font-display uppercase leading-[0.9] tracking-tight text-white text-[12vw] sm:text-[6.5vw] lg:text-[5vw]">
            A Complete Experience
          </h2>
        </div>

        {/* Small experience cards like Buckler's 'Complete Experience' row */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mx-auto lg:max-w-4xl">
          {EXPERIENCES.map((e) => (
            <article
              key={e.title}
              className="group relative flex items-stretch gap-4 overflow-hidden rounded-xl bg-[var(--color-charcoal-soft)] p-3 transition-colors hover:bg-[#1c1c1c]"
            >
              <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-lg sm:h-28 sm:w-32">
                <Image
                  src={e.image}
                  alt={e.title}
                  fill
                  sizes="128px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center pr-2">
                <span className="font-body text-[10px] uppercase tracking-[0.35em] text-[var(--color-gold)]">
                  {e.tag}
                </span>
                <h3 className="mt-1 font-display text-xl uppercase leading-tight text-white sm:text-2xl">
                  {e.title}
                </h3>
                <p className="mt-1 font-body text-xs leading-relaxed text-white/55">
                  {e.copy}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* decorative faint progress dots */}
        <div className="mt-10 flex items-center justify-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="h-1.5 w-8 rounded-full bg-white/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        </div>
      </div>
    </section>
  );
}
