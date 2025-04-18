import { StaticTexts } from "@/app/dictionaries/definitions";
import { AddTextDescriptionButton } from "../../__commonComponents/_buttons/AddTextDescriptionButton";
import { TextItemField } from "../../TextItemField";
import {
  SUBSCRIPTION_ITEM_DESCRIPTION,
  SUBSCRIPTION_ITEM_IMPORTANT_DESCRIPTION,
  SUBSCRIPTION_ITEM_NAME,
  SUBSCRIPTION_ITEM_OLD_PRICE,
  SUBSCRIPTION_ITEM_PRICE,
  SUBSCRIPTION_ITEM_SHARE,
} from "@/app/lib/constants";
import { FullData, MainParams } from "@/app/lib/definitions";

export type Props = {
  commonWidth: string;
  staticTexts: StaticTexts;
  subscriptionItemFeatureId: number;
  currentData: FullData[];
  params: MainParams;
};

export const AddEditSubscriptionItem = ({
  commonWidth,
  staticTexts,
  subscriptionItemFeatureId,
  currentData,
  params
}: Props) => {
  const importantDescriptionType = SUBSCRIPTION_ITEM_IMPORTANT_DESCRIPTION;

  const name = currentData.find(
    (item) => item.text_type === SUBSCRIPTION_ITEM_NAME
  );
  const share = currentData.find(
    (item) => item.text_type === SUBSCRIPTION_ITEM_SHARE
  );
  const price = currentData.find(
    (item) => item.text_type === SUBSCRIPTION_ITEM_PRICE
  );
  const oldPrice = currentData.find(
    (item) => item.text_type === SUBSCRIPTION_ITEM_OLD_PRICE
  );
  const descriptions = currentData.filter((item) =>
    [
      SUBSCRIPTION_ITEM_DESCRIPTION,
      SUBSCRIPTION_ITEM_IMPORTANT_DESCRIPTION,
    ].includes(item.text_type)
  );

  if (!name || !price || !share || !oldPrice) {
    return null;
  }

  return (
    <div
      style={{
        width: "100%",
        border: "1px dotted magenta",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "5px",
      }}
    >
      <TextItemField
        fieldData={name}
        staticTexts={staticTexts}
        title={staticTexts.name}
        importantDescriptionType={importantDescriptionType}
        params={params}
      />
      <TextItemField
        fieldData={price}
        staticTexts={staticTexts}
        title={staticTexts.price}
        importantDescriptionType={importantDescriptionType}
        params={params}
      />
      <TextItemField
        fieldData={share}
        staticTexts={staticTexts}
        title={staticTexts.share}
        importantDescriptionType={importantDescriptionType}
        params={params}
      />
      <TextItemField
        fieldData={oldPrice}
        staticTexts={staticTexts}
        title={staticTexts.oldPrice}
        importantDescriptionType={importantDescriptionType}
        params={params}
      />

      <div style={{ fontWeight: 700 }}>{staticTexts.descriptions}: </div>

      {descriptions.map((description) => {
        return (
          <TextItemField
            fieldData={description}
            staticTexts={staticTexts}
            key={description.text_description_id}
            importantDescriptionType={importantDescriptionType}
            params={params}
          />
        );
      })}

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
          padding: "5px",
        }}
      >
        <AddTextDescriptionButton
          featureId={subscriptionItemFeatureId}
          textType={SUBSCRIPTION_ITEM_DESCRIPTION}
          buttonText={staticTexts.addDescription ?? "N/A"}
          price={null}
        />

        <AddTextDescriptionButton
          featureId={subscriptionItemFeatureId}
          textType={SUBSCRIPTION_ITEM_IMPORTANT_DESCRIPTION}
          buttonText={staticTexts.addImportantDescription ?? "N/A"}
          price={null}
        />
      </div>
    </div>
  );
};
