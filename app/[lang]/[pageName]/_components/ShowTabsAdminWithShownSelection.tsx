import { getTabsTitles } from "@/app/lib/actions_fitness";
import { MainParams } from "@/app/lib/definitions";
import { redirect } from "next/navigation";
import { ShowTabsAdmin } from "./ShowTabsAdmin";
import { DrawFeatureContainer } from "./DrawFeatureContainer";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { SHOW_TABS_WITH_SELECTION } from "@/app/lib/constants";

export type Props = {
  params: MainParams;
  staticTexts: StaticTexts;
  tabLevel: number;
  tabsFeatureId: number;
};

export const ShowTabsAdminWithShownSelection = async ({
  params,
  staticTexts,
  tabLevel,
  tabsFeatureId,
}: Props) => {
  const tabTitles = await getTabsTitles({ tabsFeatureId });
  if (!tabTitles?.length) {
    return;
  }

  const pageNameParts = params.pageName.split("_");
  const [pageNameOnly, ...pageTabFeatureIds] = pageNameParts;
  const selectedLevelTabFeatureId = pageTabFeatureIds[tabLevel];

  if (!selectedLevelTabFeatureId) {
    pageTabFeatureIds.push(tabTitles[0].feature_id.toString());
    const newParts = pageTabFeatureIds.join("_");
    const newPageName = `${pageNameOnly}_${newParts}`;
    redirect(`/${params.lang}/${newPageName}`);
  }

  return (
    <div style={{ border: "4px dashed magenta" }}>
      <ShowTabsAdmin
        tabTitles={tabTitles ?? []}
        staticTexts={staticTexts}
        tabsFeatureId={tabsFeatureId}
        params={params}
        tabLevel={tabLevel}
      />

      <div style={{ padding: "10px" }}>
        <DrawFeatureContainer
          featureId={parseInt(selectedLevelTabFeatureId)}
          title={`SELECTED TAB ${selectedLevelTabFeatureId}`}
          params={params}
          tabLevel={tabLevel + 1}
          staticTexts={staticTexts}
        />
      </div>
    </div>
  );
};
