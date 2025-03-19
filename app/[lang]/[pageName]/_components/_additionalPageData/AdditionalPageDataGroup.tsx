"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData } from "@/app/lib/definitions";
import { AdditionalPageDataGroupEdit } from "./AdditionalPageDataGroupEdit";
import { AdditionalPageDataGroupShow } from "./AdditionalPageDataGroupShow";

export type Props = {
  currentData: FullData;
  isEdit: boolean;
  staticTexts: StaticTexts;
  pageFullDataList: FullData[];
};

export const AdditionalPageDataGroup = ({
  currentData,
  isEdit,
  staticTexts,
  pageFullDataList,
}: Props) => {
  const pageId = currentData.parent_feature_id;
  const pageData = pageFullDataList.find((data) => data.id === pageId);
  const additionalPageName = pageData?.additional_page_name ?? "";

  return (
    <>
      {isEdit ? (
        <AdditionalPageDataGroupEdit
          currentData={currentData}
          staticTexts={staticTexts}
          pageFullDataList={pageFullDataList}
          additionalPageName={additionalPageName}
        />
      ) : (
        <AdditionalPageDataGroupShow
          currentData={currentData}
          pageFullDataList={pageFullDataList}
          pageName={additionalPageName}
          staticTexts={staticTexts}
        />
      )}
    </>
  );
};
