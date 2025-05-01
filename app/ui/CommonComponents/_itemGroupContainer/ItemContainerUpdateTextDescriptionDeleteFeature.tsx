import { UseItems } from "../_upadeModal/UpdateTextDescriptionDataModalContent";
import { FullData, MainParams } from "@/app/lib/definitions";
import { ItemGroupContainerCommon } from "./ItemGroupContainerCommon";
import { UpdateTextDescriptionDeleteFeatureButtons } from "./UpdateTextDescriptionDeleteFeatureButtons";

export type Props = {
  children: React.ReactNode;
  params: MainParams;
  useItems: UseItems;
  currentData: FullData;
  isChangeOrderHorizontal?: boolean;
  featureData: FullData[];
  noDelete?: boolean;
  marginTop: number;
};

export const ItemContainerUpdateTextDescriptionDeleteFeature = ({
  children,
  useItems,
  params,
  currentData,
  isChangeOrderHorizontal = true,
  featureData,
  noDelete,
  marginTop,
}: Props) => {
  const getEditButtons = () => (
    <UpdateTextDescriptionDeleteFeatureButtons
      isChangeOrderHorizontal={isChangeOrderHorizontal}
      params={params}
      useItems={useItems}
      dataToUpdate={currentData}
      featureData={featureData}
      noDelete={noDelete}
    />
  );
  return (
    <ItemGroupContainerCommon
      isEdit={params.isEdit}
      getEditButtons={getEditButtons}
      marginTop={marginTop}
    >
      {children}
    </ItemGroupContainerCommon>
  );
};
