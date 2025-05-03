import { FullData, MainParams } from "@/app/lib/definitions";
import { EditContextProvider } from "./EditContextProvider";
import { DrawFeatureContainer_Client } from "./DrawFeatureContainer_Client";

export type Props = {
  featureId: number;
  pageFullDataList: FullData[];
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
