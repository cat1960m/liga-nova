import { FullData } from "@/app/lib/definitions";

import { ItemContainerUpdateDeleteTextDescription } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ShowDescription } from "./ShowDescription";

export type Props = {
  isEdit: boolean;
  lang: string;
  staticTexts: StaticTexts;
  description: FullData;
  color: string;
};

export const WrappingShowDescription = ({
  staticTexts,
  isEdit,
  lang,
  description,
  color,
}: Props) => {
  return (
    <ItemContainerUpdateDeleteTextDescription
      currentData={description}
      useItems={{ text: "quill" }}
      isEdit={isEdit}
      staticTexts={staticTexts}
      lang={lang}
      isChangeOrder={false}
      countIndex={null}
    >
      <ShowDescription
        isEdit={isEdit}
        description={description?.text_content ?? "N/A"}
        color={color}
      />
    </ItemContainerUpdateDeleteTextDescription>
  );
};
