# ICU Decoded — "Last Bench", recut short

**21.0s · 1080×1920 · his own recorded voice, re-cut · updated figures**

A tighter version of reel #1, built from the **existing** recording rather than a
new one, and paired with the newer Aug 23–30 numbers.

## Why this cut exists

Voice cloning was requested and is not possible here: no TTS engine is installed
and `huggingface.co` — where every voice-cloning model's weights live — answers
**403** at the egress gateway. So nothing is synthesised; every word is his own.

It also would not have helped. Cloned from 33s of phone audio with room noise,
the result sits in the uncanny band, and this reel runs entirely on trust — real
dashboard, real numbers, real person. A voice with a synthetic edge undercuts the
one thing the piece asks people to believe.

## The trick that makes it work

In reel #1 he names specific figures — *"United States 955"*, *"India eight
seventy-two"*. Those are last week's, and they would contradict the new panel.

But **the emotional lines never name a number**:

> "I was the last bench guy." · "Nobody asked my opinion." · "So I stopped
> talking." · "ICU notes." · "ABG protocols." · "Then I opened my analytics." ·
> "in Norway… opened my page at 3 AM" · "the world doesn't ask where you sat —
> it asks what you built."

So the country-naming stretch (source 12.86–23.61) is dropped whole, and what
remains carries the story against the **3,145** panel with nothing contradicting.

## How it is assembled

Audio is five pieces of `vo.m4a`, every cut placed **inside a measured silence
gap** (`silencedetect -34dB, ≥0.14s`) so no word is clipped:

| Out | Source | Content |
| --- | --- | --- |
| 0.00–7.54 | 0.31–7.85 | last bench / nobody asked / stopped talking / ICU notes / ABG protocols |
| 7.54–9.61 | 10.42–12.49 | then I opened my analytics |
| 9.61–11.81 | *inserted silence* | the panel rolls to 3,145 |
| 11.81–18.13 | 24.23–30.55 | in Norway / opened my page at 3 AM |
| 18.13–20.97 | 30.86–33.70 | the world doesn't ask / what you built |

Each face shot draws from **its own matching source frame**, so lip sync holds
across every splice.

The panel is re-timed for the shorter runtime: rows land 0.15–1.95s, and Norway
lights gold at local 2.34s — which is out 11.95s, the moment he says *"in
Norway"*.

## The version that also carries the announcement

`reels/icu-story-free.mp4` — **25.9s** — is this cut with a 4.93s tail welded on:

| Out | |
| --- | --- |
| 0.00–20.97 | this cut, his voice, his face, the 3,145 panel |
| 20.97–25.90 | **his voice stops.** The panel softens behind two cards: *"The server is paid for."* then *"So from today — it's free. For everyone."* |

He never says the announcement out loud, because he never recorded those words.
Putting his last-bench audio under "From today I stopped charging" captions would
have him *saying* one thing while the screen *reads* another — a mismatch a
viewer cannot name but immediately distrusts.

Landing it in silence is the stronger choice anyway: a title card in a sudden
quiet hits harder than a line of narration, and nothing is claimed in a voice
that never claimed it.

The tail was rendered on its own (148 frames) and concatenated, rather than
re-rendering all 777 — same result, a fraction of the time.
