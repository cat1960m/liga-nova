import { getFeatureChildren } from "@/app/lib/actions_fitness";
import { Feature, MainParams } from "@/app/lib/definitions";
import { DrawChildFeature } from "./DrawChildFeatures";
import { AddChildFeatureToContainer } from "./_clientComponents/AddChildFeatureToContainer";

export type Props = {
  featureId: number;
  lang: string;
  title?: string;
  params: MainParams;
  tabLevel: number;
};

export const DrawFeatureContainer = async ({
  featureId,
  lang,
  title,
  params,
  tabLevel,
}: Props) => {
  const pageChildren: Feature[] | null = await getFeatureChildren({
    parentFeatureId: featureId,
  });

  return (
    <div
      style={{
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        border: "2px dotted magenta",
        width: "100%",
        minHeight: "40px",
      }}
    >
      {title ?? null}
      {pageChildren?.map((child) => {
        return (
          <DrawChildFeature
            childFeature={child}
            lang={lang}
            key={child.id}
            params={params}
            tabLevel={tabLevel}
          />
        );
      })}

      <AddChildFeatureToContainer parentFeatureId={featureId} />
    </div>
  );
};
