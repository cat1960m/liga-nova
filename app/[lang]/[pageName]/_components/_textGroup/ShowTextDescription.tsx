import { FullData, MainParams } from "@/app/lib/definitions";
import { DEFAULT_TEXT } from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ItemContainerUpdateDeleteTextDescription } from "../__commonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";

export type Props = {
  item: FullData;
  isEdit: boolean;
  staticTexts: StaticTexts;
  params: MainParams;
};

export const ShowTextDescription = ({
  item,
  isEdit,
  staticTexts,
  params,
}: Props) => {
  return (
    <ItemContainerUpdateDeleteTextDescription
      key={item.text_description_id}
      isEdit={isEdit}
      useItems={{ text: "quill" }}
      staticTexts={staticTexts}
      params={params}
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
