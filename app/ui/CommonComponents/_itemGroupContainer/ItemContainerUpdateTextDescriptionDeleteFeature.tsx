import { UseItems } from "../_upadeModal/UpdateTextDescriptionDataModalContent/UpdateTextDescriptionDataModalContent";
import { FullData, PreviewParams } from "@/app/lib/definitions";
import { ItemGroupContainerCommon } from "./ItemGroupContainerCommon/ItemGroupContainerCommon";
import { CountIndex, StaticTexts } from "@/app/dictionaries/definitions";
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
  heightValue?: string;
  countIndex: CountIndex | null;
  preview?: (data: PreviewParams) => React.ReactNode;
  previewBaseParams?: Record<string, string>;
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
  heightValue,
  countIndex,
  preview,
  previewBaseParams,
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
            preview={preview}
            previewBaseParams={previewBaseParams}
          />
        ) : null}

        {!noDelete ? (
          <DeleteFeatureChangeOrderButtons
            deleteText={staticTexts.delete ?? "N/A"}
            featureData={featureData}
            isChangeOrderHorizontal={isChangeOrderHorizontal}
            noDelete={noDelete}
            countIndex={countIndex}
            noChangeOrder={false}
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
