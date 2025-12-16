"use client";

import { FullData, PreviewParams } from "@/app/lib/definitions";
import { ImageLink } from "./ImageLink";
import { ItemContainerUpdateDeleteTextDescription } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import { CountIndex, StaticTexts } from "@/app/dictionaries/definitions";
import { usePathname } from "next/navigation";
import { CONTENT_TYPE_TOOLTIP, HOME } from "@/app/lib/constants";

export type Props = {
  groupData: FullData[];
  isEdit: boolean;
  staticTexts: StaticTexts;
  lang: string;

  item: FullData;
  changeModalState?: (state: boolean) => void;
  isModalShown: boolean;
  countIndex: CountIndex;
  pageName: string;
};
// main page
export const ImageLinkGroupItem = ({
  groupData,
  staticTexts,
  lang,
  isEdit,
  item,
  changeModalState,
  isModalShown,
  countIndex,
  pageName,
}: Props) => {
  const fullPathName = usePathname();
  const pathName =
    pageName !== HOME
      ? fullPathName.substring(
          0,
          fullPathName.length - pageName.length - (pageName.length ? 1 : 0)
        )
      : fullPathName;
  const tooltip = groupData.find(
    (groupDataItem) =>
      item.text_description_id === groupDataItem.text_description_id &&
      groupDataItem.content_type === CONTENT_TYPE_TOOLTIP
  )?.text_content;

  const link = `${pathName}/${item.link}`;

  const preview = ({ value, text, tooltip }: PreviewParams) => {
    return (
      <ImageLink
        value={value}
        text={text}
        isModalShown={false}
        staticTexts={staticTexts}
        tooltip={tooltip ?? "N/A"}
      />
    );
  };

  return (
    <ItemContainerUpdateDeleteTextDescription
      s3Key={item.value}
      useItems={{
        text: "simple",
        tooltip: "quill",
        value: "image",
        link: true,
      }}
      isEdit={isEdit}
      staticTexts={staticTexts}
      lang={lang}
      currentData={item}
      changeModalState={changeModalState}
      countIndex={countIndex}
      preview={preview}
    >
      <ImageLink
        value={item.value}
        text={item.text_content}
        isModalShown={isModalShown}
        staticTexts={staticTexts}
        tooltip={tooltip ?? ""}
        link={link}
      />
    </ItemContainerUpdateDeleteTextDescription>
  );
};
