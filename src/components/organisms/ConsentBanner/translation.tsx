import { Translation } from "@/contexts/language";

export interface ConsentCategoryTranslation {
  name: string;
  description: string;
}

export interface ConsentBannerTranslation {
  aria: string;
  label: string;
  description: string;
  acceptAll: string;
  rejectAll: string;
  customize: string;
  back: string;
  save: string;
  on: string;
  off: string;
  alwaysOn: string;
  necessary: ConsentCategoryTranslation;
  analytics: ConsentCategoryTranslation;
  ads: ConsentCategoryTranslation;
  preferences: string;
}

export const content: Translation<ConsentBannerTranslation> = {
  en: {
    aria: "cookie consent",
    label: "cookies & privacy",
    description: "This site uses cookies to understand how it is used and improve your experience. You decide what can be collected.",
    acceptAll: "accept all",
    rejectAll: "reject all",
    customize: "customize",
    back: "back",
    save: "save",
    on: "on",
    off: "off",
    alwaysOn: "always on",
    necessary: {
      name: "necessary",
      description: "Required for the site to work, such as security and your preferences.",
    },
    analytics: {
      name: "analytics",
      description: "Anonymous usage statistics (Google Analytics) that help improve the content.",
    },
    ads: {
      name: "advertising",
      description: "Lets usage data be sent to Google for advertising and personalized ads.",
    },
    preferences: "cookie preferences",
  },
  pt: {
    aria: "consentimento de cookies",
    label: "cookies e privacidade",
    description: "Este site utiliza cookies para entender como é utilizado e melhorar sua experiência. Você decide o que pode ser coletado.",
    acceptAll: "aceitar todos",
    rejectAll: "rejeitar todos",
    customize: "personalizar",
    back: "voltar",
    save: "salvar",
    on: "sim",
    off: "não",
    alwaysOn: "sempre ativo",
    necessary: {
      name: "necessários",
      description: "Essenciais para o funcionamento do site, como segurança e suas preferências.",
    },
    analytics: {
      name: "análise",
      description: "Estatísticas anônimas de uso (Google Analytics) que ajudam a melhorar o conteúdo.",
    },
    ads: {
      name: "publicidade",
      description: "Permite enviar dados de uso ao Google para publicidade e anúncios personalizados.",
    },
    preferences: "preferências de cookies",
  },
};
