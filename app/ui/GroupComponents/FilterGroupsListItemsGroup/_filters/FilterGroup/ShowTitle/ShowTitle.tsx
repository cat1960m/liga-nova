import { ItemContainerUpdateDeleteTextDescription } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import { FullData } from "@/app/lib/definitions";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { ICON_IN_BUTTON_WIDTH } from "@/app/lib/constants";

import styles from "./showTitle.module.css";

import { StaticTexts } from "@/app/dictionaries/definitions";
export type Props = {
  titleData: FullData;
  isEdit: boolean;
  lang: string;
  staticTexts: StaticTexts;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
};

export const ShowTitle = ({
  titleData,
  isEdit,
  staticTexts,
  lang,
  isExpanded,
  setIsExpanded,
}: Props) => {
  return (
    <ItemContainerUpdateDeleteTextDescription
      currentData={titleData}
      useItems={{ text: "simple" }}
      isChangeOrder={false}
      isEdit={isEdit}
      staticTexts={staticTexts}
      lang={lang}
      countIndex={null}
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
