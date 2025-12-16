import { updateFeatureSubtypeFilterIdsData } from "@/app/lib/actionsContainer";
import { usePathname } from "next/navigation";
import { useEditContext } from "../PageComponents/EditContextProvider";
import { addUpdatingFeatureToHistory } from "@/app/lib/actions_fitness";

export const useUpdateFeature = () => {
  const pathName = usePathname();
  const { getLastHistory } = useEditContext();

  const updateFeatureSubtypeFilterIds = async ({
    id,
    subtype,
    filterIds,
  }: {
    id: number;
    subtype: string;
    filterIds: string;
  }) => {
    try {
      await updateFeatureSubtypeFilterIdsData({
        id,
        subtype,
        filterIds,
        pathName,
      });
    } catch (error) {
      console.log("error", error?.toString());
    }
  };

  const addFeatureToHistoryOnUpdate = async ({
    featureId,
    page,
  }: {
    featureId: number;
    page: string;
  }) => {
    await addUpdatingFeatureToHistory({
      idFrom: featureId,
      page,
    });
    await getLastHistory();
  };

  return { updateFeatureSubtypeFilterIds, addFeatureToHistoryOnUpdate };
};
