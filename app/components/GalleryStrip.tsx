"use client";

const ROW1 = [
  "/gallery/optimized/IMG_4130.mp4",
  "/gallery/optimized/IMG_4339.mp4",
  "/gallery/optimized/IMG_4340.mp4",
  "/gallery/optimized/IMG_4397.mp4",
  "/gallery/optimized/IMG_4435.mp4",
  "/gallery/optimized/IMG_4436.mp4",
];

const ROW2 = [
  "/gallery/optimized/IMG_4437.mp4",
  "/gallery/optimized/IMG_4438.mp4",
  "/gallery/optimized/IMG_4459.mp4",
  "/gallery/optimized/IMG_4460.mp4",
  "/gallery/optimized/IMG_4462.mp4",
  "/gallery/optimized/IMG_4533.mp4",
];

function VideoCard({ src }: { src: string }) {
  return (
    <div className="relative h-72 w-44 shrink-0 overflow-hidden rounded-2xl sm:h-80 sm:w-52 lg:h-96 lg:w-60">
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

function MarqueeRow({ clips, reverse }: { clips: string[]; reverse?: boolean }) {
  const doubled = [...clips, ...clips];
  return (
    /* overflow-hidden here clips horizontal scroll; NOT on the section so GSAP
       can measure scroll height without interference from horizontal overflow */
    <div className="overflow-hidden">
      <div
        className={`marquee-gpu flex gap-4 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ width: "max-content" }}
      >
        {doubled.map((src, i) => (
          <VideoCard src={src} key={i} />
        ))}
      </div>
    </div>
  );
}

export default function GalleryStrip() {
  return (
    <section
      id="gallery"
      className="relative overflow-hidden pt-16 pb-0 sm:pt-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_50%_0%,rgba(237,93,38,0.10),transparent_60%)]"
      />

      {/* Section header */}
      <div className="relative mx-auto mb-12 max-w-[1600px] px-5 sm:px-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="font-body text-[10px] uppercase tracking-[0.45em] text-white/40">
            / Inside TSW /
          </span>
          <h2 className="font-display text-[13vw] uppercase tracking-tight text-white sm:text-[7vw] lg:text-[5.5vw]">
            Coached Every{" "}
            <span className="text-brand-gold">Rep. Every Set.</span>
          </h2>
          <p className="max-w-sm font-body text-sm leading-relaxed text-white/50">
            Every session you see is led by a TSW trainer — programmed,
            supervised, and pushed until the work is done right.
          </p>
        </div>
      </div>

      {/* Two-row marquee */}
      <div className="flex flex-col gap-4 pb-16">
        <MarqueeRow clips={ROW1} />
        <MarqueeRow clips={ROW2} reverse />
      </div>

      {/* Bottom fade into next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-charcoal to-transparent"
      />
    </section>
  );
}
