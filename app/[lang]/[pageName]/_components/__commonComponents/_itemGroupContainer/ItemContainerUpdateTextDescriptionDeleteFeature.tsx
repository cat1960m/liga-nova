import { StaticTexts } from "@/app/dictionaries/definitions";
import { UpdateDeleteTextButtons } from "../_buttons/UpdateDeleteTextButtons";
import { UseItems } from "../_upadeModal/UpdateTextDescriptionDataModalContent";
import { FullData, MainParams } from "@/app/lib/definitions";
import { ItemGroupContainerCommon } from "./ItemGroupContainerCommon";
import { UpdateTextDescriptionDeleteFeatureButtons } from "./UpdateTextDescriptionDeleteFeatureButtons";

export type Props = {
  children: React.ReactNode;
  isEdit: boolean;
  staticTexts: StaticTexts;
  params: MainParams;
  useItems: UseItems;
  currentData: FullData;
  isChangeOrderHorizontal?: boolean;
  featureData: FullData[];
  noDelete?: boolean;
};

export const ItemContainerUpdateTextDescriptionDeleteFeature = ({
  isEdit,
  children,
  useItems,
  staticTexts,
  params,
  currentData,
  isChangeOrderHorizontal = true,
  featureData,
  noDelete,
}: Props) => {
  const getEditButtons = () => (
    <UpdateTextDescriptionDeleteFeatureButtons
      staticTexts={staticTexts}
      isChangeOrderHorizontal={isChangeOrderHorizontal}
      params={params}
      useItems={useItems}
      dataToUpdate={currentData}
      featureData={featureData}
      noDelete={noDelete}
    />
  );
  return (
    <ItemGroupContainerCommon isEdit={isEdit} getEditButtons={getEditButtons}>
      {children}
    </ItemGroupContainerCommon>
  );
};
