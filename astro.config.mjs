// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // TODO: replace with the real address once the domain is decided. It's used for link previews
  // (Open Graph image/URL), canonical + EN/PT alternate links, sitemap.xml and robots.txt.
  // ".example" can never be a real site, so it's obvious if this is still a placeholder.
  site: 'https://kevengoncalves.example',
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