"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import {
  GROUP,
  SUBSCRIPTIONS_FILTER,
  SUBSCRIPTIONS_FILTER_GROUP,
  SUBSCRIPTIONS_FILTER_GROUP_TITLE,
} from "@/app/lib/constants";
import { FullData } from "@/app/lib/definitions";
import { useMemo, useState } from "react";
import { FilterGroup } from "../FilterGroup";
import { getContainerData, getFilterIds } from "@/app/lib/utils";
import { CommonButton } from "../_clientComponents/CommonButton";
import { updateFeatureSubtypeFilterIds } from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";

export type Props = {
  currentData: FullData;
  staticTexts: StaticTexts;
  pageFullDataList: FullData[];
};

export const PageSubscriptionsGroupEdit = ({
  currentData,
  staticTexts,
  pageFullDataList,
}: Props) => {
  const filterTextDescriptionIds = getFilterIds(currentData.filter_ids);

  const [
    selectedFilterTextDescriptionIds,
    setSelectedFilterTextDescriptionIds,
  ] = useState<number[]>(filterTextDescriptionIds);

  const pathName = usePathname();

  const pageSubscriptionFeatureId = currentData.id;

  const containerFullData = useMemo(
    () =>
      pageSubscriptionFeatureId
        ? getContainerData({
            pageName: "tickets",
            pageFullData: pageFullDataList,
            parentFeatureId: null, //pageSubscriptionFeatureId,
            type: GROUP,
            subtype: SUBSCRIPTIONS_FILTER_GROUP,
          })
        : null,
    [pageFullDataList, pageSubscriptionFeatureId]
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
      id: pageSubscriptionFeatureId,
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
                titleTextType={SUBSCRIPTIONS_FILTER_GROUP_TITLE}
                itemTextType={SUBSCRIPTIONS_FILTER}
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
