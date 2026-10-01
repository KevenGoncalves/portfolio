export const languages = { en: "EN", pt: "PT" } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = "en";

/** Page path for each language (English at the root, Portuguese under /pt/) */
export const langPath: Record<Lang, string> = { en: "/", pt: "/pt/" };

/** Text that comes in both languages, e.g. job titles in experience.ts */
export type Localized = Record<Lang, string>;

export const ui = {
  en: {
    "meta.description": "Keven Gonçalves, backend and mobile developer in Mozambique.",
    "lang.switch": "Change language",
    "theme.toLight": "Switch to light theme",
    "theme.toDark": "Switch to dark theme",
    "header.role": "Backend & Mobile Developer",
    "header.tagline.before": "I make",
    "header.tagline.after": ", but not in the kitchen",
    "nav.label": "In-page jump links",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "social.label": "Social media",
    "newTab": "(opens in a new tab)",

    "about.label": "About me",

    "experience.label": "Work experience",
    "experience.hint": "Scroll to launch",
    "experience.roles": "Roles",
    "experience.tech": "Technologies used",
    "experience.resume": "View Full Résumé",
    "experience.present": "Present",
    "experience.to": "to",
    "experience.fullTime": "Full-time",
    "experience.internship": "Internship",
    "experience.onSite": "On-site",
    "experience.remote": "Remote",
    "experience.hybrid": "Hybrid",
    "experience.country": "Mozambique",

    "projects.label": "Selected projects",

    "contact.label": "Contact",
    "contact.intro": "Have a project in mind, a role to fill, or just want to talk tech? Send me a message and I’ll get back to you.",
    "contact.name": "Name",
    "contact.namePlaceholder": "Your name",
    "contact.email": "Email",
    "contact.emailPlaceholder": "you@example.com",
    "contact.message": "Message",
    "contact.messagePlaceholder": "Tell me about your project…",
    "contact.send": "Send message",
    "contact.sending": "Sending…",
    "contact.success": "Thanks! Your message has been sent. I’ll get back to you soon.",
    "contact.error": "Something went wrong. Please try again in a moment.",
    "contact.notConfigured": "The form isn’t set up yet. Please try again later.",
  },
  pt: {
    "meta.description": "Keven Gonçalves, desenvolvedor backend e mobile em Moçambique.",
    "lang.switch": "Mudar de idioma",
    "theme.toLight": "Mudar para o tema claro",
    "theme.toDark": "Mudar para o tema escuro",
    "header.role": "Desenvolvedor Backend & Mobile",
    "header.tagline.before": "Eu faço",
    "header.tagline.after": ", mas não na cozinha",
    "nav.label": "Ligações para as secções da página",
    "nav.about": "Sobre",
    "nav.experience": "Experiência",
    "nav.projects": "Projetos",
    "nav.contact": "Contacto",
    "social.label": "Redes sociais",
    "newTab": "(abre num novo separador)",

    "about.label": "Sobre mim",

    "experience.label": "Experiência profissional",
    "experience.hint": "Deslize para lançar",
    "experience.roles": "Funções",
    "experience.tech": "Tecnologias usadas",
    "experience.resume": "Ver Currículo Completo",
    "experience.present": "Presente",
    "experience.to": "até",
    "experience.fullTime": "Tempo integral",
    "experience.internship": "Estágio",
    "experience.onSite": "Presencial",
    "experience.remote": "Remoto",
    "experience.hybrid": "Híbrido",
    "experience.country": "Moçambique",

    "projects.label": "Projetos selecionados",

    "contact.label": "Contacto",
    "contact.intro": "Tem um projeto em mente, uma vaga para preencher ou só quer falar de tecnologia? Envie-me uma mensagem e eu respondo assim que puder.",
    "contact.name": "Nome",
    "contact.namePlaceholder": "O seu nome",
    "contact.email": "Email",
    "contact.emailPlaceholder": "voce@exemplo.com",
    "contact.message": "Mensagem",
    "contact.messagePlaceholder": "Fale-me do seu projeto…",
    "contact.send": "Enviar mensagem",
    "contact.sending": "A enviar…",
    "contact.success": "Obrigado! A sua mensagem foi enviada. Respondo em breve.",
    "contact.error": "Algo correu mal. Tente novamente daqui a pouco.",
    "contact.notConfigured": "O formulário ainda não está configurado. Tente mais tarde.",
  },
} as const;

export type UiKey = keyof (typeof ui)["en"];

/** Returns a translator for one language: t("nav.about") → "About" / "Sobre" */
export const useTranslations = (lang: Lang) => (key: UiKey) => ui[lang][key];

/** Picks the right language from a Localized value */
export const localize = (value: Localized, lang: Lang) => value[lang];
