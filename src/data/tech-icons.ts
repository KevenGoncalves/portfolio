import {
  siGo,
  siJenkins,
  siJetpackcompose,
  siKotlin,
  siNextdotjs,
  siPhp,
  siTypescript,
  siVuedotjs,
  type SimpleIcon,
} from "simple-icons";

export type TechIcon = {
  /** SVG path for a 24×24 viewBox */
  path: string;
  /** Brand colour shown on hover */
  color: string;
};

/** Brand colours too dark to see on the site's dark background (e.g. Next.js is black) show as white instead */
const visibleColor = (hex: string) => {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 0.15 ? "#f4f4f5" : `#${hex}`;
};

const icon = (si: SimpleIcon): TechIcon => ({ path: si.path, color: visibleColor(si.hex) });

/**
 * Technology name (as written in experience.ts) → Simple Icons icon.
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
};
