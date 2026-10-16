import type { ImageMetadata } from "astro";
import type { Localized } from "../i18n/ui";
import jhcStowageSystem from "../assets/projects/jhc-stowage-system.svg";
import tmbTransportSystem from "../assets/projects/tmb-transport-system.svg";
import dynamis from "../assets/projects/dynamis.svg";
import academicoPortal from "../assets/projects/academico-portal.svg";
import companyWebsites from "../assets/projects/company-websites.svg";
import lig from "../assets/projects/lig.svg";

export type Project = {
  title: Localized;
  url?: string;
  description: Localized;
  image: ImageMetadata;
  /** Describes the image for screen readers */
  imageAlt: Localized;
  /** Technology names, matching the keys in tech-icons.ts */
  tech?: string[];
};

/** For names that are the same in both languages */
const same = (text: string): Localized => ({ en: text, pt: text });

export const projects: Project[] = [
  {
    title: same("Lig"),
    url: "https://github.com/KevenGoncalves/lig",
    description: {
      en: "IDE-style autocomplete for the Linux terminal, written in Rust: subcommands, options, branches and packages in a popup as you type, for zsh and bash.",
      pt: "Autocompletar ao estilo de um IDE para o terminal Linux, escrito em Rust: subcomandos, opções, branches e pacotes num popup enquanto escreve, em zsh e bash.",
    },
    image: lig,
    imageAlt: {
      en: "Illustration of a terminal with a suggestion popup under the cursor, next to the Tab and Enter keys",
      pt: "Ilustração de um terminal com um popup de sugestões sob o cursor, ao lado das teclas Tab e Enter",
    },
  },
  {
    title: same("JHC Stowage System"),
    url: "https://app.jhcxigolo.co.mz/",
    description: {
      en: "Operations platform for stevedoring work in Mozambique: tracks cargo operations, assigns crews to daily shifts and shows labour costs in real time.",
      pt: "Plataforma de operações de estiva em Moçambique: acompanha as operações de carga, escala equipas por turno e mostra os custos de mão de obra em tempo real.",
    },
    image: jhcStowageSystem,
    imageAlt: {
      en: "Illustration of a container ship seen from above, with a quay crane lowering a container into its stowage slot",
      pt: "Ilustração de um navio porta-contentores visto de cima, com um pórtico a baixar um contentor para o seu lugar",
    },
  },
  {
    title: same("TMB Transport System"),
    url: "https://tmb.co.mz/",
    description: {
      en: "Ticketing and fleet platform for public transport in Mozambique: ticket sales, routes, fares and passes, with real-time revenue and peak-hour analytics.",
      pt: "Plataforma de bilhética e frota para transporte público em Moçambique: venda de bilhetes, rotas, tarifas e passes, com receitas e horas de pico em tempo real.",
    },
    image: tmbTransportSystem,
    imageAlt: {
      en: "Illustration of a bus arriving at a stop on a highlighted route map, next to a peak-hours bar chart",
      pt: "Ilustração de um autocarro a chegar a uma paragem num mapa de rotas, ao lado de um gráfico das horas de pico",
    },
  },
  {
    title: same("Dynamis"),
    url: "https://dynamiis.app/",
    description: {
      en: "Point-of-sale app to manage products, run sales sessions and print receipts at the counter.",
      pt: "Aplicação de ponto de venda para gerir produtos, sessões de vendas e imprimir recibos ao balcão.",
    },
    image: dynamis,
    imageAlt: {
      en: "Illustration of a point-of-sale terminal with a selected product and a receipt printing next to it",
      pt: "Ilustração de um terminal de ponto de venda com um produto selecionado e um recibo a ser impresso ao lado",
    },
  },
  {
    title: same("Acadêmico-Portal"),
    // Link not available yet: add `url` when it is, and the title becomes a link
    description: {
      en: "Student app for Universidade Católica de Moçambique, bringing students' academic life into one place.",
      pt: "Aplicação para os estudantes da Universidade Católica de Moçambique, que reúne a vida académica num só lugar.",
    },
    image: academicoPortal,
    imageAlt: {
      en: "Illustration of a student app on a phone, next to a class timetable, a graduation cap and semester progress",
      pt: "Ilustração de uma aplicação de estudante num telemóvel, ao lado de um horário, um capelo e o progresso do semestre",
    },
  },
  {
    title: { en: "Company Websites", pt: "Websites Empresariais" },
    description: {
      en: "Company websites built for i2a, Grupo Lumai, OptiServ, JHC and Minds.",
      pt: "Websites empresariais desenvolvidos para a i2a, Grupo Lumai, OptiServ, JHC e Minds.",
    },
    image: companyWebsites,
    imageAlt: {
      en: "Illustration of three stacked company websites in browser windows, with the front one also shown on a phone",
      pt: "Ilustração de três websites empresariais em janelas de navegador, com o da frente também num telemóvel",
    },
  },
];
