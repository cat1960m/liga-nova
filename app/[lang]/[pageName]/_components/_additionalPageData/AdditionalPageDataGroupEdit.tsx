"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { GROUP, FILTER_GROUP } from "@/app/lib/constants";
import { FullData } from "@/app/lib/definitions";
import { useMemo, useState } from "react";
import { FilterGroup } from "../_filterGroupsListItems/FilterGroup";
import { getContainerData, getFilterIds } from "@/app/lib/utils";
import { CommonButton } from "../_clientComponents/CommonButton";
import { updateFeatureSubtypeFilterIds } from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";

export type Props = {
  currentData: FullData;
  staticTexts: StaticTexts;
  pageFullDataList: FullData[];
  additionalPageName: string;
};

export const AdditionalPageDataGroupEdit = ({
  currentData,
  staticTexts,
  pageFullDataList,
  additionalPageName,
}: Props) => {
  const filterTextDescriptionIds = getFilterIds(currentData.filter_ids);

  const [
    selectedFilterTextDescriptionIds,
    setSelectedFilterTextDescriptionIds,
  ] = useState<number[]>(filterTextDescriptionIds);

  const pathName = usePathname();

  const pageFeatureId = currentData.id;

  const containerFullData = useMemo(
    () =>
      pageFeatureId
        ? getContainerData({
            pageName: additionalPageName,
            pageFullData: pageFullDataList,
            parentFeatureId: null,
            type: GROUP,
            subtype: FILTER_GROUP,
          })
        : null,
    [pageFullDataList, pageFeatureId]
  );

  if (!containerFullData) {
    return null;
  }

  const [data, filterGroupIds] = containerFullData;

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
      id: pageFeatureId,
      pathName,
      subtype: currentData.subtype,
      filterIds: selectedFilterTextDescriptionIds.join(","),
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          backgroundColor: "#f8f8f8",
          border: "1px solid lightgray",
          borderRadius: "10px",
          minWidth: "238px",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        {filterGroupIds.map((filterGroupId, index) => {
          const filterGroupData = data[filterGroupId];
          return (
            <div key={filterGroupId}>
              <FilterGroup
                isEdit={false}
                staticTexts={staticTexts}
                groupData={filterGroupData}
                onFilterSelectionChanged={handleFilterSelectionChanged}
                selectedFilterTextDescriptionIds={
                  selectedFilterTextDescriptionIds
                }
              />
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          padding: "10px 0",
          gap: "10px",
        }}
      >
        <CommonButton text="Save filters" onClick={handleSave} />
      </div>
    </>
  );
};
