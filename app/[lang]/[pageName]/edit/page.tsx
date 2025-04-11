import { getPageFullData } from "@/app/lib/actions_fitness";
import { FullData, MainParams } from "@/app/lib/definitions";
import { auth } from "@/app/auth";
import { getContainerData } from "@/app/lib/utils";
import { PAGE, TITLE } from "@/app/lib/constants";
import { getDictionary } from "../../dictionaries";
import { DrawFeatureContainer_Client } from "../_components/DrawFeatureContainer_Client";
import { DrawFeatureContainerEdit } from "./_components/DrawFeatureContainerEdit";

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
    <div style={{ width: "100%", padding: "30px" }}>
      {!isAuthenticated ? (
        <DrawFeatureContainer_Client
          params={pars}
          featureId={currentPageData?.id}
          pageFullDataList={pageFullData}
          containerFullData={containerFullData}
          isEdit={false}
          staticTexts={dict.common}
          buttonText={dict.common.addItemToPage ?? "N/A"}
        />
      ) : (
        <DrawFeatureContainerEdit
          params={pars}
          featureId={currentPageData?.id}
          pageFullDataList={pageFullData}
          containerFullData={containerFullData}
          isEdit={true}
          staticTexts={dict.common}
          buttonText={dict.common.addItemToPage ?? "N/A"}
        />
      )}
    </div>
  );
}
