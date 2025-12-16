import { removeTextDescriptionData } from "@/app/lib/actionsContainer";
import { FullData } from "@/app/lib/definitions";
import { usePathname } from "next/navigation";
import { useEditContext } from "../PageComponents/EditContextProvider";
import axios from "axios";
import { addDeletingTextDescriptionToHistory } from "@/app/lib/actions_fitness";

export const useRemoveTextDescription = () => {
  const pathName = usePathname();
  const { getLastHistory } = useEditContext();

  const removeTextDescription = async ({
    fullData,
    s3Key,
  }: {
    fullData: FullData;
    s3Key?: string;
  }) => {
    try {
      await addDeletingTextDescriptionToHistory({
        textDescriptionFromId: fullData.text_description_id,
        idParentFrom: fullData.id,
        page: fullData.name,
      });

      await removeTextDescriptionData({
        id: fullData.text_description_id,
        pathName,
      });

      if (s3Key) {
        axios.post("/api/removeFile", {
          s3Key,
        });
      }

      await getLastHistory();
    } catch (error) {
      console.log("error", error?.toString());
    }
  };

  return { removeTextDescription };
};
