"use client";

import { getFeatureChildren } from "@/app/lib/actions_fitness";
import { Feature, MainParams } from "@/app/lib/definitions";
import { DrawChildFeature_Client } from "./DrawChildFeatures_Client";
import { auth } from "@/app/auth";
import { useEffect, useMemo, useState } from "react";
import { AddChildFeatureToContainer } from "./AddChildFeatureToContainer";
import { StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  featureId: number;
  lang: string;
  title?: string;
  params: MainParams;
  tabLevel: number;
};

export const DrawFeatureContainer_Client = ({
  featureId,
  lang,
  title,
  params,
  tabLevel,
}: Props) => {
  const [childrenFeatures, setChildrenFeatures] = useState<Feature[] | null>(
    null
  );

  useEffect(() => {
    const getChildFeatures = async () => {
      const features: Feature[] | null = await getFeatureChildren({
        parentFeatureId: featureId,
      });

      setChildrenFeatures(features ?? []);
    };

    getChildFeatures();
  }, [featureId]);

  if (!childrenFeatures) {
    return null;
  }

  return (
    <div
      style={{
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        border: "2px dotted magenta",
        width: "100%",
        minHeight: "40px",
      }}
    >
      {title ?? null}
      {childrenFeatures.map((child) => {
        return (
          <DrawChildFeature_Client
            childFeature={child}
            lang={lang}
            key={child.id}
            params={params}
            tabLevel={tabLevel}
          />
        );
      })}
    </div>
  );
};
