export const forEachRight = <T>(
  array: T[],
  callback: (value: T, index: number, array: T[]) => void,
): void => {
  let index = array.length;
  while (index > 0) {
    --index;
    callback(array[index], index, array);
  }
};
