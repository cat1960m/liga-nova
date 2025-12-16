import { auth } from "../../auth";
import { SearchParams } from "../../dictionaries/definitions";
import { HOME } from "../../lib/constants";
import { MainParams } from "../../lib/definitions";
import { getDictionary } from "../../lib/dictionaries";
import { ShowPage } from "../../ui/PageComponents/ShowPage/ShowPage";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const res = await auth();
  const isAuthenticated = !!res?.user;

  const urlParams = await searchParams;

  const lang: "en" | "ua" = (await params).lang === "en" ? "en" : "ua";
 /*  if (!lang) {
    return null;
  } */

  const dict = await getDictionary(lang as "en" | "ua");

  const pars: MainParams = {
    pageName: HOME,
    lang,
    editMode: urlParams.editMode ?? "",
    staticTexts: dict.common,
  };

  return <ShowPage isAuthenticated={isAuthenticated} isMain params={pars} />;
}
