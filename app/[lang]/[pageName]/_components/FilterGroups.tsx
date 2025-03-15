"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData, MainParams } from "@/app/lib/definitions";
import { getContainerData } from "@/app/lib/utils";
import { FilterGroup } from "./FilterGroup";
import {
  FILTER,
  FILTER_GROUP,
  FILTER_GROUP_TITLE,
  GROUP,
} from "@/app/lib/constants";
import { useMemo } from "react";
import { AddChildFeatureButton } from "./_clientComponents/AddChildFeatureButton";

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
  width?: string;
};

export const FilterGroups = ({
  pageFullDataList,
  isEdit,
  staticTexts,
  params,
  onFilterSelectionChanged,
  selectedFilterTextDescriptionIds,
  parentFeatureId,
  width,
}: Props) => {
  const containerFullData = useMemo(
    () =>
      parentFeatureId
        ? getContainerData({
            pageName: params.pageName,
            pageFullData: pageFullDataList,
            parentFeatureId: parentFeatureId,
            type: GROUP,
            subtype: FILTER_GROUP,
          })
        : null,
    [pageFullDataList, parentFeatureId]
  );

  if (!containerFullData) {
    return null;
  }

  const [data, filterGroupIds] = containerFullData;

  const currentWidth = width ?? "238px";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f8f8f8",
        border: "1px solid lightgray",
        borderRadius: "10px",
        width: isEdit ? undefined : currentWidth,
        minWidth: currentWidth,
      }}
    >
      {filterGroupIds.map((filterGroupId, index) => {
        const filterGroupData = data[filterGroupId];
        return (
          <div key={filterGroupId}>
            {!!index ? (
              <div
                style={{ padding: "5px 0", borderTop: "1px solid lightgray" }}
              />
            ) : null}
            <FilterGroup
              isEdit={isEdit}
              staticTexts={staticTexts}
              groupData={filterGroupData}
              onFilterSelectionChanged={onFilterSelectionChanged}
              selectedFilterTextDescriptionIds={
                selectedFilterTextDescriptionIds
              }
            />
          </div>
        );
      })}

      {isEdit ? (
        <div
          style={{
            margin: "10px",
            display: "flex",
            width: "100%",
            justifyContent: "center",
            gap: "5px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <AddChildFeatureButton
            parentFeatureId={parentFeatureId}
            text={staticTexts.addGroup ?? "N/A"}
            params={params}
            textTypes={[FILTER_GROUP_TITLE, FILTER]}
            type={GROUP}
            subtype={FILTER_GROUP}
          />
        </div>
      ) : null}
    </div>
  );
};
