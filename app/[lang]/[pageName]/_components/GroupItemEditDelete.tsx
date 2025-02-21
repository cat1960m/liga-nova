import { TextDescription } from "@/app/lib/definitions";
import { UpdateTextDescriptionData } from "./_clientComponents/UpdateTextDescriptionData";
import { DeleteTextDescriptionButton } from "./_clientComponents/DeleteTextDescriptionButton";
import {
  GROUP_2COLUMNS_2HEADERS,
  GROUP_TYPES_WITH_TOOLTIP,
  SERVICES,
  TOOLTIP,
} from "@/app/lib/constants";
import { getTextContents } from "@/app/lib/actions_fitness";
import { getDictionary } from "../../dictionaries";
import { ShowGroupColumnText } from "./ShowGroupColumnText";
import { ShowGroupServicesText } from "./ShowGroupServicesText";

export type Props = {
  textDescription: TextDescription;
  lang: string;
  textType: string;
  groupType: string;
};

export const GroupItemEditDelete = async ({
  textDescription,
  lang,
  textType,
  groupType,
}: Props) => {
  const isTooltipUsed = GROUP_TYPES_WITH_TOOLTIP.includes(groupType);
  const textContentsAll = await getTextContents({
    text_description_id: textDescription.id,
  });

  const textContents =
    textContentsAll?.filter(
      (textContent) => textContent.content_type !== TOOLTIP
    ) ?? null;

  const textContentsTooltip = isTooltipUsed
    ? textContentsAll?.filter(
        (textContent) => textContent.content_type === TOOLTIP
      ) ?? null
    : null;

  const dict = await getDictionary(lang as "en" | "ua"); // en

  const canDelete = textDescription.can_delete;
  const isGroupColumns = groupType === GROUP_2COLUMNS_2HEADERS;
  const isServices = groupType === SERVICES;

  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}
    >
      {isGroupColumns ? (
        <ShowGroupColumnText
          textContents={textContents}
          lang={lang}
          textType={textType}
        />
      ) : null}

      {isServices ? (
        <ShowGroupServicesText
          textContents={textContents}
          textContentsTooltip={textContentsTooltip}
          lang={lang}
          textType={textType}
          price={textDescription.price ?? 0}
        />
      ) : null}

      <UpdateTextDescriptionData
        textContents={textContents ?? []}
        textContentsTooltip={textContentsTooltip}
        textDescriptionId={textDescription.id}
        staticTexts={dict.common}
        currentPrice={textDescription.price}
        isTooltipUsed={isTooltipUsed}
      />
      {canDelete ? (
        <DeleteTextDescriptionButton
          textDescriptionId={textDescription.id}
          deleteText={dict.common.delete}
        />
      ) : null}
    </div>
  );
};
