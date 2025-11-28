"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { useState } from "react";
import { EditListItemFilter } from "../EditListItemFilter/EditListItemFilter";
import { FilterGroups } from "../_filters/FilterGroups";
import {
  FilterGroupsMobile,
  FilterGroupsMobileProps,
} from "../_filters/FilterGroupsMobile/FilterGroupsMobile";
import styles from "./filterGroupsListItemGroup.module.css";
import { getIsEditNoDelete } from "@/app/lib/utils";
import { WrappingListItemsContainer } from "../WrappingListItemsContainer/WrappingListItemsContainer";
import { ItemContainerDeleteFeature } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerDeleteFeature";
import cn from "clsx";
import { EditFilterGroup } from "../_filters/EditFilterGroup/EditFilterGroup";
import { FILTER_GROUP_SUBTYPE, GROUP, LIST_ITEM } from "@/app/lib/constants";
import { useContainerData } from "@/app/ui/hooks/useContainerData";

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

  const { staticTexts, pageName, lang } = params;
  const { isEdit, noDelete } = getIsEditNoDelete(params);

  const structuredFilterGroupData = useContainerData({
    pageName: pageName,
    pageFullData: pageFullDataList,
    parentFeatureId: groupDataFeatureId,
    type: GROUP,
    subtype: FILTER_GROUP_SUBTYPE,
  });

  const filteredListItemsData = useContainerData({
    pageName,
    pageFullData: pageFullDataList,
    parentFeatureId: groupDataFeatureId,
    type: LIST_ITEM,
    subtype: LIST_ITEM,
    selectedFiltersData: {
      selectedFilterTextDescriptionIds,
      filterGroupsData: structuredFilterGroupData,
    },
  });

  if (!groupDataFeatureId) {
    return null;
  }

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

  const filterGroupsMobileProps: FilterGroupsMobileProps = {
    onFilterSelectionChanged: handleFilterSelectionChanged,
    selectedFilterTextDescriptionIds,
    isEdit,
    lang,
    staticTexts,
    pageName,
    structuredFilterGroupData,
  };

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
            structuredFilterGroupData={structuredFilterGroupData}
          />
        ) : null}

        {editingFilterGroupId ? (
          <EditFilterGroup
            selectedFilterTextDescriptionIds={selectedFilterTextDescriptionIds}
            lang={lang}
            staticTexts={staticTexts}
            setEditingFilterGroupId={setEditingFilterGroupId}
            editingFilterGroupData={
              structuredFilterGroupData.childFeatureIdToFullDataList[
                editingFilterGroupId
              ]
            }
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
                {...filterGroupsMobileProps}
              />
            </div>

            {!isEdit ? (
              <div className={styles.filterGroupsMobile}>
                <FilterGroupsMobile {...filterGroupsMobileProps} />
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
              setEditingListItemFeatureId={setEditingListItemFeatureId}
              parentFeatureId={groupDataFeatureId}
              filteredListItemsData={filteredListItemsData}
            />
          </div>
        ) : null}
      </div>
    </ItemContainerDeleteFeature>
  );
};
