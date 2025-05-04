import { FullData } from "@/app/lib/definitions";
import { ItemGroupContainerCommon } from "./ItemGroupContainerCommon/ItemGroupContainerCommon";
import { DeleteFeatureButton } from "../_buttons/DeleteFeatureButton/DeleteFeatureButton";

export type Props = {
  children: React.ReactNode;
  isEdit: boolean;
  deleteText: string;
  onDeleteFinished?: () => void;
  featureData: FullData[];
  isChangeOrderHorizontal?: boolean;
  noChangeOrder?: boolean;
  noDelete?: boolean;
  marginTop: number;
};

export const ItemContainerDeleteFeature = ({
  isEdit,
  children,
  deleteText,
  onDeleteFinished,
  featureData,
  isChangeOrderHorizontal,
  noChangeOrder,
  noDelete,
  marginTop,
}: Props) => {
  const getEditButtons = () => (
    <DeleteFeatureButton
      deleteText={deleteText}
      onDeleteFinished={onDeleteFinished}
      featureData={featureData}
      isChangeOrderHorizontal={isChangeOrderHorizontal}
      noChangeOrder={noChangeOrder}
      noDelete={noDelete}
    />
  );
  return (
    <ItemGroupContainerCommon
      isEdit={isEdit}
      getEditButtons={getEditButtons}
      marginTop={marginTop}
    >
      {children}
    </ItemGroupContainerCommon>
  );
};
