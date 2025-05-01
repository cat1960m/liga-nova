import { ItemContainerUpdateDeleteTextDescription } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import { FullData, MainParams } from "@/app/lib/definitions";

import styles from "./filterGroup.module.css";

export type Props = {
  filter: FullData;
  params: MainParams;
  inputValue: boolean;
  onFilterSelectionChanged: (data: {
    filter: FullData;
    value: boolean;
  }) => void;
};

export const ShowFilter = ({
  filter,
  params,
  inputValue,
  onFilterSelectionChanged,
}: Props) => {
  const { isEdit } = params;

  return (
    <ItemContainerUpdateDeleteTextDescription
      key={filter.text_description_id}
      currentData={filter}
      useItems={{ text: "simple", value: "icons" }}
      params={params}
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
        <div style={{ fontSize: 14 }}>{filter.text_content ?? "N/A"}</div>
        {isEdit && filter.value ? <img src={filter.value} alt="icon" /> : null}
      </div>
    </ItemContainerUpdateDeleteTextDescription>
  );
};
