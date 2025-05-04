import { ReactNode } from "react";

import styles from "./buttons.module.css";

export const Buttons = ({ children }: { children: ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};
