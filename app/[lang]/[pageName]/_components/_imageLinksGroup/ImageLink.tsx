import { FullData } from "@/app/lib/definitions";
import styles from "./imageLinks.module.css";

export type Props = {
  data: FullData;
};

export const ImageLink = ({ data }: Props) => {
  return <div className={styles.item}></div>;
};
