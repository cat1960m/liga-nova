import {
  GROUP,
  GROUP1,
  GROUP2,
  GROUP_2COLUMNS_2HEADERS,
} from "@/app/lib/constants";
import { FeatureChild, TextContent } from "@/app/lib/definitions";
import { ShowSimpleGroup } from "./ShowSimpleGroup";
import {
  getFeatureChildTexts,
  getTextDescriptions,
} from "@/app/lib/actions_fitness";

export const DrawChild = async ({
  child,
  lang,
}: {
  child: FeatureChild;
  lang: string;
}) => {
  if (child.type === GROUP) {
    const textDescriptions = await getTextDescriptions({
      featureChildId: child.id,
    });

    if (!textDescriptions?.length) {
      return null;
    }

    if ([GROUP1, GROUP2].includes(child.subtype)) {
      const textDescription = textDescriptions[0]; //only 1 text in group
      const texts: TextContent[] | null = await getFeatureChildTexts({
        text_description_id: textDescription.id,
      });

      return (
        <ShowSimpleGroup
          featureChild={child}
          lang={lang}
          textContents={texts ?? []}
          textDescriptionId={textDescription.id}
        />
      );
    }

    if (child.subtype === GROUP_2COLUMNS_2HEADERS) {
    }
  }
  return <></>;
};
