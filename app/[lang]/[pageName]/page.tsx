import { getPageFullData } from "@/app/lib/actions_fitness";
import { FullData, MainParams } from "@/app/lib/definitions";
import { DrawFeatureContainer_Client } from "./_components/DrawFeatureContainer_Client";
import { getDictionary } from "../dictionaries";
import { getContainerData } from "@/app/lib/utils";
import { PAGE, TITLE } from "@/app/lib/constants";

export default async function Page({
  params,
}: {
  params: Promise<MainParams>;
}) {
  const pars = await params;
  const { pageName, lang } = pars;
  const dict = await getDictionary(lang as "en" | "ua");

  const pageFullData: FullData[] | null = await getPageFullData({
    lang,
    pageName,
  });

  const currentPageData = pageFullData?.find(
    (data) =>
      data.name === pageName && data.text_type === TITLE && data.type === PAGE
  );

  const containerFullData = currentPageData?.id
    ? getContainerData({
        pageName,
        pageFullData: pageFullData ?? [],
        parentFeatureId: currentPageData?.id,
      })
    : null;

  if (!containerFullData || !pageFullData || !currentPageData) {
    return null;
  }

  return (
    <DrawFeatureContainer_Client
      params={pars}
      featureId={currentPageData?.id}
      pageFullDataList={pageFullData}
      containerFullData={containerFullData}
      isEdit={false}
      staticTexts={dict.common}
      isPageContainer
    />
  );
}
