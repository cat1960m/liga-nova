export const LinkBody = ({
  pageName,
  pageTitle,
  isMain,
  params,
}: {
  pageName: string;
  pageTitle: string;
  isMain?: boolean;
  params: { lang: "en" | "ua"; pageName: string };
}) => {
  console.log("-------LinkBody params", params, pageName);
  const [pageNameOnly, ...parts] = (params.pageName ?? "")?.split("_");

  const style = {
    fontWeight: isMain ? 700 : 400,
    color: pageName === pageNameOnly ? "blue" : "black",
  };

  return <div style={style}>{pageTitle}</div>;
};
