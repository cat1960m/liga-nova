"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import { CommonButton } from "../__commonComponents/_buttons/CommonButton";
import { LIST_ITEM } from "@/app/lib/constants";
import { getFilterIds } from "@/app/lib/utils/getFilterIds";
import { FilterGroups } from "./_filters/FilterGroups";
import { ListItem } from "./ListItem";
import { EditListItem } from "./EditListItem";

import { useEditContext } from "../__commonComponents/_page/EditContextProvider";
import { updateFeatureSubtypeFilterIds } from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";
import styles from "./filterGroupsListItemGroup.module.css";

export type Props = {
  pageFullDataList: FullData[];
  params: MainParams;
  groupData: FullData[];
  onCancel: () => void;
  editItemFeatureId: number;
  editListItemText: string;
};

export const EditListItemFilter = ({
  pageFullDataList,
  params,
  groupData,
  onCancel,
  editItemFeatureId,
  editListItemText,
}: Props) => {
  const { changeIsEditButtonDisabled } = useEditContext();

  const addEditItemFeatureIdData = pageFullDataList.filter(
    (data) => data.id === editItemFeatureId
  );
  const pathName = usePathname();

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

  const handleFilterSelectionChanged = async ({
    filter,
    value,
  }: {
    filter: FullData;
    value: boolean;
  }) => {
    let newSelectedFilterTextDescriptionIds: number[] = [];
    if (value) {
      newSelectedFilterTextDescriptionIds = [
        ...selectedFilterTextDescriptionIds,
      ];
      newSelectedFilterTextDescriptionIds.push(filter.text_description_id);
      setSelectedFilterTextDescriptionIds(newSelectedFilterTextDescriptionIds);
    } else {
      newSelectedFilterTextDescriptionIds =
        selectedFilterTextDescriptionIds.filter(
          (item) => item !== filter.text_description_id
        );

      setSelectedFilterTextDescriptionIds(newSelectedFilterTextDescriptionIds);
    }

    changeIsEditButtonDisabled(true);
    await updateFeatureSubtypeFilterIds({
      id: editItemFeatureId,
      pathName,
      subtype: LIST_ITEM,
      filterIds: newSelectedFilterTextDescriptionIds.join(","),
    });
    changeIsEditButtonDisabled(false);
  };

  const parentFeatureId = groupData[0]?.id;
  const commonWidth = "32%";
  const { staticTexts } = params;


  return (
    <div className={styles.addEdit}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <div className={styles.title}>{editListItemText}</div>
        <CommonButton text="Cancel" onClick={onCancel} />
      </div>
      <div
        style={{
          width: "100%",
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
            <EditListItem
              currentData={addEditItemFeatureIdData}
              pageName={params.pageName}
              params={params}
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
              pageFullDataList={pageFullDataList}
              params={params}
              onFilterSelectionChanged={handleFilterSelectionChanged}
              selectedFilterTextDescriptionIds={
                selectedFilterTextDescriptionIds
              }
              parentFeatureId={parentFeatureId}
              width={commonWidth}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
