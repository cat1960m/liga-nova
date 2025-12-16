import { FullData } from "@/app/lib/definitions";
import { ItemGroupContainerCommon } from "./ItemGroupContainerCommon/ItemGroupContainerCommon";
import { AddTextDescriptionButton } from "../_buttons/AddTextDescriptionButton";
import { DeleteFeatureChangeOrderButtons } from "../_buttons/DeleteFeatureChangeOrderButtons/DeleteFeatureChangeOrderButtons";
import { Buttons } from "./Buttons/Buttons";
import { CountIndex } from "@/app/dictionaries/definitions";

export type Props = {
  children: React.ReactNode;
  isEdit: boolean;
  isChangeOrderHorizontal?: boolean;
  featureData: FullData[];
  onDeleteFinished?: () => void;
  deleteButtonText: string;
  addButtonText: string;
  textDescriptionType: string;
  price?: number;
  onTextDescriptionAdded?: (newId: number) => void;
  marginTop: number;
  noDelete: boolean;
  heightValue?: string;
  countIndex: CountIndex | null;
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
  price,
  onTextDescriptionAdded,
  marginTop,
  noDelete,
  heightValue,
  countIndex,
}: Props) => {
  const getEditButtons = () => {
    const featureFirst = featureData.length ? featureData[0] : undefined;
    const featureId = featureFirst?.id;
    const isAddShown = !!featureId;

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
              countIndex={countIndex}
              noChangeOrder={false}
            />
          ) : null}
        </>
      </Buttons>
    );
  };
  return (
    <ItemGroupContainerCommon
      showGroupButtons={isEdit}
      getEditButtons={getEditButtons}
      marginTop={marginTop}
      heightValue={heightValue}
    >
      {children}
    </ItemGroupContainerCommon>
  );
};
