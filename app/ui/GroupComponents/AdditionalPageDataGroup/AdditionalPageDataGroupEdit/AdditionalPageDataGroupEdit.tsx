"use client";

import { FullData, StructuredFeatureData } from "@/app/lib/definitions";
import { FilterGroup } from "../../FilterGroupsListItemsGroup/_filters/FilterGroup/FilterGroup";

import styles from "./additionalPageDataGroupEdit.module.css";
import { UpdateFeatureFilterIdsButton } from "@/app/ui/CommonComponents/_buttons/UpdateFeatureFilterIdsButton";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { useSelectedFilters } from "@/app/ui/hooks/useSelectedFilters";

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
  const { selectedFilterTextDescriptionIds, onFilterSelectionChanged } =
    useSelectedFilters({ fullData: currentData });

  const pageFeatureId = currentData.id;

  if (!structuredFilterGroupsData.sortedChildFeaFeatureIds.length) {
    return null;
  }

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
                  onFilterSelectionChanged={onFilterSelectionChanged}
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
          pageName={currentData.name}
        />
      </div>
    </>
  );
};
