"use client";

import { FullData, StructuredFeatureData } from "@/app/lib/definitions";
import { useState } from "react";
import { FilterGroup } from "../../FilterGroupsListItemsGroup/_filters/FilterGroup/FilterGroup";
import { getFilterIds } from "@/app/lib/utils";

import styles from "./additionalPageDataGroupEdit.module.css";
import { UpdateFeatureFilterIdsButton } from "@/app/ui/CommonComponents/_buttons/UpdateFeatureFilterIdsButton";
import { StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  currentData: FullData;
  staticTexts: StaticTexts;
  lang: string;
  structuredFilterGroupsData: StructuredFeatureData;
};
//Персональні тренування ,Групові студії, Кріосауна, Солярій
export const AdditionalPageDataGroupEdit = ({
  currentData,
  staticTexts,
  lang,
  structuredFilterGroupsData,
}: Props) => {
  const filterTextDescriptionIds = getFilterIds(currentData.filter_ids);

  const [
    selectedFilterTextDescriptionIds,
    setSelectedFilterTextDescriptionIds,
  ] = useState<number[]>(filterTextDescriptionIds);

  const pageFeatureId = currentData.id;

  if (!structuredFilterGroupsData.sortedChildFeaFeatureIds.length) {
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

  return (
    <>
      <div className={styles.filters}>
        {structuredFilterGroupsData.sortedChildFeaFeatureIds.map(
          (filterGroupId) => {
            const filterGroupData =
              structuredFilterGroupsData.childFeatureIdToFullDataList[
                filterGroupId
              ];
            return (
              <div key={filterGroupId}>
                <FilterGroup
                  filterGroupData={filterGroupData}
                  onFilterSelectionChanged={handleFilterSelectionChanged}
                  selectedFilterTextDescriptionIds={
                    selectedFilterTextDescriptionIds
                  }
                  editMode="no"
                  lang={lang}
                  staticTexts={staticTexts}
                  startNotExpanded={true}
                />
              </div>
            );
          }
        )}
      </div>

      <div className={styles.button}>
        <UpdateFeatureFilterIdsButton
          featureId={pageFeatureId}
          subtype={currentData.subtype}
          filterIds={selectedFilterTextDescriptionIds.join(",")}
          buttonText={staticTexts.saveFilters ?? "N/A"}
        />
      </div>
    </>
  );
};
