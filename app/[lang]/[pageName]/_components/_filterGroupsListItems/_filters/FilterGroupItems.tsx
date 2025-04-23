"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData, MainParams } from "@/app/lib/definitions";
import { getContainerData } from "@/app/lib/utils";
import { FilterGroup } from "./FilterGroup";
import { FILTER_GROUP_SUBTYPE, GROUP } from "@/app/lib/constants";
import { useMemo } from "react";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  pageFullDataList: FullData[];
  params: MainParams;
  onFilterSelectionChanged: (data: {
    filter: FullData;
    value: boolean;
  }) => void;
  selectedFilterTextDescriptionIds: number[];
  parentFeatureId: number;
};

export const FilterGroupsItems = ({
  pageFullDataList,
  isEdit,
  staticTexts,
  params,
  onFilterSelectionChanged,
  selectedFilterTextDescriptionIds,
  parentFeatureId,
}: Props) => {
  const containerFullData = useMemo(
    () =>
      parentFeatureId
        ? getContainerData({
            pageName: params.pageName,
            pageFullData: pageFullDataList,
            parentFeatureId: parentFeatureId,
            type: GROUP,
            subtype: FILTER_GROUP_SUBTYPE,
          })
        : null,
    [pageFullDataList, parentFeatureId]
  );

  if (!containerFullData) {
    return null;
  }

  const [data, filterGroupIds] = containerFullData;

  return (
    <>
      {filterGroupIds.map((filterGroupId, index) => {
        const filterGroupData = data[filterGroupId];
        return (
          <div key={filterGroupId}>
            {!!index ? (
              <div
                style={{
                  padding: isEdit ? "5px 0" : undefined,
                  borderTop: "1px solid lightgray",
                }}
              />
            ) : null}
            <FilterGroup
              isEdit={isEdit}
              staticTexts={staticTexts}
              filterGroupData={filterGroupData}
              onFilterSelectionChanged={onFilterSelectionChanged}
              selectedFilterTextDescriptionIds={
                selectedFilterTextDescriptionIds
              }
              parentFeatureId={parentFeatureId}
              params={params}
            />
          </div>
        );
      })}
    </>
  );
};
