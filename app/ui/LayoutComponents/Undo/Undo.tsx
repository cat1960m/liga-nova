"use client";

import { copyFeature } from "@/app/lib/actions_fitness";
import { CommonButton } from "../../CommonComponents/_buttons/CommonButton";
import { Feature } from "@/app/lib/definitions";
const handleUndo = async () => {
  const dataPage: Feature[] | null = await copyFeature({
    name: "blog",
  });
  console.log("blog features", dataPage);

  if (dataPage?.length) {
    const data: Feature[] | null = await copyFeature({
      featureId: dataPage[0].id,
    });
    console.log("blog features", data);
  }
};

export const Undo = () => {
  return (
    <div style={{visibility: "hidden"}}>
      <CommonButton onClick={handleUndo}>{"Undo"}</CommonButton>;
    </div>
  );
};
