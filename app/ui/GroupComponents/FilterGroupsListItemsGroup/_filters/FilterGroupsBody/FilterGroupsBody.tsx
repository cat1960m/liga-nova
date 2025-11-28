"use client";

import { FullData, StructuredFeatureData } from "@/app/lib/definitions";
import { FilterGroup } from "../FilterGroup/FilterGroup";
import {
  ICON_BUTTON_WIDTH,
  ICON_IN_BUTTON_WIDTH,
  PAGE_NAMES_TO_LIST_ITEMS_DATA,
} from "@/app/lib/constants";

import styles from "./filterGroupsBody.module.css";
import cn from "clsx";
import { CountIndex, StaticTexts } from "@/app/dictionaries/definitions";
import { ItemGroupContainerCommon } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemGroupContainerCommon/ItemGroupContainerCommon";
import { CommonButton } from "@/app/ui/CommonComponents/_buttons/CommonButton";
import { PencilIcon } from "@heroicons/react/24/outline";
import { DeleteFeatureChangeOrderButtons } from "@/app/ui/CommonComponents/_buttons/DeleteFeatureChangeOrderButtons/DeleteFeatureChangeOrderButtons";

export type Props = {
  onFilterSelectionChanged: (data: {
    filter: FullData;
    value: boolean;
  }) => void;
  selectedFilterTextDescriptionIds: number[];
  isEdit: boolean;
  lang: string;
  staticTexts: StaticTexts;
  pageName: string;
  setEditingFilterGroupId?: (id: number | null) => void;
  structuredFilterGroupData: StructuredFeatureData;
};

export const FilterGroupsBody = ({
  onFilterSelectionChanged,
  selectedFilterTextDescriptionIds,
  isEdit,
  lang,
  staticTexts,
  pageName,
  setEditingFilterGroupId,
  structuredFilterGroupData,
}: Props) => {
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
      <div className={styles.buttons}>
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
      {structuredFilterGroupData.sortedChildFeaFeatureIds.map(
        (filterGroupId, index) => {
          const filterGroupFullDataList =
            structuredFilterGroupData.childFeatureIdToFullDataList[
              filterGroupId
            ];
          return (
            <div key={filterGroupId}>
              {!!index ? (
                <div
                  className={cn(styles.divider, { [styles.edit]: isEdit })}
                />
              ) : null}

              <ItemGroupContainerCommon
                showGroupButtons={isEdit}
                getEditButtons={() =>
                  getEditButtons({
                    countIndex: {
                      count:
                        structuredFilterGroupData.sortedChildFeaFeatureIds
                          .length,
                      index,
                    },
                    filterGroupData: filterGroupFullDataList,
                  })
                }
                marginTop={0}
                heightValue="100%"
              >
                <FilterGroup
                  filterGroupData={filterGroupFullDataList}
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
        }
      )}
    </>
  );
};
