"use client";

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

  const style = {
    fontWeight: isMain ? 700 : 400,
    color: pageName === params.pageName ? "blue" : "black",
  };

  return <div style={style}>{pageTitle}</div>;
};
