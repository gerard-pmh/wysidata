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
  apiId: number;
  key: string;
  path: string[];
  isArray: boolean;
  fields?: ApiStructure[];
  value?: ApiValue;
}

export type ApiValue =
  | MultiDimensionalArray<string | number | boolean | null>
  | string
  | number
  | boolean
  | null;

export interface ApiValues {
  [key: string]: ApiValue;
}

export function extractApiStructureFromRoot(api: Api) {
  const apiLeafValues = extractValuesFromRoot(api.resData);
  return extractApiStructure(
    api.id,
    api.resData,
    'root',
    [],
    Array.isArray(api.resData),
    apiLeafValues
  );
}

function extractApiStructure(
  apiId: number,
  data: any,
  key: string,
  path: string[],
  isArray: boolean,
  apiLeafValues: ApiValues
): ApiStructure {
  if (isNotObject(data)) {
    const value = apiLeafValues[path.join('.')];
    return {
      apiId,
      key,
      path,
      isArray,
      value
    };
  } else if (Array.isArray(data)) {
    if (data.length) {
      return extractApiStructure(
        apiId,
        data[0],
        key,
        path,
        true,
        apiLeafValues
      );
    }
    return { apiId, key, path, isArray: true };
  } else {
    const fields = Object.entries(data).map(([k, v]) =>
      extractApiStructure(apiId, v, k, [...path, k], false, apiLeafValues)
    );
    return {
      apiId,
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
