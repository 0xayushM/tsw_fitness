# TSW Fitness — Media generation prompts

Paste these into your image/video generator (Midjourney, DALL·E, Ideogram, Flux, Sora, Runway, Kling, etc.).
Each prompt maps to a `<MediaSlot id="…">` in `app/challenge/page.tsx`. Aspect ratios match the slots.

> ⚠️ **Read first — honesty + ad rules.** The before/after photos (`transform-*`) and the video
> testimonials (`vid-testimonial-*`) are **results claims**. Don't generate fake transformations or
> fake testimonials — that's deceptive advertising and the page literally says "photos used with
> permission." Use **real members**. For those slots I've given you *photo/video direction* (how to
> shoot them) instead of an AI prompt. Use AI generation freely for the ambience/brand shots
> (hero background, pillars, pain, coaches as a fallback, founder if needed).

---

## 0. Shared style spec (prepend or keep consistent across all AI prompts)

```
Style: cinematic editorial fitness photography, premium gym brand. Moody low-key lighting,
deep near-black background (#0a0a0a), warm orange rim light and accents (#ED5D26).
High contrast, shallow depth of field, 35mm look, fine film grain, crisp detail.
Real, relatable people (late 20s–40s, Indian / South-Asian, natural bodies — not glossy
fitness models). Authentic gym in an Indian metro (Delhi). No text, no logos, no watermarks.
```

```
Negative / avoid: cartoon, illustration, 3d render, plastic skin, over-smoothed, distorted hands,
extra limbs, text, watermark, logo, stock-photo cheesiness, bright flat lighting, neon gym cliché.
```

Tips: Midjourney → add `--ar 16:9 --style raw --v 6`. Flux/Ideogram → state the aspect ratio in words.
Shoot/generate everything in the **same lighting and color grade** so the page feels like one set.

---

## 1. Hero — Priority 1

### `hero-vsl` — the sales video (16:9 source, shown in a 4:5 frame)
This is the single most important asset. It should be a **real talking-head video**, not AI. Script direction:

```
90–120s. Founder or head coach, framed chest-up, standing on the TSW floor (slightly blurred
gym behind). Warm key light, dark background. Talks straight to camera, conversational:
1) Call out the viewer: "If you've started and quit before, this is for you."
2) The problem: most gyms hand you a machine and leave you alone.
3) The fix: the 3 pillars — training, nutrition, weekly 1:1 coaching.
4) The guarantee: do the work or get ₹3,000 back.
5) Scarcity + CTA: only 15 spots, batch starts [date], apply below.
Burn in subtitles (most people watch muted). Vertical-safe framing (keep subject centered).
Export 1920×1080 H.264 MP4.
```
B-roll to cut in (these CAN be AI-generated or filmed): coach correcting form, someone mid-set,
a check-in conversation, a plan on a clipboard/phone.

### `heroi.mp4` — ambient hero background (already in `public/video/`)
If replacing with real TSW footage:
```
Slow, moody b-roll of the TSW training floor — racks, dumbbells, a few people training,
soft orange practical lights, lots of shadow. Low motion, loopable, 8–12s, no faces in focus.
1920×1080. It sits at ~14% opacity behind the hero, so darker and simpler is better.
```

---

## 2. Transformations — Priority 2  ·  USE REAL MEMBERS (photo direction)

Slots: `transform-1-before`/`-after` … `transform-4-before`/`-after` (3:4 portraits, shown as a pair).

Do **not** AI-generate these. Shoot each member twice — Day 1 and Day 42 — identically:
```
Same spot, same phone/camera height (chest level), same distance, same plain wall,
same daylight or same gym light, same clothing style (fitted top, shorts), same neutral pose
(relaxed, arms slightly away from body, front-on). No flexing in one and not the other.
Portrait 3:4, 900×1200. Get a signed photo-release from every member.
```
Then update the names / kg-lost / one-line stories in the `DATA` array inside
`app/components/HorizontalTransforms.tsx` to match the real people.

---

## 3. Pain section — Priority 3

### `pain-1` — relatable struggle moment (4:5, 1000×1250)
```
[shared style] A real-looking person in their 30s sitting on a gym bench between sets, slightly
tired and frustrated, looking down, towel in hand. Moody side light, deep shadows, orange rim
on one shoulder. Honest and human — not posed, not glamorous. Portrait 4:5.
```

---

## 4. Three pillars — Priority 3 (each 4:3, 1200×900)

### `pillar-training`
```
[shared style] A coach guiding a member through a barbell or dumbbell lift, hands-on cue,
focused expression, chalk and steel, dramatic orange rim light. Landscape 4:3.
```

### `pillar-nutrition`
```
[shared style] Close, appetizing flat-lay-ish but lifestyle shot of simple healthy Indian meal-prep
— grilled protein, dal, veg, rice in containers, a notebook with a plan beside it. Warm light,
dark surface, shallow depth of field. Landscape 4:3.
```

### `pillar-accountability`
```
[shared style] A 1:1 check-in: coach and member sitting together looking at a phone/tablet with
progress numbers, both engaged, slight smile. Dark gym background, warm light. Landscape 4:3.
```

---

## 5. Coaches — Priority 3 (each 3:4, 900×1200)

Best as real photos of your actual coaches. If you need AI placeholders meanwhile:

### `coach-1` (Head Coach · strength)
```
[shared style] Confident strength coach standing on the gym floor, arms crossed, calm authority,
mid-30s, fitted dark TSW-style tee, racks blurred behind, orange rim light. Portrait 3:4.
```
### `coach-2` (Nutrition Coach)  → same framing, warmer/approachable expression, holding a clipboard.
### `coach-3` (Fat-loss / conditioning Coach) → same framing, athletic, mid-action calm, slight sweat.
### `coach-4` (Accountability Lead) → same framing, friendly, mid-conversation gesture.
> Keep all four on the **same background, same light, same crop** so the grid looks cohesive.
> Then replace the placeholder role text with real names + certifications in section 11 of the page.

---

## 6. Founder — Priority 3

### `founder` (4:5, 1000×1250)
Real photo strongly preferred. AI fallback:
```
[shared style] Warm, credible founder portrait, mid-30s–40s, standing on the TSW floor or leaning
on a rack, genuine half-smile, looking to camera. Approachable but serious about the work.
Deep background, soft orange key light. Portrait 4:5.
```
Then add the real name/title (and a signature PNG if you have one) in section 12.

---

## 7. Video testimonials — Priority 2  ·  USE REAL MEMBERS (video direction)

Slots: `vid-testimonial-1…4` (shown ~4:3 in an auto-scrolling row).

Real clips only. Direction:
```
20–40s, filmed on a phone, selfie or tripod, member talking naturally about their result —
what was hard before, what changed, how the coaching/accountability helped. Good daylight or
gym light, clear audio, burn in subtitles. Keep the subject centered (the card crops to ~4:3).
Get a release. Update names/quotes/stats in the testimonials array (section 9) to match.
```
No real clips yet? Use a static member photo (3:4, real, with permission) in the slot for now and
add video later — don't fabricate a testimonial.

---

## 8. After you generate

1. Create `public/images/challenge/` and drop the files in (e.g. `pain-1.jpg`, `pillar-training.jpg`).
2. In `app/challenge/page.tsx`, replace each `<MediaSlot id="…">` with a real `<Image>` /
   `<video>` (snippet is in `MEDIA-NEEDED.md`).
3. Keep the same crop/aspect the slot used so the layout doesn't shift.
4. Update the placeholder names/stats/quotes to the real people.

Ask me and I can wire any specific asset into the page once you've generated it.
