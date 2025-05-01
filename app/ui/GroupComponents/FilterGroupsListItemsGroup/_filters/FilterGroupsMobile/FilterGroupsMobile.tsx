"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { useState } from "react";
import { CommonButton } from "@/app/ui/CommonComponents/_buttons/CommonButton";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { FilterGroupsItems } from "../FilterGroupItems/FilterGroupItems";
import {
  FILTER_GROUP_DEFAULT_WIDTH,
  GRAY_BACKGROUND_COLOR,
} from "@/app/lib/constants";

import styles from "./filterGroupsMobile.module.css";

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

export const FilterGroupsMobile = ({
  pageFullDataList,
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

  const { staticTexts } = params;

  const filtersTitle = (
    <div className={styles.title}>
      <AdjustmentsHorizontalIcon style={{ width: "32px", color: "gray" }} />
      {staticTexts.filters}
    </div>
  );

  return (
    <div className={styles.container}>
      {!isFiltersShown ? (
        <CommonButton
          onClick={handleFiltersShownClick}
          styleValue={{
            borderRadius: "10px",
            width: "100%",
            backgroundColor: GRAY_BACKGROUND_COLOR,
          }}
        >
          {filtersTitle}
        </CommonButton>
      ) : null}

      {isFiltersShown ? (
        <div className={styles.body}>
          <div className={styles.title_container}>{filtersTitle}</div>

          <FilterGroupsItems
            pageFullDataList={pageFullDataList}
            params={params}
            onFilterSelectionChanged={onFilterSelectionChanged}
            selectedFilterTextDescriptionIds={selectedFilterTextDescriptionIds}
            parentFeatureId={parentFeatureId}
          />

          <div className={styles.button}>
            <CommonButton
              text={staticTexts.apply}
              onClick={handleFiltersHideClick}
              isAction
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
