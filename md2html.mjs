#!/usr/bin/env node
// Kleiner Konverter: Markdown-Subset (Headings, Code, Tabellen, Listen, Bold/Code/Links) -> gestyltes HTML
import fs from 'fs';

const [,, inFile, outFile] = process.argv;
let md = fs.readFileSync(inFile, 'utf8');

function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function inline(s) {
  s = esc(s);
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return s;
}
function slug(s) {
  return s.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, '').replace(/ /g, '-');
}

// Titelseite: alles bis zum ersten "---" abtrennen (wird als Header gerendert)
const lines = md.split('\n');
let start = 0;
for (let k = 0; k < lines.length; k++) { if (/^---\s*$/.test(lines[k])) { start = k + 1; break; } }
const srcLines = lines.slice(start);

let html = [];
let i = 0;
while (i < srcLines.length) {
  const line = srcLines[i];
  if (/^```/.test(line)) {
    const buf = []; i++;
    while (i < srcLines.length && !/^```/.test(srcLines[i])) { buf.push(esc(srcLines[i])); i++; }
    i++; // schließende Zäune
    html.push(`<pre><code>${buf.join('\n')}</code></pre>`);
    continue;
  }
  if (/^### /.test(line)) { html.push(`<h3>${inline(line.slice(4))}</h3>`); i++; continue; }
  if (/^## /.test(line)) { const t = line.slice(3); html.push(`<h2 id="${slug(t)}">${inline(t)}</h2>`); i++; continue; }
  if (/^# /.test(line)) { html.push(`<h1>${inline(line.slice(2))}</h1>`); i++; continue; }
  if (/^---\s*$/.test(line)) { html.push('<hr>'); i++; continue; }
  if (/^\|/.test(line)) {
    const rows = [];
    while (i < srcLines.length && /^\|/.test(srcLines[i])) { rows.push(srcLines[i]); i++; }
    const body = rows.filter(r => !/^\|[\s:|-]+\|$/.test(r));
    let t = '<table>';
    body.forEach((r, idx) => {
      const cells = r.split('|').slice(1, -1).map(c => c.trim());
      const tag = idx === 0 ? 'th' : 'td';
      t += '<tr>' + cells.map(c => `<${tag}>${inline(c)}</${tag}>`).join('') + '</tr>';
    });
    html.push(t + '</table>');
    continue;
  }
  if (/^- /.test(line) || /^\d+\. /.test(line)) {
    const ordered = /^\d+\. /.test(line);
    const tag = ordered ? 'ol' : 'ul';
    let list = `<${tag}>`;
    while (i < srcLines.length && (/^- /.test(srcLines[i]) || /^\d+\. /.test(srcLines[i]))) {
      list += `<li>${inline(srcLines[i].replace(/^(\d+\. |- )/, ''))}</li>`;
      i++;
    }
    html.push(list + `</${tag}>`);
    continue;
  }
  if (line.trim() === '') { i++; continue; }
  html.push(`<p>${inline(line)}</p>`);
  i++;
}

const body = html.join('\n');

// Anker-Check: alle href="#..." müssen ein passendes id haben
const ids = new Set([...body.matchAll(/id="([^"]+)"/g)].map(m => m[1]));
const hrefs = [...body.matchAll(/href="#([^"]+)"/g)].map(m => m[1]);
const missing = [...new Set(hrefs)].filter(h => !ids.has(h));

const css = `
:root { --mint:#87CF3E; --mint-dark:#5a9e2b; --ink:#24292f; --muted:#6a737d; }
* { box-sizing:border-box; }
body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
  max-width:880px; margin:0 auto; padding:24px 28px 60px; line-height:1.65; color:var(--ink); background:#fff; }
header { border-bottom:4px solid var(--mint); padding-bottom:18px; margin-bottom:28px; }
header .title { font-size:2em; margin:0 0 6px; }
header .subtitle { font-size:1.15em; color:var(--mint-dark); margin:0 0 4px; font-weight:600; }
header .meta { color:var(--muted); font-size:.9em; margin:0; }
h1 { font-size:1.7em; border-bottom:3px solid var(--mint); padding-bottom:8px; margin-top:1.6em; }
h2 { color:#3f7a1d; border-left:5px solid var(--mint); padding-left:12px; margin-top:2.2em; font-size:1.35em; }
h3 { margin-top:1.6em; font-size:1.1em; }
p, li { margin:.55em 0; }
pre { background:#1e2430; color:#dce4ee; padding:16px 20px; border-radius:10px; overflow-x:auto;
  font-size:.84em; line-height:1.5; margin:1em 0; }
pre code { background:none; padding:0; color:inherit; font-size:1em; }
code { background:#eef3ea; padding:2px 6px; border-radius:5px; font-size:.88em;
  font-family:'SF Mono',Menlo,Consolas,'Liberation Mono',monospace; }
table { border-collapse:collapse; width:100%; margin:1.1em 0; font-size:.93em; }
th { background:#f2f7ec; text-align:left; }
td, th { border:1px solid #d8dee4; padding:7px 12px; }
tr:nth-child(even) td { background:#fafcf7; }
a { color:var(--mint-dark); text-decoration:none; } a:hover { text-decoration:underline; }
hr { border:none; border-top:2px solid #e6ebe0; margin:2.4em 0; }
footer { margin-top:3em; padding-top:14px; border-top:2px solid #e6ebe0; color:var(--muted); font-size:.85em; }
@media print {
  body { max-width:100%; padding:0; font-size:11pt; }
  pre { background:#f4f6f2 !important; color:#111 !important; border:1px solid #ccc; white-space:pre-wrap; }
  pre code { color:#111 !important; }
  h2, h3 { page-break-after:avoid; } pre, table { page-break-inside:avoid; }
  a { color:#3f7a1d; }
}
`;

const out = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Linux Mint — Überlebenshandbuch</title>
<style>${css}</style>
</head>
<body>
<header>
  <p class="title">🐧 Linux Mint — Überlebenshandbuch</p>
  <p class="subtitle">Dein Wegweiser von Windows in die freie Welt</p>
  <p class="meta">Für alle, die technisch affin sind, aber noch nie mit Unix zu tun hatten · Stand: September 2026</p>
</header>
${body}
<footer>Gemacht mit ❤️ und <code>apt install</code> · Viel Erfolg — und willkommen in der freien Welt! 🐧</footer>
</body>
</html>`;

fs.writeFileSync(outFile, out);
console.log(`OK: ${outFile} (${(out.length/1024).toFixed(1)} KB)`);
if (missing.length) console.log('FEHLENDE ANKER: ' + missing.join(', '));
else console.log(`Anker-Check OK (${new Set(hrefs).size} Verweise)`);
