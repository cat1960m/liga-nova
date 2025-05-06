"use client";

import { FullData } from "@/app/lib/definitions";
import { getContainerData } from "@/app/lib/utils";
import { FilterGroup } from "../FilterGroup/FilterGroup";
import { FILTER_GROUP_SUBTYPE, GROUP } from "@/app/lib/constants";
import { useMemo } from "react";

import styles from "./filterGroupsBody.module.css";
import cn from "clsx";
import { StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  pageFullDataList: FullData[];
  onFilterSelectionChanged: (data: {
    filter: FullData;
    value: boolean;
  }) => void;
  selectedFilterTextDescriptionIds: number[];
  parentFeatureId: number;
  isEdit: boolean;
  lang: string;
  staticTexts: StaticTexts;
  pageName: string;
};

export const FilterGroupsBody = ({
  pageFullDataList,
  onFilterSelectionChanged,
  selectedFilterTextDescriptionIds,
  parentFeatureId,
  isEdit,
  lang,
  staticTexts,
  pageName,
}: Props) => {
  const containerFullData = useMemo(
    () =>
      parentFeatureId
        ? getContainerData({
            pageName: pageName,
            pageFullData: pageFullDataList,
            parentFeatureId: parentFeatureId,
            type: GROUP,
            subtype: FILTER_GROUP_SUBTYPE,
          })
        : null,
    [pageName, pageFullDataList, parentFeatureId]
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
              <div className={cn(styles.divider, { [styles.edit]: isEdit })} />
            ) : null}
            <FilterGroup
              filterGroupData={filterGroupData}
              onFilterSelectionChanged={onFilterSelectionChanged}
              selectedFilterTextDescriptionIds={
                selectedFilterTextDescriptionIds
              }
              parentFeatureId={parentFeatureId}
              isEdit={isEdit}
              lang={lang}
              staticTexts={staticTexts}
            />
          </div>
        );
      })}
    </>
  );
};
