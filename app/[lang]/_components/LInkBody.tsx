"use client";

import { MainParams } from "@/app/lib/definitions";
import { useParams } from "next/navigation";

export const LinkBody = ({
  pageName,
  pageTitle,
  isMain,
}: {
  pageName: string;
  pageTitle: string;
  isMain?: boolean;
}) => {
  const params = useParams<MainParams>();
  console.log("-------LinkBody params", params, pageName);
  const [pageNameOnly, ...parts] = params.pageName?.split("_");

  const style = {
    fontWeight: isMain ? 700 : 400,
    color: pageName === pageNameOnly ? "blue" : "black",
  };

  return <div style={style}>{pageTitle}</div>;
};
