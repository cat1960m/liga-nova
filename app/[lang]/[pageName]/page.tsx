import { getPageTitles } from "@/app/lib/actions_fitness";
import { DrawFeatureContainer } from "./_components/DrawFeatureContainer";
import { MainParams } from "@/app/lib/definitions";

export default async function Page({
  params,
}: {
  params: Promise<MainParams>;
}) {
  const pars = await params;
  console.log("=======page params", pars);
  const { pageName, lang } = pars;

  const [pageNameOnly, ...parts] = pageName.split("_");

  const pages = await getPageTitles(lang);

  const currentPage = pages?.find((page) => page.name === pageNameOnly);

  if (!currentPage) {
    return null;
  }

  return (
    <DrawFeatureContainer
      lang={lang}
      featureId={currentPage?.id}
      params={pars}
      tabLevel={0}
    />
  );
}
