import {
  multiDimensionalInsert,
  isNotObject,
  MultiDimensionalArray,
  emptyMultiDimensionalArray
} from './genericUtils';

export interface Api {
  id: number;
  url: string;
  loading: boolean;
  error?: string;
  resData?: any;
  structure?: ApiStructure;
}

export interface ApiStructure {
  key: string;
  path: string[];
  isArray: boolean;
  fields?: ApiStructure[];
  value?: ApiValue;
}

export type ApiValue = MultiDimensionalArray<string | number | boolean | null>;

export interface ApiValues {
  [key: string]: ApiValue;
}

export function extractApiStructureFromRoot(apiRootData: any) {
  const apiLeafValues = extractValuesFromRoot(apiRootData);
  return extractApiStructure(
    apiRootData,
    'root',
    [],
    Array.isArray(apiRootData),
    apiLeafValues
  );
}

function extractApiStructure(
  data: any,
  key: string,
  path: string[],
  isArray: boolean,
  apiLeafValues: ApiValues
): ApiStructure {
  if (isNotObject(data)) {
    const value = apiLeafValues[path.join('.')];
    return {
      key,
      path,
      isArray,
      value
    };
  } else if (Array.isArray(data)) {
    if (data.length) {
      return extractApiStructure(data[0], key, path, true, apiLeafValues);
    }
    return { key, path, isArray: true };
  } else {
    const fields = Object.entries(data).map(([k, v]) =>
      extractApiStructure(v, k, [...path, k], isArray, apiLeafValues)
    );
    return {
      key,
      path,
      isArray,
      fields
    };
  }
}

export function extractValuesFromRoot(apiRootData: any): ApiValues {
  const accumulator: ApiValues = {};
  extractValues(apiRootData, accumulator, [], []);
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
