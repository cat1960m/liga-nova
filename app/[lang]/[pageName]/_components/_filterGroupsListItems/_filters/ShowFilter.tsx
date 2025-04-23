import { StaticTexts } from "@/app/dictionaries/definitions";
import { ItemContainerUpdateDeleteTextDescription } from "../../__commonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import { FullData, MainParams } from "@/app/lib/definitions";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  filter: FullData;
  params: MainParams;
  inputValue: boolean;
  onFilterSelectionChanged: (data: {
    filter: FullData;
    value: boolean;
  }) => void;
};

export const ShowFilter = ({
  isEdit,
  staticTexts,
  filter,
  params,
  inputValue,
  onFilterSelectionChanged,
}: Props) => {
  return (
    <ItemContainerUpdateDeleteTextDescription
      key={filter.text_description_id}
      isEdit={isEdit}
      staticTexts={staticTexts}
      currentData={filter}
      useItems={{ text: "simple", value: "icons" }}
      params={params}
      isChangeOrderHorizontal={false}
    >
      <div
        style={{
          display: "flex",
          gap: "5px",
          alignItems: "center",
        }}
      >
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
