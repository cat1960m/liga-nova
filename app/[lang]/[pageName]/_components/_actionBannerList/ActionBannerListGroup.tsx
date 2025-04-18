"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import {
  ACTION_BANNER_LIST_DESCRIPTION,
  ACTION_BANNER_LIST_GROUP_ITEM,
  ACTION_BANNER_LIST_IMAGE,
  ACTION_BANNER_LIST_SHARE,
  ACTION_BANNER_LIST_TICKET,
} from "@/app/lib/constants";
import { FullData, MainParams } from "@/app/lib/definitions";
import { ScrollContainer } from "../__commonComponents/_scrollContainer/ScrollContainer";
import Image from "next/image";
import { DragEventHandler, useState } from "react";
import { getContainerData } from "@/app/lib/utils";
import styles from "./actionBannerList.module.css";
import { CommonButton } from "../__commonComponents/_buttons/CommonButton";
import { DeleteFeatureButton } from "../__commonComponents/_buttons/DeleteFeatureButton";
import { AddChildFeatureButton } from "../__commonComponents/_buttons/AddChildFeatureButton";
import { UpdateTextDescriptionDeleteFeatureButtons } from "../__commonComponents/_buttons/UpdateTextDescriptionDeleteFeatureButtons";
import { UpdateTextDescriptionData } from "../__commonComponents/_upadeModal/UpdateTextDescriptionData";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  groupData: FullData[];
  params: MainParams;
  pageFullDataList: FullData[];
};

export const ActionBannerListGroup = ({
  isEdit,
  staticTexts,
  groupData,
  params,
  pageFullDataList,
}: Props) => {
  const [lastAddedId, setLastAddedId] = useState<number | null>(null);

  const groupFeatureId = groupData[0]?.id;

  if (!groupFeatureId) {
    return null;
  }

  const [actionBannerListItemsData, actionBannerListItemIds] = getContainerData(
    {
      pageName: params.pageName,
      pageFullData: pageFullDataList,
      parentFeatureId: groupFeatureId,
    }
  );

  const ids = actionBannerListItemIds;

  const getItem = ({ id, widthItem }: { id: string; widthItem?: number }) => {
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
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <div className={styles.group}>
                <div className={styles.title}>
                  {share?.text_content ?? "N/A"}
                </div>
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
  const handleChildFeatureAdded = (newId: number) => {
    setLastAddedId(newId);
  };

  const handleDeleteFinished = () => {
    setLastAddedId(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", border: "2px solid green" }}>
      <ScrollContainer
        ids={ids}
        getItem={getItem}
        countVisibleItems={1}
        isEdit={isEdit}
        lastAddedId={lastAddedId}
        isScrollTypeSpec={true}
      />
      {isEdit ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            gap: "10px",
          }}
        >
          <AddChildFeatureButton
            parentFeatureId={groupFeatureId}
            text={staticTexts.addImage ?? "N/A"}
            params={params}
            textTypes={[
              ACTION_BANNER_LIST_SHARE,
              ACTION_BANNER_LIST_TICKET,
              ACTION_BANNER_LIST_DESCRIPTION,
              ACTION_BANNER_LIST_IMAGE,
            ]}
            type={ACTION_BANNER_LIST_GROUP_ITEM}
            subtype={ACTION_BANNER_LIST_GROUP_ITEM}
            onChildFeatureAdded={handleChildFeatureAdded}
          />
          <DeleteFeatureButton
            deleteText={staticTexts.delete ?? "N/A"}
            featureData={groupData}
            onDeleteFinished={handleDeleteFinished}
          />
        </div>
      ) : null}
    </div>
  );
};
