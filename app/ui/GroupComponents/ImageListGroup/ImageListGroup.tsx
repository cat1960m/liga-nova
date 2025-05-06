"use client";

import { IMAGE } from "@/app/lib/constants";
import { FullData, MainParams } from "@/app/lib/definitions";
import { ScrollContainer } from "@/app/ui/CommonComponents/ScrollContainer/ScrollContainer";
import { useRef, useState } from "react";
import { ItemContainerAddTextDescriptionDeleteFeature } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerAddTextDescriptionDeleteFeature";
import { getIsEditNoDelete } from "@/app/lib/utils";
import { ShowItem } from "./ShowItem/ShowItem";

export type Props = {
  groupData: FullData[];
  countVisibleItems?: number;
  params: MainParams;
};
// school of trainers and other
export const ShowImageListGroup = ({
  groupData,
  countVisibleItems,
  params,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [lastAddedId, setLastAddedId] = useState<number | null>(null);

  const imagesData = groupData.filter((item) => item.text_type === IMAGE);

  const ids = imagesData.map((item) => item.text_description_id.toString());

  const { lang, staticTexts } = params;
  const { isEdit, noDelete } = getIsEditNoDelete(params);

  const getItem = ({ id, widthItem }: { id: string; widthItem?: number }) => {
    const imageData = imagesData.find(
      (item) => item.text_description_id.toString() === id
    );

    if (!imageData) {
      return <> </>;
    }

    return (
      <ShowItem
        widthItem={widthItem}
        imageData={imageData}
        onDeleteFinished={onDeleteFinished}
        staticTexts={staticTexts}
        isEdit={isEdit}
        lang={lang}
      />
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
      isChangeOrderHorizontal={false}
      marginTop={20}
      noDelete={noDelete}
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
