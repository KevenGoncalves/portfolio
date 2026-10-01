import type { Localized } from "../i18n/ui";

/**
 * Résumé content (both languages). Jobs, titles and dates come from experience.ts,
 * so the CV and the site's timeline always match; this file adds what only the CV shows.
 */

export const headline: Localized = {
  en: "Software developer focused on backend and native mobile development, with solid experience in object-oriented, functional and procedural programming and a broad knowledge of databases. A fast learner who enjoys solving hard problems.",
  pt: "Desenvolvedor de software focado em backend e desenvolvimento mobile nativo, com experiência sólida em programação orientada a objetos, funcional e procedural e amplo conhecimento de bases de dados. Aprendo rápido e gosto de resolver problemas difíceis.",
};

export const contacts = [
  { label: "keven.jm.goncalves@gmail.com", href: "mailto:keven.jm.goncalves@gmail.com" },
  { label: "+258 84 38 200 84", href: "tel:+258843820084" },
  { label: "github.com/KevenGoncalves", href: "https://github.com/KevenGoncalves" },
  { label: "linkedin.com/in/keven-gonçalves", href: "https://www.linkedin.com/in/keven-gon%C3%A7alves-5867661a9/" },
];

export const location: Localized = { en: "Beira, Mozambique", pt: "Beira, Moçambique" };

/** Bullet points per job, keyed by the company name used in experience.ts */
export const bullets: Record<string, Localized[]> = {
  "Cornelder de Moçambique": [
    {
      en: "Develop native mobile applications for Android (Kotlin, Jetpack Compose) and iOS, plus cross-platform work in Flutter.",
      pt: "Desenvolvo aplicações móveis nativas para Android (Kotlin, Jetpack Compose) e iOS, além de trabalho multiplataforma em Flutter.",
    },
    {
      en: "Use Python and LLMs to add automation and AI features to internal tools.",
      pt: "Uso Python e LLMs para trazer automação e funcionalidades de IA às ferramentas internas.",
    },
    {
      en: "Joined the Development Department as an intern and was hired full-time as a Software Developer.",
      pt: "Entrei no Departamento de Desenvolvimento como estagiário e fui contratado a tempo inteiro como Desenvolvedor de Software.",
    },
  ],
  OptiServ: [
    {
      en: "Advised the company on Android, iOS and web technologies as its technology consultant.",
      pt: "Aconselhei a empresa em tecnologias Android, iOS e web como consultor de tecnologia.",
    },
    { en: "Built the company website.", pt: "Desenvolvi o website da empresa." },
  ],
  "Fibec Táxi": [
    { en: "Built the iOS app for the Fibec Táxi service in Swift.", pt: "Desenvolvi a aplicação iOS do serviço Fibec Táxi em Swift." },
  ],
  "Grupo Lumai": [
    {
      en: "Built backend services in Go and TypeScript (Express) and web interfaces with Svelte, React and Next.js.",
      pt: "Desenvolvi serviços backend em Go e TypeScript (Express) e interfaces web com Svelte, React e Next.js.",
    },
    { en: "Built the Grupo Lumai company website.", pt: "Desenvolvi o website do Grupo Lumai." },
  ],
  "Universidade Zambeze": [
    {
      en: "Developed web applications at CETIC, the university's technology centre, with Node.js and Django.",
      pt: "Desenvolvi aplicações web no CETIC da universidade com Node.js e Django.",
    },
  ],
  "Txeka Lá": [
    {
      en: "Built backend and web features with TypeScript, PHP, Next.js and Express.",
      pt: "Desenvolvi funcionalidades backend e web com TypeScript, PHP, Next.js e Express.",
    },
  ],
  SavanaPoint: [
    {
      en: "Built full-stack web features with TypeScript, Next.js, Express and GraphQL.",
      pt: "Desenvolvi funcionalidades web full-stack com TypeScript, Next.js, Express e GraphQL.",
    },
  ],
  "Explicador Inc": [
    {
      en: "Tested web releases as QA tester, with continuous integration in Jenkins.",
      pt: "Testei versões web como testador de QA, com integração contínua no Jenkins.",
    },
    {
      en: "Ran penetration tests to find and report security issues.",
      pt: "Realizei testes de intrusão (pentesting) para encontrar e reportar falhas de segurança.",
    },
  ],
};

export const skills: { group: Localized; items: string }[] = [
  { group: { en: "Programming Languages", pt: "Linguagens de Programação" }, items: "Kotlin, Swift, TypeScript, JavaScript, Python, Go, Java, PHP, C/C++" },
  { group: { en: "Mobile", pt: "Mobile" }, items: "Jetpack Compose, SwiftUI, Kotlin Multiplatform, Flutter" },
  { group: { en: "Backend", pt: "Backend" }, items: "Node.js, NestJS, Express, Django, REST, GraphQL, RPC, MVC" },
  { group: { en: "Frontend", pt: "Frontend" }, items: "React, Next.js, Svelte, Angular, Vue.js, HTML5 & CSS3" },
  { group: { en: "Databases", pt: "Bases de Dados" }, items: "PostgreSQL, MySQL, MongoDB, Supabase, Firebase" },
  {
    group: { en: "Tools & Practices", pt: "Ferramentas e Práticas" },
    items: "Git & GitHub, CI (Jenkins), Agile, LLMs, Cybersecurity",
  },
];

export const education = [
  {
    degree: { en: "Bachelor's in Computer Engineering", pt: "Licenciatura em Engenharia Informática" } as Localized,
    school: "Universidade Zambeze",
    years: "2020 — 2025",
  },
];

export const languages: { name: Localized; level: Localized }[] = [
  { name: { en: "Portuguese", pt: "Português" }, level: { en: "Native", pt: "Nativo" } },
  { name: { en: "English", pt: "Inglês" }, level: { en: "Good — speaking, reading and writing", pt: "Bom — fala, leitura e escrita" } },
];

export const achievements: { year: string; text: Localized }[] = [
  {
    year: "2019",
    text: {
      en: "Captain of Mozambique's national robotics team at the FIRST Global Challenge, an international robotics competition.",
      pt: "Capitão da equipa nacional de robótica de Moçambique no FIRST Global Challenge, competição internacional de robótica.",
    },
  },
  {
    year: "2018",
    text: {
      en: "Captain of the Zambézia robotics team (Techs) at the National Robotics Competition in Maputo.",
      pt: "Capitão da equipa de robótica da Zambézia (Techs) nas Competições Nacionais de Robótica em Maputo.",
    },
  },
];
