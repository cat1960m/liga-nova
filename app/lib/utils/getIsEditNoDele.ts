import { MainParams } from "../definitions";

export const getIsEditNoDelete = (params: MainParams) => {
  const { editMode } = params;
  return {
    isEdit: editMode === "1" || editMode === "2",
    noDelete: editMode !== "2",
  };
};
