import { FullData } from "@/app/lib/definitions";
import { DEFAULT_TEXT } from "@/app/lib/constants";
import { ItemContainerUpdateDeleteTextDescription } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import { CountIndex, StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  item: FullData;
  isEdit: boolean;
  lang: string;
  staticTexts: StaticTexts;
  countIndex: CountIndex;
};

export const ShowTextDescription = ({
  item,
  isEdit,
  staticTexts,
  lang,
  countIndex,
}: Props) => {
  return (
    <ItemContainerUpdateDeleteTextDescription
      key={item.text_description_id}
      useItems={{ text: "quill" }}
      isEdit={isEdit}
      staticTexts={staticTexts}
      lang={lang}
      currentData={item}
      isChangeOrderHorizontal={false}
      countIndex={countIndex}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: item.text_content ?? DEFAULT_TEXT,
        }}
      />
    </ItemContainerUpdateDeleteTextDescription>
  );
};
