import { FullData, MainParams } from "@/app/lib/definitions";
import { GROUP_EXPANDED_SUBTYPE, SIMPLE_GROUP_ITEM } from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ExpandedText } from "../__commonComponents/_expandedText/ExpandedText";
import { ItemContainerAddTextDescriptionDeleteFeature } from "../__commonComponents/_itemGroupContainer/ItemContainerAddTextDescriptionDeleteFeature";
import { ShowTextDescription } from "./ShowTextDescription";

export type Props = {
  data: FullData[];
  isEdit: boolean;
  staticTexts: StaticTexts;
  params: MainParams;
};

export const TextGroup = ({ data, isEdit, staticTexts, params }: Props) => {
  const firstItem = data[0];
  const isExpanded = firstItem.subtype === GROUP_EXPANDED_SUBTYPE;

  const textDescriptions = data.filter((item) => !!item.text_description_id);

  const isTextExpandedShown = isExpanded && !isEdit;

  return (
    <div
      style={{
        marginBottom: "10px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {isTextExpandedShown ? (
        <ExpandedText
          staticTexts={staticTexts}
          descriptions={data.map((item) => item.text_content ?? "")}
          isHTML
          isButton
        />
      ) : null}
      {!isTextExpandedShown ? (
        <ItemContainerAddTextDescriptionDeleteFeature
          isEdit={isEdit}
          deleteButtonText={staticTexts.delete ?? "N/A"}
          featureData={data}
          addButtonText={staticTexts.addGroupItem ?? "N/A"}
          textDescriptionType={SIMPLE_GROUP_ITEM}
          isChangeOrderHorizontal={false}
        >
          {textDescriptions.map((item) => {
            return (
              <ShowTextDescription
                key={item.text_description_id}
                item={item}
                isEdit={isEdit}
                staticTexts={staticTexts}
                params={params}
              />
            );
          })}
        </ItemContainerAddTextDescriptionDeleteFeature>
      ) : null}
    </div>
  );
};
