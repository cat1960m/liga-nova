"use client";

import { GROUP, GROUP1, GROUP2, TABS } from "@/app/lib/constants";
import { Feature, MainParams } from "@/app/lib/definitions";
import { ShowSimpleGroup_Client } from "./ShowSimpleGroup_Client";
import { ShowComplexGroup_Client } from "./ShowComplexGroup_Client";
import { ShowTabsAdmin_Client } from "./ShowTabsAdmin_Client";

export type Props = {
  childFeature: Feature;
  lang: string;
  params: MainParams;
  tabLevel: number;
};

export const DrawChildFeature_Client = ({
  childFeature,
  lang,
  params,
  tabLevel,
}: Props) => {
  if (childFeature.type === GROUP) {
    if ([GROUP1, GROUP2].includes(childFeature.subtype)) {
      return <ShowSimpleGroup_Client featureChild={childFeature} lang={lang} />;
    } else {
      return (
        <ShowComplexGroup_Client featureChild={childFeature} lang={lang} />
      );
    }
  }

  if (childFeature.type === TABS) {
    return (
      <ShowTabsAdmin_Client
        lang={lang}
        tabsFeatureId={childFeature.id}
        params={params}
        tabLevel={tabLevel}
      />
    );
  }
  return <></>;
};
