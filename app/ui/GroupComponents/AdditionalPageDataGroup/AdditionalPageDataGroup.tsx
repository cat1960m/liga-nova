"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { AdditionalPageDataGroupEdit } from "./AdditionalPageDataGroupEdit/AdditionalPageDataGroupEdit";
import { AdditionalPageDataGroupShow } from "./AdditionalPageDataGroupShow/AdditionalPageDataGroupShow";
import {
  FILTER_GROUP_SUBTYPE,
  GROUP,
  LIST_ITEM,
  PAGE_NAMES_TO_LIST_ITEMS_DATA,
} from "@/app/lib/constants";
import Link from "next/link";

import styles from "./additionalPageDataGroup.module.css";
import { getFilterIds, getIsEditNoDelete } from "@/app/lib/utils";
import { EditTitleCancel } from "../../CommonComponents/EditTitleCancel/EditTitleCancel";
import { useContainerData } from "../../hooks/useContainerData";
import { ItemContainerDeleteFeature } from "../../CommonComponents/_itemGroupContainer/ItemContainerDeleteFeature";
import { CountIndex } from "@/app/dictionaries/definitions";

export type Props = {
  pageFullDataList: FullData[];
  pageId: number;
  params: MainParams;
  groupData: FullData[];
  countIndex: CountIndex;
};

export const AdditionalPageDataGroup = ({
  pageFullDataList,
  pageId,
  params,
  groupData,
  countIndex
}: Props) => {
  const currentData = groupData[0];
  const pageData = pageFullDataList.find((data) => data.id === pageId);
  const additionalPageNames = (pageData?.additional_page_name ?? "").split(",");
  const additionalPageName =
    additionalPageNames.length === 1
      ? additionalPageNames[0]
      : currentData?.additional_page_name ?? "";

  const structuredFilterGroupsData = useContainerData({
    pageName: additionalPageName,
    pageFullData: pageFullDataList,
    parentFeatureId: null,
    type: GROUP,
    subtype: FILTER_GROUP_SUBTYPE,
  });

  const filterTextDescriptionIds = getFilterIds(currentData?.filter_ids ?? "");
  const structuredListItemsData = useContainerData({
    pageName: additionalPageName,
    pageFullData: pageFullDataList,
    parentFeatureId: null,
    type: LIST_ITEM,
    subtype: LIST_ITEM,
    selectedFiltersData: {
      selectedFilterTextDescriptionIds: filterTextDescriptionIds,
      filterGroupsData: structuredFilterGroupsData,
    },
  });

  if (!currentData || !additionalPageName) {
    return null;
  }

  const linkText = PAGE_NAMES_TO_LIST_ITEMS_DATA[additionalPageName]?.linkText;
  const { staticTexts, lang } = params;
  const { isEdit, noDelete } = getIsEditNoDelete(params);

  return (
    <ItemContainerDeleteFeature
      deleteText={staticTexts.delete ?? "N/A"}
      featureData={groupData}
      isEdit={isEdit}
      isChangeOrderHorizontal={false}
      marginTop={20}
      noDelete={noDelete}
      countIndex={countIndex}
      noChangeOrder={false}
    >
      {isEdit ? (
        <div className={styles.edit_container}>
          <EditTitleCancel title={staticTexts.selectSaveFilters ?? ""} />

          <AdditionalPageDataGroupEdit
            currentData={currentData}
            staticTexts={staticTexts}
            lang={lang}
            structuredFilterGroupsData={structuredFilterGroupsData}
          />
          <AdditionalPageDataGroupShow
            pageFullDataList={pageFullDataList}
            pageName={additionalPageName}
            staticTexts={staticTexts}
            structuredListItemsData={structuredListItemsData}
            lang={lang}
          />
        </div>
      ) : (
        <AdditionalPageDataGroupShow
          pageFullDataList={pageFullDataList}
          pageName={additionalPageName}
          staticTexts={staticTexts}
          structuredListItemsData={structuredListItemsData}
          lang={lang}
        />
      )}
      <div className={styles.link}>
        <Link href={`/${params.lang}/${additionalPageName}`}>
          {staticTexts[linkText]}
        </Link>
      </div>
    </ItemContainerDeleteFeature>
  );
};
