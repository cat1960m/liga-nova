import { FullData, MainParams } from "@/app/lib/definitions";
import { EditTrainerItem } from "./_trainers/EditTrainerItem";
import { EditSubscriptionItem } from "./_tickets/EditSubscriptionItem/EditSubscriptionItem";
import { TICKETS_PAGE_NAME, TRAINERS_PAGE_NAME } from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  currentData: FullData[];
  pageName: string;
  staticTexts: StaticTexts;
  lang: string;
  isEdit: boolean;
};

export const EditListItem = ({
  currentData,
  pageName,
  staticTexts,
  lang,
  isEdit,
}: Props) => {
  return (
    <div style={{ width: "100%" }}>
      {pageName === TICKETS_PAGE_NAME ? (
        <EditSubscriptionItem
          currentData={currentData}
          isEdit={isEdit}
          staticTexts={staticTexts}
          lang={lang}
        />
      ) : null}
      {pageName === TRAINERS_PAGE_NAME ? (
        <EditTrainerItem
          currentData={currentData}
          isEdit={isEdit}
          staticTexts={staticTexts}
          lang={lang}
        />
      ) : null}
    </div>
  );
};
