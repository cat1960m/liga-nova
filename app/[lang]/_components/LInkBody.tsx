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
  const params = useParams();

  const [pageNameOnly, ...parts] = (params.pageName?.toString() ?? "").split(
    "_"
  );

  const style = {
    fontWeight: isMain ? 700 : 400,
    color: pageName === pageNameOnly ? "blue" : "black",
  };

  return <div style={style}>{pageTitle}</div>;
};
