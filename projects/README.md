# Cetaphil UGC Reel — "Glow Payoff"

A 25.2 s vertical UGC ad cut from a single 35 s handheld take, built for
Instagram Reels. `cetaphil-ugc-reel.json` is the finished timeline — drop it in
as `project.json` to open it in the editor.

```bash
cp projects/cetaphil-ugc-reel.json project.json
node tools/make-sfx.js        # regenerate the sound kit (see "Audio" below)
node server.js                # → http://localhost:7777
```

## Source footage

The take is one continuous product demo. Shot detection (`ffmpeg` scene scores)
found five real cuts, giving six usable shots:

| # | Source in/out | Content |
| - | ------------- | ------- |
| A | 0.00 – 4.17   | styled vanity scene, bottle placed into frame |
| B | 4.17 – 9.93   | bottle in hand, label to camera |
| C | 9.93 – 12.73  | cap flipped open |
| D | 12.73 – 25.27 | bottle over the arm → **dispense/drip (15.0–17.6)** → spreading |
| E | 25.27 – 31.93 | rubbing in → **clean glow arm (29.0–31.9)** |
| F | 31.93 – 35.39 | product beauty end card |

The original is 4K HEVC (`hvc1`) with the `moov` atom at the end. Chromium and
Safari will not reliably decode HEVC, and without `+faststart` playback stalls,
so the edit runs off a transcode:

```bash
ffmpeg -i media/Wify.MOV -vf scale=1440:2560:flags=lanczos \
  -c:v libx264 -profile:v high -crf 19 -preset medium -pix_fmt yuv420p -r 30 \
  -c:a aac -b:a 160k -movflags +faststart media/hero-cetaphil.mp4
```

1440×2560 rather than 1080×1920 on purpose: the timeline is 1080×1920, so
punch-ins up to ~1.33× still map to real source pixels instead of upscaling.

## Structure

Retention-first ordering — the payoff is shown *before* the process, so the
opening frame poses a question the rest of the reel answers.

| Time | Beat | Move |
| ---- | ---- | ---- |
| 0.00 | hook — the result, tight macro on the finished skin | slow push 1.30→1.42, "how is her skin like that??" |
| 1.80 | reveal — the product lands | whip pan + shake 16 + rgbSplit 6 + warm leak |
| 4.20 | product hero, label readable | blur dissolve, gold underline swoosh |
| 7.20 | cap opens | whip, claim text + tick |
| 9.60 | build — bottle over the arm at 1.8× | riser lands exactly on the drop |
| 10.80 | **the drop** — dispense in slow motion | hard cut, speed ramp 1.6→0.35, shake 24, sub-drop |
| 14.10 | absorbing | whip |
| 16.50 | rubbing in at 1.45× | whip, crossfades into the payoff |
| 18.90 | payoff — the glow | soft 0.35 s fade, sparkles, shimmer |
| 22.20 | end card + CTA | whip, bokeh drift |

Cut points are on a **100 BPM / 0.6 s grid** and written into `markers`. That is
deliberate: Reels reward trending audio, so when you swap the placeholder bed for
a trending track, the existing cuts already land on a musical grid.

### Transitions

Whip pans only look right when the two clips **overlap** — `whip` translates the
incoming clip by `W * 1.4`, so with adjacent clips you get a black bar where the
frame used to be. Every cut here extends the outgoing clip by exactly the
incoming transition's duration and gives it a matching `transitionOut`, so both
frames travel together. The same reasoning rules out `zoom` as an entrance: it
scales the incoming clip *below* full-frame, exposing the layer underneath as a
hard-edged rectangle. `blur` dissolves instead.

Impacts are keyframed `shake`/`rgbSplit` on the footage clips themselves rather
than adjustment layers — the editor only has three video tracks (V1/V2/V3), and
this keeps V2 free for overlays and V3 for text.

### Type

Ten titles, **a different font on each** (project convention): Anton, Caveat,
Playfair Display, Roboto, Bebas Neue, Oswald, Archivo Black, Montserrat,
Abril Fatface, Poppins. All ten ship in `library/fonts/`, so nothing depends on a
Google Fonts fetch at render time.

Watch the width on `font-cut`: it cycles through the faces in `fontCutSet`, and a
line sized to fit in condensed Bebas Neue will overflow the frame when it swaps
to Anton or Archivo Black. That title is set on two lines for headroom.

## Audio

`library/sfx/` ships empty by design (see its README — SFX licenses generally
forbid redistributing the files). `tools/make-sfx.js` synthesizes an original,
royalty-free kit from ffmpeg oscillators and noise sources: whoosh,
whoosh-reverse, impact, sub-drop, riser, pop, click, shimmer, sparkle-up, plus a
soft `pad-bed.mp3`.

**The pad is a placeholder.** It exists so the cut can be judged with something
underneath it. For publishing, mute A1 and add trending audio in the Instagram
app — the 0.6 s grid means the cuts still land.

Source audio is muted (`volume: 0`) throughout; the take is room tone at
−35.5 dB mean, so there is nothing in it worth keeping.

## Claims

The on-screen copy sticks to Cetaphil's own on-pack claims — "fragrance free",
"non-comedogenic", "48H hydration". No price claim is made. Swap the copy if you
are running this for a different market where the pack differs.

## Checking changes

```bash
node tools/validate-project.js --shots 4.167,9.933,12.733,25.267,31.933
```

Verifies media exist, flags same-track overlaps that lack a transition, and
recomputes each clip's source window — including speed ramps, where consumed
source time is the integral of `speed(t)` and not `duration × speed`. `--shots`
additionally warns when a clip's source window crosses one of the source's own
cuts, which would put a hidden jump cut inside a single clip.
