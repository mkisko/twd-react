export const getCount = (filter) => {
  const {lines} = filter;
  return Object.values(lines).reduce((total, points) => total + points.length, 0);
};