"use client";

import { FullData, StructuredFeatureData } from "@/app/lib/definitions";
import {
  FILTER,
  FILTER_GROUP_SUBTYPE,
  FILTER_GROUP_DEFAULT_WIDTH,
  FILTER_GROUP_TITLE,
  GROUP,
} from "@/app/lib/constants";
import { AddChildFeatureButton } from "@/app/ui/CommonComponents/_buttons/AddChildFeatureButton";
import { FilterGroupsBody } from "./FilterGroupsBody/FilterGroupsBody";
import styles from "./filterGroups.module.css";
import cn from "clsx";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ItemGroupContainerCommon } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemGroupContainerCommon/ItemGroupContainerCommon";

export type Props = {
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
  setEditingFilterGroupId?: (id: number | null) => void;
  structuredFilterGroupData: StructuredFeatureData;
};

export const FilterGroups = ({
  onFilterSelectionChanged,
  selectedFilterTextDescriptionIds,
  parentFeatureId,
  width,
  isEdit,
  lang,
  staticTexts,
  pageName,
  setEditingFilterGroupId,
  structuredFilterGroupData,
}: Props) => {
  const currentWidth = width ?? FILTER_GROUP_DEFAULT_WIDTH;

  const getEditButtons = () => {
    return (
      <div className={styles.button}>
        <AddChildFeatureButton
          parentFeatureId={parentFeatureId}
          text={staticTexts.addGroup ?? "N/A"}
          textTypes={[FILTER_GROUP_TITLE, FILTER]}
          type={GROUP}
          subtype={FILTER_GROUP_SUBTYPE}
        />
      </div>
    );
  };

  return (
    <ItemGroupContainerCommon
      showGroupButtons={isEdit}
      getEditButtons={getEditButtons}
      marginTop={isEdit ? 20 : 0}
    >
      <div
        className={cn(styles.container, { [styles.edit]: isEdit })}
        style={{ width: isEdit ? currentWidth : currentWidth }}
      >
        <FilterGroupsBody
          onFilterSelectionChanged={onFilterSelectionChanged}
          selectedFilterTextDescriptionIds={selectedFilterTextDescriptionIds}
          isEdit={isEdit}
          lang={lang}
          staticTexts={staticTexts}
          pageName={pageName}
          setEditingFilterGroupId={setEditingFilterGroupId}
          structuredFilterGroupData={structuredFilterGroupData}
        />
      </div>
    </ItemGroupContainerCommon>
  );
};
