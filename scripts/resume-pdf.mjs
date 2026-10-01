// Exports the résumé pages (/resume/ and /pt/resume/) to A4 PDFs with headless Chrome, from the site that
// `astro build` just produced. Runs as part of `pnpm build`, so the downloadable PDFs always match the résumé.
// Each PDF is written to dist/ (this build) and public/ (so the committed copy stays current too).
// No Chrome (e.g. a hosting build server): it skips with a note and the committed PDFs in public/ are used.
// Set CHROME_PATH if Chrome isn't in the default macOS location.
import { spawn, execFileSync } from "node:child_process";
import { copyFileSync, existsSync, readFileSync } from "node:fs";
import { setTimeout as wait } from "node:timers/promises";

const CHROME = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 4399;
const pages = [
  { path: "/resume/", file: "resume-en.pdf" },
  { path: "/pt/resume/", file: "resume-pt.pdf" },
];

if (!existsSync(CHROME)) {
  console.log(`↷ Résumé PDFs skipped: Chrome not found (set CHROME_PATH). Using the committed copies in public/.`);
  process.exit(0);
}
if (!existsSync("dist/resume/index.html")) {
  console.error("✗ Run `astro build` first: dist/resume/ is missing.");
  process.exit(1);
}

const preview = spawn("pnpm", ["astro", "preview", "--port", String(PORT)], { stdio: "ignore" });

try {
  // Wait for the preview server to answer
  for (let i = 0; ; i++) {
    try {
      if ((await fetch(`http://localhost:${PORT}/resume/`)).ok) break;
    } catch {}
    if (i > 50) throw new Error("Preview server didn't start");
    await wait(200);
  }

  for (const page of pages) {
    const out = `dist/${page.file}`;
    execFileSync(CHROME, [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--virtual-time-budget=8000", // give the web fonts time to load
      `--print-to-pdf=${out}`,
      `http://localhost:${PORT}${page.path}`,
    ], { stdio: "ignore" });
    copyFileSync(out, `public/${page.file}`);
    // A CV should fit on one page: warn if it spilled over (e.g. after adding a job)
    const pageCount = (readFileSync(out, "latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
    console.log(pageCount > 1 ? `⚠ ${page.file}: ${pageCount} pages (expected 1)` : `✓ ${page.file}`);
  }
} finally {
  preview.kill();
}
