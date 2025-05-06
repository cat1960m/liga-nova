"use client";

import { FullData } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import { CommonButton } from "@/app/ui/CommonComponents/_buttons/CommonButton";
import { LIST_ITEM, PAGE_NAMES_TO_LIST_ITEMS_DATA } from "@/app/lib/constants";
import { getFilterIds } from "@/app/lib/utils/getFilterIds";
import { FilterGroups } from "../_filters/FilterGroups";
import { ListItem } from "../ListItem/ListItem";
import { EditListItem } from "../EditListItem/EditListItem";

import { updateFeatureSubtypeFilterIds } from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";
import styles from "./editListItemFilter.module.css";
import { useEditContext } from "@/app/ui/PageComponents/EditContextProvider";
import { StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  pageFullDataList: FullData[];
  groupData: FullData[];
  onCancel: () => void;
  editItemFeatureId: number;
  lang: string;
  staticTexts: StaticTexts;
  pageName: string;
  isEdit: boolean;
};

export const EditListItemFilter = ({
  pageFullDataList,
  groupData,
  onCancel,
  editItemFeatureId,
  lang,
  staticTexts,
  pageName,
  isEdit,
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
  }, [pageFullDataList, setSelectedFilterTextDescriptionIds]);

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

  const editText = PAGE_NAMES_TO_LIST_ITEMS_DATA[pageName].editText;
  const editListItemText = staticTexts[editText]?.toString() ?? "N/A";

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>{editListItemText}</div>
        <CommonButton text="Cancel" onClick={onCancel} />
      </div>
      <div className={styles.body}>
        <div className={styles.edit_list_item_container}>
          <EditListItem
            currentData={addEditItemFeatureIdData}
            pageName={pageName}
            isEdit={isEdit}
            staticTexts={staticTexts}
            lang={lang}
          />
        </div>

        <div className={styles.list_item_container}>
          <ListItem
            currentData={addEditItemFeatureIdData}
            pageName={pageName}
            pageFullDataList={pageFullDataList}
            staticTexts={staticTexts}
          />
        </div>

        {parentFeatureId ? (
          <FilterGroups
            pageFullDataList={pageFullDataList}
            onFilterSelectionChanged={handleFilterSelectionChanged}
            selectedFilterTextDescriptionIds={selectedFilterTextDescriptionIds}
            parentFeatureId={parentFeatureId}
            width={commonWidth}
            isEdit={false} // no edit
            lang={lang}
            staticTexts={staticTexts}
            pageName={pageName}
          />
        ) : null}
      </div>
    </div>
  );
};
