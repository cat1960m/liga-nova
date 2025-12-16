import { addTextDescriptionData } from "@/app/lib/actionsContainer";
import { useEditContext } from "../PageComponents/EditContextProvider";
import { usePathname } from "next/navigation";
import { addAddedTextDescriptionToHistory } from "@/app/lib/actions_fitness";

export const useAddTextDescription = () => {
  const { getLastHistory, pageName } = useEditContext();
  const pathName = usePathname();

  const addTextDescription = async ({
    featureId,
    textType,
    canDelete,
    price,
    value,
  }: {
    featureId: number;
    textType: string;
    canDelete: boolean;
    price: number | null;
    value?: string | null;
  }) => {
    try {
      const newTextDescriptionId = await addTextDescriptionData({
        featureId,
        textType,
        pathName,
        canDelete,
        price,
        value,
      });

      if (!canDelete) {
        return newTextDescriptionId;
      }

      await addAddedTextDescriptionToHistory({
        newTextDescriptionId,
        pageName,
      });

      await getLastHistory();
      return newTextDescriptionId;
    } catch (error) {
      console.log("error", error?.toString());
    }
  };

  return { addTextDescription };
};
