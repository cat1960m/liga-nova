import { getAllFeatures, UpdateFeatureOrder } from "../lib/actions_fitness";
import { getDictionary } from "./dictionaries";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: "en" | "ua" }>;
}) {
  const data = await fetch("https://api.vercel.app/blog");

  const lang = (await params).lang;
  if (!lang) {
    return null;
  }
  const dict = await getDictionary(lang); // en

  return (
    <div style={{ border: "2px solid magenta", padding: "40px" }}>8888888</div>
  );
}
