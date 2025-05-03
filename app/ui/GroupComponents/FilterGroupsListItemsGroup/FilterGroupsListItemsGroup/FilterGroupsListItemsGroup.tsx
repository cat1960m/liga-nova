"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { useState } from "react";
import { EditListItemFilter } from "../EditListItemFilter/EditListItemFilter";
import { FilterGroups } from "../_filters/FilterGroups";
import { FilterGroupsMobile } from "../_filters/FilterGroupsMobile/FilterGroupsMobile";
import styles from "./filterGroupsListItemGroup.module.css";
import { getIsEditNoDelete } from "@/app/lib/utils";
import { WrappingListItemsContainer } from "../WrappingListItemsContainer/WrappingListItemsContainer";
import { ItemContainerDeleteFeature } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerDeleteFeature";
import cn from "clsx";

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
  const { staticTexts, pageName, lang, editMode } = params;
  const { isEdit, noDelete } = getIsEditNoDelete(params);

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

  return (
    <ItemContainerDeleteFeature
      isEdit={isEdit}
      deleteText={staticTexts.delete ?? "N/A"}
      featureData={groupData}
      marginTop={0}
      noDelete={noDelete}
      noChangeOrder={noDelete}
    >
      <div className={styles.container}>
        {editingListItemFeatureId ? (
          <EditListItemFilter
            pageFullDataList={pageFullDataList}
            groupData={groupData}
            onCancel={handleAddEditCancel}
            editItemFeatureId={editingListItemFeatureId}
            lang={lang}
            staticTexts={staticTexts}
            pageName={pageName}
            isEdit={isEdit}
          />
        ) : null}

        {!editingListItemFeatureId ? (
          <div
            className={cn(styles.filterPanel, {
              [styles.edit]: isEdit,
            })}
          >
            <div className={isEdit ? undefined : styles.filterGroups}>
              <FilterGroups
                parentFeatureId={parentFeatureId}
                pageFullDataList={pageFullDataList}
                onFilterSelectionChanged={handleFilterSelectionChanged}
                selectedFilterTextDescriptionIds={
                  selectedFilterTextDescriptionIds
                }
                isEdit={isEdit}
                lang={lang}
                staticTexts={staticTexts}
                pageName={pageName}
              />
            </div>

            {!isEdit ? (
              <div className={styles.filterGroupsMobile}>
                <FilterGroupsMobile
                  parentFeatureId={parentFeatureId}
                  pageFullDataList={pageFullDataList}
                  onFilterSelectionChanged={handleFilterSelectionChanged}
                  selectedFilterTextDescriptionIds={
                    selectedFilterTextDescriptionIds
                  }
                  isEdit={isEdit}
                  lang={lang}
                  staticTexts={staticTexts}
                  pageName={pageName}
                />
              </div>
            ) : null}
          </div>
        ) : null}

        {!editingListItemFeatureId ? (
          <div className={styles.main}>
            <WrappingListItemsContainer
              isEdit={isEdit}
              pageFullDataList={pageFullDataList}
              staticTexts={staticTexts}
              pageName={pageName}
              selectedFilterTextDescriptionIds={
                selectedFilterTextDescriptionIds
              }
              setEditingListItemFeatureId={setEditingListItemFeatureId}
              parentFeatureId={groupData[0]?.id}
            />
          </div>
        ) : null}
      </div>
    </ItemContainerDeleteFeature>
  );
};
