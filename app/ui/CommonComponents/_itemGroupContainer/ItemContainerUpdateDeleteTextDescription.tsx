import { UpdateDeleteTextButtons } from "../_buttons/UpdateDeleteTextButtons/UpdateDeleteTextButtons";
import { UseItems } from "../_upadeModal/UpdateTextDescriptionDataModalContent/UpdateTextDescriptionDataModalContent";
import { FullData } from "@/app/lib/definitions";
import { ItemGroupContainerCommon } from "./ItemGroupContainerCommon/ItemGroupContainerCommon";
import { StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  children: React.ReactNode;
  useItems: UseItems;
  s3Key?: string;
  onDeleteFinished?: () => void;
  isEdit: boolean;
  lang: string;
  staticTexts: StaticTexts;

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
  isEdit,
  lang,
  staticTexts,
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
      staticTexts={staticTexts}
      lang={lang}
      useItems={useItems}
      onDeleteFinished={onDeleteFinished}
      changeModalState={changeModalState}
    />
  );
  return (
    <ItemGroupContainerCommon
      isEdit={isEdit}
      getEditButtons={getEditButtons}
      marginTop={0}
    >
      {children}
    </ItemGroupContainerCommon>
  );
};
