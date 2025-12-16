import { FullData } from "@/app/lib/definitions";
import { ItemGroupContainerCommon } from "./ItemGroupContainerCommon/ItemGroupContainerCommon";
import { AddTextDescriptionButton } from "../_buttons/AddTextDescriptionButton";
import { Buttons } from "./Buttons/Buttons";

export type Props = {
  children: React.ReactNode;
  isEdit: boolean;
  featureData: FullData[];
  addButtonText: string;
  textDescriptionType: string;
  price?: number;
  onTextDescriptionAdded?: (newId: number) => void;
  marginTop: number;
  heightValue?: string;
};

export const ItemContainerAddTextDescription = ({
  isEdit,
  children,
  featureData,
  addButtonText,
  textDescriptionType,
  price,
  onTextDescriptionAdded,
  marginTop,
  heightValue,
}: Props) => {
  const getEditButtons = () => {
    const featureFirst = featureData.length ? featureData[0] : undefined;
    const featureId = featureFirst?.id;
    const isAddShown = !!featureId;

    return (
      <Buttons>
          {isAddShown ? (
            <AddTextDescriptionButton
              featureId={featureId}
              textType={textDescriptionType}
              buttonText={addButtonText}
              price={price ?? null}
              onTextDescriptionAdded={onTextDescriptionAdded}
            />
          ) : null}
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
