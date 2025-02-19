import { GROUP, GROUP1, GROUP2 } from "@/app/lib/constants";
import { FeatureChild } from "@/app/lib/definitions";
import { ShowSimpleGroup } from "./ShowSimpleGroup";
import { getTextDescriptions } from "@/app/lib/actions_fitness";
import { ShowComplexGroup } from "./ShowComplexGroup";

export const DrawChild = async ({
  child,
  lang,
}: {
  child: FeatureChild;
  lang: string;
}) => {
  if (child.type === GROUP) {
    const textDescriptions = await getTextDescriptions({
      featureId: child.id,
    });

    if (!textDescriptions?.length) {
      return null;
    }

    if ([GROUP1, GROUP2].includes(child.subtype)) {
      const textDescription = textDescriptions[0]; //only 1 text in group

      return (
        <ShowSimpleGroup
          featureChild={child}
          lang={lang}
          textDescriptionId={textDescription.id}
        />
      );
    } else {
      return <ShowComplexGroup featureChild={child} lang={lang} />;
    }
  }
  return <></>;
};
