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
  const style = {
    fontWeight: isMain ? 700 : 400,
    color: pageName === params.pageName ? "blue" : "black",
  };

  return <div style={style}>{pageTitle}</div>;
};
