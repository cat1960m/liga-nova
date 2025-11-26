"use client";

import { FullData } from "@/app/lib/definitions";
import { getContainerData } from "@/app/lib/utils";
import { FilterGroup } from "../FilterGroup/FilterGroup";
import {
  FILTER_GROUP_SUBTYPE,
  GROUP,
  ICON_BUTTON_WIDTH,
  ICON_IN_BUTTON_WIDTH,
  PAGE_NAMES_TO_LIST_ITEMS_DATA,
} from "@/app/lib/constants";
import { useMemo } from "react";

import styles from "./filterGroupsBody.module.css";
import cn from "clsx";
import { CountIndex, StaticTexts } from "@/app/dictionaries/definitions";
import { ItemGroupContainerCommon } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemGroupContainerCommon/ItemGroupContainerCommon";
import { CommonButton } from "@/app/ui/CommonComponents/_buttons/CommonButton";
import { PencilIcon } from "@heroicons/react/24/outline";
import { DeleteFeatureChangeOrderButtons } from "@/app/ui/CommonComponents/_buttons/DeleteFeatureChangeOrderButtons/DeleteFeatureChangeOrderButtons";

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
  setEditingFilterGroupId?: (id: number | null) => void;
};

export const FilterGroupsBody = ({
  pageFullDataList,
  onFilterSelectionChanged,
  selectedFilterTextDescriptionIds,
  parentFeatureId,
  isEdit,
  lang,
  staticTexts,
  pageName,
  setEditingFilterGroupId,
}: Props) => {
  const containerFullData = useMemo(
    () =>
      parentFeatureId
        ? getContainerData({
            pageName: pageName,
            pageFullData: pageFullDataList,
            parentFeatureId: parentFeatureId,
            type: GROUP,
            subtype: FILTER_GROUP_SUBTYPE,
          })
        : null,
    [pageName, pageFullDataList, parentFeatureId]
  );

  if (!containerFullData) {
    return null;
  }

  const [recordFilterGroupIdToFilerGroupData, filterGroupIds] = containerFullData;

  const editText = pageName
    ? PAGE_NAMES_TO_LIST_ITEMS_DATA[pageName].editText
    : null;
  const editTextButton = editText
    ? staticTexts[editText]?.toString() ?? "N/A"
    : "";

  const getEditButtons = ({
    countIndex,
    filterGroupData,
  }: {
    countIndex: CountIndex | null;
    filterGroupData: FullData[];
  }) => {
    const id = filterGroupData[0]?.id ?? null;
    return (
      <div className={styles.buttons} >
        <CommonButton
          onClick={() => setEditingFilterGroupId?.(id)}
          width={ICON_BUTTON_WIDTH}
        >
          <PencilIcon width={ICON_IN_BUTTON_WIDTH} title={editTextButton} />
        </CommonButton>

        <DeleteFeatureChangeOrderButtons
          deleteText={staticTexts.delete ?? "N/A"}
          featureData={filterGroupData}
          isChangeOrderHorizontal={false}
          countIndex={countIndex}
        />
      </div>
    );
  };

  return (
    <>
      {filterGroupIds.map((filterGroupId, index) => {
        const filterGroupData = recordFilterGroupIdToFilerGroupData[filterGroupId];
        return (
          <div key={filterGroupId}>
            {!!index ? (
              <div className={cn(styles.divider, { [styles.edit]: isEdit })} />
            ) : null}

            <ItemGroupContainerCommon
              showGroupButtons={isEdit}
              getEditButtons={() =>
                getEditButtons({
                  countIndex: { count: filterGroupIds.length, index },
                  filterGroupData,
                })
              }
              marginTop={0}
              heightValue="100%"
            >
              <FilterGroup
                filterGroupData={filterGroupData}
                onFilterSelectionChanged={onFilterSelectionChanged}
                selectedFilterTextDescriptionIds={
                  selectedFilterTextDescriptionIds
                }
                editMode={isEdit ? "groupOnly" : "no"}
                lang={lang}
                staticTexts={staticTexts}
              />
            </ItemGroupContainerCommon>
          </div>
        );
      })}
    </>
  );
};
