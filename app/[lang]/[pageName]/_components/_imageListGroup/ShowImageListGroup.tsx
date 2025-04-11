"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { IMAGE } from "@/app/lib/constants";
import { FullData } from "@/app/lib/definitions";
import { usePathname } from "next/navigation";
import { ManageImages } from "../_clientComponents/ManageImages";
import { addTextDescription } from "@/app/lib/actions_fitness";
import { ScrollContainer } from "../_clientComponents/ScrollContainer/ScrollContainer";
import Image from "next/image";
import { DragEventHandler } from "react";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  groupData: FullData[];
  countVisibleItems?: number;
};

export const ShowImageListGroup = ({
  isEdit,
  staticTexts,
  groupData,
  countVisibleItems,
}: Props) => {
  const featureId = groupData[0]?.id;
  const pathName = usePathname();

  const imagesData = groupData.filter((item) => item.text_type === IMAGE);

  const handleImageUploaded = (value: string) => {
    if (!pathName) {
      return;
    }

    addTextDescription({
      featureId,
      textType: IMAGE,
      canDelete: true,
      pathName,
      price: null,
      value,
    });
  };

  if (!featureId) {
    return null;
  }

  const ids = imagesData.map((item) => item.text_description_id.toString());

  const getItem = ({ id, widthItem }: { id: string; widthItem?: number }) => {
    const value = imagesData.find(
      (item) => item.text_description_id.toString() === id
    )?.value;

    const preventDragHandler: DragEventHandler = (event) => {
      event.preventDefault();
    };
    return (
      <>
        {value ? (
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
              }}
            >
              <Image
                src={value}
                layout="fill" // Fill the container
                objectFit="cover" // Make sure it covers the entire container
                quality={100} // Optional, for higher quality
                alt="image"
                draggable="false" // This directly disables drag-and-drop
                onDragStart={preventDragHandler} // Ensures additional prevention
              />
            </div>
          </div>
        ) : null}
      </>
    );
  };

  return (
    <>
      {isEdit ? (
        <ManageImages
          imagesData={imagesData}
          onImageUpload={handleImageUploaded}
          staticTexts={staticTexts}
          isImageGroup
        />
      ) : (
        <ScrollContainer
          ids={ids}
          getItem={getItem}
          countVisibleItems={countVisibleItems}
        />
      )}
    </>
  );
};
