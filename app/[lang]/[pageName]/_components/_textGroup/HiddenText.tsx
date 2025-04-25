"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { useState } from "react";

export type Props = {
  staticTexts: StaticTexts;
  descriptions: string[];
};

export const HiddenText = ({ staticTexts, descriptions }: Props) => {
  const [isHidden, setIsHidden] = useState(true);
  const style = {
    fontSize: "20px",
    color: "#007bff",
    cursor: "pointer",
    textDecoration: "underline",
  };
  return (
    <div>
      {isHidden ? (
        <div style={style} onClick={() => setIsHidden(false)}>
          {staticTexts.readMore}
        </div>
      ) : (
        <div>
          {descriptions.map((description, index) => {
            return (
              <div
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
                key={index}
              />
            );
          })}

          <div style={style} onClick={() => setIsHidden(true)}>
            {staticTexts.readLess}
          </div>
        </div>
      )}
    </div>
  );
};
