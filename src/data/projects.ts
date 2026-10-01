import type { ImageMetadata } from "astro";
import jhcStowageSystem from "../assets/projects/jhc-stowage-system.webp";
import tmbTransportSystem from "../assets/projects/tmb-transport-system.webp";

export type Project = {
  title: string;
  url?: string;
  description: string;
  image: ImageMetadata;
  /** Describes the screenshot for screen readers */
  imageAlt: string;
  /** Technology names, matching the keys in tech-icons.ts */
  tech?: string[];
};

export const projects: Project[] = [
  {
    title: "JHC Stowage System",
    url: "https://app.jhcxigolo.co.mz/",
    description:
      "Operations platform for stevedoring work in Mozambique: tracks cargo operations, assigns crews to daily shifts and shows labour costs in real time.",
    image: jhcStowageSystem,
    imageAlt: "JHC Stowage System operations dashboard showing ongoing operations, requisitions and critical stock",
  },
  {
    title: "TMB Transport System",
    url: "https://tmb.co.mz/",
    description:
      "Ticketing and fleet platform for public transport in Mozambique: ticket sales, routes, fares and passes, with real-time revenue and peak-hour analytics.",
    image: tmbTransportSystem,
    imageAlt: "TMB Transport System dashboard showing revenue, tickets sold, sales over time and peak hours",
  },
];
