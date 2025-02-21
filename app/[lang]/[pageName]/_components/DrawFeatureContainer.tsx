import { getFeatureChildren } from "@/app/lib/actions_fitness";
import { Feature } from "@/app/lib/definitions";
import { DrawChildFeature } from "./DrawChildFeatures";
import { AddChildFeatureToContainer } from "./_clientComponents/AddChildFeatureToContainer";

export type Props = {
  featureId: number;
  lang: string;
  title?: string;
};

export const DrawFeatureContainer = async ({
  featureId,
  lang,
  title,
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
          <DrawChildFeature childFeature={child} lang={lang} key={child.id} />
        );
      })}

      <AddChildFeatureToContainer parentFeatureId={featureId} />
    </div>
  );
};
