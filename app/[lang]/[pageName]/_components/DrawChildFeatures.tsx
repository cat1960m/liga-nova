import { GROUP, GROUP1, GROUP2, TABS } from "@/app/lib/constants";
import { Feature, MainParams } from "@/app/lib/definitions";
import { ShowSimpleGroup } from "./ShowSimpleGroup";
import { getTabsTitles, getTextDescriptions } from "@/app/lib/actions_fitness";
import { ShowComplexGroup } from "./ShowComplexGroup";
import { ShowTabsAdmin } from "./ShowTabsAdmin";
import { getDictionary } from "../../dictionaries";
import { DrawFeatureContainer } from "./DrawFeatureContainer";
import { redirect } from "next/navigation";

export type Props = {
  childFeature: Feature;
  lang: string;
  params: MainParams;
  tabLevel: number;
};

export const DrawChildFeature = async ({
  childFeature,
  lang,
  params,
  tabLevel,
}: Props) => {
  const dict = await getDictionary(lang as "en" | "ua");

  if (childFeature.type === GROUP) {
    const textDescriptions = await getTextDescriptions({
      featureId: childFeature.id,
    });

    if (!textDescriptions?.length) {
      return null;
    }

    if ([GROUP1, GROUP2].includes(childFeature.subtype)) {
      const textDescription = textDescriptions[0]; //only 1 text in group

      return (
        <ShowSimpleGroup
          featureChild={childFeature}
          lang={lang}
          textDescriptionId={textDescription.id}
        />
      );
    } else {
      return <ShowComplexGroup featureChild={childFeature} lang={lang} />;
    }
  }

  if (childFeature.type === TABS) {
    console.log("-----tabs");
    const pageNameParts = params.pageName.split("_");
    const [pageName, ...pageTabFeatureIds] = pageNameParts;

    const tabTitles = await getTabsTitles({ tabsFeatureId: childFeature.id });
    console.log("-----tabTitles count", tabTitles?.length ?? 0);

    if (!tabTitles?.length) {
      return;
    }

    const selectedLevelTabFeatureId = pageTabFeatureIds[tabLevel];

    if (!selectedLevelTabFeatureId) {
      const newPageName = `${pageName}_${tabTitles[0].feature_id}`;
      redirect(`/${params.lang}/${newPageName}`);
    }

    return (
      <ShowTabsAdmin
        tabTitles={tabTitles ?? []}
        lang={lang}
        staticTexts={dict.common}
        tabsFeatureId={childFeature.id}
        params={params}
      >
        {tabTitles.map((tabTitle, index) => {
          return (
            <DrawFeatureContainer
              lang={lang}
              featureId={tabTitle.feature_id}
              key={tabTitle.id}
              title={`Tab ${index}`}
              params={params}
              tabLevel={tabLevel + 1}
            />
          );
        })}
      </ShowTabsAdmin>
    );
  }
  return <></>;
};
