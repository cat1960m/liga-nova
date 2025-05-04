import styles from "./itemGroupContainerCommon.module.css";
import cn from "clsx";

export type Props = {
  children: React.ReactNode;
  isEdit: boolean;
  getEditButtons: () => React.ReactNode;
  marginTop: number;
  heightValue?: string;
};

export const ItemGroupContainerCommon = ({
  isEdit,
  children,
  getEditButtons,
  marginTop,
  heightValue,
}: Props) => {
  return (
    <div
      className={cn(styles.container, { [styles.edit]: isEdit })}
      style={{
        marginTop: isEdit ? Math.max(marginTop, 30) : marginTop,
        height: heightValue,
      }}
    >
      {children}

      {isEdit ? <div className={styles.buttons}>{getEditButtons()}</div> : null}
    </div>
  );
};
