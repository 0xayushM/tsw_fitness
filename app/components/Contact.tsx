"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

/**
 * Contact section with `contact.png` as a full-bleed background.
 *
 * - Form is client-side only: no backend wired up. On submit we swap the
 *   form for a simple "thanks, we'll be in touch" panel. Easy to later
 *   point `onSubmit` at an API route without changing the markup.
 * - Styling intentionally mirrors the rest of the site: charcoal scrim,
 *   gold label tags, orange primary button, monospace-style label text.
 */
export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[var(--color-charcoal)] px-5 pt-20 pb-24 sm:px-10 sm:pt-28 sm:pb-32"
    >
      {/* Background image + scrim */}
      <Image
        src="/images/contact.png"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="pointer-events-none absolute inset-0 object-cover"
      />

      <div className="relative mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left: heading + copy */}
        <div>
          <span className="font-body text-[10px] uppercase tracking-[0.45em] text-white/50">
            / Get in touch /
          </span>
          <h2 className="mt-4 font-display uppercase leading-[0.9] tracking-tight text-white text-[13vw] sm:text-[8vw] lg:text-[6vw]">
            Questions?
            <span className="block text-[var(--color-gold)]">Let&apos;s talk.</span>
          </h2>
          <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-white/70 sm:text-base">
            Drop us a line. A coach gets back to every enquiry within
            24&nbsp;hours — tours, membership, programming, whatever you need.
          </p>

          <div className="mt-10 flex flex-col gap-4 font-body text-[11px] uppercase tracking-[0.35em] text-white/55 sm:text-xs">
            <span>
              <span className="text-white/40">Email · </span>
              <a
                href="mailto:hello@tswfitness.com"
                className="text-white transition-colors hover:text-[var(--color-gold)]"
              >
                hello@tswfitness.com
              </a>
            </span>
            <span>
              <span className="text-white/40">Phone · </span>
              <a
                href="tel:+918000000000"
                className="text-white transition-colors hover:text-[var(--color-gold)]"
              >
                +91 80 0000 0000
              </a>
            </span>
          </div>
        </div>

        {/* Right: form or success panel */}
        <div className="relative">
          {submitted ? (
            <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-8 backdrop-blur-sm">
              <span className="font-body text-[10px] uppercase tracking-[0.4em] text-[var(--color-gold)]">
                / Received /
              </span>
              <h3 className="mt-4 font-display text-4xl uppercase leading-tight tracking-tight text-white sm:text-5xl">
                Thanks — we&apos;ll be in touch.
              </h3>
              <p className="mt-4 font-body text-sm leading-relaxed text-white/65">
                A coach will reach out within 24 hours. In the meantime, feel
                free to{" "}
                <a
                  href="#clubs"
                  className="text-[var(--color-gold)] underline decoration-dotted underline-offset-4"
                >
                  explore our clubs
                </a>
                .
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/20 px-5 py-3 font-body text-[10px] uppercase tracking-[0.35em] text-white/70 transition-colors hover:border-white hover:text-white"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
              <Field label="Your name" name="name" type="text" />
              <Field label="Email" name="email" type="email" />
              <Field
                label="Phone (optional)"
                name="phone"
                type="tel"
                required={false}
              />
              <Field
                label="Tell us what you're after"
                name="message"
                type="textarea"
              />

              <button
                type="submit"
                className="mt-2 inline-flex w-fit items-center gap-3 rounded-full bg-[var(--color-gold)] px-6 py-3 font-body text-[11px] uppercase tracking-[0.35em] text-white transition-transform hover:-translate-y-0.5"
              >
                Send message
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full bg-white"
                />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * Minimalist underlined input — works for both `<input>` and `<textarea>`
 * via `type="textarea"`. The tiny label sits above, the line turns orange
 * on focus.
 */
function Field({
  label,
  name,
  type,
  required = true,
}: {
  label: string;
  name: string;
  type: "text" | "email" | "tel" | "textarea";
  required?: boolean;
}) {
  const inputClasses =
    "w-full bg-transparent border-b border-white/20 pb-3 pt-1 font-body text-base text-white placeholder:text-white/25 transition-colors focus:border-[var(--color-gold)] focus:outline-none";

  return (
    <label className="flex flex-col gap-2">
      <span className="font-body text-[10px] uppercase tracking-[0.35em] text-white/45">
        {label}
        {required && <span className="text-[var(--color-gold)]"> *</span>}
      </span>
      {type === "textarea" ? (
        <textarea
          name={name}
          required={required}
          rows={3}
          className={`${inputClasses} resize-none`}
        />
      ) : (
        <input name={name} type={type} required={required} className={inputClasses} />
      )}
    </label>
  );
}
