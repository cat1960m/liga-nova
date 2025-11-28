"use client";

import { FullData, StructuredFeatureData } from "@/app/lib/definitions";
import { useState } from "react";
import { CommonButton } from "@/app/ui/CommonComponents/_buttons/CommonButton";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { FilterGroupsBody } from "../FilterGroupsBody/FilterGroupsBody";
import { GRAY_BACKGROUND_COLOR } from "@/app/lib/constants";

import styles from "./filterGroupsMobile.module.css";
import { StaticTexts } from "@/app/dictionaries/definitions";

export type FilterGroupsMobileProps = {
  onFilterSelectionChanged: (data: {
    filter: FullData;
    value: boolean;
  }) => void;
  selectedFilterTextDescriptionIds: number[];
  isEdit: boolean;
  lang: string;
  staticTexts: StaticTexts;
  pageName: string;
  structuredFilterGroupData: StructuredFeatureData;
};

export const FilterGroupsMobile = ({
  onFilterSelectionChanged,
  selectedFilterTextDescriptionIds,
  isEdit,
  lang,
  staticTexts,
  pageName,
  structuredFilterGroupData,
}: FilterGroupsMobileProps) => {
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
            onFilterSelectionChanged={onFilterSelectionChanged}
            selectedFilterTextDescriptionIds={selectedFilterTextDescriptionIds}
            isEdit={isEdit}
            lang={lang}
            staticTexts={staticTexts}
            pageName={pageName}
            structuredFilterGroupData={structuredFilterGroupData}
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
