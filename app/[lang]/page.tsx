import { auth } from "../auth";
import { SearchParams } from "../dictionaries/definitions";
import { ShowPage } from "./[pageName]/_components/__commonComponents/_edit/ShowPage";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lang: "en" | "ua" }>;
  searchParams: Promise<SearchParams>;
}) {
  const res = await auth();
  const isAuthenticated = !!res?.user;

  const urlParams = await searchParams;
  const isEdit = urlParams.isEdit === "1";

  const lang = (await params).lang;
  if (!lang) {
    return null;
  }

  return (
    <ShowPage
      pageName="home"
      lang={lang}
      isEdit={isEdit}
      isAuthenticated={isAuthenticated}
    />
  );
}
