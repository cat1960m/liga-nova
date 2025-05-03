"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import {
  FILTER,
  FILTER_GROUP_SUBTYPE,
  FILTER_GROUP_DEFAULT_WIDTH,
  FILTER_GROUP_TITLE,
  GRAY_BACKGROUND_COLOR,
  GROUP,
} from "@/app/lib/constants";
import { useMemo } from "react";
import { AddChildFeatureButton } from "@/app/ui/CommonComponents/_buttons/AddChildFeatureButton";
import { FilterGroupsBody } from "./FilterGroupsBody/FilterGroupsBody";
import styles from "./filterGroups.module.css";
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
  width?: string;
  isEdit: boolean;
  lang: string;
  staticTexts: StaticTexts;
  pageName: string;
};

export const FilterGroups = ({
  pageFullDataList,
  onFilterSelectionChanged,
  selectedFilterTextDescriptionIds,
  parentFeatureId,
  width,
  isEdit,
  lang,
  staticTexts,
  pageName
}: Props) => {
  const currentWidth = width ?? FILTER_GROUP_DEFAULT_WIDTH;

  return (
    <div
      className={cn(styles.container, { [styles.edit]: isEdit })}
      style={{ width: currentWidth }}
    >
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

      {isEdit ? (
        <div className={styles.button}>
          <AddChildFeatureButton
            parentFeatureId={parentFeatureId}
            text={staticTexts.addGroup ?? "N/A"}
            pageName={pageName}
            textTypes={[FILTER_GROUP_TITLE, FILTER]}
            type={GROUP}
            subtype={FILTER_GROUP_SUBTYPE}
          />
        </div>
      ) : null}
    </div>
  );
};
