import Image from "next/image";
import SplitReveal from "./SplitReveal";
import RandomReveal from "./RandomReveal";

// Gallery strip for rows 4-5. Explicit col-start strings so Tailwind's JIT
// compiler keeps them in the stylesheet (template-literal class names get
// tree-shaken away).
const GALLERY = [
  { src: "/images/img1.png", alt: "Studio detail 1", colStart: "md:col-start-1" },
  { src: "/images/img2.png", alt: "Studio detail 2", colStart: "md:col-start-2" },
  { src: "/images/img3.png", alt: "Studio detail 3", colStart: "md:col-start-3" },
  { src: "/images/img4.png", alt: "Studio detail 4", colStart: "md:col-start-4" },
  { src: "/images/img5.png", alt: "Studio detail 5", colStart: "md:col-start-5" },
];

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
      className="relative bg-black px-5 pt-12 pb-16 sm:px-10 sm:pb-20"
    >
      <div className="w-full">
        <div className="flex flex-col items-center gap-4">
          <span className="font-body text-[10px] uppercase tracking-[0.45em] text-white/40">
            / TSW Fitness /
          </span>
          <h1 className="mt-6 w-full font-display uppercase tracking-tight text-white text-7xl md:text-8xl lg:text-[13vw]">
            <span className="block flex items-center">
              <SplitReveal
                delay={0}
                mode="chars"
                triggerOnScroll
                config={{ chars: { duration: 0.8, stagger: 0.03 } }}
              >
                Membership
              </SplitReveal>
            </span>
            <div className="flex flex-col md:flex-row md:gap-6 md:items-center md:justify-end">
              <span className="block md:text-end flex flex-row justify-between md:justify-end leading-[1] -mt-1 md:-mt-4 text-[var(--color-gold)]">
              <span><SplitReveal
                delay={0.2}
                mode="chars"
                triggerOnScroll
                config={{ chars: { duration: 0.8, stagger: 0.03 } }}
              >
                With{" "}
              </SplitReveal></span>
              <SplitReveal
                delay={0.2}
                mode="chars"
                triggerOnScroll
                config={{ chars: { duration: 0.8, stagger: 0.03 } }}
              >
                <Image
                  src="/logo.png"
                  alt="TSW"
                  width={200}
                  height={200}
                  className="inline-block h-[0.8em] w-auto align-[-0.05em]"
                />{" "}
                </SplitReveal>
                <SplitReveal
                  delay={0.2}
                  mode="chars"
                  triggerOnScroll
                  config={{ chars: { duration: 0.8, stagger: 0.03 } }}
                >
                  BEST
                </SplitReveal>
            </span>
            <span className="text-end justify-end leading-[1] -mt-1 md:-mt-4 text-[var(--color-gold)]">
              <SplitReveal
                delay={0.2}
                mode="chars"
                triggerOnScroll
                config={{ chars: { duration: 0.8, stagger: 0.03 } }}
              >
                BENEFITS
              </SplitReveal>
            </span>
            </div>
          </h1>
        </div>

        {/* 5-col feature grid: two videos + two circle callouts.
            Cell heights are locked via aspect-ratios so row 1 lines up:
            - col-span-2 video tiles use aspect-[2/1] (width = 2u, height = 1u)
            - col-span-1 circle tile uses aspect-square (width = 1u, height = 1u)
            On mobile everything stacks full-width. */}
        <div className="mt-12 grid grid-cols-2 gap-0 md:mt-16 md:grid-cols-5 md:gap-0">
          {/* Row 1, col 3 - Unparalleled Personal Training circle.
              Sits before the video in source order so on mobile (single
              column, source order) the circle stacks above the video.
              On desktop the explicit md:col-start/md:row-start places it
              regardless of source order. */}
          <CircleCallout
            label={
              <>
                Unparalleled{" "}
                <br />
                Personal Training
              </>
            }
            className="col-span-2 md:col-span-1 md:row-start-1 md:col-start-3"
          />

          {/* Rows 1-2, cols 1-2 - Personal trainer video (square, 2x2) */}
          <VideoTile
            src="/video/personal_trainer.mp4"
            className="col-span-2 md:col-span-2 md:row-span-2 md:row-start-1 md:col-start-1 md:aspect-square"
          />

          {/* Row 2, col 5 - Unrivaled Group Fitness Classes circle.
              Same trick: rendered before its paired video so the mobile
              stack reads circle-then-video. */}
          <CircleCallout2
            label={
              <>
                Unrivaled Group
                <br />
                {" "}Fitness Classes
              </>
            }
            className="col-span-2 md:col-span-1 md:row-start-2 md:col-start-5"
          />

          {/* Row 1, cols 4-5 - Group classes video */}
          <VideoTile
            src="/video/group_classes.mp4"
            className="col-span-2 md:col-span-2 md:row-start-1 md:col-start-4 aspect-[1] md:aspect-[2/1]"
          />

          {/* Row 3, col 3 - Studio & Gym Amenities circle */}
          <CircleCallout
            label={
              <>
                Studio &amp; Gym
                <br />
                Amenities
              </>
            }
            className="col-span-2 md:col-span-1 md:row-start-3 md:col-start-2"
          />

          {/* Rows 4-5 - Gallery strip: 5 portrait tiles, one per column,
              each spanning both rows. aspect-[1/2] at 1-col width gives
              height = 2u, matching two stacked row-heights. */}
          {GALLERY.map((tile) => (
            <GalleryTile
              key={tile.src}
              src={tile.src}
              alt={tile.alt}
              className={`md:col-span-1 md:row-span-2 md:row-start-4 ${tile.colStart}`}
            />
          ))}

          {/* Mobile-only 6th tile so the 2-col mobile grid lays out evenly
              (3 rows of 2). Hidden on desktop where the gallery is 5 cols. */}
          <GalleryTile
            src="/images/img6.png"
            alt="Studio detail 6"
            className="md:hidden"
          />
        </div>
      </div>
    </section>
  );
}

function GalleryTile({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative aspect-[1/2] overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 20vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}

function VideoTile({ src, className = "" }: { src: string; className?: string }) {
  return (
    <div className={`relative aspect-video overflow-hidden ${className}`}>
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

function CircleCallout({
  label,
  className = "",
}: {
  label: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative aspect-square bg-white/10 ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black">
        <span className="px-6 text-center font-display text-2xl uppercase tracking-[0.25em] leading-[1] text-white text-4xl md:text-4xl max-w-xs">
          <RandomReveal amount={1} duration={0.1} delay={0.3}>
            {label}
          </RandomReveal>
        </span>
      </div>
    </div>
  );
}

function CircleCallout2({
  label,
  className = "",
}: {
  label: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative aspect-square bg-white/10 ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center rounded-[500%] bg-black ">
        <span className="px-6 text-center font-display text-2xl uppercase tracking-[0.25em] leading-[1] text-white text-4xl md:text-4xl max-w-xs">
          <RandomReveal amount={1} duration={0.1} delay={0.3}>
            {label}
          </RandomReveal>
        </span>
      </div>
    </div>
  );
}
