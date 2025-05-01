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
import { FilterGroupsItems } from "./FilterGroupItems/FilterGroupItems";
import styles from "./filterGroups.module.css";
import cn from "clsx";

export type Props = {
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
  params,
  onFilterSelectionChanged,
  selectedFilterTextDescriptionIds,
  parentFeatureId,
  width,
}: Props) => {
  const currentWidth = width ?? FILTER_GROUP_DEFAULT_WIDTH;
  const { staticTexts, isEdit } = params;

  return (
    <div
      className={cn(styles.container, { [styles.edit]: isEdit })}
      style={{ width: currentWidth }}
    >
      <FilterGroupsItems
        pageFullDataList={pageFullDataList}
        params={params}
        onFilterSelectionChanged={onFilterSelectionChanged}
        selectedFilterTextDescriptionIds={selectedFilterTextDescriptionIds}
        parentFeatureId={parentFeatureId}
      />

      {isEdit ? (
        <div className={styles.button}>
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
