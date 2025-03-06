export const getFilterIds = (data: string | undefined): number[] =>
  data ? data.split(",").map((filterId) => parseInt(filterId)) : [];
