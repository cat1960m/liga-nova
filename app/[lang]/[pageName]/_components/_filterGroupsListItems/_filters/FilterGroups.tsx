"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData, MainParams } from "@/app/lib/definitions";
import { getContainerData } from "@/app/lib/utils";
import { FilterGroup } from "./FilterGroup";
import {
  FILTER,
  FILTER_GROUP_SUBTYPE,
  FILTER_GROUP_DEFAULT_WIDTH,
  FILTER_GROUP_TITLE,
  GRAY_BACKGROUND_COLOR,
  GROUP,
} from "@/app/lib/constants";
import { useMemo } from "react";
import { AddChildFeatureButton } from "../../_buttons/AddChildFeatureButton";
import { FilterGroupsItems } from "./FilterGroupItems";

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
  const currentWidth = width ?? FILTER_GROUP_DEFAULT_WIDTH;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: GRAY_BACKGROUND_COLOR,
        border: "1px solid lightgray",
        borderRadius: "10px",
        width: isEdit ? undefined : currentWidth,
        minWidth: FILTER_GROUP_DEFAULT_WIDTH,
      }}
    >
      <FilterGroupsItems
        isEdit={isEdit}
        staticTexts={staticTexts}
        pageFullDataList={pageFullDataList}
        params={params}
        onFilterSelectionChanged={onFilterSelectionChanged}
        selectedFilterTextDescriptionIds={selectedFilterTextDescriptionIds}
        parentFeatureId={parentFeatureId}
      />

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
            subtype={FILTER_GROUP_SUBTYPE}
          />
        </div>
      ) : null}
    </div>
  );
};
