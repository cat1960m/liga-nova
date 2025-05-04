"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { useState } from "react";
import { CommonButton } from "@/app/ui/CommonComponents/_buttons/CommonButton";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { FilterGroupsBody } from "../FilterGroupsBody/FilterGroupsBody";
import {
  FILTER_GROUP_DEFAULT_WIDTH,
  GRAY_BACKGROUND_COLOR,
} from "@/app/lib/constants";

import styles from "./filterGroupsMobile.module.css";
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

export const FilterGroupsMobile = ({
  pageFullDataList,
  onFilterSelectionChanged,
  selectedFilterTextDescriptionIds,
  parentFeatureId,
  isEdit,
  lang,
  staticTexts,
  pageName,
}: Props) => {
  const [isFiltersShown, setIsFiltersShown] = useState(false);

  const handleFiltersShownClick = () => {
    setIsFiltersShown(true);
  };

  const handleFiltersHideClick = () => {
    setIsFiltersShown(false);
  };

  const filtersTitle = (
    <div className={styles.title}>
      <AdjustmentsHorizontalIcon className={styles.icon} />
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

          <FilterGroupsBody
            pageFullDataList={pageFullDataList}
            onFilterSelectionChanged={onFilterSelectionChanged}
            selectedFilterTextDescriptionIds={selectedFilterTextDescriptionIds}
            parentFeatureId={parentFeatureId}
            isEdit={isEdit}
            lang={lang}
            staticTexts={staticTexts}
            pageName={pageName}
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
