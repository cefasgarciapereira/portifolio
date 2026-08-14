import { Language } from "@/contexts/language";

/** Canonical host for the whole site. Every absolute URL derives from this. */
export const SITE_URL = "https://www.cefas.me";

/** Stable identifier for the single Person entity used across the site. */
export const PERSON_ID = `${SITE_URL}/#person`;

/** Official, verified profiles used for schema.org `sameAs`. */
export const SAME_AS = [
  "https://github.com/cefasgarciapereira",
  "https://www.linkedin.com/in/cefas-garcia-pereira",
  "https://cefasgpereira.medium.com/",
];

/** BCP-47 language tag used in <html lang> and hreflang. */
export function htmlLang(locale: Language): string {
  return locale === "pt" ? "pt-BR" : "en";
}

/** Prefix a root-relative path with the locale segment (en has no prefix). */
export function localizedPath(locale: Language, path: string): string {
  const clean = path === "/" ? "" : path;
  return locale === "pt" ? `/pt${clean}` : path;
}

/**
 * Build Next.js `alternates` for a page that exists in both languages.
 * `enPath`/`ptPath` are root-relative (resolved against metadataBase).
 */
export function languageAlternates(
  locale: Language,
  enPath: string,
  ptPath: string
) {
  return {
    canonical: locale === "pt" ? ptPath : enPath,
    languages: {
      en: enPath,
      "pt-BR": ptPath,
      "x-default": enPath,
    },
  };
}

const personDescription: Record<Language, string> = {
  en: "Software Engineer and full-stack developer based in Poços de Caldas, Minas Gerais, Brazil. Master in Software Engineering (PUC-MG), building web applications, mobile apps, automations and AI integrations.",
  pt: "Engenheiro de Software e desenvolvedor full-stack em Poços de Caldas, Minas Gerais, Brasil. Mestre em Engenharia de Software (PUC-MG), criando aplicações web, aplicativos mobile, automações e integrações com Inteligência Artificial.",
};

const jobTitle: Record<Language, string> = {
  en: "Software Engineer",
  pt: "Engenheiro de Software",
};

/** The canonical Person entity, reused wherever the site refers to Cefas. */
export function personEntity(locale: Language) {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Cefas Garcia Pereira",
    url: SITE_URL,
    jobTitle: jobTitle[locale],
    description: personDescription[locale],
    image: `${SITE_URL}/logo.svg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Poços de Caldas",
      addressRegion: "Minas Gerais",
      addressCountry: "BR",
    },
    worksFor: {
      "@type": "Organization",
      name: "Deel",
      url: "https://www.deel.com",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Pontifícia Universidade Católica de Minas Gerais",
      url: "https://www.pucminas.br",
    },
    knowsAbout: [
      "Software Engineering",
      "Full-Stack Development",
      "Web Development",
      "Mobile App Development",
      "React",
      "Next.js",
      "React Native",
      "Node.js",
      "TypeScript",
      "JavaScript",
      "Python",
      "Process Automation",
      "Artificial Intelligence Integration",
    ],
    sameAs: SAME_AS,
  };
}

/** ProfilePage schema wrapping the Person entity for the homepage. */
export function profilePageSchema(locale: Language) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: localizedAbsolute(locale, "/"),
    inLanguage: htmlLang(locale),
    mainEntity: personEntity(locale),
  };
}

/** Absolute URL for a localized root-relative path. */
export function localizedAbsolute(locale: Language, path: string): string {
  return `${SITE_URL}${localizedPath(locale, path)}`;
}

/** Remove HTML tags and collapse whitespace; optionally truncate. */
export function stripHtml(html: string, maxLength = 200): string {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}
