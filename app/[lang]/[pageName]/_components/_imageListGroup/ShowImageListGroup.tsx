"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { IMAGE } from "@/app/lib/constants";
import { FullData, MainParams } from "@/app/lib/definitions";
import { ScrollContainer } from "../__commonComponents/_scrollContainer/ScrollContainer";
import Image from "next/image";
import { DragEventHandler, useState } from "react";
import { AddTextDescriptionDeleteFeatureButtons } from "../__commonComponents/_buttons/AddTextDescriptionDeleteFeatureButtons";
import { UpdateDeleteTextButtons } from "../__commonComponents/_buttons/UpdateDeleteTextButtons";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  groupData: FullData[];
  countVisibleItems?: number;
  params: MainParams;
};

export const ShowImageListGroup = ({
  isEdit,
  staticTexts,
  groupData,
  countVisibleItems,
  params,
}: Props) => {
  const [lastAddedId, setLastAddedId] = useState<number | null>(null);

  const imagesData = groupData.filter((item) => item.text_type === IMAGE);

  const ids = imagesData.map((item) => item.text_description_id.toString());

  const getItem = ({ id, widthItem }: { id: string; widthItem?: number }) => {
    const imageData = imagesData.find(
      (item) => item.text_description_id.toString() === id
    );

    const value = imageData?.value;

    const preventDragHandler: DragEventHandler = (event) => {
      event.preventDefault();
    };
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <div
          style={{
            padding: "10px",
            width: "100%",
            height: widthItem ? `${widthItem}px` : widthItem,
          }}
        >
          <div
            style={{
              borderRadius: "10px",
              overflow: "hidden",
              width: "100%",
              height: "100%",
              position: "relative",
              border: value ? undefined : "1px solid lightgray",
            }}
          >
            {value ? (
              <Image
                src={value}
                layout="fill" // Fill the container
                objectFit="cover" // Make sure it covers the entire container
                quality={100} // Optional, for higher quality
                alt="image"
                draggable="false" // This directly disables drag-and-drop
                onDragStart={preventDragHandler} // Ensures additional prevention
              />
            ) : (
              <div
                style={{ width: "100%", padding: "30px", textAlign: "center" }}
              >
                {"No Image"}
              </div>
            )}
          </div>
        </div>

        {imageData && isEdit ? (
          <UpdateDeleteTextButtons
            staticTexts={staticTexts}
            currentData={imageData}
            s3Key={imageData.value}
            flexDirection="column"
            isChangeOrder
            isHorizontal
            params={params}
            useItems={{ value: "image" }}
          />
        ) : null}
      </div>
    );
  };

  const onTextDescriptionAdded = (newId: number) => {
    setLastAddedId(newId);
  };

  const onDeleteFinished = () => {
    setLastAddedId(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <ScrollContainer
        ids={ids}
        getItem={getItem}
        countVisibleItems={countVisibleItems}
        isEdit={isEdit}
        lastAddedId={lastAddedId}
      />

      {isEdit ? (
        <AddTextDescriptionDeleteFeatureButtons
          featureData={groupData}
          deleteButtonText={staticTexts.delete ?? "N/A"}
          addButtonText={staticTexts.addGroupItem ?? "N/A"}
          textDescriptionType={IMAGE}
          onTextDescriptionAdded={onTextDescriptionAdded}
          onDeleteFinished={onDeleteFinished}
        />
      ) : null}
    </div>
  );
};
