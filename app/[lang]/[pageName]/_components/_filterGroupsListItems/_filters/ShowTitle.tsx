import { StaticTexts } from "@/app/dictionaries/definitions";
import { ItemContainerUpdateDeleteTextDescription } from "../../__commonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import { FullData, MainParams } from "@/app/lib/definitions";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  titleData: FullData;
  params: MainParams;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
};

export const ShowTitle = ({
  isEdit,
  staticTexts,
  titleData,
  params,
  isExpanded,
  setIsExpanded,
}: Props) => {
  return (
    <ItemContainerUpdateDeleteTextDescription
      isEdit={isEdit}
      staticTexts={staticTexts}
      currentData={titleData}
      useItems={{ text: "simple" }}
      isChangeOrder={false}
      params={params}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: 16,
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {titleData.text_content ?? "N/A-----"}
        {isExpanded ? (
          <ChevronUpIcon
            onClick={() => setIsExpanded(false)}
            style={{ width: "24px" }}
          />
        ) : (
          <ChevronDownIcon
            onClick={() => setIsExpanded(true)}
            style={{ width: "24px" }}
          />
        )}
      </div>
    </ItemContainerUpdateDeleteTextDescription>
  );
};
