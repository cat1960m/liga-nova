"use client";

import {
  GROUP,
  FILTER_GROUP_SUBTYPE,
  FILTER_GROUP_DEFAULT_WIDTH,
  GRAY_BACKGROUND_COLOR,
} from "@/app/lib/constants";
import { FullData, MainParams } from "@/app/lib/definitions";
import { useMemo, useState } from "react";
import { FilterGroup } from "../../FilterGroupsListItemsGroup/_filters/FilterGroup/FilterGroup";
import { getContainerData, getFilterIds } from "@/app/lib/utils";
import { UpdateFeatureFilterIdsButton } from "../../__commonComponents/_buttons/UpdateFeatureFilterIdsButton";

import styles from "./additionalPageDataGroupEdit.module.css";

export type Props = {
  currentData: FullData;
  pageFullDataList: FullData[];
  additionalPageName: string;
  params: MainParams;
};
//Персональні тренування ,Групові студії, Кріосауна, Солярій
export const AdditionalPageDataGroupEdit = ({
  currentData,
  pageFullDataList,
  additionalPageName,
  params,
}: Props) => {
  const filterTextDescriptionIds = getFilterIds(currentData.filter_ids);

  const [
    selectedFilterTextDescriptionIds,
    setSelectedFilterTextDescriptionIds,
  ] = useState<number[]>(filterTextDescriptionIds);

  const pageFeatureId = currentData.id;

  const containerFullData = useMemo(
    () =>
      pageFeatureId
        ? getContainerData({
            pageName: additionalPageName,
            pageFullData: pageFullDataList,
            parentFeatureId: null,
            type: GROUP,
            subtype: FILTER_GROUP_SUBTYPE,
          })
        : null,
    [pageFullDataList, pageFeatureId]
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
  const { staticTexts } = params;

  return (
    <>
      <div className={styles.filters}>
        {filterGroupIds.map((filterGroupId, index) => {
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
                params={{ ...params, isEdit: false }}
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
