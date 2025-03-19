"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { IMAGE } from "@/app/lib/constants";
import { FullData } from "@/app/lib/definitions";
import { usePathname } from "next/navigation";
import { ManageImages } from "../_clientComponents/ManageImages";
import { addTextDescription } from "@/app/lib/actions_fitness";
import { ScrollContainer } from "../_clientComponents/ScrollContainer/ScrollContainer";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  groupData: FullData[];
};

export const ShowImageListGroup_Client = ({
  isEdit,
  staticTexts,
  groupData,
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

  const getItem = (id: string) => {
    const value = imagesData.find(
      (item) => item.text_description_id.toString() === id
    )?.value;
    return <>{value ? <img src={value} /> : null}</>;
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
        <ScrollContainer ids={ids} getItem={getItem} />
      )}
    </>
  );
};
