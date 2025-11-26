"use client";

import { FullData } from "@/app/lib/definitions";
import { useState } from "react";
import { CommonButton } from "@/app/ui/CommonComponents/_buttons/CommonButton";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { FilterGroupsBody } from "../FilterGroupsBody/FilterGroupsBody";
import {
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
  setEditingFilterGroupId: (id: number | null) => void;
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
  setEditingFilterGroupId
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
            setEditingFilterGroupId={setEditingFilterGroupId}
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
