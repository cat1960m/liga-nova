"use client";

import { FullData, MainParams, PageData } from "@/app/lib/definitions";
import {
  LIGA_ADDRESS,
  LIGA_SERVICE,
  LIGA_TELEPHONE,
  LIGA_TITLE,
} from "@/app/lib/constants";
import { LigaGroupItem } from "./LigaGroupItem/LigaGroupItem";
import { getPageTitles } from "@/app/lib/actions_fitness";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./ligaGroup.module.css";
import { ItemContainerAddTextDescriptionDeleteFeature } from "../__commonComponents/_itemGroupContainer/ItemContainerAddTextDescriptionDeleteFeature";

export type Props = {
  groupData: FullData[];
  params: MainParams;
};

export const LigaGroup = ({ groupData, params }: Props) => {
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

  const { staticTexts, isEdit } = params;

  return (
    <ItemContainerAddTextDescriptionDeleteFeature
      deleteButtonText={staticTexts.delete ?? "N/A"}
      featureData={groupData}
      addButtonText={staticTexts.addGroupItem ?? "N/A"}
      textDescriptionType={LIGA_SERVICE}
      isEdit={isEdit}
      isChangeOrderHorizontal={false}
      marginTop={20}
    >
      <div className={styles.container}>
        <LigaGroupItem params={params} data={dataTitle} />
        <div className={styles.group}>
          <LigaGroupItem params={params} data={dataAddress} />

          <LigaGroupItem params={params} data={dataTelephone} />
        </div>

        {isEdit
          ? dataServiceList.map((item, index) => {
              return (
                <div key={item.text_content_id ?? "" + "_" + index}>
                  <LigaGroupItem params={params} data={item} />
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
                      <LigaGroupItem params={params} data={item} />
                    </Link>
                  ) : (
                    <LigaGroupItem params={params} data={item} />
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
