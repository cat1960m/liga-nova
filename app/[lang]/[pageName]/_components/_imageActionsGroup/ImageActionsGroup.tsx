"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData, MainParams } from "@/app/lib/definitions";
import { AddTextDescriptionDeleteFeatureButtons } from "../__commonComponents/_buttons/AddTextDescriptionDeleteFeatureButtons";
import {
  IMAGE_ACTIONS_GROUP_SUBTYPE,
  IMAGE_ACTIONS_ITEM,
  TOOLTIP,
} from "@/app/lib/constants";
import { ImageAction } from "./ImageAction";
import cn from "clsx";
import { UpdateDeleteTextButtons } from "../__commonComponents/_buttons/UpdateDeleteTextButtons";

import styles from "./imageActions.module.css";
import { useState } from "react";
import { ActionButton } from "../__commonComponents/_buttons/_actionButon/ActionButton";

export type Props = {
  groupData: FullData[];
  staticTexts: StaticTexts;
  isEdit: boolean;
  params: MainParams;
};

export const ImageActionsGroup = ({
  groupData,
  isEdit,
  staticTexts,
  params,
}: Props) => {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  console.log("groupData", groupData);
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
          <div
            className={cn(styles.itemContainer, { [styles.edit]: isEdit })}
            key={item.text_description_id}
          >
            <ImageAction
              data={item}
              groupData={groupData}
              isModalShown={isModalShown}
            />

            <ActionButton text={staticTexts.details} onClick={() => {}} />

            {isEdit ? (
              <UpdateDeleteTextButtons
                currentData={item}
                staticTexts={staticTexts}
                isChangeOrder
                isHorizontal
                s3Key={item.value}
                useItems={{
                  tooltip: "quill",
                  value: "image",
                }}
                params={params}
                changeModalState={changeModalState}
              />
            ) : null}
          </div>
        ))}
      </div>

      {isEdit ? (
        <AddTextDescriptionDeleteFeatureButtons
          featureData={groupData}
          deleteButtonText={staticTexts.delete ?? "N/A"}
          addButtonText={staticTexts.addGroupItem ?? "N/A"}
          textDescriptionType={IMAGE_ACTIONS_ITEM}
        />
      ) : null}
    </div>
  );
};
