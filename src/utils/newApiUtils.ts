import {
  multiDimensionalInsert,
  isNotObject,
  MultiDimensionalArray,
  emptyMultiDimensionalArray
} from './genericUtils';

export interface ApiValues {
  [key: string]: MultiDimensionalArray<string | number | boolean | null>;
}

export function extractValuesFromRoot(apiDataRoot: any): ApiValues {
  const accumulator: ApiValues = {};
  extractValues(apiDataRoot, accumulator, [], []);
  return accumulator;
}

function extractValues(
  data: any,
  accumulator: ApiValues,
  keys: string[],
  indexes: number[]
): void {
  if (isNotObject(data)) {
    const strKey = keys.join('.');
    if (indexes.length) {
      const multiDimArray =
        accumulator[strKey] ?? emptyMultiDimensionalArray(indexes.length);
      multiDimensionalInsert(data, multiDimArray, indexes);
      accumulator[strKey] = multiDimArray;
    } else {
      accumulator[strKey] = data;
    }
  } else if (Array.isArray(data)) {
    data.forEach((d, i) =>
      extractValues(d, accumulator, keys, [...indexes, i])
    );
  } else {
    Object.entries(data).forEach(([k, v]) => {
      extractValues(v, accumulator, [...keys, k], indexes);
    });
  }
}
