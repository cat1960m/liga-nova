import { FullData } from "@/app/lib/definitions";
import { useMemo } from "react";

export const useFiltersData = ({
  pageFullDataList,
  filterTextDescriptionIds
}: {
  pageFullDataList: FullData[];
  filterTextDescriptionIds: number[];
}) => {
  const filtersData: { value: string; text: string }[] = useMemo(() => {
    return pageFullDataList
      .filter((data) =>
        filterTextDescriptionIds.includes(data.text_description_id)
      )
      .map((item) => ({
        value: item.value ?? "",
        text: item.text_content ?? "",
      }));
  }, [
    pageFullDataList,
    filterTextDescriptionIds,
  ]);

  return {filtersData};
};
