import { ItemContainerUpdateDeleteTextDescription } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import { FullData } from "@/app/lib/definitions";

import styles from "./showFilter.module.css";
import { CountIndex, StaticTexts } from "@/app/dictionaries/definitions";
import Image from "next/image";
import { ICON_SIZE } from "@/app/lib/constants";

export type Props = {
  filter: FullData;
  isEdit: boolean;
  staticTexts: StaticTexts;
  lang: string;
  inputValue: boolean;
  onFilterSelectionChanged: (data: {
    filter: FullData;
    value: boolean;
  }) => void;
  countIndex: CountIndex | null;
};

export const ShowFilter = ({
  filter,
  staticTexts,
  lang,
  isEdit,
  inputValue,
  onFilterSelectionChanged,
  countIndex
}: Props) => {
  return (
    <ItemContainerUpdateDeleteTextDescription
      key={filter.text_description_id}
      currentData={filter}
      useItems={{ text: "simple", value: "icons" }}
      isEdit={isEdit}
      staticTexts={staticTexts}
      lang={lang}
      isChangeOrderHorizontal={false}
      countIndex={countIndex}
    >
      <div className={styles.filter}>
        <input
          type="checkbox"
          disabled={isEdit}
          checked={inputValue}
          onChange={(event) => {
            onFilterSelectionChanged({
              filter,
              value: event.target.checked,
            });
          }}
        />
        <div className={styles.text}>{filter.text_content ?? "N/A"}</div>
        {isEdit && filter.value ? (
          <Image
            src={filter.value}
            alt="icon"
            width={ICON_SIZE}
            height={ICON_SIZE}
          />
        ) : null}
      </div>
    </ItemContainerUpdateDeleteTextDescription>
  );
};
