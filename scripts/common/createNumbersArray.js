export const createNumbersArray = (from, to) => {
  return Array.from({ length: to - from + 1 }, (_, index) => from + index);
};

