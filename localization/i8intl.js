import hindiMessages from "./messages/hindi.json";
import englishMessages from "./messages/english.json";
import gujaratiMessages from "./messages/gujarati.json";
import kannadaMessages from "./messages/kannada.json";
import marathiMessages from "./messages/marathi.json";
import punjabiMessages from "./messages/punjabi.json";

export const allMessages = {
  en: englishMessages,
  hi: hindiMessages,
  guj: gujaratiMessages,
  kn: kannadaMessages,
  mr: marathiMessages,
  pa: punjabiMessages,
};

export const languages = {
  hi: "hi",
  en: "en",
  guj: "guj",
  kn: "kn",
  mr: "mr",
  pa: "pa",
};

export const defaultLocale = languages.en;
const i18nConfig = "i18nConfig";

export function setLanguage(locale) {
  if (locale !== getLanguage()) {
    localStorage.setItem(i18nConfig, JSON.stringify({ selectedLang: locale }));
    window.location.reload();
  }
}

export function getLanguage() {
  const lang = localStorage.getItem(i18nConfig);
  if (!lang) return defaultLocale;
  return JSON.parse(lang).selectedLang;
}

export default {
  defaultLocale,
  defaultMessages: allMessages[defaultLocale],
  allMessages,
  setLanguage,
  getLanguage,
};
