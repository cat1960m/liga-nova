import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData, MainParams } from "@/app/lib/definitions";
import { AddEditTrainerItem } from "./_trainers/AddEditTrainerItem";
import { AddEditSubscriptionItem } from "./_tickets/AddEditSubscriptionItem";
import { TICKETS_PAGE_NAME, TRAINERS_PAGE_NAME } from "@/app/lib/constants";

export type Props = {
  commonWidth: string;
  staticTexts: StaticTexts;
  addEditItemFeatureId: number;
  currentData: FullData[];
  pageName: string;
  setIsSaveDisabled: (value: boolean) => void;
  params: MainParams;
};

export const AddEditListItem = ({
  commonWidth,
  staticTexts,
  addEditItemFeatureId,
  currentData,
  pageName,
  setIsSaveDisabled,
  params,
}: Props) => {
  return (
    <div style={{ width: "100%" }}>
      {pageName === TICKETS_PAGE_NAME ? (
        <AddEditSubscriptionItem
          currentData={currentData}
          subscriptionItemFeatureId={addEditItemFeatureId}
          staticTexts={staticTexts}
          commonWidth={commonWidth}
          params={params}
        />
      ) : null}
      {pageName === TRAINERS_PAGE_NAME ? (
        <AddEditTrainerItem
          currentData={currentData}
          trainerItemFeatureId={addEditItemFeatureId}
          staticTexts={staticTexts}
          commonWidth="32%"
          setIsSaveDisabled={setIsSaveDisabled}
          params={params}
        />
      ) : null}
    </div>
  );
};
