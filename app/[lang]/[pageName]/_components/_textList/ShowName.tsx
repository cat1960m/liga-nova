import { FullData, MainParams } from "@/app/lib/definitions";
import { ItemContainerUpdateDeleteTextDescription } from "../__commonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";

export type Props = {
  isMain: boolean;
  textName: FullData;
  params: MainParams;
};
export const ShowName = ({
  isMain,
  textName,
  params,
}: Props) => {
  return (
    <ItemContainerUpdateDeleteTextDescription
      currentData={textName}
      useItems={{ text: "simple" }}
      params={params}
      isChangeOrder={false}
    >
      <div
        style={{
          fontSize: isMain ? 18 : 12,
          fontWeight: 400,
          color: isMain ? "black" : "darkgray",
        }}
      >
        {textName?.text_content ?? "N/A"}
      </div>
    </ItemContainerUpdateDeleteTextDescription>
  );
};
