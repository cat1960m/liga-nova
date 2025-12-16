import { removeFeatureData } from "@/app/lib/actionsContainer";
import { START_AWS_S3 } from "@/app/lib/constants";
import { FullData } from "@/app/lib/definitions";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEditContext } from "../PageComponents/EditContextProvider";
import { addDeletingFeatureToHistory } from "@/app/lib/actions_fitness";

export const useRemoveFeature = () => {
  const { getLastHistory, pageFullDataList } = useEditContext();
  const pathName = usePathname();

  const removeFeature = async ({
    feature,
    isWithoutHistory,
  }: {
    feature: FullData;
    isWithoutHistory: boolean;
  }) => {
    try {
      if (!isWithoutHistory) {
        await addDeletingFeatureToHistory({
          idFrom: feature.id,
          idParentFrom: feature.parent_feature_id,
          page: feature.name,
        });
        await getLastHistory();
      }

      await removeFeatureData({
        id: feature.id,
        pathName: pathName,
      });

      const imageData: string[] = [];

      const addToImageData = (id: number) => {
        const fullDataList = pageFullDataList.filter((item) => item.id === id);
        const itemsWithImage = fullDataList.filter(
          (data) => data.value?.startsWith(START_AWS_S3)
          // S3_TYPES.includes(data.text_type) && !!data.value
        );
        itemsWithImage.forEach((item) => {
          if (item.value && !imageData.includes(item.value)) {
            imageData.push(item.value);
          }
        });
        const fullDataListChildren = pageFullDataList.filter(
          (item) => item.parent_feature_id === id
        );
        fullDataListChildren.forEach((child) => {
          addToImageData(child.id);
        });
      };

      addToImageData(feature.id);


      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const promises: Promise<any>[] = [];

      if (imageData.length) {
        imageData.forEach((data) => {
          promises.push(
            axios.post("/api/removeFile", {
              s3Key: data,
            })
          );
        });

        await Promise.all(promises);
      }
    } catch (error) {
      console.log("error", error?.toString());
    }
  };

  return { removeFeature };
};
