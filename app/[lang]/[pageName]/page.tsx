import { MainParams, PageParams } from "@/app/lib/definitions";
import { auth } from "@/app/auth";
import { SearchParams } from "@/app/dictionaries/definitions";
import { ShowPage } from "../../ui/PageComponents/ShowPage/ShowPage";
import { getDictionary } from "@/app/lib/dictionaries";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<PageParams>;
  searchParams: Promise<SearchParams>;
}) {
  const res = await auth();
  const isAuthenticated = !!res?.user;

  const pars = await params;
  const {lang, pageName} = pars;

  const urlParams = await searchParams;

  const dict = await getDictionary(lang as "en" | "ua");

  const mainParams: MainParams = {
    pageName,
    lang,
    editMode: urlParams.editMode ?? "",
    staticTexts: dict.common,
  };

  return <ShowPage params={mainParams} isAuthenticated={isAuthenticated} />;
}
