"use client";

import { FullData, MainParams, PageData } from "@/app/lib/definitions";
import {
  GRAY_BACKGROUND_COLOR,
  IMAGE,
  INFO_ADDRESS,
  INFO_BODY,
  INFO_TELEPHONE,
  INFO_TITLE,
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
import { Pages } from "./Pages";
import { useEffect, useState } from "react";
import styles from "./showListGRoup.module.css";

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

  useEffect(() => {
    const getPages = async () => {
      const pages1 = await getPageTitles(params.lang);

      setPages(pages1?.map((page) => page) ?? []);
    };

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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
        borderRadius: "10px",
        backgroundColor: GRAY_BACKGROUND_COLOR,
        border: isEdit ? "1px dotted magenta" : undefined,
        padding: "20px",
      }}
    >
      <ShowLigaGroupItem
        isEdit={isEdit}
        staticTexts={staticTexts}
        data={dataTitle}
      />
      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        <ShowLigaGroupItem
          isEdit={isEdit}
          staticTexts={staticTexts}
          data={dataAddress}
        />

        <ShowLigaGroupItem
          isEdit={isEdit}
          staticTexts={staticTexts}
          data={dataTelephone}
        />
      </div>

      {isEdit
        ? dataServiceList.map((item, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
                key={item.text_content_id ?? "" + "_" + index}
              >
                <ShowLigaGroupItem
                  isEdit={isEdit}
                  staticTexts={staticTexts}
                  data={item}
                />

                <div>{staticTexts.linkTo} </div>

                <Pages
                  params={params}
                  textDescriptionId={item.text_description_id}
                  link={item.link ?? ""}
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
                    <ShowLigaGroupItem
                      isEdit={isEdit}
                      staticTexts={staticTexts}
                      data={item}
                    />
                  </Link>
                ) : (
                  <ShowLigaGroupItem
                    isEdit={isEdit}
                    staticTexts={staticTexts}
                    data={item}
                  />
                )}
              </div>
            );
          })}
        </div>
      ) : null}

      {isEdit ? (
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <AddTextDescriptionButton
            featureId={featureId}
            buttonText={staticTexts.addGroupItem ?? "N/A"}
            textType={LIGA_SERVICE}
            price={null}
          />
        </div>
      ) : null}
    </div>
  );
};
