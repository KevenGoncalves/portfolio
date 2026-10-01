// Renders the link-preview image (public/og.png, 1200×630) from a small HTML card in the site's style,
// using headless Chrome. Run with `pnpm og:image` after changing the name, role, tagline or photo.
// Set CHROME_PATH if Chrome isn't in the default macOS location.
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const CHROME = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = resolve("public/og.png");
const photo = pathToFileURL(resolve("src/assets/profile.png")).href;

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@700;800&family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
<style>
  * { margin: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body {
    position: relative;
    display: flex;
    align-items: center;
    gap: 72px;
    padding: 0 88px;
    background: #000;
    font-family: Poppins, sans-serif;
    color: #a1a1aa;
  }
  /* The site's diagonal background band */
  body::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(115deg, transparent 0 34%, #1a1a1b 34% 58%, transparent 58%);
  }
  .text, .photo { position: relative; }
  .text { flex: 1; }
  h1 { font-family: Oxanium, sans-serif; font-weight: 800; font-size: 84px; line-height: 1; letter-spacing: -0.02em; color: #f4f4f5; }
  .role { margin-top: 22px; font-size: 34px; font-weight: 600; color: #f4f4f5; }
  .role span { font-family: Oxanium, sans-serif; margin-right: 10px; }
  .tagline { margin-top: 30px; font-size: 28px; }
  .sauce {
    padding: 0 6px;
    font-family: Oxanium, sans-serif;
    font-weight: 800;
    font-size: 1.15em;
    color: #ff6467;
    background: rgb(255 100 103 / 0.22);
    text-shadow: 0 0 14px rgb(255 100 103 / 0.45);
  }
  .accent { margin-top: 44px; width: 64px; height: 4px; background: #ff6467; }
  .photo { width: 300px; flex-shrink: 0; }
  .photo::before {
    content: "";
    position: absolute;
    inset: 0;
    border: 2px solid #71717a;
    transform: translate(20px, 20px);
  }
  .photo div { position: relative; background: #e4e4e7; }
  .photo img { display: block; width: 100%; filter: grayscale(1); }
</style>
</head>
<body>
  <div class="text">
    <h1>Keven Gonçalves</h1>
    <p class="role"><span>&lt;&gt;</span>Backend &amp; Mobile Developer</p>
    <p class="tagline">I make <span class="sauce">sauce</span>, but not in the kitchen</p>
    <div class="accent"></div>
  </div>
  <div class="photo"><div><img src="${photo}" alt="" /></div></div>
</body>
</html>`;

const dir = mkdtempSync(join(tmpdir(), "og-"));
const page = join(dir, "og.html");
writeFileSync(page, html);
try {
  execFileSync(CHROME, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--allow-file-access-from-files",
    "--virtual-time-budget=8000", // give the web fonts and photo time to load
    "--window-size=1200,630",
    `--screenshot=${OUT}`,
    pathToFileURL(page).href,
  ], { stdio: "ignore" });
  console.log(`✓ ${OUT}`);
} finally {
  rmSync(dir, { recursive: true, force: true });
}
