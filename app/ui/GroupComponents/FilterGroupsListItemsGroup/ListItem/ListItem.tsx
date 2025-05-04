import { FullData } from "@/app/lib/definitions";
import { SubscriptionItem } from "../_tickets/SubscriptionItem/SubscriptionItem";
import { TrainerItem } from "../_trainers/TrainerItem/TrainerItem";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { TICKETS_PAGE_NAME, TRAINERS_PAGE_NAME } from "@/app/lib/constants";
import styles from "./listItem.module.css";

export type Props = {
  currentData: FullData[];
  pageName: string;
  pageFullDataList: FullData[];
  staticTexts: StaticTexts;
};

export const ListItem = ({
  currentData,
  pageName,
  pageFullDataList,
  staticTexts,
}: Props) => {
  return (
    <div className={styles.container}>
      {pageName === TICKETS_PAGE_NAME ? (
        <SubscriptionItem currentData={currentData} staticTexts={staticTexts} />
      ) : null}
      {pageName === TRAINERS_PAGE_NAME ? (
        <TrainerItem
          currentData={currentData}
          pageFullDataList={pageFullDataList}
          staticTexts={staticTexts}
        />
      ) : null}
    </div>
  );
};
