import { StaticTexts } from "@/app/dictionaries/definitions";
import { UpdateDeleteTextButtons } from "../_buttons/UpdateDeleteTextButtons";
import { UseItems } from "../_upadeModal/UpdateTextDescriptionDataModalContent";
import { FullData, MainParams } from "@/app/lib/definitions";

export type Props = {
  children: React.ReactNode;
  isEdit: boolean;
  getEditButtons: () => React.ReactNode;
};

export const ItemGroupContainerCommon = ({
  isEdit,
  children,
  getEditButtons,
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
        marginTop: isEdit ? "20px" : 0,
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
