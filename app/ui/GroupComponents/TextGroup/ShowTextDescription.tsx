import { FullData } from "@/app/lib/definitions";
import { DEFAULT_TEXT } from "@/app/lib/constants";
import { ItemContainerUpdateDeleteTextDescription } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import { StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  item: FullData;
    isEdit: boolean;
    lang: string;
    staticTexts: StaticTexts;
  
};

export const ShowTextDescription = ({ item, isEdit, staticTexts, lang }: Props) => {
  return (
    <ItemContainerUpdateDeleteTextDescription
      key={item.text_description_id}
      useItems={{ text: "quill" }}
      isEdit={isEdit}
      staticTexts={staticTexts}
      lang={lang}
      currentData={item}
      isChangeOrderHorizontal={false}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: item.text_content ?? DEFAULT_TEXT,
        }}
      />
    </ItemContainerUpdateDeleteTextDescription>
  );
};
