import type { APIRoute } from "astro";

// Every page, with its EN/PT twin, so search engines know they're translations of each other
const pages = [
  { en: "/", pt: "/pt/" },
  { en: "/resume/", pt: "/pt/resume/" },
];

export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => new URL(path, site).href;
  const entries = pages.flatMap((page) =>
    Object.values(page).map(
      (path) => `  <url>
    <loc>${url(path)}</loc>
${Object.entries(page)
  .map(([lang, alt]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${url(alt)}"/>`)
  .join("\n")}
    <xhtml:link rel="alternate" hreflang="x-default" href="${url(page.en)}"/>
  </url>`,
    ),
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>
`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
};
