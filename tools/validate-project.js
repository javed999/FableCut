#!/usr/bin/env node
/**
 * validate-project.js — static checks on a FableCut project.json.
 *
 * Catches the mistakes that only show up as a black frame or a frozen clip
 * halfway through a preview:
 *   - clip references a media id that doesn't exist
 *   - media src missing on disk
 *   - a clip reads past the end of its source (in + consumed > media.duration),
 *     including speed ramps, whose consumed time is the integral of speed(t)
 *   - unknown track ids, same-track overlaps, out-of-range keyframe times
 *   - transitions longer than the clip they sit on
 *
 * The speed integral mirrors app.js `mediaTimeAt()` exactly (same 1/120 s
 * trapezoid sampling, same easing), so the numbers here match the engine.
 *
 * Usage: node tools/validate-project.js [project.json] [--shots a,b,c]
 *        --shots  optional source cut times; warns when a clip's source window
 *                 crosses one (i.e. the clip would contain a hidden jump cut)
 */

'use strict';

const fs = require('fs');
const path = require('path');

const argv = process.argv.slice(2);
const argOf = (flag, dflt) => {
  const i = argv.indexOf(flag);
  return i !== -1 && argv[i + 1] ? argv[i + 1] : dflt;
};

const ROOT = path.join(__dirname, '..');
const FILE = path.resolve(argv.find((a) => !a.startsWith('--') && a !== argOf('--shots', null)) || path.join(ROOT, 'project.json'));
const SHOTS = (argOf('--shots', '') || '').split(',').filter(Boolean).map(Number).sort((a, b) => a - b);

const VIDEO_TRACKS = ['V1', 'V2', 'V3'];
const AUDIO_TRACKS = ['A1', 'A2', 'A3', 'A4'];
const TRACKS = [...VIDEO_TRACKS, ...AUDIO_TRACKS];
const TIMED_KINDS = new Set(['video', 'audio']); // kinds that consume source time

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

const proj = JSON.parse(fs.readFileSync(FILE, 'utf8'));

// ---------------------------------------------------------------- engine parity

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

const EASE = {
  linear: (u) => u,
  'ease-in': (u) => u * u,
  'ease-out': (u) => 1 - (1 - u) * (1 - u),
  'ease-in-out': (u) => (u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2),
};

const clipSpeed = (c) => clamp(+(c.props && c.props.speed) || 1, 0.1, 8);

function kfChannel(c, key, local, fallback) {
  const kfs = c.keyframes && c.keyframes[key];
  if (!Array.isArray(kfs) || !kfs.length) return fallback;
  if (local <= kfs[0].t) return kfs[0].v;
  if (local >= kfs[kfs.length - 1].t) return kfs[kfs.length - 1].v;
  for (let i = 0; i < kfs.length - 1; i++) {
    const a = kfs[i], b = kfs[i + 1];
    if (local >= a.t && local <= b.t) {
      const u = (local - a.t) / Math.max(1e-6, b.t - a.t);
      const ez = EASE[b.ease || 'ease-in-out'] || EASE.linear;
      return a.v + (b.v - a.v) * ez(u);
    }
  }
  return fallback;
}

const hasSpeedRamp = (c) => Array.isArray(c.keyframes && c.keyframes.speed) && c.keyframes.speed.length > 0;

/** Source seconds consumed across the whole clip — matches app.js mediaTimeAt(). */
function consumed(c) {
  const base = clipSpeed(c);
  if (!hasSpeedRamp(c)) return c.duration * base;
  const step = 1 / 120;
  const n = Math.max(2, Math.ceil(c.duration / step) + 1);
  let cum = 0;
  let prev = clamp(kfChannel(c, 'speed', 0, base), 0.1, 8);
  for (let i = 1; i < n; i++) {
    const lt = Math.min(c.duration, i * step);
    const cur = clamp(kfChannel(c, 'speed', lt, base), 0.1, 8);
    cum += ((prev + cur) / 2) * (lt - (i - 1) * step);
    prev = cur;
  }
  return cum;
}

// ---------------------------------------------------------------- checks

const mediaById = new Map();
for (const m of proj.media || []) {
  if (mediaById.has(m.id)) err(`duplicate media id "${m.id}"`);
  mediaById.set(m.id, m);
  if (m.src) {
    // /media/... and /library/... are both rooted at the data dir
    const disk = path.join(ROOT, m.src.replace(/^\//, ''));
    if (!fs.existsSync(disk)) err(`media "${m.id}" src not on disk: ${m.src}`);
  }
}

const seenClipIds = new Set();
const byTrack = new Map(TRACKS.map((t) => [t, []]));
const rows = [];

for (const c of proj.clips || []) {
  const tag = `${c.id} (${c.name || c.kind})`;

  if (seenClipIds.has(c.id)) err(`duplicate clip id "${c.id}"`);
  seenClipIds.add(c.id);

  if (!TRACKS.includes(c.track)) {
    err(`${tag}: unknown track "${c.track}" — valid: ${TRACKS.join(' ')}`);
  } else {
    const audioKind = c.kind === 'audio';
    if (audioKind && !AUDIO_TRACKS.includes(c.track)) err(`${tag}: audio clip on video track ${c.track}`);
    if (!audioKind && !VIDEO_TRACKS.includes(c.track)) err(`${tag}: ${c.kind} clip on audio track ${c.track}`);
    byTrack.get(c.track).push(c);
  }

  if (!(c.duration > 0)) err(`${tag}: duration must be > 0`);
  if (c.start < 0) err(`${tag}: negative start`);

  // keyframe sanity
  for (const [key, kfs] of Object.entries(c.keyframes || {})) {
    if (!Array.isArray(kfs) || !kfs.length) { err(`${tag}: empty keyframe channel "${key}"`); continue; }
    let last = -Infinity;
    for (const k of kfs) {
      if (typeof k.t !== 'number' || typeof k.v !== 'number') err(`${tag}: keyframe "${key}" needs numeric t/v`);
      if (k.t < -1e-6 || k.t > c.duration + 1e-6) err(`${tag}: keyframe "${key}" t=${k.t} outside clip 0..${c.duration}`);
      if (k.t < last) err(`${tag}: keyframe "${key}" times out of order`);
      if (k.ease && !EASE[k.ease]) err(`${tag}: keyframe "${key}" unknown ease "${k.ease}"`);
      last = k.t;
    }
  }

  for (const which of ['transitionIn', 'transitionOut']) {
    const tr = c[which];
    if (tr && tr.duration > c.duration + 1e-6) err(`${tag}: ${which} (${tr.duration}s) longer than clip (${c.duration}s)`);
  }

  // source-window check
  if (c.kind === 'text' || c.kind === 'adjust') {
    if (c.mediaId != null) err(`${tag}: ${c.kind} clips must have mediaId: null`);
    continue;
  }
  const m = mediaById.get(c.mediaId);
  if (!m) { err(`${tag}: mediaId "${c.mediaId}" not found in media[]`); continue; }
  if (m.kind !== c.kind) warn(`${tag}: clip kind "${c.kind}" != media kind "${m.kind}"`);

  if (!TIMED_KINDS.has(c.kind)) continue; // image/svg don't consume source time

  const used = consumed(c);
  const from = c.in || 0;
  const to = from + used;
  rows.push({ tag, track: c.track, start: c.start, end: c.start + c.duration, from, to, dur: m.duration });

  if (from < -1e-6) err(`${tag}: negative in point`);
  if (typeof m.duration === 'number' && to > m.duration + 1e-3) {
    err(`${tag}: reads to ${to.toFixed(3)}s of "${m.name}" but it is only ${m.duration}s ` +
        `(in ${from} + ${used.toFixed(3)}s consumed) — clip will freeze on its last frame`);
  }

  if (SHOTS.length && c.kind === 'video') {
    const crossed = SHOTS.filter((s) => s > from + 1e-3 && s < to - 1e-3);
    if (crossed.length) {
      warn(`${tag}: source window ${from.toFixed(2)}–${to.toFixed(2)}s crosses cut(s) at ` +
           `${crossed.map((n) => n.toFixed(2)).join(', ')} — hidden jump cut inside the clip`);
    }
  }
}

// overlaps
for (const [track, clips] of byTrack) {
  const sorted = clips.slice().sort((a, b) => a.start - b.start);
  for (let i = 1; i < sorted.length; i++) {
    const prev = sorted[i - 1], cur = sorted[i];
    const ov = prev.start + prev.duration - cur.start;
    if (ov > 1e-6) {
      const intentional = cur.transitionIn && VIDEO_TRACKS.includes(track);
      const line = `${track}: "${prev.id}" overlaps "${cur.id}" by ${ov.toFixed(3)}s`;
      if (intentional) warn(`${line} — crossfade via ${cur.transitionIn.type} ${cur.transitionIn.duration}s`);
      else err(`${line} — no transitionIn on the later clip, one will simply hide the other`);
    }
  }
}

// ---------------------------------------------------------------- report

const dur = (proj.clips || []).reduce((mx, c) => Math.max(mx, c.start + c.duration), 0);
console.log(`\n${path.relative(process.cwd(), FILE)} — "${proj.name}"`);
console.log(`  ${proj.width}x${proj.height} @ ${proj.fps}fps · rev ${proj.revision} · ${(proj.clips || []).length} clips · timeline ${dur.toFixed(2)}s\n`);

if (rows.length) {
  console.log('  source windows');
  console.log('  ' + 'clip'.padEnd(34) + 'timeline'.padEnd(18) + 'source');
  for (const r of rows) {
    console.log(
      '  ' + r.tag.slice(0, 33).padEnd(34) +
      `${r.start.toFixed(2)}–${r.end.toFixed(2)}`.padEnd(18) +
      `${r.from.toFixed(2)}–${r.to.toFixed(2)}` + (r.dur ? ` / ${r.dur}` : ''),
    );
  }
  console.log('');
}

for (const w of warnings) console.log(`  WARN  ${w}`);
for (const e of errors) console.log(`  ERROR ${e}`);

console.log(`\n  ${errors.length} error(s), ${warnings.length} warning(s)\n`);
process.exit(errors.length ? 1 : 0);
