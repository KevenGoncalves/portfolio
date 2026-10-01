import type { ImageMetadata } from "astro";
import type { Lang, Localized } from "../i18n/ui";
// Emblem only: the full logo with the "Cornelder" wordmark (cornelder-full.png) is too tall for the small logo slot
import cornelder from "../assets/companies/cornelder.png";
import lumai from "../assets/companies/lumai.png";
// The full Txeka-lá wordmark (txeka-la.png) is too wide for the square tile, so the tile uses its icon
import txekaLa from "../assets/companies/txeka-la-icon.png";
import savanaPoint from "../assets/companies/savanapoint.png";
import explicador from "../assets/companies/explicador.png";
import optiServ from "../assets/companies/optiserv.svg";
import fibecTaxi from "../assets/companies/fibec-taxi.png";
import uniZambeze from "../assets/companies/unizambeze.png";

/** Translated through the "experience.*" keys in i18n/ui.ts */
export type EmploymentType = "fullTime" | "internship";
export type Workplace = "onSite" | "remote" | "hybrid";

export type Role = {
  title: Localized;
  type?: EmploymentType;
  /** "YYYY-MM" */
  start: string;
  /** "YYYY-MM"; leave out for the current role */
  end?: string;
};

export type Job = {
  company: string;
  logo: ImageMetadata;
  /** City in Mozambique, plus how the work was done */
  location?: { city: string; workplace?: Workplace };
  url?: string;
  /** Most recent first; several roles at the same company show as a promotion ladder */
  roles: Role[];
  description?: Localized;
  links?: { label: string; url: string }[];
  tech: string[];
};

const fullStack: Localized = { en: "Full Stack Developer", pt: "Desenvolvedor Full Stack" };

export const experience: Job[] = [
  {
    company: "Cornelder de Moçambique",
    logo: cornelder,
    location: { city: "Beira", workplace: "onSite" },
    roles: [
      { title: { en: "Software Developer", pt: "Desenvolvedor de Software" }, type: "fullTime", start: "2025-04" },
      { title: { en: "Application Development Intern", pt: "Estagiário de Desenvolvimento de Aplicações" }, type: "internship", start: "2024-03", end: "2025-03" },
    ],
    tech: ["Kotlin", "Android Jetpack", "Android", "Flutter", "Python", "iOS", "LLMs"],
  },
  {
    company: "OptiServ",
    logo: optiServ,
    location: { city: "Beira", workplace: "remote" },
    roles: [{ title: { en: "Tech Consultant", pt: "Consultor de Tecnologia" }, start: "2024-03", end: "2025-03" }],
    tech: ["Android", "iOS", "Web"],
  },
  {
    company: "Fibec Táxi",
    logo: fibecTaxi,
    location: { city: "Maputo", workplace: "remote" },
    roles: [{ title: { en: "iOS Developer", pt: "Desenvolvedor iOS" }, start: "2024-01", end: "2024-06" }],
    tech: ["Swift", "iOS"],
  },
  {
    company: "Grupo Lumai",
    logo: lumai,
    location: { city: "Beira" },
    roles: [{ title: fullStack, type: "fullTime", start: "2023-03", end: "2024-03" }],
    tech: ["Go", "TypeScript", "Express", "Svelte", "Next.js", "React"],
  },
  {
    company: "Universidade Zambeze",
    logo: uniZambeze,
    location: { city: "Beira", workplace: "hybrid" },
    roles: [{ title: { en: "Web Developer", pt: "Desenvolvedor Web" }, type: "internship", start: "2022-10", end: "2022-12" }],
    tech: ["Node.js", "Django"],
  },
  {
    company: "Txeka Lá",
    logo: txekaLa,
    location: { city: "Beira", workplace: "onSite" },
    roles: [{ title: fullStack, type: "fullTime", start: "2022-09", end: "2023-03" }],
    tech: ["TypeScript", "PHP", "Next.js", "Express"],
  },
  {
    company: "SavanaPoint",
    logo: savanaPoint,
    location: { city: "Beira" },
    roles: [{ title: fullStack, start: "2021-10", end: "2022-09" }],
    tech: ["TypeScript", "Next.js", "Express", "GraphQL"],
  },
  {
    company: "Explicador Inc",
    logo: explicador,
    location: { city: "Maputo" },
    roles: [{ title: { en: "Software Quality Assurance Tester", pt: "Testador de Software (QA)" }, type: "internship", start: "2021-03", end: "2021-09" }],
    tech: ["Jenkins", "Vue.js", "Firebase"],
  },
];

/* ---------- Date helpers (periods and durations are worked out at build time) ---------- */

const MONTHS: Record<Lang, string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  pt: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
};
const MONTHS_LONG: Record<Lang, string[]> = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  pt: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
};
const PRESENT: Record<Lang, string> = { en: "Present", pt: "Presente" };

const parse = (ym: string) => {
  const [year, month] = ym.split("-").map(Number);
  return { year, month };
};

const thisMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
};

/** "Mar 2024 — Present" / "Mar 2024 — Presente" */
export const formatPeriod = (start: string, end: string | undefined, lang: Lang) => {
  const s = parse(start);
  const e = end ? parse(end) : null;
  return `${MONTHS[lang][s.month - 1]} ${s.year} — ${e ? `${MONTHS[lang][e.month - 1]} ${e.year}` : PRESENT[lang]}`;
};

/** "March 2024 to Present" / "março de 2024 até Presente", for screen readers */
export const formatPeriodLabel = (start: string, end: string | undefined, lang: Lang) => {
  const s = parse(start);
  const e = end ? parse(end) : null;
  const month = (m: number, y: number) => (lang === "pt" ? `${MONTHS_LONG.pt[m - 1]} de ${y}` : `${MONTHS_LONG.en[m - 1]} ${y}`);
  const to = lang === "pt" ? "até" : "to";
  return `${month(s.month, s.year)} ${to} ${e ? month(e.month, e.year) : PRESENT[lang]}`;
};

/** "2 yrs 8 mos" / "2 anos 8 meses", counting both the first and last month (like LinkedIn) */
export const formatDuration = (start: string, end: string | undefined, lang: Lang) => {
  const s = parse(start);
  const e = parse(end ?? thisMonth());
  const total = (e.year - s.year) * 12 + (e.month - s.month) + 1;
  const years = Math.floor(total / 12);
  const months = total % 12;
  const words = lang === "pt" ? { yr: ["ano", "anos"], mo: ["mês", "meses"] } : { yr: ["yr", "yrs"], mo: ["mo", "mos"] };
  const parts = [];
  if (years) parts.push(`${years} ${words.yr[years === 1 ? 0 : 1]}`);
  if (months) parts.push(`${months} ${words.mo[months === 1 ? 0 : 1]}`);
  return parts.join(" ");
};

/** Overall span of a job across all its roles */
export const jobSpan = (job: Job) => {
  const starts = job.roles.map((role) => role.start).sort();
  const current = job.roles.some((role) => !role.end);
  const ends = job.roles.map((role) => role.end).filter((end): end is string => Boolean(end)).sort();
  return { start: starts[0], end: current ? undefined : ends[ends.length - 1], current };
};
