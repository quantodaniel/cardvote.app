export const getRandomId = () => {
  return Math.random().toString(36).slice(2, 12).toLocaleUpperCase();
};
