import { ItemContainerUpdateDeleteTextDescription } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import { FullData, MainParams } from "@/app/lib/definitions";

import styles from "./showFilter.module.css";
import { StaticTexts } from "@/app/dictionaries/definitions";

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
};

export const ShowFilter = ({
  filter,
  staticTexts,
  lang,
  isEdit,
  inputValue,
  onFilterSelectionChanged,
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
        {isEdit && filter.value ? <img src={filter.value} alt="icon" /> : null}
      </div>
    </ItemContainerUpdateDeleteTextDescription>
  );
};
