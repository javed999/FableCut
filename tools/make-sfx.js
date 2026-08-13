#!/usr/bin/env node
/**
 * make-sfx.js — synthesize a royalty-free starter SFX kit into ./library/sfx/
 *
 * FableCut deliberately ships no sound effects (see library/sfx/README.md): most
 * free-SFX sites license their files for use *in* videos but forbid redistributing
 * the files themselves. Everything here is generated from scratch with ffmpeg's
 * own oscillators and noise sources, so the output is original and unencumbered.
 *
 * Usage:  node tools/make-sfx.js [--outdir library/sfx] [--ffmpeg /path/to/ffmpeg]
 * Needs:  ffmpeg on PATH (or --ffmpeg), with libmp3lame.
 *
 * No npm dependencies — consistent with the rest of the project.
 */

'use strict';

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// ---------------------------------------------------------------- args

const argv = process.argv.slice(2);
const argOf = (flag, dflt) => {
  const i = argv.indexOf(flag);
  return i !== -1 && argv[i + 1] ? argv[i + 1] : dflt;
};

const FFMPEG = argOf('--ffmpeg', process.env.FFMPEG_PATH || 'ffmpeg');
const OUT_DIR = path.resolve(argOf('--outdir', path.join(__dirname, '..', 'library', 'sfx')));
const SR = 48000;

fs.mkdirSync(OUT_DIR, { recursive: true });

const ff = (args) => {
  try {
    return execFileSync(FFMPEG, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'pipe' });
  } catch (err) {
    const msg = (err.stderr || Buffer.alloc(0)).toString().trim();
    throw new Error(`ffmpeg failed:\n${msg || err.message}`);
  }
};

// mp3 at a sane quality; these are short transients, so size is irrelevant
const MP3 = ['-c:a', 'libmp3lame', '-q:a', '3', '-ar', String(SR)];

/** Render a mono expression source through a filter chain to an mp3. */
function synth(name, expr, dur, filters = []) {
  const out = path.join(OUT_DIR, name);
  const chain = ['aformat=sample_fmts=fltp', ...filters, 'alimiter=limit=0.95', 'aformat=channel_layouts=stereo'];
  ff([
    '-f', 'lavfi',
    '-i', `aevalsrc=${expr}:d=${dur}:s=${SR}`,
    '-af', chain.join(','),
    ...MP3,
    out,
  ]);
  return out;
}

// ---------------------------------------------------------------- helpers

/** Linear-chirp phase: sweeps f0 -> f1 over dur. phase = 2pi*(f0*t + k/2*t^2) */
const chirp = (f0, f1, dur) => {
  const k = (f1 - f0) / dur;
  return `sin(2*PI*(${f0}*t+${(k / 2).toFixed(4)}*t*t))`;
};

const decay = (rate) => `exp(-t*${rate})`;

// ---------------------------------------------------------------- the kit

const built = [];
const make = (label, fn) => {
  process.stdout.write(`  ${label} … `);
  const p = fn();
  built.push(p);
  console.log('ok');
};

console.log(`Synthesizing SFX into ${OUT_DIR}`);

// 1. whoosh — pink-noise swell, the transition workhorse
make('whoosh.mp3', () =>
  (() => {
    const out = path.join(OUT_DIR, 'whoosh.mp3');
    ff([
      '-f', 'lavfi', '-i', `anoisesrc=d=0.62:c=pink:a=0.9:r=${SR}`,
      '-af', [
        'highpass=f=280',
        'lowpass=f=7000',
        // sin^2 swell = the classic "air past the mic" shape
        "volume='pow(sin(PI*min(t/0.62,1)),2)':eval=frame",
        'aphaser=type=t:speed=1.8:decay=0.5',
        'aformat=channel_layouts=stereo',
        'adelay=0|4',
        'alimiter=limit=0.95',
      ].join(','),
      ...MP3, out,
    ]);
    return out;
  })());

// 2. whoosh-reverse — riser-style intake, lands ON the cut
make('whoosh-reverse.mp3', () =>
  (() => {
    const out = path.join(OUT_DIR, 'whoosh-reverse.mp3');
    ff([
      '-f', 'lavfi', '-i', `anoisesrc=d=0.7:c=pink:a=0.9:r=${SR}`,
      '-af', [
        'highpass=f=350',
        'lowpass=f=8000',
        // ramps to full then cuts dead — sits before an impact
        "volume='pow(min(t/0.7,1),2.2)':eval=frame",
        'aformat=channel_layouts=stereo',
        'adelay=0|4',
        'alimiter=limit=0.95',
      ].join(','),
      ...MP3, out,
    ]);
    return out;
  })());

// 3. impact — sub thump + transient click, for the product reveal / hard cuts
make('impact.mp3', () =>
  synth(
    'impact.mp3',
    `'0.95*sin(2*PI*52*t)*${decay(5.5)}+0.45*sin(2*PI*104*t)*${decay(9)}+0.30*sin(2*PI*180*t)*${decay(22)}'`,
    1.0,
    ['lowpass=f=1800', 'aecho=0.9:0.7:60:0.15'],
  ));

// 4. sub-drop — descending sub, pairs under the money shot
make('sub-drop.mp3', () =>
  synth('sub-drop.mp3', `'0.92*${chirp(132, 34, 1.25)}*${decay(1.9)}'`, 1.25, ['lowpass=f=900']));

// 5. riser — tension build into the drop
make('riser.mp3', () =>
  (() => {
    const out = path.join(OUT_DIR, 'riser.mp3');
    const tone = `'0.30*${chirp(180, 2600, 1.8)}*(0.12+0.88*(t/1.8))'`;
    ff([
      '-f', 'lavfi', '-i', `aevalsrc=${tone}:d=1.8:s=${SR}`,
      '-f', 'lavfi', '-i', `anoisesrc=d=1.8:c=white:a=0.55:r=${SR}`,
      '-filter_complex',
      "[1:a]highpass=f=900,volume='pow(t/1.8,2.4)':eval=frame[n];" +
      '[0:a][n]amix=inputs=2:weights=1 0.8:normalize=0,' +
      'aformat=channel_layouts=stereo,alimiter=limit=0.95[a]',
      '-map', '[a]', ...MP3, out,
    ]);
    return out;
  })());

// 6. pop — caption / sticker entrance
make('pop.mp3', () =>
  synth('pop.mp3', `'0.55*sin(2*PI*880*t)*${decay(28)}+0.35*sin(2*PI*1760*t)*${decay(42)}'`, 0.22));

// 7. click — tiny UI tick
make('click.mp3', () =>
  synth('click.mp3', `'0.5*sin(2*PI*2400*t)*${decay(90)}'`, 0.09));

// 8. shimmer — bell sparkle for the glow / payoff beat
make('shimmer.mp3', () =>
  synth(
    'shimmer.mp3',
    `'0.22*sin(2*PI*1568*t)*${decay(2.8)}+0.18*sin(2*PI*2093*t)*${decay(3.4)}` +
    `+0.15*sin(2*PI*2637*t)*${decay(4.0)}+0.12*sin(2*PI*3136*t)*${decay(4.8)}'`,
    1.8,
    ['aecho=0.85:0.8:150|330:0.30|0.18', 'highpass=f=600'],
  ));

// 9. sparkle-up — ascending twinkle, for text reveals
make('sparkle-up.mp3', () =>
  synth('sparkle-up.mp3', `'0.32*${chirp(1200, 3600, 0.5)}*${decay(5)}'`, 0.55,
    ['aecho=0.85:0.7:120:0.25']));

// ---------------------------------------------------------------- music bed
//
// A soft ambient pad so the cut can be judged with something under it.
// Placeholder by design: on Instagram you'd swap in trending audio, which is
// why the edit is built on a 100 BPM / 0.6 s beat grid.

const CHORDS = [
  { name: 'Cmaj9', f: [130.81, 196.00, 329.63, 493.88, 587.33] },
  { name: 'Am7',   f: [110.00, 164.81, 261.63, 392.00, 493.88] },
  { name: 'Fmaj7', f: [ 87.31, 130.81, 220.00, 329.63, 392.00] },
  { name: 'G6sus', f: [ 98.00, 146.83, 261.63, 329.63, 440.00] },
];

const CHORD_DUR = 3.6;           // 6 beats at 100 BPM
const LOOPS = 2;                 // 4 chords x 3.6 s x 2 = 28.8 s

make('pad-bed.mp3', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'fc-pad-'));
  const parts = [];

  CHORDS.forEach((ch, i) => {
    // Two slightly detuned sines per note -> slow beating -> "analog" warmth.
    const voices = ch.f
      .map((f, n) => {
        const amp = (0.9 / ch.f.length) * (n === 0 ? 1.15 : 1); // lift the root
        return `${amp.toFixed(4)}*(sin(2*PI*${f.toFixed(2)}*t)+sin(2*PI*${(f * 1.0035).toFixed(2)}*t))*0.5`;
      })
      .join('+');
    // pow(sin,0.55) = soft swell in/out so chords breathe into each other
    const env = `pow(sin(PI*t/${CHORD_DUR}),0.55)`;
    const p = path.join(tmp, `c${i}.wav`);
    ff([
      '-f', 'lavfi', '-i', `aevalsrc='(${voices})*${env}':d=${CHORD_DUR}:s=${SR}`,
      '-af', 'aformat=sample_fmts=fltp,lowpass=f=2100,aformat=channel_layouts=stereo',
      '-c:a', 'pcm_s16le', p,
    ]);
    parts.push(p);
  });

  const listFile = path.join(tmp, 'list.txt');
  const seq = [];
  for (let l = 0; l < LOOPS; l++) parts.forEach((p) => seq.push(`file '${p.replace(/'/g, "'\\''")}'`));
  fs.writeFileSync(listFile, seq.join('\n') + '\n');

  const total = CHORDS.length * CHORD_DUR * LOOPS;
  const out = path.join(OUT_DIR, 'pad-bed.mp3');
  ff([
    '-f', 'concat', '-safe', '0', '-i', listFile,
    '-af', [
      'aecho=0.8:0.85:250|540:0.30|0.20',   // cheap plate-ish tail
      'tremolo=f=0.25:d=0.10',              // slow drift, keeps it alive
      'lowpass=f=2600',
      `afade=t=in:st=0:d=1.2`,
      `afade=t=out:st=${(total - 2.5).toFixed(2)}:d=2.5`,
      'volume=0.85',
      'alimiter=limit=0.92',
    ].join(','),
    ...MP3, out,
  ]);

  fs.rmSync(tmp, { recursive: true, force: true });
  return out;
});

// ---------------------------------------------------------------- report

console.log('\nDone:');
for (const p of built) {
  const kb = (fs.statSync(p).size / 1024).toFixed(1);
  console.log(`  ${path.relative(process.cwd(), p).padEnd(32)} ${kb.padStart(8)} KB`);
}
console.log('\nThese are generated waveforms — original, royalty-free, safe to ship in your videos.');
