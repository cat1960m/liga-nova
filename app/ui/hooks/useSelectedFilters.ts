import { FullData } from "@/app/lib/definitions";
import { getFilterIds } from "@/app/lib/utils";
import { useState } from "react";

export const useSelectedFilters = ({
  fullData,
}: {
  fullData?: FullData;
}) => {
  const [
    selectedFilterTextDescriptionIds,
    setSelectedFilterTextDescriptionIds,
  ] = useState<number[]>(getFilterIds(fullData?.filter_ids));

  const onFilterSelectionChanged = async ({
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
    return newSelectedFilterTextDescriptionIds;
  };

  

  return {
    selectedFilterTextDescriptionIds,
    onFilterSelectionChanged,
  };
};
