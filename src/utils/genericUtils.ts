export function isNotObject(value: any): boolean {
  return value === null || typeof value !== 'object';
}

export interface MultiDimensionalArray<T>
  extends Array<MultiDimensionalArray<T> | T> {}

// FIXME better error handling, compare indexes length and multiDimArray dimension
export function multiDimensionalInsert<T>(
  value: T,
  multiDimArray: MultiDimensionalArray<T> | T,
  indexes: number[]
): void {
  if (!indexes.length) {
    return;
  }
  if (!Array.isArray(multiDimArray)) {
    multiDimArray = emptyMultiDimensionalArray(indexes.length);
  }
  const i = indexes[0];
  if (indexes.length === 1) {
    multiDimArray.splice(i, 0, value);
  } else {
    if (!Array.isArray(multiDimArray[i])) {
      multiDimArray[i] = emptyMultiDimensionalArray(indexes.length - 1);
    }
    multiDimensionalInsert(value, multiDimArray[i], indexes.slice(1));
  }
}

export function emptyMultiDimensionalArray<T>(
  depth: number
): MultiDimensionalArray<T> {
  let multiDimArray: MultiDimensionalArray<T> = [];
  for (let i = 1; i < depth; i++) {
    multiDimArray = [multiDimArray];
  }
  return multiDimArray;
}

export function isOneDimensionalArray<T>(array: MultiDimensionalArray<T> | T) {
  return Array.isArray(array) && array.every(v => !Array.isArray(v));
}

export function isNDimensionalArray<T>(
  array: MultiDimensionalArray<T> | T,
  n: number
): boolean {
  if (n < 2) {
    return isOneDimensionalArray(array);
  }
  return (
    Array.isArray(array) && array.every(v => isNDimensionalArray(v, n - 1))
  );
}

export function isCoordinates<T>(array: MultiDimensionalArray<T>): boolean {
  return isOneDimensionalArray(array) && array.length === 2;
}

export function invertTwoDimensionalArray<T>(array: T[][]): T[][] {
  const result: T[][] = [];
  array.forEach(subArray => {
    subArray.forEach((value, index) => {
      if (result[index]) {
        result[index].push(value);
      } else {
        result[index] = [value];
      }
    });
  });
  return result;
}
