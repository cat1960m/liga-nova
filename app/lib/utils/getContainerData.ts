import { DEFAULT_TEXT } from "../constants";
import { FullData, TextContent } from "../definitions";

export const getLocalizedText = ({
  textContents,
  lang,
}: {
  textContents: TextContent[] | null;
  lang: string;
}) => {
  const textContentsLocalized = textContents?.filter(
    (item) => item.language === lang
  )?.[0];
  const text = textContentsLocalized?.text_content || DEFAULT_TEXT;
  return text;
};

export const getContainerData = ({
  pageFullData,
  pageName,
  parentFeatureId,
  type,
  subtype,
  selectedFilterTextDescriptionIds,
}: {
  pageFullData: FullData[];
  pageName: string;
  parentFeatureId: number | null;
  type?: string;
  subtype?: string;
  selectedFilterTextDescriptionIds?: number[];
}): [Record<string, FullData[]>, string[]] => {
  const data: Record<string, FullData[]> = {};

  const isFilterFit = (filterIds: string | undefined) => {
    if (!selectedFilterTextDescriptionIds?.length) {
      return true;
    }

    if (!filterIds) {
      return false;
    }

    const filterIdsList = filterIds.split(",").map((id) => parseInt(id));
    /* const isBadFilterFound = filterIdsList.some((filterId) =>
      !selectedFilterTextDescriptionIds.includes(filterId)
    ); */

    const isBadFilterFound = selectedFilterTextDescriptionIds.some((filterId) =>
      !filterIdsList.includes(filterId)
    );

    return !isBadFilterFound;
  };

  pageFullData?.forEach((item) => {
    const isFitPagename = item.name === pageName;
    const isTypeCorrect = !type || type === item.type;
    const isSubtypeCorrect = !subtype || subtype === item.subtype;
    const isPageChild =
      !parentFeatureId || item.parent_feature_id === parentFeatureId;
    const isFitToFilters =
      !selectedFilterTextDescriptionIds || isFilterFit(item.filter_ids);
    const isItemCorrect =
      isFitPagename &&
      isTypeCorrect &&
      isSubtypeCorrect &&
      isPageChild &&
      isFitToFilters;

    if (isItemCorrect) {
      const value = data[item.id] ?? [];
      data[item.id] = [...value, item];
    }
  });

  const itemIds: string[] = Object.keys(data);
  itemIds.sort((id1, id2) =>
    data[id1][0]?.feature_order > data[id2][0]?.feature_order ? 1 : -1
  );

  return [data, itemIds];
};
