import {
  ACTION_BANNER_LIST_DESCRIPTION,
  ACTION_BANNER_LIST_SHARE,
  ACTION_BANNER_LIST_TICKET,
} from "@/app/lib/constants";
import { FullData, PreviewParams } from "@/app/lib/definitions";
import Image from "next/image";

import cn from "clsx";
import { WrappingShowTitle } from "../ShowTitle/WrappingShowTitle";
import { WrappingShowDescription } from "../ShowDescription/WrappingShowDescription";

import styles from "./showItem.module.css";
import { CommonButton } from "@/app/ui/CommonComponents/_buttons/CommonButton";
import { ScrollIcon } from "@/app/ui/CommonComponents/ScrollIcon/ScrollIcon";
import { ItemContainerUpdateTextDescriptionDeleteFeature } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateTextDescriptionDeleteFeature";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { Preview } from "./Preview";

export type Props = {
  actionBannerListItemsData: Record<string, FullData[]>;
  id: string;
  widthItem?: number;
  indexSelected: (index: number) => void;
  f: (value: "left" | "right") => void;
  ids: string[];
  isEdit: boolean;
  staticTexts: StaticTexts;
  lang: string;
};

export const ShowItem = ({
  actionBannerListItemsData,
  id,
  indexSelected,
  f,
  ids,
  isEdit,
  staticTexts,
  lang,
}: Props) => {
  const actionBannerListItemData = actionBannerListItemsData[id];

  const share = actionBannerListItemData.find(
    (item) => item.text_type === ACTION_BANNER_LIST_SHARE
  );
  const ticket = actionBannerListItemData.find(
    (item) => item.text_type === ACTION_BANNER_LIST_TICKET
  );
  const description = actionBannerListItemData.find(
    (item) => item.text_type === ACTION_BANNER_LIST_DESCRIPTION
  );
  const image = actionBannerListItemData.find(
    (item) => item.text_type === ACTION_BANNER_LIST_DESCRIPTION
  );

  const value = image?.value;

  if (!image) {
    return null;
  }

  const color = image.price === 1 ? "white" : "black";

  const preview = (params: PreviewParams) => (
    <Preview {...params} />
  );
  return (
    <ItemContainerUpdateTextDescriptionDeleteFeature
      currentData={image}
      useItems={{
        value: "image",
        price: "color",
      }}
      staticTexts={staticTexts}
      lang={lang}
      isEdit={isEdit}
      featureData={actionBannerListItemData}
      isChangeOrderHorizontal
      marginTop={0}
      noDelete={false}
      countIndex={null}
      preview={preview}
      previewBaseParams={{
        isFullWidth: "full",
        share: share?.text_content ?? "",
        ticket: ticket?.text_content ?? "",
        description: description?.text_content ?? "",
        ids: ids.join(","),
        id: id,
      }}
    >
      <div className={styles.main}>
        <div className={styles.container}>
          {value ? (
            <Image
              src={value}
              fill
              quality={100} // Optional, for higher quality
              alt="image"
              className={styles.image}
              draggable="false" // This directly disables drag-and-drop
            />
          ) : null}
          {/* changes for mobile needed */}
          <div
            className={styles.infoContainer}
            style={{ padding: isEdit ? "20px" : undefined }}
          >
            <div className={styles.title_container}>
              {share ? (
                <WrappingShowTitle
                  staticTexts={staticTexts}
                  isEdit={isEdit}
                  lang={lang}
                  title={share}
                  color={color}
                  countIndex={null}
                />
              ) : null}

              {ticket ? (
                <WrappingShowTitle
                  staticTexts={staticTexts}
                  isEdit={isEdit}
                  lang={lang}
                  title={ticket}
                  color={color}
                  countIndex={null}
                />
              ) : null}
            </div>

            {description ? (
              <WrappingShowDescription
                isEdit={isEdit}
                lang={lang}
                staticTexts={staticTexts}
                description={description}
                color={color}
              />
            ) : null}

            <div className={styles.buttons}>
              <CommonButton
                text={staticTexts.details ?? "N/A"}
                isAction
                styleValue={{ minWidth: "200px", color }}
              />
              <CommonButton
                text={staticTexts.freeTraining ?? "N/A"}
                styleValue={{
                  border: `2px solid ${color}`,
                  backgroundColor: "transparent",
                  color: color,
                }}
              />
            </div>

            <div className={styles.groupButtons}>
              <ScrollIcon
                onScrollItemClick={f}
                direction="left"
                isStaticPosition
                color={color}
              />
              {ids.map((currentId, index) => {
                return (
                  <div
                    className={cn(styles.ring, {
                      [styles.selected]: currentId === id,
                    })}
                    key={currentId}
                    onClick={() => indexSelected(index)}
                    style={{ borderColor: color }}
                  />
                );
              })}
              <ScrollIcon
                onScrollItemClick={f}
                direction="right"
                isStaticPosition
                color={color}
              />
            </div>
          </div>
        </div>
      </div>
    </ItemContainerUpdateTextDescriptionDeleteFeature>
  );
};
