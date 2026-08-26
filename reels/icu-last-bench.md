# ICU Decoded — "Last Bench" reel

**28.0s · 1080×1920 · 30fps · Hinglish VO / English on-screen text · hard loop**

The timeline is built. `project.json` is gitignored (it's runtime user data), so the
cut is versioned here as **`reels/icu-last-bench.project.json`**. To load it:

```
cp reels/icu-last-bench.project.json project.json
node server.js          # → http://localhost:7777
```

Then drop the files listed under **What to record** into `media/` and it plays.

> **The reference video was not analysed.** The Google Drive link is blocked by
> this workspace's egress policy (`drive.google.com` → 403 at the proxy), so the
> cut below is built from the script alone, not from the footage. Every timing is
> a starting grid — nudge clip edges to the VO once your real recording is in.

---

## If you don't want to touch code

A rendered video ships with this cut: **`reels/icu-last-bench.mp4`** — 1080x1920,
28.0s, every caption and all four analytics screens burned in, exactly as the timeline
plays them. It has **no sound**, and no footage behind the text (there was none to use).

That is deliberate, and it is the whole non-coder path:

1. Open the MP4 in **CapCut** (or Instagram's own reel editor). Drop it on the timeline.
2. **Record the Hinglish VO straight onto it.** You do not need the script in front of
   you — every English caption appears on screen at the exact moment you should say its
   Hinglish line. The video *is* the teleprompter. Read along, in your own voice, flat
   and tired, and you are in sync by construction.
3. Add a music bed from CapCut's licensed library. Bring it up hard at **0:10** — that
   is where the screen wakes and the countries start landing.
4. Optional: drop your own clips *underneath* the video track at low opacity if you
   shot any. The reel is designed to hold without them.
5. Export and post.

Everything below is for rebuilding or re-timing the cut in FableCut. If step 1-5 got you
a reel you like, you can stop reading here.

---

## The rule that still holds

**Audio = Hinglish. On-screen text = English.** Unchanged, and it's the single
best decision in the original brief. The US is the #1 country (954) and most of
those people watch muted. Hinglish audio carries India; English text carries
everyone else. Every caption in `project.json` is English.

---

## What was missing — and what replaced it

### 1. Frame 1 gave nobody a reason to stay
The original opens on a black screen, no music, no on-screen text, a flat voice
speaking Hinglish. Judged against your own hook rubric (`app/agents/analysts.py`
in viral-research-agent) that scores `on_screen_hook: none read` and
`curiosity_gap: none`. Muted viewers — the majority — see literally nothing.

**Now:** the reel cold-opens on the payoff. The analytics panel, 2,217 readers,
7 countries, and one English line across the bottom:

> **Nobody read a word I wrote.**

The text contradicts the numbers on screen. That contradiction *is* the curiosity
gap, and it's readable with the sound off. The black screen and the flat
"Main last bench wala tha." now arrive at **1.1s**, where they land as a pattern
interrupt instead of a scroll trigger.

### 2. The 7–10s silence was a hole, not a device
Holding a beat inside "Hafton tak… koi nahi padhta tha" is the right instinct —
but silence only stops a scroll when the *picture* is still moving. Three seconds
of static frame sits exactly where Instagram measures first drop-off.

**Now:** the audio pause is kept exactly as written. The frame is filled with the
**zero screen** — the same analytics panel, reading `0`, with a **WEEK 1 → WEEK 6**
counter ticking underneath and seven empty rows. The number never moves; the weeks
do. Motion without progress is what holds the scroll here — and it sets up the
payoff, because at 11.6s the viewer recognises the same screen filling in.

### 3. The numbers were the weakest visual and the longest section
Seven seconds of screen recording. Low contrast, hard to read on a phone,
illegible once someone re-shares it compressed.

**Now:** purpose-built animated panel (`library/svg/icu-analytics-reveal.svg`).
One country lands per **0.85s** beat, its bar grows, and the running total
re-totals on every row: `0 → 954 → 1,818 → 1,966 → 2,080 → 2,129 → 2,177 → 2,217`.
It is now the most watchable stretch of the reel and doubles as the receipt.

### 4. There was no comment trigger inside the video
Comments are the strongest reach signal on Reels, and the ask ("Country drop kar")
lived only in the caption, where a fraction of viewers read it.

**Now:** **"Which one are you? 👇"** on screen at **17.0s** — while the viewer is
staring at a list of seven countries. That's the highest-intent placement for that
question anywhere in the video. It stays in the caption too.

### 5. There was no loop
The original ends on black. Replays count as watch time, and a 28s reel that loops
cleanly gets them for free.

**Now:** the closing line holds clean on black for 0.85s — long enough to read and
screenshot — then the analytics panel rises back up **crisp** behind it (to 90%) while
the text fades to 12%. The last frame is the first frame. The viewer lands back on the
numbers and the restart reads as intentional.

### 6. Saying the domain out loud is a reach tax
"icudecodedd dot com" spoken over the last 3 seconds is an explicit off-platform
push at the exact moment the algorithm decides whether to keep serving the reel —
and it makes the emotional close land on an ad.

**Now:** the domain is on screen for ~11.5s, but as the **header of the analytics
panel** — the property being measured, not a plug. It reads as credibility instead
of a CTA. The spoken close stays purely emotional; the link stays in caption and bio.

### 7. 30s was long, and the captions were too sparse
Completion rate drives distribution, and the original ran two caption blocks of 3s
and 7s — long stretches with no on-screen change.

**Now:** **28.0s**, every dead beat removed, and **15 caption cuts** instead of 10.
Each cut is a micro-reset of attention.

### Also added: the grade and the mix now carry the emotion
- **Backbench section** — `faded`, saturation 55, temperature −25. Drained, like a memory.
- **Norway line** — footage opens at brightness 26 and lifts to 68 over 0.32s, so the
  frame *dips to near-black* as the whisper starts.
- **Payoff** — the only warm, saturated, bright moment in the reel.
- **Music** is keyframed, not flat: 0.14 under the intro, swelling to 0.46 across the
  silence, slamming to **0.88** on the drop at 10.2s, ducking to **0.26** for the nurse
  line so the whisper actually reads as one, then out to 0.10 for the loop.

### What was deliberately left alone
The spine of the script is strong and it wasn't touched: specific numbers, a real
third party doing the validating (the nurse), the dismissiveness of "Karne do", and
a closing aphorism that people can quote without context. Keeping medical terms in
English is right. The delivery notes — flat, tired, phone mic, no performance — are
right, and they matter more than anything in this document.

> One honest flag: the panel presents 954 / 864 / 148 / 114 / 49 / 48 / 40 as real
> analytics. If those are your real numbers, this is your strongest asset. If they
> were illustrative, change them to the real ones before posting — a receipt that
> doesn't survive a DM asking "which tool?" costs more than it earns.

---

## The cut, beat by beat

| Time | On screen | VO (Hinglish) | Caption (English) |
|---|---|---|---|
| 0.00–1.10 | **Analytics, settled** · 2,217 · 7 countries | *(silence)* | Nobody read a<br>word I wrote. |
| 1.10–2.60 | black | "Main last bench wala tha." | I was the last-bench guy. |
| 2.60–3.75 | classroom, drained | "Kisi ne kabhi meri baat nahi puchi." | Nobody asked my opinion. |
| 3.80–4.70 | classroom | "Toh maine bolna hi band kar diya." | So I stopped talking. |
| 4.70–5.85 | hands typing, dark | "Bas likhna shuru kar diya." | So I started writing<br>ICU notes. |
| 5.90–7.20 | typing | "ICU notes. Ventilator. ABG. Protocols." | Ventilator. ABG. Protocols. *(cyan)* |
| 7.20–10.20 | **Zero screen** · `0` · WEEK 1→6 ticking | "Hafton tak…&nbsp;&nbsp;koi nahi padhta tha." | For weeks — nobody read it. |
| 10.20–11.60 | screen wakes · **shake + RGB split + music slam** | "Phir ek din maine analytics kholi." | Then I opened my analytics. |
| 11.60–18.40 | **Reveal** · one country per 0.85s beat | "United States. India. France. Norway. China. Singapore. Brazil." | *(the panel is the caption)* |
| 16.95–18.35 | ↑ over the full list | — | **Which one are you? 👇** |
| 18.40–20.60 | dip to near-black, night · **music ducks** | "Norway mein kahin, ek nurse ne raat ke 3 baje mera page khola." | A nurse in Norway<br>opened my page<br>at 3 AM. |
| 20.70–22.15 | night | "Usse na mera naam pata hai…" | She doesn't know my name. |
| 22.25–23.60 | night | "…na ye ki main class mein kahan baithta tha." | She doesn't know where I sat. |
| 23.60–25.60 | classroom, fast, whip cut | "Jo haste the, wahi sabse pehle check karte hain. Karne do." | The ones who laughed<br>check first. Let them. |
| 25.60–26.60 | black | "Duniya ye nahi puchti tum kahan baithe the." | The world doesn't ask<br>where you sat. |
| 26.60–28.00 | black, then **analytics rises crisp** as the line fades | "Duniya puchti hai — tumne banaya kya." | **It asks what<br>you built.** |
| 28.00 | → loops to frame 1 | | |

**The three moments that decide this reel:** the contradiction at 0.0s, the ticking
zero at 7.2s, and the ducked whisper at 18.4s. Everything else is support.

---

## What to record

Drop these into `media/` with **exactly these names** — the timeline is already
wired to them.

| File | What it is | Needs |
|---|---|---|
| `vo-hinglish.wav` | the VO, one take | ≥ 26.5s. Starts at 1.1s on the timeline. |
| `music-bed.mp3` | music | ≥ 28s. Something that can carry a drop at 10.2s. |
| `shot-classroom.mp4` | back row / empty classroom / desk | ≥ 4.5s (used twice) |
| `shot-typing.mp4` | hands typing, dark room | ≥ 2.5s |
| `shot-screen.mp4` | phone or laptop screen waking | ≥ 1.4s |
| `shot-night.mp4` | window at night, ward corridor, anything still and dark | ≥ 5.2s |
| `sfx-riser.wav` | riser landing at 10.2s | ≥ 1.6s — *optional, delete the clip if you skip it* |
| `sfx-impact.wav` | one boom | ≥ 1.2s — *optional* |

**Footage is texture, not content.** Every shot sits at 40–55% opacity behind the
text, and the four analytics screens carry 11.5 of the 28 seconds on their own. If
you have no footage at all, delete the V1 clips — the reel still works end to end
on black plus the panels.

### Recording the VO against the grid
Read to these marks; the editor's gold markers are already on them.

```
1.1   Main last bench wala tha.
2.6   Kisi ne kabhi meri baat nahi puchi. Toh maine bolna hi band kar diya.
4.7   Bas likhna shuru kar diya. ICU notes. Ventilator. ABG. Protocols.
7.2   Hafton tak…              ← hold a full beat in the dots
8.8   koi nahi padhta tha.
10.2  Phir ek din maine analytics kholi.
11.8  United States.  12.65 India.  13.5 France.  14.35 Norway.
15.2  China.          16.05 Singapore.  16.9 Brazil.
18.5  Norway mein kahin, ek nurse ne raat ke 3 baje mera page khola.
20.7  Usse na mera naam pata hai…
22.25 …na ye ki main class mein kahan baithta tha.
23.65 Jo haste the, wahi sabse pehle check karte hain. Karne do.
25.7  Duniya ye nahi puchti tum kahan baithe the.
26.6  Duniya puchti hai — tumne banaya kya.
```

Flat, tired, real. Do not perform it. Phone mic, six inches, quiet room — studio-clean
audio makes this kind of line sound rehearsed, which is the one thing it can't sound.
Nothing is spoken after 28.0s: **do not say the domain out loud.**

---

## Caption

```
4 saal last bench pe baitha.
Pichle hafte 7 countries ne mera page khola. 🇺🇸🇮🇳🇫🇷🇳🇴🇨🇳🇸🇬🇧🇷

Agar tu abhi backbencher hai — bas banana shuru kar de.
Duniya kabhi nahi puchti tu kahan baitha tha.

Tu kahan se padh raha hai? Country drop kar 👇
icudecodedd.com
```

Unchanged — it works. The comment ask is now in the video too, at 17.0s.

## Posting

Hinglish version first, **8:45 PM IST**. If it beats your average, re-cut the same
timeline with an English VO and post 6–8 days later: swap `vo-hinglish.wav` for the
English take and nothing else in `project.json` needs to move. Fresh audio reads as
a new reel and gives the US audience a version built for them.

---

## Files this cut added

| File | |
|---|---|
| `reels/icu-last-bench.project.json` | the 28s timeline — 29 clips, 19 markers |
| `reels/icu-last-bench.mp4` | the rendered 28s video — captions + screens, silent |
| `library/svg/icu-analytics-cold.svg` | settled panel — cold open + loop bridge |
| `library/svg/icu-analytics-reveal.svg` | the 6.8s country-by-country reveal |
| `library/svg/icu-zero-readers.svg` | the `0` / WEEK 1→6 retention hold |
| `library/svg/icu-screen-wake.svg` | the 10.2s drop — screen wakes, rows about to fill |

The SVGs are self-contained, use system fonts only (they rasterise through a data
URL, so no webfont can load), and draw their flags as plain rects — no emoji, which
Windows will not render as flags.
