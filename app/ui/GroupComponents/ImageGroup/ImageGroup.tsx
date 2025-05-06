"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { IMAGE } from "@/app/lib/constants";
import { ItemContainerUpdateTextDescriptionDeleteFeature } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateTextDescriptionDeleteFeature";
import { getIsEditNoDelete } from "@/app/lib/utils";

import styles from "./imageGroup.module.css";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export type Props = {
  groupData: FullData[];
  params: MainParams;
};

export const ShowImageGroup = ({ groupData, params }: Props) => {
  const refImageContainer = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (height) {
      return;
    }
    const rect = refImageContainer.current?.getBoundingClientRect();

    if (rect && rect.height) {
      setHeight(rect.width);
    }
  }, []);

  const imageData = groupData.find((item) => item.text_type === IMAGE);
  if (!imageData) {
    return;
  }

  const { staticTexts, lang } = params;
  const { isEdit, noDelete } = getIsEditNoDelete(params);

  return (
    <ItemContainerUpdateTextDescriptionDeleteFeature
      currentData={imageData}
      useItems={{
        value: "image",
      }}
      staticTexts={staticTexts}
      lang={lang}
      isEdit={isEdit}
      featureData={groupData}
      isChangeOrderHorizontal={false}
      marginTop={0}
      noDelete={noDelete}
    >
      {imageData?.value ? (
        <div className={styles.container} ref={refImageContainer}>
          <div className={styles.body} style={{ height }}>
            {height}
            {height ? (
              <Image
                src={imageData?.value}
                alt=""
                className={styles.image}
                fill
              />
            ) : null}
          </div>
        </div>
      ) : (
        <div>{"No file"}</div>
      )}
    </ItemContainerUpdateTextDescriptionDeleteFeature>
  );
};
