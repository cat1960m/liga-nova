"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData, MainParams } from "@/app/lib/definitions";
import { getContainerData } from "@/app/lib/utils";
import { FilterGroup } from "./FilterGroup";
import { GROUP } from "@/app/lib/constants";
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
  subtype: string;
  titleTextType: string;
  itemTextType: string;
};

export const FilterGroups = ({
  pageFullDataList,
  isEdit,
  staticTexts,
  params,
  onFilterSelectionChanged,
  selectedFilterTextDescriptionIds,
  parentFeatureId,
  subtype,
  titleTextType,
  itemTextType,
}: Props) => {
  const containerFullData = useMemo(
    () =>
      parentFeatureId
        ? getContainerData({
            pageName: params.pageName,
            pageFullData: pageFullDataList,
            parentFeatureId: parentFeatureId,
            type: GROUP,
            subtype,
          })
        : null,
    [pageFullDataList, parentFeatureId]
  );

  if (!containerFullData) {
    return null;
  }

  const [data, filterGroupIds] = containerFullData;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f8f8f8",
        border: "1px solid lightgray",
        borderRadius: "10px",
        width: isEdit ? undefined : "238px",
        minWidth: "238px",
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
              titleTextType={titleTextType}
              itemTextType={itemTextType}
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
            textTypes={[titleTextType, itemTextType]}
            type={GROUP}
            subtype={subtype}
          />
        </div>
      ) : null}
    </div>
  );
};
