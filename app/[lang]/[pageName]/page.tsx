import { MainParams, PageParams } from "@/app/lib/definitions";
import { auth } from "@/app/auth";
import { SearchParams } from "@/app/dictionaries/definitions";
import { ShowPage } from "../../ui/PageComponents/ShowPage/ShowPage";
import { getDictionary } from "@/app/lib/dictionaries";
import { Suspense } from "react";

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
  const { lang, pageName } = pars;

  const urlParams = await searchParams;

  const dict = await getDictionary(lang as "en" | "ua");

  const mainParams: MainParams = {
    pageName,
    lang,
    editMode: urlParams.editMode ?? "",
    staticTexts: dict.common,
  };

  return (
    <Suspense
      fallback={
        <div
          style={{
            color: "lightblue",
            fontWeight: 700,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              maxWidth: 1075,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Page loading ...
          </div>
        </div>
      }
    >
      <ShowPage params={mainParams} isAuthenticated={isAuthenticated} />
    </Suspense>
  );
}
