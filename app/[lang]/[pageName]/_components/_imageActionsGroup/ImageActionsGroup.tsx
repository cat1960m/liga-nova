"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData, MainParams } from "@/app/lib/definitions";
import { AddTextDescriptionDeleteFeatureButtons } from "../__commonComponents/_buttons/AddTextDescriptionDeleteFeatureButtons";
import { IMAGE_ACTIONS_ITEM, TOOLTIP } from "@/app/lib/constants";
import { ImageAction } from "./ImageAction";
import cn from "clsx";

import styles from "./imageActions.module.css";
import { useState } from "react";
import { ActionButton } from "../__commonComponents/_buttons/_actionButon/ActionButton";
import { ItemContainerUpdateDeleteTextDescription } from "../__commonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";

export type Props = {
  groupData: FullData[];
  staticTexts: StaticTexts;
  isEdit: boolean;
  params: MainParams;
};
//shares page
export const ImageActionsGroup = ({
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
          <div
            className={cn(styles.itemContainer)}
            key={item.text_description_id}
          >
            <ItemContainerUpdateDeleteTextDescription
              isEdit={isEdit}
              useItems={{
                tooltip: "quill",
                value: "image",
              }}
              staticTexts={staticTexts}
              s3Key={item.value}
              params={params}
              currentData={item}
              changeModalState={changeModalState}
            >
              <>
                <ImageAction
                  data={item}
                  groupData={groupData}
                  isModalShown={isModalShown}
                />

                <ActionButton text={staticTexts.details} onClick={() => {}} />
              </>
            </ItemContainerUpdateDeleteTextDescription>
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
