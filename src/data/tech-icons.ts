import {
  siAndroid,
  siDjango,
  siExpress,
  siFirebase,
  siFlutter,
  siGo,
  siGraphql,
  siIos,
  siJenkins,
  siJetpackcompose,
  siKotlin,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPython,
  siReact,
  siSvelte,
  siSwift,
  siTypescript,
  siVuedotjs,
  type SimpleIcon,
} from "simple-icons";

export type TechIcon = {
  /** SVG path for a 24×24 viewBox */
  path: string;
  /** Brand colour shown on hover */
  color: string;
  /** Draw the path as an outline instead of a filled shape */
  stroke?: boolean;
};

/** Brand colours too dark to see on the dark theme (e.g. Next.js is black) use the theme's text colour instead */
const visibleColor = (hex: string) => {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 0.15 ? "var(--color-zinc-100)" : `#${hex}`; // zinc-100 flips with the theme
};

const icon = (si: SimpleIcon): TechIcon => ({ path: si.path, color: visibleColor(si.hex) });

/** Generic "AI sparkle" (no single brand logo stands for LLMs in general) */
const sparkles: TechIcon = {
  path:
    "M10 2.5Q11 9 17.5 10Q11 11 10 17.5Q9 11 2.5 10Q9 9 10 2.5Z" +
    "M18 14.5Q18.5 17.5 21.5 18Q18.5 18.5 18 21.5Q17.5 18.5 14.5 18Q17.5 17.5 18 14.5Z" +
    "M19 2.5Q19.3 4.2 21 4.5Q19.3 4.8 19 6.5Q18.7 4.8 17 4.5Q18.7 4.2 19 2.5Z",
  color: "#a78bfa", // violet-400
};

/** Generic globe for "web technologies" in general (outline icon) */
const globe: TechIcon = {
  path:
    "M12 2.5a9.5 9.5 0 1 0 0 19a9.5 9.5 0 1 0 0-19Z" +
    "M2.5 12h19M4 7.5h16M4 16.5h16" +
    "M12 2.5c-2.6 2.6-4 5.8-4 9.5s1.4 6.9 4 9.5M12 2.5c2.6 2.6 4 5.8 4 9.5s-1.4 6.9-4 9.5",
  color: "#38bdf8", // sky-400
  stroke: true,
};

/**
 * Technology name (as written in experience.ts) → icon (from Simple Icons, or a custom one like `sparkles`).
 * Technologies missing here fall back to a text pill.
 */
export const techIcons: Record<string, TechIcon> = {
  Kotlin: icon(siKotlin),
  "Android Jetpack": icon(siJetpackcompose),
  Go: icon(siGo),
  TypeScript: icon(siTypescript),
  PHP: icon(siPhp),
  "Next.js": icon(siNextdotjs),
  Jenkins: icon(siJenkins),
  "Vue.js": icon(siVuedotjs),
  Python: icon(siPython),
  iOS: icon(siIos),
  Express: icon(siExpress),
  Svelte: icon(siSvelte),
  React: icon(siReact),
  GraphQL: icon(siGraphql),
  Firebase: icon(siFirebase),
  LLMs: sparkles,
  Android: icon(siAndroid),
  Web: globe,
  "Node.js": icon(siNodedotjs),
  Django: icon(siDjango),
  Flutter: icon(siFlutter),
  Swift: icon(siSwift),
};
