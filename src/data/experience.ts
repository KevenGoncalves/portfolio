import type { ImageMetadata } from "astro";
import cornelder from "../assets/companies/cornelder.png";
import lumai from "../assets/companies/lumai.png";
// The full Txeka-lá wordmark (txeka-la.png) is too wide for the square tile, so the tile uses its icon
import txekaLa from "../assets/companies/txeka-la-icon.png";
import savanaPoint from "../assets/companies/savanapoint.png";
import explicador from "../assets/companies/explicador.png";
import optiServ from "../assets/companies/optiserv.svg";
import fibecTaxi from "../assets/companies/fibec-taxi.png";
import uniZambeze from "../assets/companies/unizambeze.png";

export type Role = {
  title: string;
  /** Employment type, e.g. "Full-time" or "Internship" */
  type?: string;
  /** "YYYY-MM" */
  start: string;
  /** "YYYY-MM"; leave out for the current role */
  end?: string;
};

export type Job = {
  company: string;
  logo: ImageMetadata;
  location?: string;
  url?: string;
  /** Most recent first; several roles at the same company show as a promotion ladder */
  roles: Role[];
  description?: string;
  links?: { label: string; url: string }[];
  tech: string[];
};

export const experience: Job[] = [
  {
    company: "Cornelder de Moçambique",
    logo: cornelder,
    location: "Beira, Mozambique · On-site",
    roles: [
      { title: "Software Developer", type: "Full-time", start: "2025-04" },
      { title: "Application Development Intern", type: "Internship", start: "2024-03", end: "2025-03" },
    ],
    tech: ["Kotlin", "Android Jetpack", "Android", "Flutter", "Python", "iOS", "LLMs"],
  },
  {
    company: "OptiServ",
    logo: optiServ,
    location: "Beira, Mozambique · Remote",
    roles: [{ title: "Tech Consultant", start: "2024-03", end: "2025-03" }],
    tech: ["Android", "iOS", "Web"],
  },
  {
    company: "Fibec Táxi",
    logo: fibecTaxi,
    location: "Maputo, Mozambique · Remote",
    roles: [{ title: "iOS Developer", start: "2024-01", end: "2024-06" }],
    tech: ["Swift", "iOS"],
  },
  {
    company: "Grupo Lumai",
    logo: lumai,
    location: "Beira, Mozambique",
    roles: [{ title: "Full Stack Developer", type: "Full-time", start: "2023-03", end: "2024-03" }],
    tech: ["Go", "TypeScript", "Express", "Svelte", "Next.js", "React"],
  },
  {
    company: "Universidade Zambeze",
    logo: uniZambeze,
    location: "Beira, Mozambique · Hybrid",
    roles: [{ title: "Web Developer", type: "Internship", start: "2022-10", end: "2022-12" }],
    tech: ["Node.js", "Django"],
  },
  {
    company: "Txeka Lá",
    logo: txekaLa,
    location: "Beira, Mozambique · On-site",
    roles: [{ title: "Full Stack Developer", type: "Full-time", start: "2022-09", end: "2023-03" }],
    tech: ["TypeScript", "PHP", "Next.js", "Express"],
  },
  {
    company: "SavanaPoint",
    logo: savanaPoint,
    location: "Beira, Mozambique",
    roles: [{ title: "Full Stack Developer", start: "2021-10", end: "2022-09" }],
    tech: ["TypeScript", "Next.js", "Express", "GraphQL"],
  },
  {
    company: "Explicador Inc",
    logo: explicador,
    location: "Maputo, Mozambique",
    roles: [{ title: "Software Quality Assurance Tester", type: "Internship", start: "2021-03", end: "2022-09" }],
    tech: ["Jenkins", "Vue.js", "Firebase"],
  },
];

/* ---------- Date helpers (periods and durations are worked out at build time) ---------- */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const parse = (ym: string) => {
  const [year, month] = ym.split("-").map(Number);
  return { year, month };
};

const thisMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
};

/** "Mar 2024 — Present" */
export const formatPeriod = (start: string, end?: string) => {
  const s = parse(start);
  const e = end ? parse(end) : null;
  return `${MONTHS[s.month - 1]} ${s.year} — ${e ? `${MONTHS[e.month - 1]} ${e.year}` : "Present"}`;
};

/** "March 2024 to Present", for screen readers */
export const formatPeriodLabel = (start: string, end?: string) => {
  const s = parse(start);
  const e = end ? parse(end) : null;
  return `${MONTHS_LONG[s.month - 1]} ${s.year} to ${e ? `${MONTHS_LONG[e.month - 1]} ${e.year}` : "Present"}`;
};

/** "2 yrs 8 mos", counting both the first and last month (like LinkedIn) */
export const formatDuration = (start: string, end?: string) => {
  const s = parse(start);
  const e = parse(end ?? thisMonth());
  const total = (e.year - s.year) * 12 + (e.month - s.month) + 1;
  const years = Math.floor(total / 12);
  const months = total % 12;
  const parts = [];
  if (years) parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  if (months) parts.push(`${months} ${months === 1 ? "mo" : "mos"}`);
  return parts.join(" ");
};

/** Overall span of a job across all its roles */
export const jobSpan = (job: Job) => {
  const starts = job.roles.map((role) => role.start).sort();
  const current = job.roles.some((role) => !role.end);
  const ends = job.roles.map((role) => role.end).filter((end): end is string => Boolean(end)).sort();
  return { start: starts[0], end: current ? undefined : ends[ends.length - 1], current };
};
