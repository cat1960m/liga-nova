import { FullData } from "@/app/lib/definitions";
import {
  SUBSCRIPTION_ITEM_DESCRIPTION,
  SUBSCRIPTION_ITEM_IMPORTANT_DESCRIPTION,
  SUBSCRIPTION_ITEM_NAME,
  SUBSCRIPTION_ITEM_OLD_PRICE,
  SUBSCRIPTION_ITEM_PRICE,
  SUBSCRIPTION_ITEM_SHARE,
} from "@/app/lib/constants";
import { ShowSentence } from "./ShowSentence";

export type Props = {
  currentData: FullData[];
};

export const SubscriptionItem = ({ currentData }: Props) => {
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

  if (!name || !price) {
    return null;
  }

  const priceString = price.text_content?.replaceAll(" ", "") ?? "0";

  const priceValue = parseInt(priceString);
  const priceText = priceString?.substring(String(priceValue).length);
  const priceVal =
    price.text_content?.substring(
      0,
      price.text_content.length - priceText.length
    ) ?? "";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#f8f8f8",
        border: "1px solid #2575fc",
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        paddingBottom: "20px",
      }}
    >
      {share?.text_content ? (
        <div
          style={{
            backgroundColor: "#2575fc",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            padding: "10px",
            fontSize: 10,
          }}
        >
          {share.text_content}
        </div>
      ) : null}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          paddingTop: "20px",
          fontSize: 16,
        }}
      >
        <ShowSentence sentence={name.text_content ?? "N/A"} />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          fontSize: 42,
          fontWeight: 700,
          color: "#2575fc",
          marginBottom: "-6px",
        }}
      >
        {priceVal}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          fontSize: 14,
          color: "lightgray",
        }}
      >
        {priceText}
      </div>
      {oldPrice?.text_content ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            fontSize: 14,
            color: "#828282",
            textDecorationLine: "line-through",
          }}
        >
          {oldPrice?.text_content}
        </div>
      ) : null}

      <div
        style={{
          borderTop: "1px solid lightgray",
          margin: "10px",
        }}
      />

      <div
        style={{
          flexGrow: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100px",
          fontSize: 14,
          padding: "10px",
        }}
      >
        <div>
          {descriptions.map((item) => {
            const isImportant =
              item.text_type === SUBSCRIPTION_ITEM_IMPORTANT_DESCRIPTION;
            return (
              <div
                style={{
                  color: isImportant ? "black" : "#212529",
                  fontWeight: isImportant ? 700 : 400,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  justifyItems: "center",
                  alignContent: "center",
                  flexWrap: "wrap",
                }}
                key={item.text_description_id}
              >
                <ShowSentence sentence={item.text_content ?? "N/A"} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
