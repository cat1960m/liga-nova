import { addFeatureData } from "@/app/lib/actionsContainer";
import { usePathname } from "next/navigation";
import { useEditContext } from "../PageComponents/EditContextProvider";
import { addAddedFeatureToHistory } from "@/app/lib/actions_fitness";

export const useAddFeature = () => {
  const pathName = usePathname();
  const { pageName, getLastHistory } = useEditContext();
  const addFeature = async ({
    type,
    parentId,
    subtype,
    text_types,
    filter_ids,
    additionalPageName,
    isWithoutHistory,
  }: {
    type: string;
    parentId: number;
    subtype: string;
    text_types: string[];
    filter_ids?: string | null;
    additionalPageName?: string | null;
    isWithoutHistory: boolean;
  }) => {
    try {
      const newFeatureId = await addFeatureData({
        parentId,
        type,
        subtype,
        name: pageName,
        text_types,
        pathName,
        filter_ids,
        additionalPageName,
      });

      if (isWithoutHistory) {
        return newFeatureId;
      }

      await addAddedFeatureToHistory({ pageName, newFeatureId });

      await getLastHistory();

      return newFeatureId;
    } catch(error) {
        console.log("error ", error?.toString())
      return null;
    }
  };

  return { addFeature };
};
