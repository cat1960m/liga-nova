import styles from "./itemGroupContainerCommon.module.css";
import cn from "clsx";

export type Props = {
  children: React.ReactNode;
  showGroupButtons: boolean;
  getEditButtons: () => React.ReactNode;
  marginTop: number;
  heightValue?: string;
};

export const ItemGroupContainerCommon = ({
  showGroupButtons,
  children,
  getEditButtons,
  marginTop,
  heightValue,
}: Props) => {
  return (
    <div
      className={cn(styles.container, { [styles.edit]: showGroupButtons })}
      style={{
        marginTop: showGroupButtons ? Math.max(marginTop, 30) : marginTop,
        height: heightValue,
      }}
    >
      {children}

      {showGroupButtons ? <div className={styles.buttons}>{getEditButtons()}</div> : null}
    </div>
  );
};
