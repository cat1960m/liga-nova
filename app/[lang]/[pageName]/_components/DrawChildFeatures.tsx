import {
  GROUP,
  GROUP1,
  GROUP2,
  SHOW_TABS_WITH_SELECTION,
  TABS,
} from "@/app/lib/constants";
import { Feature, MainParams } from "@/app/lib/definitions";
import { ShowSimpleGroup } from "./ShowSimpleGroup";
import { getTextDescriptions } from "@/app/lib/actions_fitness";
import { ShowComplexGroup } from "./ShowComplexGroup";
import { getDictionary } from "../../dictionaries";
import { ShowTabsAdminWithShownSelection } from "./ShowTabsAdminWithShownSelection";
import { ShowTabsAdminUsingContainer } from "./ShowTabsAdminUsingContainer";

export type Props = {
  childFeature: Feature;
  params: MainParams;
  tabLevel: number;
};

export const DrawChildFeature = async ({
  childFeature,
  params,
  tabLevel,
}: Props) => {
  const dict = await getDictionary(params.lang as "en" | "ua");

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
          lang={params.lang}
          textDescriptionId={textDescription.id}
        />
      );
    } else {
      return (
        <ShowComplexGroup featureChild={childFeature} lang={params.lang} />
      );
    }
  }

  if (childFeature.type === TABS) {
    return SHOW_TABS_WITH_SELECTION ? (
      <ShowTabsAdminWithShownSelection
        params={params}
        tabsFeatureId={childFeature.id}
        tabLevel={tabLevel}
        staticTexts={dict.common}
      />
    ) : (
      <ShowTabsAdminUsingContainer
        params={params}
        tabsFeatureId={childFeature.id}
        tabLevel={tabLevel}
        staticTexts={dict.common}
      />
    );
  }
  return <></>;
};
