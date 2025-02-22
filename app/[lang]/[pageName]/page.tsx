import { getFeatureChildren, getPageTitles } from "@/app/lib/actions_fitness";
import { DrawFeatureContainer } from "./_components/DrawFeatureContainer";
import { Feature, MainParams } from "@/app/lib/definitions";
import { DrawFeatureContainer_Client } from "./_components/_clientComponents/DrawFeatureContainer_Client";
import { auth } from "@/app/auth";
import { getDictionary } from "../dictionaries";

export default async function Page({
  params,
}: {
  params: Promise<MainParams>;
}) {
  const res = await auth();
  const isAuthenticated = !!res?.user;

  const pars = await params;
  console.log("=======page params", pars);
  const { pageName, lang } = pars;
  const dict = await getDictionary(lang as "en" | "ua");

  const [pageNameOnly, ...parts] = pageName.split("_");

  const pages = await getPageTitles(lang);

  const currentPage = pages?.find((page) => page.name === pageNameOnly);

  if (!currentPage) {
    return null;
  }

  /* return (
    <DrawFeatureContainer
      lang={lang}
      featureId={currentPage?.id}
      params={pars}
      tabLevel={0}
    />
  ); */

  return (
    <>
      {!isAuthenticated ? (
        <DrawFeatureContainer_Client
          lang={lang}
          featureId={currentPage?.id}
          params={pars}
          tabLevel={0}
        />
      ) : (
        <DrawFeatureContainer
          featureId={currentPage?.id}
          params={pars}
          tabLevel={0}
          staticTexts={dict.common}
        />
      )}
    </>
  );
}
