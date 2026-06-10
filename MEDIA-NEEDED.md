# Media needed — `/challenge` (6-Week Transformation Challenge)

Every visual on the page is a labelled `<MediaSlot/>` placeholder right now. Generate or shoot
each asset below, drop it in `public/images/challenge/` (create the folder), then replace the
matching `<MediaSlot id="…">` in `app/challenge/page.tsx` with a real `<Image>` or `<video>`.

The `id` on each MediaSlot matches the **Slot ID** column, so search the file for the id to find
exactly where it goes.

## How to swap a slot in
```tsx
// before
<MediaSlot id="pain-1" ratio="4/5" label="…" />

// after (image)
<div className="relative overflow-hidden rounded-3xl" style={{ aspectRatio: "4/5" }}>
  <Image src="/images/challenge/pain-1.jpg" alt="…" fill sizes="(max-width:1024px)100vw,50vw" className="object-cover" />
</div>
```
For video slots, use a muted autoplay `<video>` (mp4/webm) or an embed.

---

## Priority 1 — above the fold (most important)

| Slot ID | Type | Where | What to show | Recommended size |
|---|---|---|---|---|
| `hero-vsl` | **Video** | Hero, Step 1 | 90–120s sales video: founder/head coach explains the Challenge, the 3 pillars (training, nutrition, accountability) and the money-back guarantee. The single most important asset. | 1920×1080 (16:9), MP4 H.264 |
| (bg) `heroi.mp4` | Video | Hero background | Already in `public/video/` — ambient dimmed gym footage. Replace with TSW floor footage if you have it. | 1920×1080 loop |

## Priority 2 — proof & transformations

| Slot ID | Type | What to show | Size |
|---|---|---|---|
| `transform-1-before` / `-after` | Image ×2 | Priya S. — Day 1 vs Day 42, same pose & lighting | 900×1200 (3:4) each |
| `transform-2-before` / `-after` | Image ×2 | Rahul M. before/after | 900×1200 each |
| `transform-3-before` / `-after` | Image ×2 | Anjali K. before/after | 900×1200 each |
| `transform-4-before` / `-after` | Image ×2 | Vikram T. before/after | 900×1200 each |
| `vid-testimonial-1..4` | **Video** ×4 | 20–40s selfie-style member testimonial clips | 1080×1440 (3:4) vertical |

> Names/stats in the carousel and testimonials are placeholders — swap them for real members
> in `app/challenge/page.tsx` (`TRANSFORMS` array and the testimonial array in section 9).

## Priority 3 — supporting visuals

| Slot ID | Type | What to show | Size |
|---|---|---|---|
| `pain-1` | Image | Relatable member mid-session, focused, real (not a glossy model), moody lighting | 1000×1250 (4:5) |
| `pillar-training` | Image | Coaching / strength training in action | 1200×900 (4:3) |
| `pillar-nutrition` | Image | Meal prep / healthy food / nutrition coaching | 1200×900 |
| `pillar-accountability` | Image | Trainer 1:1 check-in / small group | 1200×900 |
| `coach-1..4` | Image ×4 | Coach portraits on the training floor, TSW branding visible | 900×1200 (3:4) |
| `founder` | Image | Founder/head coach portrait — warm, credible | 1000×1250 (4:5) |

> The guarantee section is now a self-contained graphic (rotating seal + 3-step process) and needs **no image**.

---

## Text to replace alongside the media
- **Carousel** (`TRANSFORMS` array): real names, kg lost, and one-line stories.
- **Video testimonials** (section 9 array): real names, quotes, stat lines.
- **Coaches** (section 11 array): real names, certifications, one-line bios.
- **Founder** (section 12): real name, title, and a signature image if you have one.
- **Rating** ("4.9 · 200+ reviews"): update to your real numbers, or remove if you don't want it.

## Notes
- Brand colour is `--color-gold` = `#ED5D26` (orange). Keep accents consistent.
- Keep before/after pairs in identical pose, framing and lighting — it reads as more honest and converts better.
- Always keep the results disclaimer under the carousel.
