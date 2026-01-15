export const transJPDate = (jpDate: string) => {
  const m = jpDate.match(/(\d+)年(\d+)月/);
  if (m === null) return new Date();

  return new Date(Number(m[1]), Number(m[2]) - 1);
};
