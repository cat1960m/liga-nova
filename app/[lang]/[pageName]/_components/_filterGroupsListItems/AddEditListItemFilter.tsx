"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData, MainParams } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import { CommonButton } from "../_buttons/CommonButton";
import { LIST_ITEM } from "@/app/lib/constants";
import { usePathname } from "next/navigation";
import { updateFeatureSubtypeFilterIds } from "@/app/lib/actions_fitness";
import { getFilterIds } from "@/app/lib/utils/getFilterIds";
import { FilterGroups } from "./_filters/FilterGroups";
import { ListItem } from "./ListItem";
import { AddEditListItem } from "./AddEditListItem";

import styles from "./addEditKistItemFilter.module.css";

export type Props = {
  staticTexts: StaticTexts;
  pageFullDataList: FullData[];
  params: MainParams;
  groupData: FullData[];
  onCancel: () => void;
  onSave: () => void;
  addEditItemFeatureId: number;
};

export const AddEditListItemFilter = ({
  staticTexts,
  pageFullDataList,
  params,
  groupData,
  onCancel,
  onSave,
  addEditItemFeatureId,
}: Props) => {
  const pathName = usePathname();
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(false);

  const addEditItemFeatureIdData = pageFullDataList.filter(
    (data) => data.id === addEditItemFeatureId
  );

  const [
    selectedFilterTextDescriptionIds,
    setSelectedFilterTextDescriptionIds,
  ] = useState<number[]>(getFilterIds(addEditItemFeatureIdData[0]?.filter_ids));

  useEffect(() => {
    const newSelectedFilterTextDescriptionIds =
      selectedFilterTextDescriptionIds.reduce<number[]>((result, id) => {
        if (pageFullDataList.find((item) => item.text_description_id === id)) {
          result.push(id);
        }

        return result;
      }, []);

    if (
      newSelectedFilterTextDescriptionIds.length <
      selectedFilterTextDescriptionIds.length
    ) {
      setSelectedFilterTextDescriptionIds(newSelectedFilterTextDescriptionIds);
    }
  }, [pageFullDataList]);

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

  const handleSave = async () => {
    await updateFeatureSubtypeFilterIds({
      id: addEditItemFeatureId,
      pathName,
      subtype: LIST_ITEM,
      filterIds: selectedFilterTextDescriptionIds.join(","),
    });

    onSave();
  };

  const parentFeatureId = groupData[0]?.id;
  const commonWidth = "32%";

  return (
    <div
      style={{
        width: "100%",
        border: "1px dotted magenta",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
          width: "100%",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: commonWidth,
            flexGrow: 2,
            minWidth: "190px",
          }}
        >
          <AddEditListItem
            currentData={addEditItemFeatureIdData}
            addEditItemFeatureId={addEditItemFeatureId}
            staticTexts={staticTexts}
            commonWidth={commonWidth}
            setIsSaveDisabled={setIsSaveDisabled}
            pageName={params.pageName}
          />
        </div>

        <div style={{ width: "190px", minWidth: "190px" }}>
          <ListItem
            currentData={addEditItemFeatureIdData}
            pageName={params.pageName}
            pageFullDataList={pageFullDataList}
            staticTexts={staticTexts}
          />
        </div>

        {parentFeatureId ? (
          <FilterGroups
            isEdit={false}
            staticTexts={staticTexts}
            pageFullDataList={pageFullDataList}
            params={params}
            onFilterSelectionChanged={handleFilterSelectionChanged}
            selectedFilterTextDescriptionIds={selectedFilterTextDescriptionIds}
            parentFeatureId={parentFeatureId}
            width={commonWidth}
          />
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          padding: "20px 0",
          gap: "10px",
        }}
      >
        <CommonButton text="Cancel" onClick={onCancel} />
        <CommonButton
          text="Save"
          onClick={handleSave}
          isDisabled={isSaveDisabled}
        />
      </div>
    </div>
  );
};
