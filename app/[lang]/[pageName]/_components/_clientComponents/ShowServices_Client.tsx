"use client";

import { SERVICE_ITEM } from "@/app/lib/constants";
import { getTextDescriptions } from "@/app/lib/actions_fitness";
import { GroupItemEditDelete_Client } from "./GroupItemEditDelete_Client";
import { TextDescription } from "@/app/lib/definitions";
import { useEffect, useState } from "react";

export type Props = {
  featureId: number;
  lang: string;
  groupType: string;
};

export const ShowServices_Client = ({ featureId, lang, groupType }: Props) => {
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

  return (
    <div
      style={{
        width: "100%",
        border: "1px solid gray",
        borderRadius: "10px",
        minHeight: "40px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {featureTextDescriptions.map((textDescription, index) => {
          return (
            <div
              style={{
                width: "100%",
                backgroundColor: !(index % 2) ? "pink" : "white",
                padding: "5px 20px",
              }}
              key={textDescription.id}
            >
              <GroupItemEditDelete_Client
                textDescription={textDescription}
                lang={lang}
                textType={SERVICE_ITEM}
                groupType={groupType}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
