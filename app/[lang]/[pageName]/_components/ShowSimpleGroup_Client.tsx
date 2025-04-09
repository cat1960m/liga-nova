import { FullData } from "@/app/lib/definitions";
import {
  DEFAULT_TEXT,
  GROUP1_SUBTYPE,
  GROUP2_SUBTYPE,
  GROUP_EXPANDED_SUBTYPE,
  SIMPLE_GROUP_ITEM,
} from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { DeleteFeatureButton } from "./_buttons/DeleteFeatureButton";
import { ExpandedText } from "./_clientComponents/ExpandedText";
import DOMPurify from "dompurify";
import { AddTextDescriptionButton } from "./_buttons/AddTextDescriptionButton";
import { UpdateDeleteText } from "./UpdateDeleteText";

export type Props = {
  data: FullData[];
  isEdit: boolean;
  staticTexts: StaticTexts;
};

export const ShowSimpleGroup_Client = ({
  data,
  isEdit,
  staticTexts,
}: Props) => {
  const firstItem = data[0];
  const isHeader = firstItem.subtype === GROUP1_SUBTYPE;
  const isExpanded = firstItem.subtype === GROUP_EXPANDED_SUBTYPE;
  const isQuill = firstItem.subtype === GROUP2_SUBTYPE;

  const text = data
    .map((item, index) => item.text_content ?? (index ? "" : DEFAULT_TEXT))
    .join("");

  const sanitizedContent = text; //DOMPurify.sanitize(text);
  const isTextExpandedShown = isExpanded && !isEdit;
  const featureId = data[0].id;

  return (
    <div
      style={{
        fontSize: isHeader ? "xx-large" : undefined,
        fontWeight: isHeader ? 700 : undefined,
        marginBottom: "10px",
        border: isEdit ? "1px dotted magenta" : undefined,
        padding: isEdit ? "10px" : undefined,
        gap: isEdit ? "10px" : undefined,
        display: "flex",
        flexDirection: "column",
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
        ? data.map((item) => {
            return (
              <div
                key={item.text_description_id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  border: isEdit ? "1px dotted magenta" : undefined,
                  padding: isEdit ? "10px" : undefined,
                  gap: isEdit ? "10px" : undefined,
                }}
              >
                {isHeader ? (
                  <div
                    style={{
                      width: "200px",
                      height: 0,
                      marginBottom: "20px",
                      border: "2px solid blue",
                    }}
                  />
                ) : null}
                {isHeader ? (
                  item.text_content ?? DEFAULT_TEXT
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.text_content ?? DEFAULT_TEXT,
                    }}
                  />
                )}
                {isEdit ? (
                  <UpdateDeleteText
                    currentData={item}
                    staticTexts={staticTexts}
                    isQuill={!isHeader}
                  />
                ) : null}
              </div>
            );
          })
        : null}
      {isEdit ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            flexWrap: "wrap",
          }}
        >
          {!isHeader ? (
            <AddTextDescriptionButton
              featureId={featureId}
              textType={SIMPLE_GROUP_ITEM}
              buttonText={staticTexts.addGroupItem ?? "N/A"}
              price={null}
            />
          ) : null}
          <DeleteFeatureButton
            featureId={featureId}
            deleteText={staticTexts.delete ?? "N/A"}
            featureData={data}
          />
        </div>
      ) : null}
    </div>
  );
};
