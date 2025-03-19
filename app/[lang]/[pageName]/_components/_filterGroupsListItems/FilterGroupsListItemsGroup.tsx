"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData, MainParams } from "@/app/lib/definitions";
import { useState } from "react";
import { AddEditListItemFilter } from "./AddEditListItemFilter";
import {
  addChildFeature,
  RemoveFeature,
  RemoveFeatureBySubtype,
} from "@/app/lib/actions_fitness";
import {
  LIST_ITEM,
  PAGE_NAMES_TO_LIST_ITEMS_DATA,
  TEMP_LIST_ITEM,
} from "@/app/lib/constants";
import { usePathname } from "next/navigation";
import { WrappingListItems } from "./WrappingListItems";
import { FilterGroups } from "./FilterGroups";

export type Props = {
  groupData: FullData[];
  isEdit: boolean;
  staticTexts: StaticTexts;
  pageFullDataList: FullData[];
  params: MainParams;
};

export const FilterGroupsListItemsGroup = ({
  groupData,
  pageFullDataList,
  isEdit,
  staticTexts,
  params,
}: Props) => {
  const parentFeatureId = groupData[0]?.id;

  const [addingListItemFeatureId, setAddingListItemFeatureId] = useState<
    number | null
  >(null);
  const [editingListItemFeatureId, setEditingListItemFeatureId] = useState<
    number | null
  >(null);
  const [
    selectedFilterTextDescriptionIds,
    setSelectedFilterTextDescriptionIds,
  ] = useState<number[]>([]);
  const pathName = usePathname();

  if (!parentFeatureId) {
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

  const handleAddListItem = async () => {
    await RemoveFeatureBySubtype({ subtype: TEMP_LIST_ITEM, pathName });

    const resultId = await addChildFeature({
      parentId: parentFeatureId,
      type: LIST_ITEM,
      subtype: TEMP_LIST_ITEM,
      name: params.pageName,
      text_types: PAGE_NAMES_TO_LIST_ITEMS_DATA[params.pageName]?.textTypes,
      pathName,
    });

    setAddingListItemFeatureId(resultId);
  };

  const handleAddEditCancel = async () => {
    if (addingListItemFeatureId) {
      await RemoveFeature({ id: addingListItemFeatureId, pathName });
      setAddingListItemFeatureId(null);
    }

    if (editingListItemFeatureId) {
      setEditingListItemFeatureId(null);
    }
  };

  const handleAddEditSave = () => {
    if (addingListItemFeatureId) {
      setAddingListItemFeatureId(null);
    }

    if (editingListItemFeatureId) {
      setEditingListItemFeatureId(null);
    }
  };

  const isListItemsShown =
    !addingListItemFeatureId && !editingListItemFeatureId;

  const addEditItemFeatureId =
    addingListItemFeatureId || editingListItemFeatureId;

  const addText = PAGE_NAMES_TO_LIST_ITEMS_DATA[params.pageName].addText;
  const addListItemText = staticTexts[addText]?.toString() ?? "N/A";

  const editText = PAGE_NAMES_TO_LIST_ITEMS_DATA[params.pageName].editText;
  const editListItemText = staticTexts[editText]?.toString() ?? "N/A";

  const addEditTitle = addingListItemFeatureId
    ? addListItemText
    : editListItemText;

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {parentFeatureId ? (
        <FilterGroups
          isEdit={isEdit}
          staticTexts={staticTexts}
          parentFeatureId={parentFeatureId}
          pageFullDataList={pageFullDataList}
          params={params}
          onFilterSelectionChanged={handleFilterSelectionChanged}
          selectedFilterTextDescriptionIds={selectedFilterTextDescriptionIds}
        />
      ) : null}

      <div
        style={{
          display: "flex",
          flexGrow: 2,
        }}
      >
        {addEditItemFeatureId ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              {addEditTitle ?? "N/A"}
            </div>

            <AddEditListItemFilter
              staticTexts={staticTexts}
              pageFullDataList={pageFullDataList}
              params={params}
              groupData={groupData}
              onCancel={handleAddEditCancel}
              onSave={handleAddEditSave}
              addEditItemFeatureId={addEditItemFeatureId}
            />
          </div>
        ) : null}

        {isListItemsShown ? (
          <WrappingListItems
            isEdit={isEdit}
            staticTexts={staticTexts}
            pageFullDataList={pageFullDataList}
            onAddItemClick={handleAddListItem}
            setEditingItemFeatureId={setEditingListItemFeatureId}
            parentFeatureId={parentFeatureId}
            selectedFilterTextDescriptionIds={selectedFilterTextDescriptionIds}
            params={params}
            editTextButton={editListItemText}
            addTextButton={addListItemText}
          />
        ) : null}
      </div>
    </div>
  );
};
