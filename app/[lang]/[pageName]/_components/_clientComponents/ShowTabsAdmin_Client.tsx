"use client";

import { MainParams, TextDescription } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import { getTabsTitles } from "@/app/lib/actions_fitness";
import { AddTabButton } from "./AddTabButton";
import { DeleteTabsButton } from "./DeleteTabsButton";
import { ShowTabTitleAdmin_Client } from "./ShowTabTitleAdmin_CLient";
import { DrawFeatureContainer_Client } from "./DrawFeatureContainer_Client";
import { StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  lang: string;
  tabsFeatureId: number;
  params: MainParams;
  tabLevel: number;
};

export const ShowTabsAdmin_Client = ({
  lang,
  tabsFeatureId,
  params,
  tabLevel,
}: Props) => {
  const [tabTitles, setTabTitles] = useState<TextDescription[] | null>(null);
  const [selectedTabFeatureId, setSelectedTabFeatureId] = useState<
    number | null
  >(null);

  useEffect(() => {
    const getTitles = async () => {
      const titles = await getTabsTitles({ tabsFeatureId });

      setTabTitles(titles ?? []);

      if (titles?.length) {
        setSelectedTabFeatureId(titles[0].feature_id);
      }
    };

    getTitles();
  }, []);

  if (!tabTitles) {
    return null;
  }

  return (
    <div style={{ border: "4px dashed magenta" }}>
      <div style={{ border: "1px dotted lightgray", width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            width: "100%",
            padding: "40px",
            alignItems: "center",
          }}
        >
          {tabTitles.map((tabTitle, index) => {
            return (
              <div key={tabTitle.id}>
                <ShowTabTitleAdmin_Client
                  tabTitleTextDescription={tabTitle}
                  lang={lang}
                  selectedTabFeatureId={selectedTabFeatureId}
                  setSelectedTabFeatureId={setSelectedTabFeatureId}
                />
              </div>
            );
          })}
        </div>

        {selectedTabFeatureId ? (
          <DrawFeatureContainer_Client
            lang={lang}
            featureId={selectedTabFeatureId}
            title={`TAB ${selectedTabFeatureId}`}
            params={params}
            tabLevel={tabLevel + 1}
          />
        ) : null}
      </div>
    </div>
  );
};
