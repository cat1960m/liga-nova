import { FullData, MainParams } from "@/app/lib/definitions";
import { UpdateTextDescriptionData } from "../_upadeModal/UpdateTextDescriptionData";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { UseItems } from "../_upadeModal/UpdateTextDescriptionDataModalContent";
import { DeleteFeatureButton } from "../_buttons/DeleteFeatureButton";

export type Props = {
  dataToUpdate?: FullData;
  useItems: UseItems;
  params: MainParams;
  featureData: FullData[];
  isChangeOrderHorizontal?: boolean;
  noDelete?: boolean;
};

export const UpdateTextDescriptionDeleteFeatureButtons = ({
  dataToUpdate,
  useItems,
  params,
  featureData,
  isChangeOrderHorizontal,
  noDelete,
}: Props) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px",
      }}
    >
      {dataToUpdate ? (
        <UpdateTextDescriptionData
          currentData={dataToUpdate}
          useItems={useItems}
          params={params}
        />
      ) : null}
      <DeleteFeatureButton
        deleteText={params.staticTexts.delete ?? "N/A"}
        featureData={featureData}
        isChangeOrderHorizontal={isChangeOrderHorizontal}
        noDelete={noDelete}
      />
    </div>
  );
};
