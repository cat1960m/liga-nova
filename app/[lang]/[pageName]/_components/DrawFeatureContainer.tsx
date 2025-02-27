import { getFeatureChildren } from "@/app/lib/actions_fitness";
import { Feature, MainParams } from "@/app/lib/definitions";
import { DrawChildFeature } from "./DrawChildFeatures";
import { AddChildFeatureToContainer } from "./_clientComponents/AddChildFeatureToContainer";
import { auth } from "@/app/auth";
import { StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  featureId: number;
  title?: string;
  params: MainParams;
  tabLevel: number;
  staticTexts: StaticTexts;
};

export const DrawFeatureContainer = async ({
  featureId,
  title,
  params,
  tabLevel,
  staticTexts,
}: Props) => {
  const res = await auth();
  const iaAuthenticated = !!res?.user;

  const pageChildren: Feature[] | null = await getFeatureChildren({
    parentFeatureId: featureId,
  });

  const buttonText = title
    ? staticTexts.addItemToTab
    : staticTexts.addItemToPage;

  return (
    <div
      style={{
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        border: title ? "4px dotted green" : undefined,
        width: "100%",
        minHeight: "40px",
      }}
    >
      {title ?? null}
      {pageChildren?.map((child) => {
        return (
          <DrawChildFeature
            childFeature={child}
            key={child.id}
            params={params}
            tabLevel={tabLevel}
          />
        );
      })}

      {iaAuthenticated ? (
        <AddChildFeatureToContainer
          parentFeatureId={featureId}
          text={buttonText ?? "N/A"}
          params={params}
        />
      ) : null}
    </div>
  );
};
