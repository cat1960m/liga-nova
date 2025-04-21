"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData, MainParams } from "@/app/lib/definitions";
import { AddTextDescriptionDeleteFeatureButtons } from "../__commonComponents/_buttons/AddTextDescriptionDeleteFeatureButtons";
import { IMAGE_LINKS_ITEM, TOOLTIP } from "@/app/lib/constants";
import { ImageLink } from "./ImageLink";
import cn from "clsx";

import styles from "./imageLinks.module.css";
import { useState } from "react";
import { ItemContainerUpdateDeleteTextDescription } from "../__commonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";

export type Props = {
  groupData: FullData[];
  staticTexts: StaticTexts;
  isEdit: boolean;
  params: MainParams;
};
// main page
export const ImageLinksGroup = ({
  groupData,
  isEdit,
  staticTexts,
  params,
}: Props) => {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const groupDataMain = groupData.filter(
    (item) => item.content_type !== TOOLTIP
  );
  const changeModalState = (state: boolean) => setIsModalShown(state);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
      }}
    >
      <div className={cn(styles.container, { [styles.edit]: isEdit })}>
        {groupDataMain.map((item) => (
          <div className={styles.itemContainer} key={item.text_description_id}>
            <ItemContainerUpdateDeleteTextDescription
              isEdit={isEdit}
              s3Key={item.value}
              useItems={{
                text: "simple",
                tooltip: "quill",
                value: "image",
                link: true,
              }}
              staticTexts={staticTexts}
              params={params}
              currentData={item}
              changeModalState={changeModalState}
            >
              <ImageLink
                data={item}
                groupData={groupData}
                isModalShown={isModalShown}
              />
            </ItemContainerUpdateDeleteTextDescription>
          </div>
        ))}
      </div>
      {isEdit ? (
        <AddTextDescriptionDeleteFeatureButtons
          featureData={groupData}
          deleteButtonText={staticTexts.delete ?? "N/A"}
          addButtonText={staticTexts.addGroupItem ?? "N/A"}
          textDescriptionType={IMAGE_LINKS_ITEM}
        />
      ) : null}
    </div>
  );
};
