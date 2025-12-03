"use client";

import { FullData, PreviewParams } from "@/app/lib/definitions";
import { ImageAction } from "./ImageAction";
import { ActionButton } from "@/app/ui/CommonComponents/_buttons/ActionButton/ActionButton";
import { ItemContainerUpdateDeleteTextDescription } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import { CountIndex, StaticTexts } from "@/app/dictionaries/definitions";
import { CONTENT_TYPE_TOOLTIP } from "@/app/lib/constants";
import styles from "./imageActions.module.css";


export type Props = {
  groupData: FullData[];
  isEdit: boolean;
  staticTexts: StaticTexts;
  lang: string;
  groupItemMain: FullData;
  isModalShown: boolean;
  changeModalState?: (state: boolean) => void;
  countIndex: CountIndex;
};

export const ImageActionGroupItem = ({
  groupData,
  staticTexts,
  lang,
  isEdit,
  groupItemMain,
  isModalShown,
  changeModalState,
  countIndex,
}: Props) => {
  const tooltip = groupData.find(
    (item) =>
      item.text_description_id === groupItemMain.text_description_id &&
      item.content_type === CONTENT_TYPE_TOOLTIP
  );
  const tooltipText = tooltip?.text_content ?? "";

  const preview = ({value, text, tooltip, staticTexts}: PreviewParams) => {
    return (
      <div className={styles.preview}>
        <ImageAction
          value={value ?? ""}
          text={text ?? ""}
          tooltipText={tooltip ?? "N/A"}
          isModalShown={false}
        />

        <ActionButton
          text={staticTexts.details?.toUpperCase()}
          onClick={() => {}}
        />
      </div>
    );
  };
  return (
    <ItemContainerUpdateDeleteTextDescription
      useItems={{
        tooltip: "quill",
        value: "image",
      }}
      s3Key={groupItemMain.value}
      isEdit={isEdit}
      staticTexts={staticTexts}
      lang={lang}
      currentData={groupItemMain}
      changeModalState={changeModalState}
      countIndex={countIndex}
      preview={preview}
    >
      <>
        <ImageAction
          value={groupItemMain.value ?? ""}
          text={groupItemMain.text_content ?? ""}
          tooltipText={tooltipText}
          isModalShown={isModalShown}
        />

        <ActionButton
          text={staticTexts.details?.toUpperCase()}
          onClick={() => {}}
        />
      </>
    </ItemContainerUpdateDeleteTextDescription>
  );
};
