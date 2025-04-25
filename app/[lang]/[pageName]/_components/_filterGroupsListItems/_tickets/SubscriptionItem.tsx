import { FullData } from "@/app/lib/definitions";
import {
  ACTION_BUTTON_BACKGROUND,
  GRAY_BACKGROUND_COLOR,
  SUBSCRIPTION_ITEM_CAN_POSTPONE,
  SUBSCRIPTION_ITEM_DESCRIPTION,
  SUBSCRIPTION_ITEM_NAME,
  SUBSCRIPTION_ITEM_OLD_PRICE,
  SUBSCRIPTION_ITEM_PRICE,
  SUBSCRIPTION_ITEM_SHARE,
  YES,
} from "@/app/lib/constants";
import { ShowSentence } from "./ShowSentence";
import { CommonButton } from "../../__commonComponents/_buttons/CommonButton";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ActionButton } from "../../__commonComponents/_buttons/_actionButon/ActionButton";

export type Props = {
  currentData: FullData[];
  staticTexts: StaticTexts;
};

export const SubscriptionItem = ({ currentData, staticTexts }: Props) => {
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
  const description = currentData.find(
    (item) => item.text_type === SUBSCRIPTION_ITEM_DESCRIPTION
  );

  const isPostpone = currentData.find(
    (item) => item.text_type === SUBSCRIPTION_ITEM_CAN_POSTPONE
  );

  if (!name || !price) {
    return null;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: GRAY_BACKGROUND_COLOR,
        border: `1px solid ${ACTION_BUTTON_BACKGROUND}`,
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        paddingBottom: "15px",
        maxWidth: "300px",
      }}
    >
      {share?.text_content ? (
        <div
          style={{
            backgroundColor: ACTION_BUTTON_BACKGROUND,
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
        {price.price}
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
        {price.text_content}
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
          minHeight: "100px",
          padding: "10px",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: description?.text_content ?? "N/A",
          }}
        />
      </div>

      {isPostpone?.value === YES ? (
        <div style={{ padding: "5px 20px" }}>
          <CommonButton
            text={staticTexts.postponement}
            isAction
            styleValue={{ width: "100%", fontSize: "12px" }}
          />
        </div>
      ) : null}
      <div style={{ padding: "5px 20px", width: "100%" }}>
        <ActionButton
          text={staticTexts.buy}
          onClick={() => {}}
          styleValue={{
            width: "100%",
            height: "40px",
            fontSize: "12px",
            fontWeight: 500,
          }}
        />
      </div>
    </div>
  );
};
