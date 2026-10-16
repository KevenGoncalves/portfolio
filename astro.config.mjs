// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // The deployed address. It's used for link previews (Open Graph image/URL), canonical + EN/PT
  // alternate links, sitemap.xml and robots.txt, so update it if the site moves to its own domain.
  site: 'https://kevengoncalves.vercel.app',
  // Fonts are downloaded from Google at build time and served from this site (no render-blocking
  // third-party request), with preloads and metric-matched fallbacks so text doesn't jump when they load.
  // Only the weights the site uses: Poppins 400–700 (body), Oxanium 600–800 (name, numbers, "sauce", 404).
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Poppins',
      cssVariable: '--font-poppins',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Oxanium',
      cssVariable: '--font-oxanium',
      weights: ['600 800'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
  ],
  // The CSS is small (~11KB gzipped), so it goes inside the page instead of blocking on extra requests
  build: {
    inlineStylesheets: 'always',
  },
  // English at "/", Portuguese at "/pt/"
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss()]
  }
});