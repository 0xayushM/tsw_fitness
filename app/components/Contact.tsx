"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

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

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const form = event.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    const clientVisitor =
      typeof window !== "undefined"
        ? {
            href: window.location.href,
            path: window.location.pathname,
            referrer: document.referrer || "",
            language: navigator.language ?? "",
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? "",
            viewport_w: String(window.innerWidth),
            viewport_h: String(window.innerHeight),
          }
        : {};

    setSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_name: "contact",
          data: {
            name,
            email,
            phone,
            message,
            ...clientVisitor,
          },
        }),
      });

      const raw = await res.text();
      let body: unknown;
      try {
        body = raw ? JSON.parse(raw) : {};
      } catch {
        body = {};
      }

      if (!res.ok) {
        const detail =
          body &&
          typeof body === "object" &&
          "error" in body &&
          typeof (body as { error: unknown }).error === "string"
            ? (body as { error: string }).error
            : `Something went wrong (${res.status}).`;
        setError(detail);
        return;
      }

      form.reset();
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[var(--color-charcoal)] px-5 pt-20 pb-16 sm:px-10 sm:pt-28 sm:pb-20"
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

      <div className="relative mx-auto max-w-[1600px]">
        {/* Two-col: heading/info left, form right */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: heading + copy + contact info */}
          <div>
            <span className="font-body text-[10px] uppercase tracking-[0.45em] text-white/50">
              / Get in touch /
            </span>
            <h2 className="mt-4 font-display uppercase leading-[0.9] tracking-tight text-white text-[13vw] sm:text-[8vw] lg:text-[6vw]">
              Questions?
              <span className="block text-brand-gold">Let&apos;s talk.</span>
            </h2>
            <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-white/70 sm:text-base">
              Drop us a line. A coach gets back to every enquiry within
              24&nbsp;hours - tours, membership, programming, whatever you need.
            </p>

            <div className="mt-10 flex flex-col gap-4 font-body text-[11px] uppercase tracking-[0.35em] text-white/55 sm:text-xs">
              <span>
                <span className="text-white/40">Reception · </span>
                <a
                  href="tel:+918448939595"
                  className="text-white transition-colors hover:text-brand-gold"
                >
                  +91 84489 39595
                </a>
              </span>
              <span>
                <span className="text-white/40">Email · </span>
                <a
                  href="mailto:customercare@tswfitness.com"
                  className="text-white transition-colors hover:text-brand-gold"
                >
                  customercare@tswfitness.com
                </a>
              </span>
              <span>
                <span className="text-white/40">Location · </span>
                <a
                  href="https://share.google/zR71KTt6x9wxJ1jkE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white transition-colors hover:text-brand-gold"
                >
                  Open in Google Maps ↗
                </a>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-white/40">Instagram · </span>
                <a
                  href="https://www.instagram.com/tswfitness_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-white transition-colors hover:text-brand-gold"
                >
                  <InstagramIcon className="h-3.5 w-3.5" />
                  @tswfitness_
                </a>
              </span>
            </div>
          </div>

          {/* Right: form or success panel */}
          <div className="relative">
            {submitted ? (
              <div className="rounded-2xl border border-white/15 bg-white/4 p-8 backdrop-blur-sm">
                <span className="font-body text-[10px] uppercase tracking-[0.4em] text-brand-gold">
                  / Received /
                </span>
                <h3 className="mt-4 font-display text-4xl uppercase leading-tight tracking-tight text-white sm:text-5xl">
                  Thanks - we&apos;ll be in touch.
                </h3>
                <p className="mt-4 font-body text-sm leading-relaxed text-white/65">
                  A coach will reach out within 24 hours. In the meantime, feel
                  free to explore our memberships above.
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
              <form
                name="contact"
                onSubmit={handleSubmit}
                className="flex flex-col gap-7"
              >
                <Field label="Your name" name="name" type="text" />
                <Field label="Email" name="email" type="email" />
                <Field
                  label="Phone (optional)"
                  name="phone"
                  type="tel"
                  required={false}
                />
                <Field
                  label="Tell us what you&apos;re after"
                  name="message"
                  type="textarea"
                />

                {error ? (
                  <p
                    className="font-body text-sm text-red-300/90"
                    role="alert"
                  >
                    {error}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 inline-flex w-fit items-center gap-3 rounded-full bg-brand-gold px-6 py-3 font-body text-[11px] uppercase tracking-[0.35em] text-white transition-transform enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? "Sending…" : "Send message"}
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 rounded-full bg-white"
                  />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Location block - compact square map beside address info */}
        <div className="mt-14 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
          {/* Square map - fixed size so GSAP measures a stable height */}
          <div
            className="shrink-0 overflow-hidden rounded-2xl border border-white/10"
            style={{ width: 280, height: 280 }}
          >
            <iframe
              src="https://maps.google.com/maps?q=TSW+Fitness+Shubham+Enclave+Paschim+Vihar+Delhi&output=embed&z=16"
              width="280"
              height="280"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="eager"
              referrerPolicy="no-referrer-when-downgrade"
              title="TSW Fitness Location - Paschim Vihar, New Delhi"
            />
          </div>

          {/* Address info */}
          <div className="flex flex-col justify-center gap-4 py-1">
            <span className="font-body text-[10px] uppercase tracking-[0.4em] text-white/40">
              Our Location
            </span>
            <p className="font-body text-sm leading-relaxed text-white/70">
              TSW Fitness<br />
              4th/5th Floor, A-1 Shubham Enclave<br />
              Paschim Vihar, New Delhi
            </p>
            <a
              href="https://share.google/zR71KTt6x9wxJ1jkE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-body text-[10px] uppercase tracking-[0.3em] text-white/70 transition-colors hover:border-brand-gold hover:text-brand-gold"
            >
              Open in Google Maps ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

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
    "w-full bg-transparent border-b border-white/20 pb-3 pt-1 font-body text-base text-white placeholder:text-white/25 transition-colors focus:border-brand-gold focus:outline-none";

  return (
    <label className="flex flex-col gap-2">
      <span className="font-body text-[10px] uppercase tracking-[0.35em] text-white/45">
        {label}
        {required && <span className="text-brand-gold"> *</span>}
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
