import { FullData, MainParams } from "@/app/lib/definitions";
import {
  TEXT_GROUP_EXPANDED_SUBTYPE,
  TEXT_GROUP_HIDDEN_SUBTYPE,
  SIMPLE_GROUP_ITEM,
} from "@/app/lib/constants";
import { ExpandedText } from "../__commonComponents/ExpandedText/ExpandedText";
import { ItemContainerAddTextDescriptionDeleteFeature } from "../__commonComponents/_itemGroupContainer/ItemContainerAddTextDescriptionDeleteFeature";
import { ShowTextDescription } from "./ShowTextDescription";
import { HiddenText } from "./HiddenText/HiddenText";
import styles from "./textGroup.module.css";

export type Props = {
  data: FullData[];
  params: MainParams;
};

export const TextGroup = ({ data, params }: Props) => {
  const firstItem = data[0];
  const isExpanded = firstItem.subtype === TEXT_GROUP_EXPANDED_SUBTYPE;
  const isHidden = firstItem.subtype === TEXT_GROUP_HIDDEN_SUBTYPE;

  const textDescriptions = data.filter((item) => !!item.text_description_id);
  const { staticTexts, isEdit } = params;

  const isTextExpandedShown = isExpanded && !isEdit;
  const isTextHiddenShown = isHidden && !isEdit;

  const isCommon = !isTextExpandedShown && !isTextHiddenShown;

  return (
    <div className={styles.container}>
      {isTextExpandedShown ? (
        <ExpandedText
          staticTexts={staticTexts}
          descriptions={data.map((item) => item.text_content ?? "")}
          isHTML
          isButton
        />
      ) : null}
      {isTextHiddenShown ? (
        <HiddenText
          staticTexts={staticTexts}
          descriptions={data.map((item) => item.text_content ?? "")}
        />
      ) : null}
      {isCommon ? (
        <ItemContainerAddTextDescriptionDeleteFeature
          isEdit={isEdit}
          deleteButtonText={staticTexts.delete ?? "N/A"}
          featureData={data}
          addButtonText={staticTexts.addGroupItem ?? "N/A"}
          textDescriptionType={SIMPLE_GROUP_ITEM}
          isChangeOrderHorizontal={false}
          marginTop={0}
        >
          {textDescriptions.map((item) => {
            return (
              <ShowTextDescription
                key={item.text_description_id}
                item={item}
                params={params}
              />
            );
          })}
        </ItemContainerAddTextDescriptionDeleteFeature>
      ) : null}
    </div>
  );
};
