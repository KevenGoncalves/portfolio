// Builds the animated images for the GitHub profile README (github-profile/):
// - banner.svg: the portfolio's header as an SVG, with the name glitching like the site (cyan/red ghosts,
//   slices tearing every few seconds) and the photo tearing on its own beat.
// - contact-*.svg: the email / LinkedIn / portfolio cards, each with a glitching icon and a tearing headline.
// GitHub shows SVG images with their CSS animations, but they can't load anything external,
// so the fonts and photo are embedded.
// Run `pnpm build` first (it reads the self-hosted fonts from dist/), then `pnpm github:banner`.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const OUT = "github-profile/banner.svg";

// Font files: the same self-hosted Oxanium/Poppins the site uses, found through the built page
const html = readFileSync("dist/index.html", "utf8");
const fontUrl = (family, weight) => {
  for (const face of html.match(/@font-face\{[^}]*\}/g) ?? []) {
    if (face.includes(`font-family:${family}`) && face.includes("url(") && face.match(/font-weight:([^;]+)/)?.[1].includes(weight)) {
      return face.match(/url\("?([^")]+)"?\)/)[1];
    }
  }
  throw new Error(`${family} ${weight} not found in dist/index.html (run pnpm build first)`);
};
const embed = (url) => readFileSync(`dist${url}`).toString("base64");
const oxanium = embed(fontUrl("Oxanium", "600"));
const poppins400 = embed(fontUrl("Poppins", "400"));
const poppins600 = embed(fontUrl("Poppins", "600"));

// Photo: grayscale like the site, small and compressed
const photo = (await sharp("src/assets/profile.png").resize(220).grayscale().jpeg({ quality: 78 }).toBuffer()).toString("base64");

const W = 1280;
const H = 360;
const NAME = "Keven Gonçalves";
const PHOTO = { x: 1000, y: 58, w: 200, h: 234 };

// The name, drawn three times: cyan ghost, red ghost, white on top
const name = (extra = "") => `
    <text x="61" y="176" fill="#00f0ff" class="name"${extra}>${NAME}</text>
    <text x="67" y="176" fill="#ff6467" class="name"${extra}>${NAME}</text>
    <text x="64" y="176" fill="#f4f4f5" class="name"${extra}>${NAME}</text>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Keven Gonçalves — Backend &amp; Mobile Developer. I make sauce, but not in the kitchen.">
  <style>
    @font-face { font-family: "Oxanium"; font-weight: 600 800; src: url(data:font/woff2;base64,${oxanium}) format("woff2"); }
    @font-face { font-family: "Poppins"; font-weight: 400; src: url(data:font/woff2;base64,${poppins400}) format("woff2"); }
    @font-face { font-family: "Poppins"; font-weight: 600; src: url(data:font/woff2;base64,${poppins600}) format("woff2"); }
    .name { font: 800 78px "Oxanium", sans-serif; letter-spacing: -1px; }
    .label { font: 600 14px "Oxanium", sans-serif; letter-spacing: 3px; }
    .role { font: 600 27px "Poppins", sans-serif; }
    .tagline { font: 400 21px "Poppins", sans-serif; }
    .sauce { font: 800 24px "Oxanium", sans-serif; }
    .meta { font: 600 13px "Oxanium", sans-serif; letter-spacing: 2.5px; }

    /* Tears: slices of the name / photo jump sideways for a moment, then snap back (like the site) */
    .tear { opacity: 0; animation: 3.6s steps(1, end) infinite; }
    .tear-a { animation-name: tear-a; }
    .tear-b { animation-name: tear-b; }
    .photo-tear { animation-duration: 8s; animation-name: photo-tear; }
    .cursor { animation: blink 1.1s steps(1, end) infinite; }
    @keyframes tear-a {
      0%, 86%, 100% { opacity: 0; transform: none; }
      88% { opacity: 1; transform: translateX(-12px); }
      91% { opacity: 1; transform: translateX(9px); }
      94% { opacity: 0; transform: none; }
    }
    @keyframes tear-b {
      0%, 86%, 100% { opacity: 0; transform: none; }
      88% { opacity: 1; transform: translateX(10px); }
      91% { opacity: 1; transform: translateX(-8px); }
      94% { opacity: 1; transform: translateX(5px); }
      96% { opacity: 0; transform: none; }
    }
    @keyframes photo-tear {
      0%, 94.6%, 100% { opacity: 0; transform: none; }
      94.6% { opacity: 1; transform: translateX(-7px); }
      96% { opacity: 1; transform: translateX(6px); }
      97.4% { opacity: 0; }
    }
    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
    @media (prefers-reduced-motion: reduce) { .tear, .cursor { animation: none; } }
  </style>

  <defs>
    <clipPath id="card"><rect width="${W}" height="${H}" rx="18"/></clipPath>
    <clipPath id="band-a"><rect x="0" y="132" width="${W}" height="9"/></clipPath>
    <clipPath id="band-b"><rect x="0" y="156" width="${W}" height="8"/></clipPath>
    <clipPath id="photo-band-a"><rect x="${PHOTO.x}" y="${PHOTO.y + 52}" width="${PHOTO.w}" height="12"/></clipPath>
    <clipPath id="photo-band-b"><rect x="${PHOTO.x}" y="${PHOTO.y + 150}" width="${PHOTO.w}" height="14"/></clipPath>
    <image id="photo" x="${PHOTO.x}" y="${PHOTO.y}" width="${PHOTO.w}" height="${PHOTO.h}" preserveAspectRatio="xMidYMid slice" href="data:image/jpeg;base64,${photo}" xlink:href="data:image/jpeg;base64,${photo}"/>
    <filter id="glow" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>

  <g clip-path="url(#card)">
    <!-- Background: near-black card with the site's diagonal band -->
    <rect width="${W}" height="${H}" fill="#09090b"/>
    <polygon points="880,0 1060,0 920,${H} 740,${H}" fill="#141416"/>
    <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="18" fill="none" stroke="#27272a"/>

    <!-- Label, like the site's section headings -->
    <text x="64" y="80" class="label"><tspan fill="#ff6467">01</tspan><tspan fill="#f4f4f5" dx="12">HELLO, WORLD</tspan><tspan fill="#f4f4f5" class="cursor" dx="4">_</tspan></text>

    <!-- Name with its glitch (each tear covers its slice of the name, then redraws it shifted) -->
    <g>${name()}</g>
    <g class="tear tear-a" clip-path="url(#band-a)"><rect x="30" y="130" width="740" height="13" fill="#09090b"/>${name()}</g>
    <g class="tear tear-b" clip-path="url(#band-b)"><rect x="30" y="154" width="740" height="12" fill="#09090b"/>${name()}</g>

    <!-- Role and tagline -->
    <text x="64" y="230" fill="#f4f4f5" class="role"><tspan font-family="Oxanium" font-weight="800">&lt;&gt;</tspan> Backend &amp; Mobile Developer</text>
    <text x="64" y="282" fill="#a1a1aa" class="tagline">I make <tspan class="sauce" fill="#ff6467" filter="url(#glow)">sauce</tspan>, but not in the kitchen</text>
    <rect x="64" y="306" width="56" height="4" fill="#ff6467"/>

    <!-- Photo with its offset frame, tearing on its own (slower) beat -->
    <rect x="${PHOTO.x + 16}" y="${PHOTO.y + 16}" width="${PHOTO.w}" height="${PHOTO.h}" fill="none" stroke="#52525b" stroke-width="1.5"/>
    <use href="#photo" xlink:href="#photo"/>
    <g class="tear photo-tear" clip-path="url(#photo-band-a)"><use href="#photo" xlink:href="#photo"/></g>
    <g class="tear photo-tear" clip-path="url(#photo-band-b)" style="animation-delay: -0.05s"><use href="#photo" xlink:href="#photo"/></g>

    <text x="${W - 64}" y="${H - 30}" fill="#71717a" class="meta" text-anchor="end">BEIRA, MOZAMBIQUE</text>
  </g>
</svg>
`;

// ---- Contact cards ----
// Tabler outline icons (MIT), the same family as the site's social icons
const ICONS = {
  mail: '<path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"/><path d="M3 7l9 6l9 -6"/>',
  linkedin: '<path d="M8 11v5"/><path d="M8 8v.01"/><path d="M12 16v-5"/><path d="M16 16v-3a2 2 0 1 0 -4 0"/><path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z"/>',
  globe: '<path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"/><path d="M3.6 9h16.8"/><path d="M3.6 15h16.8"/><path d="M11.5 3a17 17 0 0 0 0 18"/><path d="M12.5 3a17 17 0 0 1 0 18"/>',
};
const cards = [
  { file: "contact-email.svg", icon: "mail", label: "EMAIL", title: "Say hello", detail: "keven.jm.goncalves@gmail.com", delay: 0 },
  { file: "contact-linkedin.svg", icon: "linkedin", label: "LINKEDIN", title: "Let's connect", detail: "in/keven-gonçalves", delay: -1.5 },
  { file: "contact-portfolio.svg", icon: "globe", label: "PORTFOLIO", title: "See my work", detail: "Projects, experience & CV", delay: -3 },
];
const CW = 400;
const CH = 150;

// Card text goes into SVG (XML), so &, < and > must be escaped
const xml = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const card = ({ icon, label, title: rawTitle, detail: rawDetail, delay }) => {
  const title = xml(rawTitle);
  const detail = xml(rawDetail);
  // The icon, drawn three times like the name: cyan ghost, red ghost, white on top
  const glyph = (dx, color) => `<g transform="translate(${32 + dx} 30) scale(1.5)" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[icon]}</g>`;
  const headline = `
      <text x="31" y="112" fill="#00f0ff" class="title">${title}</text>
      <text x="35" y="112" fill="#ff6467" class="title">${title}</text>
      <text x="33" y="112" fill="#f4f4f5" class="title">${title}</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CW} ${CH}" width="${CW}" height="${CH}" role="img" aria-label="${label.toLowerCase()}: ${detail}">
  <style>
    @font-face { font-family: "Oxanium"; font-weight: 600 800; src: url(data:font/woff2;base64,${oxanium}) format("woff2"); }
    @font-face { font-family: "Poppins"; font-weight: 400; src: url(data:font/woff2;base64,${poppins400}) format("woff2"); }
    .label { font: 600 12px "Oxanium", sans-serif; letter-spacing: 2.5px; }
    .title { font: 800 30px "Oxanium", sans-serif; }
    .detail { font: 400 14px "Poppins", sans-serif; }
    .tear { opacity: 0; animation: tear 4.5s steps(1, end) ${delay}s infinite; }
    @keyframes tear {
      0%, 88%, 100% { opacity: 0; transform: none; }
      89.5% { opacity: 1; transform: translateX(-8px); }
      92% { opacity: 1; transform: translateX(6px); }
      94.5% { opacity: 0; transform: none; }
    }
    @media (prefers-reduced-motion: reduce) { .tear { animation: none; } }
  </style>
  <defs>
    <clipPath id="c"><rect width="${CW}" height="${CH}" rx="16"/></clipPath>
    <clipPath id="band"><rect x="0" y="94" width="${CW}" height="7"/></clipPath>
  </defs>
  <g clip-path="url(#c)">
    <rect width="${CW}" height="${CH}" fill="#09090b"/>
    <polygon points="${CW - 120},0 ${CW - 40},0 ${CW - 90},${CH} ${CW - 170},${CH}" fill="#141416"/>
    <rect x="0.5" y="0.5" width="${CW - 1}" height="${CH - 1}" rx="16" fill="none" stroke="#27272a"/>

    <!-- Icon with its cyan/red split -->
    ${glyph(-1.5, "#00f0ff")}${glyph(1.5, "#ff6467")}${glyph(0, "#f4f4f5")}

    <!-- Arrow, top right -->
    <g transform="translate(${CW - 52} 26)" fill="none" stroke="#71717a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></g>

    <text x="88" y="52" fill="#ff6467" class="label">${label}</text>

    <!-- Headline, tearing every few seconds -->
    <g>${headline}</g>
    <g class="tear" clip-path="url(#band)"><rect x="20" y="92" width="225" height="11" fill="#09090b"/>${headline}</g>

    <text x="33" y="134" fill="#a1a1aa" class="detail">${detail}</text>

    <!-- Glitch accent: cyan and red halves -->
    <rect x="0" y="${CH - 3}" width="${CW / 2}" height="3" fill="#00f0ff"/>
    <rect x="${CW / 2}" y="${CH - 3}" width="${CW / 2}" height="3" fill="#ff6467"/>
  </g>
</svg>
`;
};

mkdirSync("github-profile", { recursive: true });
writeFileSync(OUT, svg);
console.log(`✓ ${OUT} (${Math.round(svg.length / 1024)} KB)`);
for (const c of cards) {
  const out = `github-profile/${c.file}`;
  const content = card(c);
  writeFileSync(out, content);
  console.log(`✓ ${out} (${Math.round(content.length / 1024)} KB)`);
}
