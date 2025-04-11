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
import { AddTextDescriptionButton } from "../_buttons/AddTextDescriptionButton";
import { getPageTitles } from "@/app/lib/actions_fitness";
import Link from "next/link";
import { PagesSelect } from "./PagesSelect";
import { useEffect, useState } from "react";
import styles from "./showListGRoup.module.css";
import { DeleteFeatureButton } from "../_buttons/DeleteFeatureButton";
import { AddTextDescriptionDeleteFeatureButtons } from "../_buttons/AddTextDescriptionDeleteFeatureButtons";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  groupData: FullData[];
  params: MainParams;
  parentFeatureId: number;
};

export const ShowLigaGroup = ({
  isEdit,
  staticTexts,
  groupData,
  params,
  parentFeatureId,
}: Props) => {
  const [pages, setPages] = useState<PageData[] | null>(null);

  const getPages = async () => {
    const pages1 = await getPageTitles(params.lang);

    setPages(pages1?.map((page) => page) ?? []);
  };

  useEffect(() => {
    getPages();
  }, []);

  const featureId = groupData[0]?.id;

  const dataTitle = groupData.find((item) => item.text_type === LIGA_TITLE);

  const dataTelephone = groupData.find(
    (item) => item.text_type === LIGA_TELEPHONE
  );

  const dataAddress = groupData.find((item) => item.text_type === LIGA_ADDRESS);

  const dataServiceList = groupData.filter(
    (item) => item.text_type === LIGA_SERVICE
  );

  if (!featureId) {
    return null;
  }

  const onLinkUpdated = () => {
    getPages();
  };

  const commonProps = {
    isEdit,
    staticTexts,
    onLinkUpdated,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
          borderRadius: "10px",
          backgroundColor: GRAY_BACKGROUND_COLOR,
          border: isEdit ? "1px dotted magenta" : undefined,
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
                  <ShowLigaGroupItem
                    {...commonProps}
                    data={item}
                    pages={pages}
                  />
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
      {isEdit ? (
        <AddTextDescriptionDeleteFeatureButtons
          featureId={featureId}
          deleteButtonText={staticTexts.delete ?? "N/A"}
          featureData={groupData}
          parentFeatureId={parentFeatureId}
          addButtonText={staticTexts.addGroupItem ?? "N/A"}
          textDescriptionType={LIGA_SERVICE}
        />
      ) : null}
    </div>
  );
};
