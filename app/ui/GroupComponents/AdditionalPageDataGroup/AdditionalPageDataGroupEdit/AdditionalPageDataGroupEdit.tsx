"use client";

import { GROUP, FILTER_GROUP_SUBTYPE } from "@/app/lib/constants";
import { FullData } from "@/app/lib/definitions";
import { useMemo, useState } from "react";
import { FilterGroup } from "../../FilterGroupsListItemsGroup/_filters/FilterGroup/FilterGroup";
import { getContainerData, getFilterIds } from "@/app/lib/utils";

import styles from "./additionalPageDataGroupEdit.module.css";
import { UpdateFeatureFilterIdsButton } from "@/app/ui/CommonComponents/_buttons/UpdateFeatureFilterIdsButton";
import { StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  currentData: FullData;
  pageFullDataList: FullData[];
  additionalPageName: string;
  staticTexts: StaticTexts;
  lang: string;
};
//Персональні тренування ,Групові студії, Кріосауна, Солярій
export const AdditionalPageDataGroupEdit = ({
  currentData,
  pageFullDataList,
  additionalPageName,
  staticTexts,
  lang,
}: Props) => {
  const filterTextDescriptionIds = getFilterIds(currentData.filter_ids);

  const [
    selectedFilterTextDescriptionIds,
    setSelectedFilterTextDescriptionIds,
  ] = useState<number[]>(filterTextDescriptionIds);

  const pageFeatureId = currentData.id;

  const containerFullData = useMemo(
    () =>
      getContainerData({
        pageName: additionalPageName,
        pageFullData: pageFullDataList,
        parentFeatureId: null,
        type: GROUP,
        subtype: FILTER_GROUP_SUBTYPE,
      }),
    [pageFullDataList, additionalPageName]
  );

  if (!containerFullData) {
    return null;
  }

  const [data, filterGroupIds] = containerFullData;

  const handleFilterSelectionChanged = ({
    filter,
    value,
  }: {
    filter: FullData;
    value: boolean;
  }) => {
    if (value) {
      const newSelectedFilterTextDescriptionIds = [
        ...selectedFilterTextDescriptionIds,
      ];
      newSelectedFilterTextDescriptionIds.push(filter.text_description_id);
      setSelectedFilterTextDescriptionIds(newSelectedFilterTextDescriptionIds);
    } else {
      const newSelectedFilterTextDescriptionIds =
        selectedFilterTextDescriptionIds.filter(
          (item) => item !== filter.text_description_id
        );
      setSelectedFilterTextDescriptionIds(newSelectedFilterTextDescriptionIds);
    }
  };

  return (
    <>
      <div className={styles.filters}>
        {filterGroupIds.map((filterGroupId) => {
          const filterGroupData = data[filterGroupId];
          return (
            <div key={filterGroupId}>
              <FilterGroup
                filterGroupData={filterGroupData}
                onFilterSelectionChanged={handleFilterSelectionChanged}
                selectedFilterTextDescriptionIds={
                  selectedFilterTextDescriptionIds
                }
                parentFeatureId={null}
                isEdit={false} // no edit for filter groups
                lang={lang}
                staticTexts={staticTexts}
              />
            </div>
          );
        })}
      </div>

      <div className={styles.button}>
        <UpdateFeatureFilterIdsButton
          featureId={pageFeatureId}
          subtype={currentData.subtype}
          filterIds={selectedFilterTextDescriptionIds.join(",")}
          buttonText={staticTexts.saveFilters ?? "N/A"}
        />
      </div>
    </>
  );
};
