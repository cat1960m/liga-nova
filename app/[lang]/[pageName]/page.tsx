import { getFeatureChildren, getPageTitles } from "@/app/lib/actions_fitness";
import { Feature } from "@/app/lib/definitions";
import { DrawFeatureContainer } from "./_components/DrawFeatureContainer";

export default async function PageName({
  params,
}: {
  params: Promise<{ pageName: string; lang: string }>;
}) {
  const pars = await params;
  const { pageName, lang } = pars;

  const pages = await getPageTitles(lang);

  const currentPage = pages?.find((page) => page.name === pageName);

  if (!currentPage) {
    return null;
  }

  return <DrawFeatureContainer lang={lang} featureId={currentPage?.id} />;
}
