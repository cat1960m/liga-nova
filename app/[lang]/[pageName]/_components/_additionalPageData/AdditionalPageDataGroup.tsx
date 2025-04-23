"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData, MainParams } from "@/app/lib/definitions";
import { AdditionalPageDataGroupEdit } from "./AdditionalPageDataGroupEdit";
import { AdditionalPageDataGroupShow } from "./AdditionalPageDataGroupShow";
import { PAGE_NAMES_TO_LIST_ITEMS_DATA } from "@/app/lib/constants";
import Link from "next/link";
import { ItemContainerAddTextDescriptionDeleteFeature } from "../__commonComponents/_itemGroupContainer/ItemContainerAddTextDescriptionDeleteFeature";

export type Props = {
  currentData: FullData;
  isEdit: boolean;
  staticTexts: StaticTexts;
  pageFullDataList: FullData[];
  pageId: number;
  params: MainParams;
  groupData: FullData[];
};

export const AdditionalPageDataGroup = ({
  currentData,
  isEdit,
  staticTexts,
  pageFullDataList,
  pageId,
  params,
  groupData,
}: Props) => {
  const pageData = pageFullDataList.find((data) => data.id === pageId);
  const additionalPageNames = (pageData?.additional_page_name ?? "").split(",");
  const additionalPageName =
    additionalPageNames.length === 1
      ? additionalPageNames[0]
      : currentData.additional_page_name;

  if (!additionalPageName) {
    return;
  }

  const linkText = PAGE_NAMES_TO_LIST_ITEMS_DATA[additionalPageName]?.linkText;

  return (
    <ItemContainerAddTextDescriptionDeleteFeature
      isNoAddButton
      deleteButtonText={staticTexts.delete ?? "N/A"}
      featureData={groupData}
      isEdit={isEdit}
      addButtonText=""
      textDescriptionType=""
      isChangeOrderHorizontal={false}
    >
      {isEdit ? (
        <AdditionalPageDataGroupEdit
          currentData={currentData}
          staticTexts={staticTexts}
          pageFullDataList={pageFullDataList}
          additionalPageName={additionalPageName}
          params={params}
        />
      ) : (
        <AdditionalPageDataGroupShow
          currentData={currentData}
          pageFullDataList={pageFullDataList}
          pageName={additionalPageName}
          staticTexts={staticTexts}
        />
      )}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <Link href={`/${params.lang}/${additionalPageName}`}>
          {staticTexts[linkText]}
        </Link>
      </div>
    </ItemContainerAddTextDescriptionDeleteFeature>
  );
};
