"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import {
  GROUP,
  FILTER_GROUP_SUBTYPE,
  FILTER_GROUP_DEFAULT_WIDTH,
  GRAY_BACKGROUND_COLOR,
} from "@/app/lib/constants";
import { FullData, MainParams } from "@/app/lib/definitions";
import { useMemo, useState } from "react";
import { FilterGroup } from "../_filterGroupsListItems/_filters/FilterGroup";
import { getContainerData, getFilterIds } from "@/app/lib/utils";
import { UpdateFeatureFilterIdsButton } from "../__commonComponents/_buttons/UpdateFeatureFilterIdsButton";

export type Props = {
  currentData: FullData;
  staticTexts: StaticTexts;
  pageFullDataList: FullData[];
  additionalPageName: string;
  params: MainParams;
};
//Персональні тренування ,Групові студії, Кріосауна, Солярій
export const AdditionalPageDataGroupEdit = ({
  currentData,
  staticTexts,
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

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          backgroundColor: GRAY_BACKGROUND_COLOR,
          border: "1px solid lightgray",
          borderRadius: "10px",
          minWidth: FILTER_GROUP_DEFAULT_WIDTH,
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        {filterGroupIds.map((filterGroupId, index) => {
          const filterGroupData = data[filterGroupId];
          return (
            <div key={filterGroupId}>
              <FilterGroup
                isEdit={false}
                staticTexts={staticTexts}
                filterGroupData={filterGroupData}
                onFilterSelectionChanged={handleFilterSelectionChanged}
                selectedFilterTextDescriptionIds={
                  selectedFilterTextDescriptionIds
                }
                parentFeatureId={null}
                params={params}
              />
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          padding: "10px 0",
          gap: "10px",
        }}
      >
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
