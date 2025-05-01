import { UpdateDeleteTextButtons } from "../_buttons/UpdateDeleteTextButtons";
import { UseItems } from "../_upadeModal/UpdateTextDescriptionDataModalContent";
import { FullData, MainParams } from "@/app/lib/definitions";
import { ItemGroupContainerCommon } from "./ItemGroupContainerCommon";

export type Props = {
  children: React.ReactNode;
  useItems: UseItems;
  s3Key?: string;
  onDeleteFinished?: () => void;
  params: MainParams;
  currentData: FullData;
  changeModalState?: (state: boolean) => void;
  isChangeOrder?: boolean;
  isChangeOrderHorizontal?: boolean;
};

export const ItemContainerUpdateDeleteTextDescription = ({
  children,
  useItems,
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
    <ItemGroupContainerCommon
      isEdit={params.isEdit}
      getEditButtons={getEditButtons}
      marginTop={0}
    >
      {children}
    </ItemGroupContainerCommon>
  );
};
