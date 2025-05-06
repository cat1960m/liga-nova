import { FullData } from "@/app/lib/definitions";
import { ItemGroupContainerCommon } from "./ItemGroupContainerCommon/ItemGroupContainerCommon";
import { AddTextDescriptionButton } from "../_buttons/AddTextDescriptionButton";
import { DeleteFeatureChangeOrderButtons } from "../_buttons/DeleteFeatureChangeOrderButtons/DeleteFeatureChangeOrderButtons";
import { Buttons } from "./Buttons/Buttons";

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
  noDelete: boolean;
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
  noDelete,
}: Props) => {
  const getEditButtons = () => {
    const featureFirst = featureData.length ? featureData[0] : undefined;
    const featureId = featureFirst?.id;
    const isAddShown = !!featureId && !isNoAddButton;

    return (
      <Buttons>
        <>
          {isAddShown ? (
            <AddTextDescriptionButton
              featureId={featureId}
              textType={textDescriptionType}
              buttonText={addButtonText}
              price={price ?? null}
              onTextDescriptionAdded={onTextDescriptionAdded}
            />
          ) : null}

          {!noDelete ? (
              <DeleteFeatureChangeOrderButtons
                deleteText={deleteButtonText}
                featureData={featureData}
                isChangeOrderHorizontal={isChangeOrderHorizontal}
                onDeleteFinished={onDeleteFinished}
                noDelete={noDelete}
              />
          ) : null}
        </>
      </Buttons>
    );
  };
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
