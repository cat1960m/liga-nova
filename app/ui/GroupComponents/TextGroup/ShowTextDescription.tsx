import { FullData, MainParams } from "@/app/lib/definitions";
import { DEFAULT_TEXT } from "@/app/lib/constants";
import { ItemContainerUpdateDeleteTextDescription } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";

export type Props = {
  item: FullData;
  params: MainParams;
};

export const ShowTextDescription = ({ item, params }: Props) => {
  return (
    <ItemContainerUpdateDeleteTextDescription
      key={item.text_description_id}
      useItems={{ text: "quill" }}
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
