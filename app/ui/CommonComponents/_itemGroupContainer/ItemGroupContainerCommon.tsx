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
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        border: isEdit ? "1px dotted magenta" : undefined,
        padding: isEdit ? "25px 10px 10px 10px" : undefined,
        position: "relative",
        marginTop: isEdit ? Math.max(marginTop, 30) : marginTop,
        height: heightValue,
      }}
    >
      {children}

      {isEdit ? (
        <div
          style={{
            position: "absolute",
            top: "-20px",
            left: 0,
            right: 0,
            height: "48px",
          }}
        >
          {getEditButtons()}
        </div>
      ) : null}
    </div>
  );
};
