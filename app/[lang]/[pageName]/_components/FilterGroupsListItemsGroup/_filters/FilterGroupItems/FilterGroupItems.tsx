"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { getContainerData } from "@/app/lib/utils";
import { FilterGroup } from "../FilterGroup/FilterGroup";
import { FILTER_GROUP_SUBTYPE, GROUP } from "@/app/lib/constants";
import { useMemo } from "react";

import styles from "./filterGroupItems.module.css";
import cn from "clsx";

export type Props = {
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
  const { isEdit } = params;

  return (
    <>
      {filterGroupIds.map((filterGroupId, index) => {
        const filterGroupData = data[filterGroupId];
        return (
          <div key={filterGroupId}>
            {!!index ? (
              <div className={cn(styles.divider, { [styles.edit]: isEdit })} />
            ) : null}
            <FilterGroup
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
