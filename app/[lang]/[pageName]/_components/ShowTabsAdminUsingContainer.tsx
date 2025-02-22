import { getTabsTitles } from "@/app/lib/actions_fitness";
import { MainParams } from "@/app/lib/definitions";
import { DrawFeatureContainer } from "./DrawFeatureContainer";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ShowTabsAdminContainer } from "./ShowTabsAdminContainer";

export type Props = {
  params: MainParams;
  staticTexts: StaticTexts;
  tabLevel: number;
  tabsFeatureId: number;
};

export const ShowTabsAdminUsingContainer = async ({
  params,
  staticTexts,
  tabLevel,
  tabsFeatureId,
}: Props) => {
  const tabTitles = await getTabsTitles({ tabsFeatureId });

  if (!tabTitles?.length) {
    return;
  }

  return (
    <div style={{ border: "4px dashed magenta" }}>
      <ShowTabsAdminContainer
        tabTitles={tabTitles ?? []}
        staticTexts={staticTexts}
        tabsFeatureId={tabsFeatureId}
        params={params}
        tabLevel={tabLevel}
      >
        {tabTitles.map((tabTitle, index) => {
          return (
            <DrawFeatureContainer
              featureId={tabTitle.feature_id}
              key={tabTitle.id}
              title={`Tab ${index}`}
              params={params}
              tabLevel={tabLevel + 1}
              staticTexts={staticTexts}
            />
          );
        })}
      </ShowTabsAdminContainer>
    </div>
  );
};
