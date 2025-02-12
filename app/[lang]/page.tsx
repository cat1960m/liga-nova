import postgres from "postgres";
import { getDictionary } from "./dictionaries";
import Responsive from "./_components/Imag1";
import Fill from "./_components/Imag2";
import Cover from "./_components/Imag3";
import Ico from "app/icon";

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
    <div style={{ minHeight: "500px", height: "500px" }}>
      {posts?.length}
      {/*  {Ico()} */}
      <button>{dict.products.cart}</button>
      <div style={{ border: "1px solid magenta", backgroundColor: "cyan" }}>
        <Responsive />
      </div>
      <div style={{ border: "1px solid magenta", backgroundColor: "cyan" }}>
        <Fill />
      </div>
      {/*  <div style={{ border: "1px solid magenta", backgroundColor: "cyan" }}>
        <Cover />
      </div> */}
    </div>
  ); // Add to Cart
}
