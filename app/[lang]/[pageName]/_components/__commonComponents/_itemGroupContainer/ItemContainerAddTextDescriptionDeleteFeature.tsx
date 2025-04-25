import { FullData, MainParams } from "@/app/lib/definitions";
import { ItemGroupContainerCommon } from "./ItemGroupContainerCommon";
import { AddTextDescriptionDeleteFeatureButtons } from "./AddTextDescriptionDeleteFeatureButtons";

export type Props = {
  children: React.ReactNode;
  isEdit: boolean;
  isChangeOrderHorizontal?: boolean;
  featureData: FullData[];
  onDeleteFinished?: () => void;
  deleteButtonText: string;
  addButtonText: string;
  textDescriptionType: string;
  isNoAddButton?: boolean;
  price?: number;
  onTextDescriptionAdded?: (newId: number) => void;
  marginTop: number;
};

export const ItemContainerAddTextDescriptionDeleteFeature = ({
  isEdit,
  children,
  isChangeOrderHorizontal = true,
  featureData,
  onDeleteFinished,
  deleteButtonText,
  addButtonText,
  textDescriptionType,
  isNoAddButton,
  price,
  onTextDescriptionAdded,
  marginTop,
}: Props) => {
  const getEditButtons = () => (
    <AddTextDescriptionDeleteFeatureButtons
      isChangeOrderHorizontal={isChangeOrderHorizontal}
      featureData={featureData}
      onDeleteFinished={onDeleteFinished}
      deleteButtonText={deleteButtonText}
      addButtonText={addButtonText}
      textDescriptionType={textDescriptionType}
      isNoAddButton={isNoAddButton}
      price={price}
      onTextDescriptionAdded={onTextDescriptionAdded}
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
