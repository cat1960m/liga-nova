"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { AdditionalPageDataGroupEdit } from "./AdditionalPageDataGroupEdit/AdditionalPageDataGroupEdit";
import { AdditionalPageDataGroupShow } from "./AdditionalPageDataGroupShow/AdditionalPageDataGroupShow";
import { PAGE_NAMES_TO_LIST_ITEMS_DATA } from "@/app/lib/constants";
import Link from "next/link";

import styles from "./additionalPageDataGroup.module.css";
import { ItemContainerAddTextDescriptionDeleteFeature } from "../../CommonComponents/_itemGroupContainer/ItemContainerAddTextDescriptionDeleteFeature";
import { getIsEditNoDelete } from "@/app/lib/utils";

export type Props = {
  pageFullDataList: FullData[];
  pageId: number;
  params: MainParams;
  groupData: FullData[];
};

export const AdditionalPageDataGroup = ({
  pageFullDataList,
  pageId,
  params,
  groupData,
}: Props) => {
  const currentData = groupData[0];

  if(!currentData) {
    return null;
  }

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
  const { staticTexts, lang } = params;
  const { isEdit, noDelete } = getIsEditNoDelete(params);

  return (
    <ItemContainerAddTextDescriptionDeleteFeature
      isNoAddButton
      deleteButtonText={staticTexts.delete ?? "N/A"}
      featureData={groupData}
      isEdit={isEdit}
      addButtonText=""
      textDescriptionType=""
      isChangeOrderHorizontal={false}
      marginTop={20}
      noDelete={noDelete}
    >
      {isEdit ? (
        <AdditionalPageDataGroupEdit
          currentData={currentData}
          pageFullDataList={pageFullDataList}
          additionalPageName={additionalPageName}
          staticTexts={staticTexts}
          lang={lang}
        />
      ) : (
        <AdditionalPageDataGroupShow
          currentData={currentData}
          pageFullDataList={pageFullDataList}
          pageName={additionalPageName}
          staticTexts={staticTexts}
        />
      )}
      <div className={styles.link}>
        <Link href={`/${params.lang}/${additionalPageName}`}>
          {staticTexts[linkText]}
        </Link>
      </div>
    </ItemContainerAddTextDescriptionDeleteFeature>
  );
};
