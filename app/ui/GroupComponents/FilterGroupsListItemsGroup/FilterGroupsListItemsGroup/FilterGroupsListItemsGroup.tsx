"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { useMemo, useState } from "react";
import { EditListItemFilter } from "../EditListItemFilter/EditListItemFilter";
import { FilterGroups } from "../_filters/FilterGroups";
import { FilterGroupsMobile } from "../_filters/FilterGroupsMobile/FilterGroupsMobile";
import styles from "./filterGroupsListItemGroup.module.css";
import { getContainerData, getIsEditNoDelete } from "@/app/lib/utils";
import { WrappingListItemsContainer } from "../WrappingListItemsContainer/WrappingListItemsContainer";
import { ItemContainerDeleteFeature } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerDeleteFeature";
import cn from "clsx";
import { EditFilterGroup } from "../_filters/EditFilterGroup/EditFilterGroup";
import { FILTER_GROUP_SUBTYPE, GROUP } from "@/app/lib/constants";

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
  const groupDataFeatureId = groupData[0]?.id;

  const [editingData, setEditingData] = useState<{
    id: number;
    type: "filter" | "item";
  } | null>(null);

  const setEditingListItemFeatureId = (id: number | null) =>
    setEditingData(id ? { id, type: "item" } : null);
  const editingListItemFeatureId =
    editingData?.type === "item" ? editingData.id : null;

  const setEditingFilterGroupId = (id: number | null) =>
    setEditingData(id ? { id, type: "filter" } : null);
  const editingFilterGroupId =
    editingData?.type === "filter" ? editingData.id : null;

  const [
    selectedFilterTextDescriptionIds,
    setSelectedFilterTextDescriptionIds,
  ] = useState<number[]>([]);

  if (!groupDataFeatureId) {
    return null;
  }

  const { staticTexts, pageName, lang } = params;
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
    setEditingData(null);
  };

  const containerFullData = useMemo(
      () =>
        groupDataFeatureId
          ? getContainerData({
              pageName: pageName,
              pageFullData: pageFullDataList,
              parentFeatureId: groupDataFeatureId,
              type: GROUP,
              subtype: FILTER_GROUP_SUBTYPE,
            })
          : null,
      [pageName, pageFullDataList, groupDataFeatureId]
    );
  
    if (!containerFullData) {
      return null;
    }
  
    const [recordFilterGroupIdToFilerGroupData, filterGroupIds] = containerFullData;
  

  return (
    <ItemContainerDeleteFeature
      isEdit={isEdit}
      deleteText={staticTexts.delete ?? "N/A"}
      featureData={groupData}
      marginTop={0}
      noDelete={noDelete}
      noChangeOrder={noDelete}
      countIndex={null}
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

        {editingFilterGroupId ? (
          <EditFilterGroup
            pageFullDataList={pageFullDataList}
            parentFeatureId={groupDataFeatureId}
            selectedFilterTextDescriptionIds={selectedFilterTextDescriptionIds}
            lang={lang}
            staticTexts={staticTexts}
            pageName={pageName}
            setEditingFilterGroupId={setEditingFilterGroupId}
            editingFilterGroupId={editingFilterGroupId}
          />
        ) : null}

        {!editingData ? (
          <div
            className={cn(styles.filterPanel, {
              [styles.edit]: isEdit,
            })}
          >
            <div className={isEdit ? undefined : styles.filterGroups}>
              <FilterGroups
                parentFeatureId={groupDataFeatureId}
                pageFullDataList={pageFullDataList}
                onFilterSelectionChanged={handleFilterSelectionChanged}
                selectedFilterTextDescriptionIds={
                  selectedFilterTextDescriptionIds
                }
                isEdit={isEdit}
                lang={lang}
                staticTexts={staticTexts}
                pageName={pageName}
                setEditingFilterGroupId={setEditingFilterGroupId}
              />
            </div>

            {!isEdit ? (
              <div className={styles.filterGroupsMobile}>
                <FilterGroupsMobile
                  parentFeatureId={groupDataFeatureId}
                  pageFullDataList={pageFullDataList}
                  onFilterSelectionChanged={handleFilterSelectionChanged}
                  selectedFilterTextDescriptionIds={
                    selectedFilterTextDescriptionIds
                  }
                  isEdit={isEdit}
                  lang={lang}
                  staticTexts={staticTexts}
                  pageName={pageName}
                  setEditingFilterGroupId={setEditingFilterGroupId}
                />
              </div>
            ) : null}
          </div>
        ) : null}

        {!editingData ? (
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
