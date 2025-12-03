import { FullData } from "@/app/lib/definitions";

import { ItemContainerUpdateDeleteTextDescription } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import { CountIndex, StaticTexts } from "@/app/dictionaries/definitions";
import { ShowTitle } from "./ShowTitle";

export type Props = {
  title: FullData;
  color: string;
  isEdit: boolean;
  staticTexts: StaticTexts;
  lang: string;
  countIndex: CountIndex | null;
};

export const WrappingShowTitle = ({ isEdit, title, color, staticTexts, lang, countIndex }: Props) => {

  return (
    <ItemContainerUpdateDeleteTextDescription
      currentData={title}
      useItems={{ text: "simple" }}
      isEdit={isEdit}
      staticTexts={staticTexts}
      isChangeOrder={false}
      lang={lang}
      countIndex={countIndex}

    >
      <ShowTitle isEdit={isEdit} title={title?.text_content ?? "N/A"} color={color}/>
    </ItemContainerUpdateDeleteTextDescription>
  );
};
