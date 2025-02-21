import { getDictionary } from "../../dictionaries";
import { AddColumnItemButton } from "./_clientComponents/AddColumnItemButton";
import { GroupItemEditDelete } from "./GroupItemEditDelete";
import { getTextDescriptions } from "@/app/lib/actions_fitness";

export type Props = {
  featureId: number;
  lang: string;
  headerType: string;
  columnItemType: string;
  groupType: string;
};

export const ShowGroupColumn = async ({
  featureId,
  lang,
  headerType,
  columnItemType,
  groupType,
}: Props) => {
  const featureTextDescriptions = await getTextDescriptions({
    featureId: featureId,
  });

  const dict = await getDictionary(lang as "en" | "ua"); // en

  if (!featureTextDescriptions) {
    return null;
  }

  const getTypeTextDescriptions = (type: string) => {
    return featureTextDescriptions?.filter((item) => item.text_type === type);
  };

  const headerTextDescriptions = getTypeTextDescriptions(headerType);
  const columnTextDescriptions = getTypeTextDescriptions(columnItemType);

  return (
    <>
      {headerTextDescriptions.length ? (
        <GroupItemEditDelete
          textDescription={headerTextDescriptions[0]}
          lang={lang}
          textType={headerType}
          groupType={groupType}
        />
      ) : null}

      {columnTextDescriptions.map((textDescription) => {
        return (
          <GroupItemEditDelete
            textDescription={textDescription}
            lang={lang}
            key={textDescription.id}
            textType={columnItemType}
            groupType={groupType}
          />
        );
      })}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <AddColumnItemButton
          featureId={featureId}
          textType={columnItemType}
          buttonText={dict.common.addColumnItem}
          price={null}
        />
      </div>
    </>
  );
};
