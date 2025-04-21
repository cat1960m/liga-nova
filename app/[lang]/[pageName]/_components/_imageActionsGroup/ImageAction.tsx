import { FullData } from "@/app/lib/definitions";
import Image from "next/image";

import styles from "./imageActions.module.css";
import { TOOLTIP } from "@/app/lib/constants";

export type Props = {
  data: FullData;
  groupData: FullData[];
  isModalShown: boolean;
};

export const ImageAction = ({ data, groupData, isModalShown }: Props) => {
  const tooltip = groupData.find(
    (item) =>
      item.text_description_id === data.text_description_id &&
      item.content_type === TOOLTIP
  );
  return (
    <div className={styles.item}>
      {data.value ? (
        <img src={data.value} alt="" width={"100%"} />
      ) : (
        <div style={{ padding: "20px" }}>No image </div>
      )}
      {isModalShown ? null : (
        <div className={styles.text}>{data.text_content ?? ""}</div>
      )}
      <div
        className={styles.tooltip}
        dangerouslySetInnerHTML={{
          __html: tooltip?.text_content ?? "",
        }}
      />
    </div>
  );
};
