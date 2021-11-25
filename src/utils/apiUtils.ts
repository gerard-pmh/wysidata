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
  structure?: ApiNode;
}

export interface ApiNodeId {
  apiId: number;
  path: string;
}

export interface ApiNode {
  id: ApiNodeId;
  name: string;
  isArray: boolean;
  nodes?: ApiNode[];
  value?: ApiValue;
}

export type ApiValue =
  | MultiDimensionalArray<string | number | boolean | null | undefined>
  | string
  | number
  | boolean
  | null
  | undefined;

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
  name: string,
  arrPath: string[],
  isArray: boolean,
  apiLeafValues: ApiValues
): ApiNode {
  const path = arrPath.join('.');
  if (isNotObject(data)) {
    const value = apiLeafValues[path];
    return {
      id: { apiId, path },
      name,
      isArray,
      value
    };
  } else if (Array.isArray(data)) {
    if (data.length) {
      return extractApiStructure(
        apiId,
        data[0],
        name,
        arrPath,
        true,
        apiLeafValues
      );
    }
    return { id: { apiId, path }, name, isArray: true };
  } else {
    const nodes = Object.entries(data).map(([k, v]) =>
      extractApiStructure(apiId, v, k, [...arrPath, k], false, apiLeafValues)
    );
    return {
      id: { apiId, path },
      name,
      isArray,
      nodes
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
  arrPath: string[],
  indexes: number[]
): void {
  if (isNotObject(data)) {
    const path = arrPath.join('.');
    if (indexes.length) {
      const multiDimArray =
        accumulator[path] ?? emptyMultiDimensionalArray(indexes.length);
      multiDimensionalInsert(data, multiDimArray, indexes);
      accumulator[path] = multiDimArray;
    } else {
      accumulator[path] = data;
    }
  } else if (Array.isArray(data)) {
    data.forEach((d, i) =>
      extractValues(d, accumulator, arrPath, [...indexes, i])
    );
  } else {
    Object.entries(data).forEach(([k, v]) => {
      extractValues(v, accumulator, [...arrPath, k], indexes);
    });
  }
}
