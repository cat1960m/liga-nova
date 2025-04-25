import { StaticTexts } from "@/app/dictionaries/definitions";
import { UpdateDeleteTextButtons } from "../_buttons/UpdateDeleteTextButtons";
import { UseItems } from "../_upadeModal/UpdateTextDescriptionDataModalContent";
import { FullData, MainParams } from "@/app/lib/definitions";
import { ItemGroupContainerCommon } from "./ItemGroupContainerCommon";

export type Props = {
  children: React.ReactNode;
  isEdit: boolean;
  useItems: UseItems;
  staticTexts: StaticTexts;
  s3Key?: string;
  onDeleteFinished?: () => void;
  params: MainParams;
  currentData: FullData;
  changeModalState?: (state: boolean) => void;
  isChangeOrder?: boolean;
  isChangeOrderHorizontal?: boolean;
};

export const ItemContainerUpdateDeleteTextDescription = ({
  isEdit,
  children,
  useItems,
  staticTexts,
  s3Key,
  onDeleteFinished,
  params,
  currentData,
  changeModalState,
  isChangeOrder = true,
  isChangeOrderHorizontal = true,
}: Props) => {
  const getEditButtons = () => (
    <UpdateDeleteTextButtons
      staticTexts={staticTexts}
      currentData={currentData}
      s3Key={s3Key}
      isChangeOrder={isChangeOrder}
      isChangeOrderHorizontal={isChangeOrderHorizontal}
      params={params}
      useItems={useItems}
      onDeleteFinished={onDeleteFinished}
      changeModalState={changeModalState}
    />
  );
  return (
    <ItemGroupContainerCommon isEdit={isEdit} getEditButtons={getEditButtons} marginTop={0}>
      {children}
    </ItemGroupContainerCommon>
  );
};
