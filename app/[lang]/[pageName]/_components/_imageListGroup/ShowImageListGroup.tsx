"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { IMAGE } from "@/app/lib/constants";
import { FullData, MainParams } from "@/app/lib/definitions";
import { ScrollContainer } from "../__commonComponents/_scrollContainer/ScrollContainer";
import Image from "next/image";
import { DragEventHandler, useRef, useState } from "react";
import { AddTextDescriptionDeleteFeatureButtons } from "../__commonComponents/_buttons/AddTextDescriptionDeleteFeatureButtons";
import { UpdateDeleteTextButtons } from "../__commonComponents/_buttons/UpdateDeleteTextButtons";
import { ShowItem } from "./ShowItem";

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
  const ref = useRef<HTMLDivElement>(null);
  const [lastAddedId, setLastAddedId] = useState<number | null>(null);

  const imagesData = groupData.filter((item) => item.text_type === IMAGE);

  const ids = imagesData.map((item) => item.text_description_id.toString());

  const getItem = ({ id, widthItem }: { id: string; widthItem?: number }) => {
    const imageData = imagesData.find(
      (item) => item.text_description_id.toString() === id
    );

    return (
      <div
        style={{
          padding: "10px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            border: isEdit ? "1px dotted magenta" : undefined,
            padding: isEdit ? "30px 10px 10px 10px" : undefined,
            position: "relative",
            marginTop: isEdit ? "24px" : 0,
          }}
        >
          {imageData ? (
            <ShowItem widthItem={widthItem} imageData={imageData} />
          ) : null}

          {imageData && isEdit ? (
            <div
              style={{
                position: "absolute",
                top: "-24px",
                left: 0,
                right: 0,
                height: "48px",
              }}
            >
              <UpdateDeleteTextButtons
                staticTexts={staticTexts}
                currentData={imageData}
                s3Key={imageData.value}
                isChangeOrder
                isHorizontal
                params={params}
                useItems={{ value: "image" }}
                onDeleteFinished={onDeleteFinished}
              />
            </div>
          ) : null}
        </div>
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
    <div
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      ref={ref}
    >
      <ScrollContainer
        ids={ids}
        getItem={getItem}
        countVisibleItems={countVisibleItems}
        lastAddedId={lastAddedId}
        refParent={ref}
      />

      {isEdit ? (
        <AddTextDescriptionDeleteFeatureButtons
          featureData={groupData}
          deleteButtonText={staticTexts.delete ?? "N/A"}
          addButtonText={staticTexts.addGroupItem ?? "N/A"}
          textDescriptionType={IMAGE}
          onTextDescriptionAdded={onTextDescriptionAdded}
        />
      ) : null}
    </div>
  );
};
