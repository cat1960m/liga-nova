import { getPageFullData } from "@/app/lib/actions_fitness";
import { DrawFeatureContainer_Client } from "../../DrawFeatureContainer_Client";
import { DrawFeatureContainerEdit } from "./DrawFeatureContainerEdit";
import { FullData, MainParams } from "@/app/lib/definitions";
import { getContainerData } from "@/app/lib/utils";
import { getDictionary } from "../../../../dictionaries";
import { PAGE, TITLE } from "@/app/lib/constants";

export type Props = {
  lang: string;
  pageName: string;
  isEdit: boolean;
  isAuthenticated: boolean;
};

export const ShowPage = async ({
  lang,
  pageName,
  isEdit,
  isAuthenticated,
}: Props) => {
  const dict = await getDictionary(lang as "en" | "ua");

  const pageFullData: FullData[] | null = await getPageFullData({
    lang,
    pageName,
  });

  let currentPageData = pageFullData?.find(
    (data) =>
      data.name === pageName && data.text_type === TITLE && data.type === PAGE
  );

  if (!currentPageData) {
    currentPageData = pageFullData?.find(
      (data) => data.name === pageName && data.type === PAGE
    );
  }

  const containerFullData = currentPageData?.id
    ? getContainerData({
        pageName,
        pageFullData: pageFullData ?? [],
        parentFeatureId: currentPageData?.id,
      })
    : null;

  const pageId = pageFullData?.find(
    (item) => item.type === PAGE && item.name === pageName
  )?.id;

  if (!containerFullData || !pageFullData || !currentPageData || !pageId) {
    return null;
  }
  const pars: MainParams = {
    pageName,
    lang,
  };
  return (
    <div style={{ width: "100%", padding: "30px" }}>
      {!isAuthenticated || !isEdit ? (
        <DrawFeatureContainer_Client
          params={pars}
          featureId={currentPageData?.id}
          pageFullDataList={pageFullData}
          containerFullData={containerFullData}
          isEdit={false}
          staticTexts={dict.common}
          buttonText={dict.common.addItemToPage ?? "N/A"}
          pageId={pageId}
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
          pageId={pageId}
        />
      )}
    </div>
  );
};
