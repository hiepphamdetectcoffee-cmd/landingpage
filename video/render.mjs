// Render an HTML scene file to public/video/<name>.mp4 (+ poster JPG). Needs ffmpeg + Playwright.
// Intro (16:9): node video/render.mjs
// Ad (9:16):    node video/render.mjs --src video/ad/ad.html --name msvan-ad-9x16 --w 1080 --h 1920 --poster 1.2 --music video/ad/music.wav
// Snapshots:    add --snap 1,6,14 [--out dir]
import { spawn, execFileSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

// CommonJS require so a globally installed Playwright (NODE_PATH) also works.
const { chromium } = createRequire(import.meta.url)('playwright');

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const outDir = path.join(root, 'public', 'video');
mkdirSync(outDir, { recursive: true });

const arg = (name, def) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : def;
};
const fps = Number(arg('fps', 30));
const src = path.resolve(root, arg('src', 'video/intro.html'));
const name = arg('name', 'msvan-intro');
const W = Number(arg('w', 1920)), H = Number(arg('h', 1080));
const posterAt = Number(arg('poster', 9.5));
const music = path.resolve(root, arg('music', 'video/music.wav'));
const snap = arg('snap', null);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(src).href);
await page.evaluate(() => document.fonts.ready);
const total = await page.evaluate(() => window.TOTAL);

const frameAt = async (t, type = 'jpeg') => {
  await page.evaluate((s) => window.seek(s), t);
  return page.screenshot({ type, quality: type === 'jpeg' ? 92 : undefined });
};

if (snap) {
  const snapDir = arg('out', path.join(here, 'snaps'));
  mkdirSync(snapDir, { recursive: true });
  for (const t of snap.split(',').map(Number)) {
    await page.evaluate((s) => window.seek(s), t);
    await page.screenshot({ path: path.join(snapDir, `t${t}.jpg`), type: 'jpeg', quality: 80 });
  }
  await browser.close();
  process.exit(0);
}

const silent = path.join(outDir, `.${name}-silent.mp4`);
const ff = spawn('ffmpeg', [
  '-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
  '-c:v', 'libx264', '-profile:v', 'main', '-level', '4.0', '-preset', 'slow', '-crf', '22', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', silent,
], { stdio: ['pipe', 'inherit', 'inherit'] });

const frames = Math.round(total * fps);
for (let i = 0; i < frames; i++) {
  const buf = await frameAt(i / fps);
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
  if (i % fps === 0) process.stdout.write(`\r${(i / fps).toFixed(0)}s / ${total}s`);
}
ff.stdin.end();
await new Promise((r, j) => ff.on('close', (c) => (c === 0 ? r() : j(new Error(`ffmpeg exit ${c}`)))));

// Poster: the hook scene
await page.evaluate((s) => window.seek(s), posterAt);
await page.screenshot({ path: path.join(outDir, `${name}-poster.jpg`), type: 'jpeg', quality: 85 });
await browser.close();

// Mux background music if present (generate with: python3 video/music.py)
const out = path.join(outDir, `${name}.mp4`);
if (existsSync(music)) {
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', silent, '-i', music, '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k',
    '-shortest', '-movflags', '+faststart', out]);
  execFileSync('rm', [silent]);
} else {
  execFileSync('mv', [silent, out]);
}
console.log(`\nWrote ${out}`);
