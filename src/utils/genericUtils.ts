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
): any {
  if (!Array.isArray(multiDimArray)) {
    multiDimArray = generateEmptyMultiDimArray(indexes.length);
  }
  if (!indexes.length) {
    return multiDimArray;
  }
  const i = indexes[0];
  if (indexes.length === 1) {
    if (multiDimArray[i] === undefined) {
      return [...multiDimArray.slice(0, i), value];
    }
    return [
      ...multiDimArray.slice(0, i),
      value,
      multiDimArray[i],
      ...multiDimArray.slice(i + 1)
    ];
  }
  return [
    ...multiDimArray.slice(0, i),
    multiDimensionalInsert(value, multiDimArray[i], indexes.slice(1)),
    ...multiDimArray.slice(i + 1)
  ];
}

function generateEmptyMultiDimArray<T>(
  depth: number
): MultiDimensionalArray<T> {
  let multiDimArray: MultiDimensionalArray<T> = [];
  for (let i = 1; i < depth; i++) {
    multiDimArray = [multiDimArray];
  }
  return multiDimArray;
}
