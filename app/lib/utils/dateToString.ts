export const dateToString = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString();
  const monthDay = date.getDate().toString();
  //return date.toISOString().split("T")[0];

  return `${year}-${month.length === 2 ? month : "0" + month}-${
    monthDay.length === 2 ? monthDay : "0" + monthDay
  }`;
};
