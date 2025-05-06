import { UseItems } from "../_upadeModal/UpdateTextDescriptionDataModalContent/UpdateTextDescriptionDataModalContent";
import { FullData } from "@/app/lib/definitions";
import { ItemGroupContainerCommon } from "./ItemGroupContainerCommon/ItemGroupContainerCommon";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { UpdateTextDescriptionData } from "../_upadeModal/UpdateTextDescriptionData";
import { DeleteFeatureChangeOrderButtons } from "../_buttons/DeleteFeatureChangeOrderButtons/DeleteFeatureChangeOrderButtons";
import { Buttons } from "./Buttons/Buttons";

export type Props = {
  children: React.ReactNode;
  isEdit: boolean;
  staticTexts: StaticTexts;
  lang: string;
  useItems: UseItems;
  currentData: FullData;
  isChangeOrderHorizontal?: boolean;
  featureData: FullData[];
  noDelete: boolean;
  marginTop: number;
};

export const ItemContainerUpdateTextDescriptionDeleteFeature = ({
  children,
  useItems,
  isEdit,
  staticTexts,
  lang,
  currentData,
  isChangeOrderHorizontal = true,
  featureData,
  noDelete,
  marginTop,
}: Props) => {
  const getEditButtons = () => {
    return (
      <Buttons>
        {currentData ? (
          <UpdateTextDescriptionData
            currentData={currentData}
            useItems={useItems}
            staticTexts={staticTexts}
            lang={lang}
          />
        ) : null}

        {!noDelete ? (
            <DeleteFeatureChangeOrderButtons
              deleteText={staticTexts.delete ?? "N/A"}
              featureData={featureData}
              isChangeOrderHorizontal={isChangeOrderHorizontal}
              noDelete={noDelete}
            />
        ) : null}
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
