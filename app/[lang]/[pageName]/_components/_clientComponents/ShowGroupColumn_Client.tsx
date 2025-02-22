"use client";

import { getTextDescriptions } from "@/app/lib/actions_fitness";
import { useEffect, useState } from "react";
import { TextDescription } from "@/app/lib/definitions";
import { AddColumnItemButton } from "./AddColumnItemButton";
import { GroupItemEditDelete_Client } from "./GroupItemEditDelete_Client";
import { StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  featureId: number;
  lang: string;
  headerType: string;
  columnItemType: string;
  groupType: string;
};

export const ShowGroupColumn_Client = ({
  featureId,
  lang,
  headerType,
  columnItemType,
  groupType,
}: Props) => {
  const [featureTextDescriptions, setFeatureTextDescriptions] = useState<
    TextDescription[] | null
  >(null);

  useEffect(() => {
    const getDescriptions = async () => {
      const featureDescriptions = await getTextDescriptions({
        featureId: featureId,
      });

      setFeatureTextDescriptions(featureDescriptions);
    };

    getDescriptions();
  }, []);

  if (!featureTextDescriptions) {
    return null;
  }

  const getTypeTextDescriptions = (type: string) => {
    return featureTextDescriptions.filter((item) => item.text_type === type);
  };

  const headerTextDescriptions = getTypeTextDescriptions(headerType);
  const columnTextDescriptions = getTypeTextDescriptions(columnItemType);

  return (
    <>
      {headerTextDescriptions.length ? (
        <GroupItemEditDelete_Client
          textDescription={headerTextDescriptions[0]}
          lang={lang}
          textType={headerType}
          groupType={groupType}
        />
      ) : null}

      {columnTextDescriptions.map((textDescription) => {
        return (
          <GroupItemEditDelete_Client
            textDescription={textDescription}
            lang={lang}
            key={textDescription.id}
            textType={columnItemType}
            groupType={groupType}
          />
        );
      })}
    </>
  );
};
