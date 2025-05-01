"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { useState } from "react";
import { EditListItemFilter } from "../EditListItemFilter/EditListItemFilter";
import { LIST_ITEM, PAGE_NAMES_TO_LIST_ITEMS_DATA } from "@/app/lib/constants";
import { WrappingListItems } from "../WrappingListItems/WrappingListItems";
import { FilterGroups } from "../_filters/FilterGroups";
import { FilterGroupsMobile } from "../_filters/FilterGroupsMobile/FilterGroupsMobile";
import { ItemContainerAddChildFeatureDeleteFeature } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerAddChildFeatureDeleteFeature";
import styles from "./filterGroupsListItemGroup.module.css";

export type Props = {
  groupData: FullData[];
  pageFullDataList: FullData[];
  params: MainParams;
};

export const FilterGroupsListItemsGroup = ({
  groupData,
  pageFullDataList,
  params,
}: Props) => {
  const parentFeatureId = groupData[0]?.id;

  const [editingListItemFeatureId, setEditingListItemFeatureId] = useState<
    number | null
  >(null);
  const [
    selectedFilterTextDescriptionIds,
    setSelectedFilterTextDescriptionIds,
  ] = useState<number[]>([]);

  if (!parentFeatureId) {
    return null;
  }
  const { staticTexts, isEdit } = params;

  const handleFilterSelectionChanged = ({
    filter,
    value,
  }: {
    filter: FullData;
    value: boolean;
  }) => {
    if (value) {
      const newSelectedFilterTextDescriptionIds = [
        ...selectedFilterTextDescriptionIds,
      ];
      newSelectedFilterTextDescriptionIds.push(filter.text_description_id);
      setSelectedFilterTextDescriptionIds(newSelectedFilterTextDescriptionIds);
    } else {
      const newSelectedFilterTextDescriptionIds =
        selectedFilterTextDescriptionIds.filter(
          (item) => item !== filter.text_description_id
        );
      setSelectedFilterTextDescriptionIds(newSelectedFilterTextDescriptionIds);
    }
  };

  const handleAddEditCancel = async () => {
    if (editingListItemFeatureId) {
      setEditingListItemFeatureId(null);
    }
  };

  const isListItemsShown = !editingListItemFeatureId;

  const addText = PAGE_NAMES_TO_LIST_ITEMS_DATA[params.pageName].addText;
  const addListItemText = staticTexts[addText]?.toString() ?? "N/A";

  const editText = PAGE_NAMES_TO_LIST_ITEMS_DATA[params.pageName].editText;
  const editListItemText = staticTexts[editText]?.toString() ?? "N/A";

  return (
    <ItemContainerAddChildFeatureDeleteFeature
      addButtonText={addListItemText}
      params={params}
      featureType={LIST_ITEM}
      featureSubtype={LIST_ITEM}
      textTypes={PAGE_NAMES_TO_LIST_ITEMS_DATA[params.pageName]?.textTypes}
      deleteButtonText={staticTexts.delete ?? "N/A"}
      groupData={groupData}
      marginTop={0}
    >
      <div className={styles.container}>
        {parentFeatureId ? (
          <>
            <div className={isEdit ? undefined : styles.filterGroups}>
              <FilterGroups
                parentFeatureId={parentFeatureId}
                pageFullDataList={pageFullDataList}
                params={params}
                onFilterSelectionChanged={handleFilterSelectionChanged}
                selectedFilterTextDescriptionIds={
                  selectedFilterTextDescriptionIds
                }
              />
            </div>

            {!isEdit ? (
              <div className={styles.filterGroupsMobile}>
                <FilterGroupsMobile
                  parentFeatureId={parentFeatureId}
                  pageFullDataList={pageFullDataList}
                  params={params}
                  onFilterSelectionChanged={handleFilterSelectionChanged}
                  selectedFilterTextDescriptionIds={
                    selectedFilterTextDescriptionIds
                  }
                />
              </div>
            ) : null}
          </>
        ) : null}

        <div className={styles.main}>
          {editingListItemFeatureId ? (
            <EditListItemFilter
              pageFullDataList={pageFullDataList}
              params={params}
              groupData={groupData}
              onCancel={handleAddEditCancel}
              editItemFeatureId={editingListItemFeatureId}
              editListItemText={editListItemText}
            />
          ) : null}

          {isListItemsShown ? (
            <WrappingListItems
              pageFullDataList={pageFullDataList}
              setEditingItemFeatureId={setEditingListItemFeatureId}
              parentFeatureId={parentFeatureId}
              selectedFilterTextDescriptionIds={
                selectedFilterTextDescriptionIds
              }
              params={params}
              editTextButton={editListItemText}
            />
          ) : null}
        </div>
      </div>
    </ItemContainerAddChildFeatureDeleteFeature>
  );
};
