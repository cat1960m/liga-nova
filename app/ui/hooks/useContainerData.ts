import { FILTER } from "@/app/lib/constants";
import {
  FullData,
  SelectedFiltersData,
  StructuredFeatureData,
} from "@/app/lib/definitions";

type FilterGroupIDToTextDescriptionIds = Record<
  string,
  { allTextDescriptionIds: number[]; selectedTextDescripTionIds: number[] }
>;

export const useContainerData = ({
  pageFullData,
  pageName,
  parentFeatureId,
  type,
  subtype,
  selectedFiltersData,
}: {
  pageFullData: FullData[];
  pageName: string;
  parentFeatureId: number | null;
  type?: string;
  subtype?: string;
  selectedFiltersData?: SelectedFiltersData;
}): StructuredFeatureData => {
  const isCheckFiltersNeeded =
    !!selectedFiltersData &&
    !!selectedFiltersData.selectedFilterTextDescriptionIds.length;

  const selectedFilterGroupData: FilterGroupIDToTextDescriptionIds = {};

  if (selectedFiltersData) {
    const { filterGroupsData, selectedFilterTextDescriptionIds } =
      selectedFiltersData;
    filterGroupsData.sortedChildFeaFeatureIds.forEach((filterGroupId) => {
      const filterGroupData =
        filterGroupsData.childFeatureIdToFullDataList[filterGroupId];
      const allFilterGroupTextDescriptionIds = filterGroupData
        .filter((item) => item.text_type === FILTER)
        .map((filter) => filter.text_description_id);

      const selectedFilterGroupTextDescriptionIds =
        allFilterGroupTextDescriptionIds.filter((filterTextDescriptionId) => {
          return selectedFilterTextDescriptionIds.includes(
            filterTextDescriptionId
          );
        });
      if (selectedFilterGroupTextDescriptionIds.length) {
        selectedFilterGroupData[filterGroupId] = {
          allTextDescriptionIds: allFilterGroupTextDescriptionIds,
          selectedTextDescripTionIds: selectedFilterGroupTextDescriptionIds,
        };
      }
    });
  }

  const isFilterFit = (itemFilterIds: string | undefined) => {
    if (!isCheckFiltersNeeded) {
      return true;
    }

    if (!itemFilterIds) {
      return false;
    }

    const itemFilterTextDescriptionIdList = itemFilterIds
      .split(",")
      .map((id) => parseInt(id));

    const keys = Object.keys(selectedFilterGroupData);

    for (let i = 0; i < keys.length; i++) {
      const filterGroupId = keys[i];
      const dataItemSel =
        selectedFilterGroupData[filterGroupId].selectedTextDescripTionIds;

      const found = itemFilterTextDescriptionIdList.find((el) => {
        return dataItemSel.includes(el);
      });

      if (!found) {
        return false;
      }
    }

    return true;
  };
  const resultData: Record<string, FullData[]> = {};

  pageFullData?.forEach((item) => {
    const isFitPagename = item.name === pageName;
    const isTypeCorrect = !type || type === item.type;
    const isSubtypeCorrect = !subtype || subtype === item.subtype;
    const isPageChild =
      !parentFeatureId || item.parent_feature_id === parentFeatureId;
    const isBaseFit =
      isFitPagename && isTypeCorrect && isSubtypeCorrect && isPageChild;

    if (isBaseFit) {
      const isItemCorrect =
        !isCheckFiltersNeeded || isFilterFit(item.filter_ids);

      if (isItemCorrect) {
        const value = resultData[item.id] ?? [];
        resultData[item.id] = [...value, item];
      }
    }
  });

  const itemIds: string[] = Object.keys(resultData);
  itemIds.sort((id1, id2) =>
    resultData[id1][0]?.feature_order > resultData[id2][0]?.feature_order
      ? 1
      : -1
  );

  return {
    childFeatureIdToFullDataList: resultData,
    sortedChildFeaFeatureIds: itemIds,
  };
};
