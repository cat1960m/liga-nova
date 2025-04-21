import { FullData, MainParams } from "@/app/lib/definitions";
import {
  DEFAULT_TEXT,
  GROUP_EXPANDED_SUBTYPE,
  SIMPLE_GROUP_ITEM,
} from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ExpandedText } from "../__commonComponents/_expandedText/ExpandedText";
import { AddTextDescriptionDeleteFeatureButtons } from "../__commonComponents/_buttons/AddTextDescriptionDeleteFeatureButtons";
import { ItemContainerUpdateDeleteTextDescription } from "../__commonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";

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
        border: isEdit ? "1px dotted magenta" : undefined,
        padding: isEdit ? "10px 10px 10px 10px" : undefined,
        marginTop: isEdit ? "10px" : undefined,
        gap: isEdit ? "10px" : undefined,
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
      {!isTextExpandedShown
        ? textDescriptions.map((item) => {
            return (
              <ItemContainerUpdateDeleteTextDescription
                key={item.text_description_id}
                isEdit={isEdit}
                useItems={{ text: "quill" }}
                staticTexts={staticTexts}
                params={params}
                currentData={item}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.text_content ?? DEFAULT_TEXT,
                  }}
                />
              </ItemContainerUpdateDeleteTextDescription>
            );
          })
        : null}
      {isEdit ? (
        <AddTextDescriptionDeleteFeatureButtons
          deleteButtonText={staticTexts.delete ?? "N/A"}
          featureData={data}
          addButtonText={staticTexts.addGroupItem ?? "N/A"}
          textDescriptionType={SIMPLE_GROUP_ITEM}
        />
      ) : null}
    </div>
  );
};
