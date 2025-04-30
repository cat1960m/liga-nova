import { ItemContainerUpdateDeleteTextDescription } from "../../../__commonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import { FullData, MainParams } from "@/app/lib/definitions";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { ICON_IN_BUTTON_WIDTH } from "@/app/lib/constants";

import styles from "./filterGroup.module.css";
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
      <div className={styles.title}>
        {titleData.text_content ?? "N/A"}
        {isExpanded ? (
          <ChevronUpIcon
            onClick={() => setIsExpanded(false)}
            width={ICON_IN_BUTTON_WIDTH}
          />
        ) : (
          <ChevronDownIcon
            onClick={() => setIsExpanded(true)}
            width={ICON_IN_BUTTON_WIDTH}
          />
        )}
      </div>
    </ItemContainerUpdateDeleteTextDescription>
  );
};
