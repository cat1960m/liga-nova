import { addUpdatingTextDescriptionToHistory } from "@/app/lib/actions_fitness";
import { updatePriceValueLinkData } from "@/app/lib/actionsContainer";
import { usePathname } from "next/navigation";
import { useEditContext } from "../PageComponents/EditContextProvider";

export const useUpdateTextDescription = () => {
  const pathName = usePathname();
  const { getLastHistory } = useEditContext();

  const addTextDescriptionToHistoryOnUpdate = async ({
    textDescriptionId,
    pageName,
  }: {
    textDescriptionId: number;
    pageName: string;
  }) => {
    await addUpdatingTextDescriptionToHistory({
      idFrom: textDescriptionId,
      page: pageName,
    });
    await getLastHistory();
  };

  const updatePriceValueLink = async ({
    textDescriptionId,
    price,
    value,
    link,
  }: {
    textDescriptionId: number;
    price?: number | null;
    value?: string | null;
    link?: string | null;
  }) => {
    try {
      await updatePriceValueLinkData({
        textDescriptionId,
        price,
        value,
        link,
        pathName,
      });
    } catch (error) {
      console.log("error", error?.toString());
    }
  };

  return {
    updatePriceValueLink,
    addTextDescriptionToHistoryOnUpdate,
  };
};
