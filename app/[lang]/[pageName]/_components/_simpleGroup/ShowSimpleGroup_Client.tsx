import { FullData, MainParams } from "@/app/lib/definitions";
import { DEFAULT_TEXT } from "@/app/lib/constants";
import { ItemContainerUpdateTextDescriptionDeleteFeature } from "../__commonComponents/_itemGroupContainer/ItemContainerUpdateTextDescriptionDeleteFeature";

export type Props = {
  data: FullData[];
  params: MainParams;
};

export const ShowSimpleGroup_Client = ({
  data,
  params,
}: Props) => {
  const firstItem = data[0];
  const textDescriptions = data.filter((item) => !!item.text_description_id);

  if (!textDescriptions.length) {
    return null;
  }

  return (
    <ItemContainerUpdateTextDescriptionDeleteFeature
      currentData={firstItem}
      useItems={{ text: "simple" }}
      params={params}
      featureData={data}
      isChangeOrderHorizontal={false}
      marginTop={0}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          fontSize: "34px",
          fontWeight: 700,
        }}
      >
        <div
          style={{
            width: "200px",
            height: 0,
            marginBottom: "20px",
            border: "2px solid blue",
          }}
        />
        {textDescriptions[0].text_content ?? DEFAULT_TEXT}
      </div>
    </ItemContainerUpdateTextDescriptionDeleteFeature>
  );
};
