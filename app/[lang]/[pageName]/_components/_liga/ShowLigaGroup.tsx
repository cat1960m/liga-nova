"use client";

import { FullData, MainParams, PageData } from "@/app/lib/definitions";
import {
  GRAY_BACKGROUND_COLOR,
  LIGA_ADDRESS,
  LIGA_SERVICE,
  LIGA_TELEPHONE,
  LIGA_TITLE,
} from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ShowLigaGroupItem } from "./ShowLigaGroupItem";
import { getPageTitles } from "@/app/lib/actions_fitness";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./showListGRoup.module.css";
import { ItemContainerAddTextDescriptionDeleteFeature } from "../__commonComponents/_itemGroupContainer/ItemContainerAddTextDescriptionDeleteFeature";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  groupData: FullData[];
  params: MainParams;
};

export const ShowLigaGroup = ({
  isEdit,
  staticTexts,
  groupData,
  params,
}: Props) => {
  const [pages, setPages] = useState<PageData[] | null>(null);

  const getPages = async () => {
    const pages1 = await getPageTitles(params.lang);

    setPages(pages1?.map((page) => page) ?? []);
  };

  useEffect(() => {
    getPages();
  }, []);

  const dataTitle = groupData.find((item) => item.text_type === LIGA_TITLE);

  const dataTelephone = groupData.find(
    (item) => item.text_type === LIGA_TELEPHONE
  );

  const dataAddress = groupData.find((item) => item.text_type === LIGA_ADDRESS);

  const dataServiceList = groupData.filter(
    (item) => item.text_type === LIGA_SERVICE
  );

  const commonProps = {
    isEdit,
    staticTexts,
    params,
  };

  return (
    <ItemContainerAddTextDescriptionDeleteFeature
      deleteButtonText={staticTexts.delete ?? "N/A"}
      featureData={groupData}
      addButtonText={staticTexts.addGroupItem ?? "N/A"}
      textDescriptionType={LIGA_SERVICE}
      isEdit={isEdit}
      isChangeOrderHorizontal={false}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
          borderRadius: "10px",
          backgroundColor: GRAY_BACKGROUND_COLOR,
          border: "1px dotted lightgray",
          padding: "10px",
        }}
      >
        <ShowLigaGroupItem {...commonProps} data={dataTitle} />
        <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
          <ShowLigaGroupItem {...commonProps} data={dataAddress} />

          <ShowLigaGroupItem {...commonProps} data={dataTelephone} />
        </div>

        {isEdit
          ? dataServiceList.map((item, index) => {
              return (
                <div key={item.text_content_id ?? "" + "_" + index}>
                  <ShowLigaGroupItem {...commonProps} data={item} />
                </div>
              );
            })
          : null}

        {!isEdit ? (
          <div className={styles.list}>
            {dataServiceList.map((item, index) => {
              return (
                <div
                  key={item.text_content_id ?? "" + "_" + index}
                  className={styles.item}
                >
                  {item.link ? (
                    <Link href={`/${params.lang}/${item.link}`}>
                      <ShowLigaGroupItem {...commonProps} data={item} />
                    </Link>
                  ) : (
                    <ShowLigaGroupItem {...commonProps} data={item} />
                  )}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </ItemContainerAddTextDescriptionDeleteFeature>
  );
};
