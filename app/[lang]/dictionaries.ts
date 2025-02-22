import "server-only";
import { StaticTexts } from "../dictionaries/definitions";

const dictionaries = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  ua: () => import("../dictionaries/ua.json").then((module) => module.default),
};

export const getDictionary = async (
  locale: "en" | "ua"
): Promise<{ common: StaticTexts }> => dictionaries[locale]();
