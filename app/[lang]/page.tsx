import { getDictionary } from "./dictionaries";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: "en" | "ua" }>;
}) {
  const data = await fetch("https://api.vercel.app/blog");
  const posts = await data.json();

  const lang = (await params).lang;
  if (!lang) {
    return null;
  }
  const dict = await getDictionary(lang); // en

  return (
    <div style={{ minHeight: "500px", height: "500px" }}>{posts?.length}</div>
  );
}
