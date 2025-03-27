"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData, MainParams } from "@/app/lib/definitions";
import { useState } from "react";
import { CommonButton } from "../../_buttons/CommonButton";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { FilterGroupsItems } from "./FilterGroupItems";
import {
  ACTION_BUTTON_BACKGROUND,
  FILTER_GROUP_DEFAULT_WIDTH,
  GRAY_BACKGROUND_COLOR,
} from "@/app/lib/constants";

export type Props = {
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

export const FilterGroupsMobile = ({
  pageFullDataList,
  staticTexts,
  params,
  onFilterSelectionChanged,
  selectedFilterTextDescriptionIds,
  parentFeatureId,
}: Props) => {
  const [isFiltersShown, setIsFiltersShown] = useState(false);

  const handleFiltersShownClick = () => {
    setIsFiltersShown(true);
  };

  const handleFiltersHideClick = () => {
    setIsFiltersShown(false);
  };

  const filtersTitle = (
    <div
      style={{
        display: "flex",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
        color: "gray",
      }}
    >
      <AdjustmentsHorizontalIcon style={{ width: "32px", color: "gray" }} />
      {staticTexts.filters}
    </div>
  );

  return (
    <div style={{ width: "100%" }}>
      {!isFiltersShown ? (
        <CommonButton
          onClick={handleFiltersShownClick}
          width="100%"
          backgroundColor={GRAY_BACKGROUND_COLOR}
        >
          {filtersTitle}
        </CommonButton>
      ) : null}

      {isFiltersShown ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: GRAY_BACKGROUND_COLOR,
            border: "1px solid lightgray",
            borderRadius: "10px",
            width: "100%",
            minWidth: FILTER_GROUP_DEFAULT_WIDTH,
          }}
        >
          <div style={{ padding: "10px", borderBottom: "1px solid lightgray" }}>
            {filtersTitle}
          </div>

          <FilterGroupsItems
            isEdit={false}
            staticTexts={staticTexts}
            pageFullDataList={pageFullDataList}
            params={params}
            onFilterSelectionChanged={onFilterSelectionChanged}
            selectedFilterTextDescriptionIds={selectedFilterTextDescriptionIds}
            parentFeatureId={parentFeatureId}
          />

          <div
            style={{
              padding: "10px",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <CommonButton
              text={staticTexts.apply}
              onClick={handleFiltersHideClick}
              backgroundColor={ACTION_BUTTON_BACKGROUND}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
