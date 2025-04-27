import { ItemContainerUpdateDeleteTextDescription } from "../../__commonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import { FullData, MainParams } from "@/app/lib/definitions";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { ICON_IN_BUTTON_WIDTH } from "@/app/lib/constants";
export type Props = {
  titleData: FullData;
  params: MainParams;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
};

export const ShowTitle = ({
  titleData,
  params,
  isExpanded,
  setIsExpanded,
}: Props) => {
  return (
    <ItemContainerUpdateDeleteTextDescription
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
            style={{ width: ICON_IN_BUTTON_WIDTH }}
          />
        ) : (
          <ChevronDownIcon
            onClick={() => setIsExpanded(true)}
            style={{ width: ICON_IN_BUTTON_WIDTH }}
          />
        )}
      </div>
    </ItemContainerUpdateDeleteTextDescription>
  );
};
