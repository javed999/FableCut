# ICU Decoded — "Last Bench" reel, re-cut from source

**33.7s · 1080×1920 · 30fps · his original voice · English captions · loop-tagged**

This is a **re-cut of the reel he already shot** (`IMG_5833.MP4`, 1440×2560 HEVC,
33.7s), not a build from the written script. The source was pulled from a GitHub
release asset — Google Drive is blocked by this workspace's egress policy
(`drive.google.com` → 403 at the proxy gateway).

Everything spoken is his own recording, untouched. What changed is what you see.

---

## What the source actually had

Measured, not guessed — shot detection, silence detection, and caption-band
change detection over the real file.

### 1. 12.3 seconds — 37% of the reel — was a phone-shot of a monitor

Shot boundaries came back as `1.7, 2.8, 3.93, 7.87, 10.17, 11.83, 24.13, 24.33,
25.37, 29.83, 30.1`. The gap from **11.83 → 24.13** is a single unbroken take: a
handheld recording of a computer screen, tilted, glare-lit, with a pen pointing
at rows of 20px text.

That stretch carries the entire proof of the story, and on a phone it is
illegible. It is now **replaced** by a purpose-built panel where every row lands
on the exact frame he names that country.

### 2. The numbers on screen did not match the numbers in his voice

Read directly off the dashboard in the footage (`Location / Pageviews`, dated
25-08-2026):

| | script said | actually on screen |
| --- | --- | --- |
| United States | 954 | **955** |
| India | 864 | **872** |
| France | 148 | **149** |
| Norway | 114 | 114 |
| China | 49 | 49 |
| Singapore | 48 | 48 |
| Brazil | 40 | 40 |
| **Total** | 2,217 | **2,227** |

The metric is **Pageviews**, not "readers". Every panel now uses the real
figures and the real label — a receipt that contradicts its own voiceover is
worse than no receipt.

### 3. The burned-in captions were auto-generated, and wrong

`India eight seventy-two` · `On 149 something.` · `Where u sat` ·
`It ask what you build`. They also sat at **y ≈ 1854 of 2560** — low enough to
collide with Instagram's own UI overlay.

Removed entirely by cropping the frame above them (below), and rewritten.

### 4. The first 2.8s was black with a slow typewriter

Two full seconds of near-black before anything happens, with the line typing in
one character at a time. To a muted scroll that is an empty frame.

### 5. Two takes ran long and static

`3.93 → 10.17` (6.2s) and `25.37 → 33.7` (8.3s) are single locked-off shots with
no cut. Both now carry a punch-in.

---

## What the re-cut does

### Picture
- **Cropped `990×1760` at x=225, y=0**, then scaled to 1080×1920. This removes the
  old captions completely — no blur patch, no cover-up — *and* tightens the
  framing, which was loose. His head keeps its headroom.
- **Punch-in cuts** at 7.87s (on "ICU notes") and 30.15s (on the closing line):
  same footage, `scale` 1.12–1.13, cut on the beat.
- **Grade carries the arc**: classroom `faded` / saturation 58 / temperature −22;
  talking head `cinematic` with a slight cool push; the 3 AM section opens at
  brightness 40 and lifts to 88 over 0.4s so the frame *dips* as the line starts.

### The analytics section
- His monitor footage stays underneath at **30% opacity, blur 22** — so it still
  reads as *that* screen — with the legible panel on top.
- Rows land on his voice, timed from his own captions:
  `US 11.93 · India 13.77 · France 15.60 · China 18.63 · Singapore 21.13 · Brazil 21.93`
- The running total re-totals on each: `0 → 955 → 1,827 → 1,976 → 2,090 → 2,139 → 2,187 → 2,227`
- **Norway is never named in his list.** Its row lands silently in sequence, then
  **lights up gold at 23.4s**, one second before his flag shot — turning an
  unexplained gap into the pivot.

### Added
- **Cold open on the payoff** (0–1.7s): the settled panel, 2,227, seven countries,
  with `Nobody read a word I wrote.` across the bottom. The contradiction between
  the text and the numbers is the hook, and it is readable with sound off.
- **Screen wake** at 11.1s: bloom, scanline sweep, seven empty rows about to fill,
  with shake + RGB split. His "then I opened my analytics" now has a visual.
- **Comment trigger** at 21.35s: `Which one are you? 👇`, while the viewer is
  looking at seven countries.
- **Loop bridge** at 33.3s: the panel rises back under the closing line.

### Audio
His original AAC, stream-copied — not re-encoded, not re-timed, not levelled.

---

## The cut

| Time | Picture | Caption |
| --- | --- | --- |
| 0.00–1.70 | **cold-open panel · 2,227** | Nobody read a word I wrote. |
| 1.70–2.80 | black | I was the last-bench guy. |
| 2.80–3.93 | classroom, drained | Nobody asked my opinion. |
| 3.93–7.87 | talking head | So I stopped talking. → So I started writing instead. |
| 7.87–10.17 | **punch in** | ICU notes. ABG. Protocols. *(cyan)* |
| 10.17–11.83 | talking head, slow push | Then I opened my analytics. |
| 11.10–11.93 | **screen wake** · shake + RGB split | — |
| 11.93–24.33 | **REVEAL** · one row per spoken country | *the panel is the caption* |
| 21.35–23.65 | ↑ over the full list | **Which one are you? 👇** |
| 23.40 | Norway row lights gold | — |
| 24.33–25.37 | his Norway flag shot, whip in | Norway. |
| 25.37–30.15 | dips to near-black, lifts | A nurse in Norway → opened my page at 3 AM. |
| 30.15–33.70 | **punch in** | The world doesn't ask → where you sat. → **It asks what you built.** |
| 33.30–33.70 | panel rises behind | — |

---

## Two things to check before posting

1. **"A nurse in Norway."** His auto-caption at that point reads only
   `Open my page at 3 AM in the morning` — the word *nurse* is not in it, and the
   audio could not be verified here. It **is** in the script he wrote, so the
   caption uses it. If he did not actually say it, change that one caption.

2. **The zero screen is not in this cut.** The "for weeks, nobody read it" beat —
   the `0` panel with WEEK 1→6 ticking under a number that never moves — is the
   single strongest retention device in the plan, and it sits exactly where
   Instagram measures first drop-off. **He did not record that line**, so there is
   no audio to hang it on. `library/svg/icu-zero-readers.svg` is built and waiting;
   one sentence of voiceover brings it back.

---

## Files

| File | |
| --- | --- |
| `reels/icu-last-bench.mp4` | the re-cut, with his audio |
| `reels/icu-last-bench.project.json` | the timeline — 27 clips, 20 markers |
| `library/svg/icu-analytics-cold.svg` | settled panel — cold open + loop |
| `library/svg/icu-analytics-reveal.svg` | the 12.4s reveal, timed to his voice |
| `library/svg/icu-screen-wake.svg` | the 11.1s screen wake |
| `library/svg/icu-zero-readers.svg` | the retention hold — unused, needs one line of VO |

`project.json` and `media/` are gitignored (runtime user data), so the timeline
ships as a template. To reopen the edit:

```
cp reels/icu-last-bench.project.json project.json
# put talk.mp4 + vo.m4a back in media/ (both derive from the source video)
node server.js          # → http://localhost:7777
```
