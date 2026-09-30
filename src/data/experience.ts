export type Job = {
  /** Shown above the role, e.g. "2018 — 2024" */
  period: string;
  /** Spoken version of the period for screen readers, e.g. "2018 to 2024" */
  periodLabel: string;
  /** Marks the ongoing role (gets the pulsing dot on the timeline) */
  current?: boolean;
  title: string;
  company: string;
  url: string;
  /** Earlier titles held at the same company, most recent first */
  previousTitles?: string[];
  description: string;
  links?: { label: string; url: string }[];
  tech: string[];
};

export const experience: Job[] = [
  {
    period: "2024 — Present",
    periodLabel: "2024 to Present",
    current: true,
    title: "Senior Frontend Engineer, Accessibility",
    company: "Klaviyo",
    url: "https://www.klaviyo.com",
    description:
      "Build and maintain critical components used to construct Klaviyo’s frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility.",
    tech: ["JavaScript", "TypeScript", "React", "Storybook"],
  },
  {
    period: "2018 — 2024",
    periodLabel: "2018 to 2024",
    title: "Lead Engineer",
    company: "Upstatement",
    url: "https://upstatement.com",
    previousTitles: ["Senior Engineer", "Engineer"],
    description:
      "Build, style, and ship high-quality websites, design systems, mobile apps, and digital experiences for a diverse array of projects for clients including Harvard Business School, Everytown for Gun Safety, Pratt Institute, Koala Health, Vanderbilt University, The 19th News, and more. Provide leadership within engineering department through close collaboration, knowledge shares, and spearheading the development of internal tools.",
    tech: ["JavaScript", "TypeScript", "HTML & SCSS", "React", "Next.js", "React Native", "WordPress", "Contentful", "Node.js", "PHP"],
  },
  {
    period: "July — Dec 2017",
    periodLabel: "July to December 2017",
    title: "UI Engineer Co-op",
    company: "Apple",
    url: "https://www.apple.com/apple-music/",
    description:
      "Developed and styled interactive web apps for Apple Music, including the user interface of Apple Music’s embeddable web player widget for in-browser user authorization and full song playback.",
    links: [
      { label: "MusicKit.js", url: "https://developer.apple.com/documentation/musickitjs" },
      { label: "9to5Mac", url: "https://9to5mac.com/2018/06/03/apple-music-embeddable-web-player-listen-browser/" },
      { label: "The Verge", url: "https://www.theverge.com/2017/10/5/16433770/facebook-messenger-apple-music-bot-song-streaming" },
    ],
    tech: ["Ember", "SCSS", "JavaScript", "MusicKit.js"],
  },
  {
    period: "2016 — 2017",
    periodLabel: "2016 to 2017",
    title: "Developer",
    company: "Scout Studio",
    url: "https://scout.camd.northeastern.edu/",
    description:
      "Collaborated with other student designers and engineers on pro-bono projects to create new brands, design systems, and websites for organizations in the community.",
    tech: ["Jekyll", "SCSS", "JavaScript", "WordPress"],
  },
  {
    period: "July — Dec 2016",
    periodLabel: "July to December 2016",
    title: "Software Engineer Co-op",
    company: "Starry",
    url: "https://starry.com/",
    description: "Worked with the UI team to engineer and improve major features of Starry’s customer-facing Android app.",
    links: [
      { label: "Android App", url: "https://play.google.com/store/apps/details?id=com.starry.management&hl=en_US&gl=US" },
      { label: "ScreenTime 2.0", url: "https://starry.com/blog/product/whats-new-screentime-just-got-better-for-parents" },
    ],
    tech: ["Cordova", "Backbone", "JavaScript", "CSS"],
  },
  {
    period: "July — Dec 2015",
    periodLabel: "July to December 2015",
    title: "Creative Technologist Co-op",
    company: "MullenLowe U.S.",
    url: "https://us.mullenlowe.com/",
    description:
      "Developed, maintained, and shipped production code for client websites. Clients included JetBlue, Lovesac, U.S. Cellular, U.S. Department of Defense, and more.",
    tech: ["HTML", "CSS", "JavaScript", "jQuery"],
  },
];
