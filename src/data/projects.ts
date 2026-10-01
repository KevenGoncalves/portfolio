import type { ImageMetadata } from "astro";
import jhcStowageSystem from "../assets/projects/jhc-stowage-system.svg";
import tmbTransportSystem from "../assets/projects/tmb-transport-system.svg";
import dynamis from "../assets/projects/dynamis.svg";
import academicoPortal from "../assets/projects/academico-portal.svg";
import companyWebsites from "../assets/projects/company-websites.svg";

export type Project = {
  title: string;
  url?: string;
  description: string;
  image: ImageMetadata;
  /** Describes the image for screen readers */
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
    imageAlt: "Illustration of a container ship seen from above, with a quay crane lowering a container into its stowage slot",
  },
  {
    title: "TMB Transport System",
    url: "https://tmb.co.mz/",
    description:
      "Ticketing and fleet platform for public transport in Mozambique: ticket sales, routes, fares and passes, with real-time revenue and peak-hour analytics.",
    image: tmbTransportSystem,
    imageAlt: "Illustration of a bus arriving at a stop on a highlighted route map, next to a peak-hours bar chart",
  },
  {
    title: "Dynamis",
    url: "https://dynamiis.app/",
    description: "Point-of-sale app to manage products, run sales sessions and print receipts at the counter.",
    image: dynamis,
    imageAlt: "Illustration of a point-of-sale terminal with a selected product and a receipt printing next to it",
  },
  {
    title: "Acadêmico-Portal",
    // Link not available yet: add `url` when it is, and the title becomes a link
    description: "Student app for Universidade Católica de Moçambique, bringing students' academic life into one place.",
    image: academicoPortal,
    imageAlt: "Illustration of a student app on a phone, next to a class timetable, a graduation cap and semester progress",
  },
  {
    title: "Company Websites",
    description: "Company websites built for i2a, Grupo Lumai, OptiServ, JHC and Minds.",
    image: companyWebsites,
    imageAlt: "Illustration of three stacked company websites in browser windows, with the front one also shown on a phone",
  },
];
