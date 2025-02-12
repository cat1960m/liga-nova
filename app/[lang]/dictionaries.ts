import "server-only";

const dictionaries = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  ua: () => import("../dictionaries/ua.json").then((module) => module.default),
};

export const getDictionary = async (locale: "en" | "ua") =>
  dictionaries[locale]();
