import { FullData } from "@/app/lib/definitions";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { TICKETS_PAGE_NAME, TRAINERS_PAGE_NAME } from "@/app/lib/constants";
import styles from "./listItem.module.css";
import { SubscriptionItemContainer } from "../_tickets/SubscriptionItem/SubscriptionItemContainer";
import { TrainerItemContainer } from "../_trainers/TrainerItem/TrainerItemContainer";

export type Props = {
  currentData: FullData[];
  pageName: string;
  pageFullDataList: FullData[];
  staticTexts: StaticTexts;
  srcPremiumIcon: string
};

export const ListItem = ({
  currentData,
  pageName,
  pageFullDataList,
  staticTexts,
  srcPremiumIcon
}: Props) => {
  return (
    <div className={styles.container}>
      {pageName === TICKETS_PAGE_NAME ? (
        <SubscriptionItemContainer
          currentData={currentData}
          staticTexts={staticTexts}
        />
      ) : null}
      {pageName === TRAINERS_PAGE_NAME ? (
        <TrainerItemContainer
          currentData={currentData}
          pageFullDataList={pageFullDataList}
          staticTexts={staticTexts}
          srcPremiumIcon={srcPremiumIcon}
        />
      ) : null}
    </div>
  );
};
