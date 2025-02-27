import {
  getFeatureChildren,
  getPageFullData,
  getPageTitles,
} from "@/app/lib/actions_fitness";
import { DrawFeatureContainer } from "./_components/DrawFeatureContainer";
import { Feature, FullData, MainParams } from "@/app/lib/definitions";
import { DrawFeatureContainer_Client } from "./_components/_clientComponents/DrawFeatureContainer_Client";
import { auth } from "@/app/auth";
import { getDictionary } from "../dictionaries";
import { getContainerData } from "@/app/lib/utils";

export default async function Page({
  params,
}: {
  params: Promise<MainParams>;
}) {
  const res = await auth();
  const isAuthenticated = !!res?.user;

  const pars = await params;
  const { pageName, lang } = pars;
  const dict = await getDictionary(lang as "en" | "ua");

  const [pageNameOnly, ...parts] = pageName.split("_");

  const pages = await getPageTitles(lang);

  const currentPage = pages?.find((page) => page.name === pageNameOnly);

  if (!currentPage) {
    return null;
  }

  const pageFullData: FullData[] | null = await getPageFullData({
    lang,
    pageName: currentPage.name,
  });

  const containerFullData = currentPage?.id
    ? getContainerData({
        pageFullData: pageFullData ?? [],
        featureId: currentPage?.id,
      })
    : null;

  if (!containerFullData || !pageFullData) {
    return null;
  }
  const isEdit = false;

  return (
    <>
      {!isAuthenticated ? (
        <DrawFeatureContainer_Client
          params={pars}
          featureId={currentPage?.id}
          pageFullDataList={pageFullData}
          containerFullData={containerFullData}
          isEdit={isEdit}
          staticTexts={dict.common}
          isPageContainer
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
