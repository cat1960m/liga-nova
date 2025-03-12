"use client";

import { FullData } from "@/app/lib/definitions";
import {
  TRAINER_ITEM_DESCRIPTION,
  TRAINER_ITEM_IMAGE,
  TRAINER_ITEM_IS_PREMIUM,
  TRAINER_ITEM_NAME,
} from "@/app/lib/constants";
import { useState } from "react";
import { CommonButton } from "../_clientComponents/CommonButton";

export type Props = {
  currentData: FullData[];
};

export const TrainerItem = ({ currentData }: Props) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const name = currentData.find((item) => item.text_type === TRAINER_ITEM_NAME);
  const isPremium = currentData.find(
    (item) => item.text_type === TRAINER_ITEM_IS_PREMIUM
  );
  const photo = currentData.find(
    (item) => item.text_type === TRAINER_ITEM_IMAGE
  );
  const descriptions = currentData.filter((item) =>
    [TRAINER_ITEM_DESCRIPTION].includes(item.text_type)
  );

  if (!name || !isPremium || !photo) {
    return null;
  }

  const isPremiumValue = isPremium.value;

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const buttonText = isExpanded ? "Wrap" : "Expand";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {photo.value ? (
        <div
          style={{
            width: "100%",
            border: "1px solid #2575fc",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <img src={photo.value} alt="photo" width="100%" />
        </div>
      ) : null}

      <div
        style={{
          display: "flex",
          fontSize: 16,
          fontWeight: 700,
          color: isPremiumValue ? "blue" : "gray",
          padding: "10px 0",
        }}
      >
        {name.text_content ?? "N/A"}
      </div>

      <div
        style={{
          flexGrow: 2,
          display: "flex",
          flexDirection: "column",
          minHeight: "100px",
          fontSize: 14,
          padding: "10px 0",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            maxHeight: isExpanded ? undefined : "60px",
            overflow: isExpanded ? undefined : "hidden",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {descriptions.map((item) => {
            return (
              <p key={item.text_description_id}>
                {item.text_content ?? "N/A"}{" "}
              </p>
            );
          })}
        </div>

        <button
          onClick={handleExpand}
          style={{ color: "darkblue", fontWeight: 700, marginTop: "10px" }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
