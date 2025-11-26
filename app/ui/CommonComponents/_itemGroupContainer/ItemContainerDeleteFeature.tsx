import { FullData } from "@/app/lib/definitions";
import { ItemGroupContainerCommon } from "./ItemGroupContainerCommon/ItemGroupContainerCommon";
import { DeleteFeatureChangeOrderButtons } from "../_buttons/DeleteFeatureChangeOrderButtons/DeleteFeatureChangeOrderButtons";
import { CountIndex } from "@/app/dictionaries/definitions";

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
  countIndex: CountIndex | null;
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
  countIndex
}: Props) => {
  const getEditButtons = () => (
      <DeleteFeatureChangeOrderButtons
        deleteText={deleteText}
        onDeleteFinished={onDeleteFinished}
        featureData={featureData}
        isChangeOrderHorizontal={isChangeOrderHorizontal}
        noChangeOrder={noChangeOrder}
        noDelete={noDelete}
        countIndex={countIndex}
      />
  );
  return (
    <ItemGroupContainerCommon
      showGroupButtons={isEdit}
      getEditButtons={getEditButtons}
      marginTop={marginTop}
    >
      {children}
    </ItemGroupContainerCommon>
  );
};
