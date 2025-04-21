import {
  ACTION_BANNER_LIST_DESCRIPTION,
  ACTION_BANNER_LIST_SHARE,
  ACTION_BANNER_LIST_TICKET,
} from "@/app/lib/constants";
import { FullData, MainParams } from "@/app/lib/definitions";
import Image from "next/image";

import styles from "./actionBannerList.module.css";
import { UpdateTextDescriptionData } from "../__commonComponents/_upadeModal/UpdateTextDescriptionData";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { UpdateTextDescriptionDeleteFeatureButtons } from "../__commonComponents/_buttons/UpdateTextDescriptionDeleteFeatureButtons";
import { ScrollIcon } from "../__commonComponents/_scrollIcon/ScrollIcon";
import { CommonButton } from "../__commonComponents/_buttons/CommonButton";
import cn from "clsx";

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
  widthItem,
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: widthItem,
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
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <div className={styles.group}>
              <div className={styles.title}>{share?.text_content ?? "N/A"}</div>
              {isEdit && share ? (
                <UpdateTextDescriptionData
                  staticTexts={staticTexts}
                  currentData={share}
                  useItems={{ text: "simple" }}
                  params={params}
                />
              ) : null}
            </div>

            <div className={styles.group}>
              <div className={styles.title}>
                {ticket?.text_content ?? "N/A"}
              </div>
              {isEdit && ticket ? (
                <UpdateTextDescriptionData
                  staticTexts={staticTexts}
                  currentData={ticket}
                  useItems={{ text: "simple" }}
                  params={params}
                />
              ) : null}
            </div>
          </div>

          <div className={styles.group}>
            <div style={{ display: "flex", width: "100%", gap: "5px" }}>
              <div className={styles.line}>_______</div>
              <div className={styles.description}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: description?.text_content ?? "N/A",
                  }}
                />
              </div>
            </div>

            {isEdit && description ? (
              <UpdateTextDescriptionData
                staticTexts={staticTexts}
                currentData={description}
                useItems={{ text: "quill" }}
                params={params}
              />
            ) : null}
          </div>

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

      {image && isEdit ? (
        <UpdateTextDescriptionDeleteFeatureButtons
          dataToUpdate={image}
          staticTexts={staticTexts}
          useItems={{
            value: "image",
          }}
          params={params}
          featureData={actionBannerListItemData}
          isHorizontal
        />
      ) : null}
    </div>
  );
};
