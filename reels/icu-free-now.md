# ICU Decoded — reel #2: "The week it paid for itself"

**28.0s · 1080×1920 · Hinglish VO / English captions**

The announcement: the site was paid, the cost is covered, it is free from today.

## Why it is a story and not a notice

"It's free now" alone is an announcement, and nobody shares an announcement. The
story is the **reason**: he charged to cover a server bill, the bill got covered,
so the price has no reason to exist any more. Beginning, middle, end — with
receipts.

The strongest single fact is not the total. It is **Germany**: a country he has
never been to, which found the site on its own this week. That is the emotional
beat and it is true.

## The figures

Read off Netlify Web Analytics (`Location / Pageviews`), two windows.

| Country | Aug 18–25 | Aug 23–30 | |
| --- | --- | --- | --- |
| United States | 954 | **1,503** | +549 |
| India | 864 | **1,085** | +221 |
| Singapore | 48 | **179** | 3.7× |
| France | 148 | **171** | +23 |
| Norway | 114 | **114** | same |
| Germany | — | **51** | **new country** |
| China | 49 | **42** | −7 |
| **Total** | **2,217** | **3,145** | **+928** |

Brazil (40) dropped out of the top seven.

**China's dip and Brazil's exit stay on screen.** A panel where every number only
rises reads as marketing; one honest fall is what makes the other six credible.

> **Caveat worth knowing before he says it.** The windows overlap by three days
> (Aug 23–25), so this is two 7-day windows sharing a weekend, not a clean
> week-on-week. The totals and the growth are real. It is also why the script says
> *"Norway is still on the list"* rather than claiming a returning reader —
> Norway reading 114 in both windows is most likely the same visits counted
> twice.

## Script

| Time | On screen | VO (Hinglish) | Caption (English) |
| --- | --- | --- | --- |
| 0.0 | growth panel, 2,217 rolls to 3,145 | Aaj se maine paisa lena band kar diya. | From today, I stopped charging. |
| 2.5 | to camera | Paid isliye tha — server ka kharcha mere jeb se jaata tha. | I charged for one reason — the server came out of my pocket. |
| 6.0 | to camera, closer | Pichle hafte wo kharcha nikal gaya. | Last week, it paid for itself. |
| 9.0 | panel · +928 badge | Teen hazaar se zyada log. Saat desh. Ek hafte mein. | 3,145 readers. 7 countries. One week. |
| 13.0 | Germany lands gold, marked NEW | Germany naya hai. Main wahan kabhi gaya bhi nahi. | Germany is new. I have never been there. |
| 16.5 | Norway row, marked "same" | Aur Norway abhi bhi list mein hai. | And Norway is still on the list. |
| 20.0 | to camera, quiet | Jo cheez apne aap badh rahi hai, uspe main daam nahi laga sakta. | You don't put a price on something growing on its own. |
| 24.5 | black, panel fades back up | Aaj se — sab kuch. Sabke liye. Free. | From today — all of it. For everyone. Free. |
| 28.0 | end | | |

**Do not say the domain out loud** — panel header and caption only, same as reel #1.

Delivery: flat, tired, real. This is a decision, not good news. The 20.0s line
carries the reel; drop the voice for it.

## What he has to shoot

New message, so it needs new audio — his voice cannot be made to say something he
never said. One take to camera, ≥ 28s, same setup as the last reel. Optionally a
few seconds of hands/laptop.

## Stock images

Three supplied stills fill the stretches that were black:

| Time | Image | Line it carries |
| --- | --- | --- |
| 2.55–5.90 | server racks | *"the server came out of my pocket"* |
| 6.00–8.80 | "cost recovery" | *"Last week, it paid for itself."* |
| 20.05–24.40 | money falling | *"You don't put a price on something growing on its own."* |

All three are low resolution — 739×415, 656×467 and 460×288 — so filling a
1080×1920 frame with `cover` would mean a 4–7× upscale and visible mush. Each is
instead placed sharp at `contain` over a blurred, darkened copy of itself. Real
upscale drops to 1.5–2.4×.

The money still arrived at **67 mean luminance** against 24–30 for the rest of the
reel — a white flash in a dark cut. Graded to 47: still the lightest frame, but a
cut rather than a jolt.

> Worth a second look before posting: the money image is tonally at odds with the
> message. A man showered in cash reads "get rich", and the line under it is about
> *not* charging. It either lands as irony or fights the point.

## Files

| File | |
| --- | --- |
| `reels/icu-free-now.project.json` | the 28s visual-track timeline — 11 clips |
| `library/svg/icu-growth.svg` | the growth panel — 2,217 → 3,145, Germany gold |
| `reels/gen-growth.js` | its generator, with both windows' figures |

## The rendered visual track

The 28s track renders **silent, with black where he has to appear** — 2.5–9.0s and
20.0–24.5s, 11 of 28 seconds. That is not filler: each English caption lands on the
frame where its Hinglish line is spoken, so the file works as a teleprompter. He
records the VO straight onto it and films himself over the black.

Row landings in `icu-growth.svg` are timed to the script, not to a fixed grid:
Germany lands at panel-local 4.00s so it hits *"Germany is new"* at 13.0s, and the
Norway highlight fires at 7.50s to hit *"Norway is still on the list"* at 16.5s.

A settled panel is the same file seeded at a later `in` point — every animation uses
`fill-mode: both`, so `in: 6.5` is fully landed with Norway not yet gold, and
`in: 8.5` has it gold. An earlier attempt generated a second "settled" SVG by
regex-stripping the animation properties; it silently destroyed the rows and the
country figures, and was caught in preview.
