import { FullData, MainParams } from "@/app/lib/definitions";
import { ItemContainerUpdateDeleteTextDescription } from "../__commonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import { StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  isMain: boolean;
  textName: FullData;
  isEdit: boolean;
  params: MainParams;
  staticTexts: StaticTexts;
};
export const ShowName = ({
  isMain,
  textName,
  isEdit,
  staticTexts,
  params,
}: Props) => {
  return (
    <ItemContainerUpdateDeleteTextDescription
      isEdit={isEdit}
      staticTexts={staticTexts}
      currentData={textName}
      useItems={{ text: "simple" }}
      params={params}
      isChangeOrder={false}
    >
      <div
        style={{
          fontSize: isMain ? 18 : 12,
          fontWeight: 400,
          color: isMain ? "red" : "black",
        }}
      >
        {textName?.text_content ?? "N/A"}
      </div>
    </ItemContainerUpdateDeleteTextDescription>
  );
};
