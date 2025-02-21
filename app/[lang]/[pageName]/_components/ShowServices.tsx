import { SERVICE_ITEM } from "@/app/lib/constants";
import { getDictionary } from "../../dictionaries";
import { AddColumnItemButton } from "./_clientComponents/AddColumnItemButton";
import { GroupItemEditDelete } from "./GroupItemEditDelete";
import { getTextDescriptions } from "@/app/lib/actions_fitness";

export type Props = {
  featureId: number;
  lang: string;
  groupType: string;
};

export const ShowServices = async ({ featureId, lang, groupType }: Props) => {
  const featureTextDescriptions = await getTextDescriptions({
    featureId: featureId,
  });

  const dict = await getDictionary(lang as "en" | "ua"); // en

  if (!featureTextDescriptions) {
    return null;
  }

  return (
    <div
      style={{
        width: "100%",
        border: "1px solid gray",
        borderRadius: "10px",
        minHeight: "40px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {featureTextDescriptions.map((textDescription, index) => {
          return (
            <div
              style={{
                width: "100%",
                backgroundColor: !(index % 2) ? "pink" : "white",
                padding: "5px 20px",
              }}
              key={textDescription.id}
            >
              <GroupItemEditDelete
                textDescription={textDescription}
                lang={lang}
                textType={SERVICE_ITEM}
                groupType={groupType}
              />
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          padding: "20px",
        }}
      >
        <AddColumnItemButton
          featureId={featureId}
          textType={SERVICE_ITEM}
          buttonText={dict.common.addColumnItem}
          price={0}
        />
      </div>
    </div>
  );
};
