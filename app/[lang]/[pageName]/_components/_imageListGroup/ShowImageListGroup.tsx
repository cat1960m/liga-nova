"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { IMAGE } from "@/app/lib/constants";
import { FullData, MainParams } from "@/app/lib/definitions";
import { ScrollContainer } from "../__commonComponents/_scrollContainer/ScrollContainer";
import { ShowItem } from "./ShowItem";
import { ItemContainerUpdateDeleteTextDescription } from "../__commonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import { useRef, useState } from "react";
import { ItemContainerAddTextDescriptionDeleteFeature } from "../__commonComponents/_itemGroupContainer/ItemContainerAddTextDescriptionDeleteFeature";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  groupData: FullData[];
  countVisibleItems?: number;
  params: MainParams;
};
// school of trainers and other
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

    if (!imageData) {
      return <> </>;
    }

    return (
      <div
        style={{
          padding: "10px",
          width: "100%",
        }}
      >
        <ItemContainerUpdateDeleteTextDescription
          isEdit={isEdit}
          useItems={{ value: "image" }}
          staticTexts={staticTexts}
          s3Key={imageData.value}
          onDeleteFinished={onDeleteFinished}
          params={params}
          currentData={imageData}
        >
          <ShowItem widthItem={widthItem} imageData={imageData} />
        </ItemContainerUpdateDeleteTextDescription>
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
    <ItemContainerAddTextDescriptionDeleteFeature
      isEdit={isEdit}
      featureData={groupData}
      deleteButtonText={staticTexts.delete ?? "N/A"}
      addButtonText={staticTexts.addGroupItem ?? "N/A"}
      textDescriptionType={IMAGE}
      onTextDescriptionAdded={onTextDescriptionAdded}
    >
      <div ref={ref}>
        {ids.length ? (
          <ScrollContainer
            ids={ids}
            getItem={getItem}
            countVisibleItems={countVisibleItems}
            lastAddedId={lastAddedId}
            refParent={ref}
          />
        ) : null}
      </div>
    </ItemContainerAddTextDescriptionDeleteFeature>
  );
};
