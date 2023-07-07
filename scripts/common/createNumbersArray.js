export const createNumbersArray = (from, to) => {
  // ф-ция должна генерировать массив чисел от from до to
  return Array.from({ length: to - from + 1 }, (_, index) => from + index);
};
