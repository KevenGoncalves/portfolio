// Exports the résumé pages (/resume/ and /pt/resume/) to A4 PDFs in public/, using headless Chrome.
// Run with `pnpm resume:pdf` (it builds the site first, then again so the new PDFs are included).
// Set CHROME_PATH if Chrome isn't in the default macOS location.
import { spawn, execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { setTimeout as wait } from "node:timers/promises";

const CHROME = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 4399;
const pages = [
  { path: "/resume/", out: "public/resume-en.pdf" },
  { path: "/pt/resume/", out: "public/resume-pt.pdf" },
];

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
    execFileSync(CHROME, [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--virtual-time-budget=8000", // give the web fonts time to load
      `--print-to-pdf=${page.out}`,
      `http://localhost:${PORT}${page.path}`,
    ], { stdio: "ignore" });
    // A CV should fit on one page: warn if it spilled over (e.g. after adding a job)
    const pageCount = (readFileSync(page.out, "latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
    console.log(pageCount > 1 ? `⚠ ${page.out}: ${pageCount} pages (expected 1)` : `✓ ${page.out}`);
  }
} finally {
  preview.kill();
}
