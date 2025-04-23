import {
  ACTION_BANNER_LIST_DESCRIPTION,
  ACTION_BANNER_LIST_SHARE,
  ACTION_BANNER_LIST_TICKET,
} from "@/app/lib/constants";
import { FullData, MainParams } from "@/app/lib/definitions";
import Image from "next/image";

import styles from "./actionBannerList.module.css";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ScrollIcon } from "../__commonComponents/_scrollIcon/ScrollIcon";
import { CommonButton } from "../__commonComponents/_buttons/CommonButton";
import cn from "clsx";
import { ItemContainerUpdateTextDescriptionDeleteFeature } from "../__commonComponents/_itemGroupContainer/ItemContainerUpdateTextDescriptionDeleteFeature";
import { ShowTitle } from "./ShowTitle";
import { ShowDescription } from "./ShowDescription";

export type Props = {
  actionBannerListItemsData: Record<string, FullData[]>;
  id: string;
  widthItem?: number;
  isEdit: boolean;
  staticTexts: StaticTexts;
  params: MainParams;
  indexSelected: (index: number) => void;
  f: (value: "left" | "right") => void;
  ids: string[];
};

export const ShowItem = ({
  actionBannerListItemsData,
  id,
  isEdit,
  staticTexts,
  params,
  indexSelected,
  f,
  ids,
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

  return (
    <ItemContainerUpdateTextDescriptionDeleteFeature
      isEdit={isEdit}
      currentData={image}
      staticTexts={staticTexts}
      useItems={{
        value: "image",
      }}
      params={params}
      featureData={actionBannerListItemData}
      isChangeOrderHorizontal
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className={styles.container}>
          {value ? (
            <Image
              src={value}
              layout="fill" // Fill the container
              objectFit="cover" // Make sure it covers the entire container
              quality={100} // Optional, for higher quality
              alt="image"
              draggable="false" // This directly disables drag-and-drop
              //   onDragStart={preventDragHandler} // Ensures additional prevention
            />
          ) : null}
          {/* changes for mobile needed */}
          <div
            className={styles.infoContainer}
            style={{ padding: isEdit ? "20px" : undefined }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              {share ? (
                <ShowTitle
                  isEdit={isEdit}
                  staticTexts={staticTexts}
                  params={params}
                  title={share}
                />
              ) : null}

              {ticket ? (
                <ShowTitle
                  isEdit={isEdit}
                  staticTexts={staticTexts}
                  params={params}
                  title={ticket}
                />
              ) : null}
            </div>

            {description ? (
              <ShowDescription
                isEdit={isEdit}
                staticTexts={staticTexts}
                params={params}
                description={description}
              />
            ) : null}

            <div className={styles.buttons}>
              <CommonButton text={staticTexts.register ?? "N/A"} isAction />
              <CommonButton text={staticTexts.register ?? "N/A"} isAction />
            </div>

            <div className={styles.groupButtons}>
              <ScrollIcon
                onScrollItemClick={f}
                direction="left"
                isStaticPosition
              />
              {ids.map((currentId, index) => {
                return (
                  <div
                    className={cn(styles.ring, {
                      [styles.selected]: currentId === id,
                    })}
                    key={currentId}
                    onClick={() => indexSelected(index)}
                  />
                );
              })}
              <ScrollIcon
                onScrollItemClick={f}
                direction="right"
                isStaticPosition
              />
            </div>
          </div>
        </div>
      </div>
    </ItemContainerUpdateTextDescriptionDeleteFeature>
  );
};
