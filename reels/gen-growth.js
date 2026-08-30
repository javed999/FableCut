/* Growth panel: last week's figures roll over into this week's.
   Both sets read off real Netlify Web Analytics screenshots
   (Aug 18-25 and Aug 23-30, "Location / Pageviews"). System fonts only —
   the SVG rasterises through a data URL, so no webfont can load. */
const fs = require('fs'), path = require('path');
const OUT = process.argv[2];

const ROWS = [
  { cc:'us', name:'United States', old:954, now:1503, d:0.00 },
  { cc:'in', name:'India',         old:864, now:1085, d:0.55 },
  { cc:'sg', name:'Singapore',     old:48,  now:179,  d:1.10 },
  { cc:'fr', name:'France',        old:148, now:171,  d:1.65 },
  { cc:'no', name:'Norway',        old:114, now:114,  d:2.20 },
  { cc:'de', name:'Germany',       old:null,now:51,   d:2.75 },   // never in the list before
  { cc:'cn', name:'China',         old:49,  now:42,   d:3.30 },
];
const OLD_TOTAL = 2217, NEW_TOTAL = 3145;
const MAX = 1503, BARW = 700, CHIPW = 42, CHIPH = 28;
const rowY = i => 780 + i * 92;
const comma = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

function chip(cc) {
  const W = CHIPW, H = CHIPH, r = [];
  const R = (x,y,w,h,f) => r.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"/>`);
  if (cc==='us') { R(0,0,W,H,'#b22234'); for(let i=1;i<6;i+=2) R(0,i*(H/6),W,H/6,'#ffffff'); R(0,0,W*0.42,H*0.54,'#3c3b6e'); }
  else if (cc==='in') { R(0,0,W,H/3,'#ff9933'); R(0,H/3,W,H/3,'#ffffff'); R(0,2*H/3,W,H/3,'#138808');
        r.push(`<circle cx="${W/2}" cy="${H/2}" r="3.8" fill="none" stroke="#000080" stroke-width="1.3"/>`); }
  else if (cc==='fr') { R(0,0,W/3,H,'#0055a4'); R(W/3,0,W/3,H,'#ffffff'); R(2*W/3,0,W/3,H,'#ef4135'); }
  else if (cc==='no') { R(0,0,W,H,'#ba0c2f'); R(12,0,8.5,H,'#ffffff'); R(0,9.8,W,8.5,'#ffffff');
        R(14.5,0,3.6,H,'#00205b'); R(0,12.2,W,3.6,'#00205b'); }
  else if (cc==='cn') { R(0,0,W,H,'#de2910'); r.push(`<circle cx="10.5" cy="9.5" r="4" fill="#ffde00"/>`);
        [[18,4.5],[22,8.5],[22,14],[18,18]].forEach(([x,y])=>r.push(`<circle cx="${x}" cy="${y}" r="1.4" fill="#ffde00"/>`)); }
  else if (cc==='sg') { R(0,0,W,H/2,'#ed2939'); R(0,H/2,W,H/2,'#ffffff');
        r.push(`<circle cx="11.5" cy="7" r="4.7" fill="#ffffff"/><circle cx="14" cy="7" r="4.7" fill="#ed2939"/>`); }
  else if (cc==='de') { R(0,0,W,H/3,'#000000'); R(0,H/3,W,H/3,'#dd0000'); R(0,2*H/3,W,H/3,'#ffce00'); }
  return r.join('');
}

const rows = ROWS.map((r,i) => {
  const y = rowY(i), wOld = Math.round(BARW*(r.old||0)/MAX), wNew = Math.round(BARW*r.now/MAX);
  const isNew = r.old === null, same = r.old === r.now, down = r.old !== null && r.now < r.old;
  const badge = isNew ? 'NEW' : same ? 'same' : (down ? `−${r.old-r.now}` : `+${r.now-r.old}`);
  const bcol  = isNew ? '#ffd166' : same ? '#7d8590' : (down ? '#8b949e' : '#4ade80');
  const bar   = isNew ? '#ffd166' : '#4ade80';
  return `
  <g class="row" style="--d:${r.d.toFixed(2)}s">
    <g transform="translate(130 ${y-24})">${chip(r.cc)}</g>
    <text x="194" y="${y}" font-size="38" font-weight="600" fill="${isNew?'#ffd166':'#e6edf3'}">${r.name}</text>
    ${r.old !== null ? `<text class="oldn" style="--d:${r.d.toFixed(2)}s;animation-duration:${(0.45).toFixed(2)}s" x="806" y="${y}" font-size="30" font-weight="600" fill="#6b7280" text-anchor="end">${comma(r.old)}</text>` : ''}
    <text class="newn" style="--d:${(r.d+0.35).toFixed(2)}s" x="950" y="${y}" font-size="42" font-weight="800" fill="#e6edf3" text-anchor="end">${comma(r.now)}</text>
    <text class="badge" style="--d:${(r.d+0.45).toFixed(2)}s" x="806" y="${y}" font-size="27" font-weight="700" fill="${bcol}" text-anchor="end">${badge}</text>
    <rect x="194" y="${y+18}" width="${BARW}" height="7" rx="3.5" fill="#21262d"/>
    <rect class="barold" style="--d:${r.d.toFixed(2)}s;animation-duration:0.45s" x="194" y="${y+18}" width="${wOld}" height="7" rx="3.5" fill="#30363d"/>
    <rect class="bar" style="--d:${(r.d+0.35).toFixed(2)}s" x="194" y="${y+18}" width="${wNew}" height="7" rx="3.5" fill="${bar}"/>
  </g>`;
}).join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920"
     font-family="Segoe UI, system-ui, -apple-system, Roboto, Helvetica Neue, Arial, sans-serif">
  <style>
    .dot { transform-box: fill-box; transform-origin: center; animation: live 2.2s ease-in-out infinite; }
    @keyframes live { 0%,100% { opacity:1; transform:scale(1);} 50% { opacity:.35; transform:scale(.82);} }
    .fade { animation: fade .35s ease-out both; }
    @keyframes fade { from { opacity:0 } to { opacity:1 } }
    /* last week's figure shows, then hands over to this week's */
    .oldn, .barold { animation-name: handoff; animation-fill-mode: both; animation-timing-function: linear; }
    @keyframes handoff { 0% { opacity:0 } 8% { opacity:1 } 88% { opacity:1 } 100% { opacity:0 } }
    .newn { animation: pop .4s cubic-bezier(.34,1.4,.64,1) both; transform-box: fill-box; transform-origin: right center; }
    @keyframes pop { from { opacity:0; transform:scale(.7) } to { opacity:1; transform:none } }
    .badge { animation: slidein .4s ease-out both; }
    @keyframes slidein { from { opacity:0; transform:translateX(18px) } to { opacity:1; transform:none } }
    .bar { transform-box: fill-box; transform-origin: left center; animation: grow .55s cubic-bezier(.2,.9,.25,1) both; }
    @keyframes grow { from { transform:scaleX(0) } to { transform:scaleX(1) } }
    .row { animation: rowIn .4s cubic-bezier(.2,.9,.25,1) both; }
    @keyframes rowIn { from { opacity:0; transform:translateY(22px) } to { opacity:1; transform:none } }
    .totOld { animation-name: handoff; animation-duration: 1.1s; animation-fill-mode: both; animation-timing-function: linear; }
    .totNew { animation: pop .5s cubic-bezier(.34,1.4,.64,1) both; transform-box: fill-box; transform-origin: center; }
    .delta  { animation: slidein .5s ease-out both; }
  </style>

  <rect width="1080" height="1920" fill="#07090d"/>
  <rect x="60" y="150" width="960" height="1300" rx="44" fill="#0d1117" stroke="#1c2128" stroke-width="2"/>
  <g class="fade" style="--d:0s">
    <circle class="dot" cx="132" cy="238" r="9" fill="#4ade80"/>
    <text x="158" y="252" font-size="40" font-weight="700" fill="#e6edf3">icudecodedd.com</text>
    <text x="130" y="312" font-size="29" font-weight="600" fill="#7d8590" letter-spacing="5">PAGEVIEWS &#183; LAST 7 DAYS</text>
    <line x1="130" y1="356" x2="950" y2="356" stroke="#21262d" stroke-width="2"/>
  </g>

  <text class="totOld" style="--d:0.15s" x="540" y="560" font-size="190" font-weight="800" fill="#6b7280" text-anchor="middle">${comma(OLD_TOTAL)}</text>
  <text class="totNew" style="--d:1.25s" x="540" y="560" font-size="190" font-weight="800" fill="#e6edf3" text-anchor="middle">${comma(NEW_TOTAL)}</text>
  <text class="delta"  style="--d:1.55s" x="540" y="632" font-size="40" font-weight="800" fill="#4ade80" text-anchor="middle">&#9650; +${comma(NEW_TOTAL-OLD_TOTAL)} vs last week</text>
${rows}
</svg>`;

fs.writeFileSync(path.join(OUT, 'icu-growth.svg'), svg);
console.log(`wrote icu-growth.svg · ${comma(OLD_TOTAL)} -> ${comma(NEW_TOTAL)} (+${comma(NEW_TOTAL-OLD_TOTAL)})`);
