import { FullData, MainParams } from "@/app/lib/definitions";
import { DrawFeatureContainer_Client } from "../../DrawFeatureContainer_Client";
import { EditContextProvider } from "./EditContextProvider";
import { StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  featureId: number;
  pageFullDataList: FullData[];
  containerFullData: [Record<string, FullData[]>, string[]];
  buttonText: string;
  params: MainParams;
  pageId: number;
};
export const DrawFeatureContainerEdit = (props: Props) => {
  return (
    <EditContextProvider>
      <DrawFeatureContainer_Client {...props} />
    </EditContextProvider>
  );
};
