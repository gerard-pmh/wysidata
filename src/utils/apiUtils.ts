export interface Api {
  id: number;
  url: string;
  loading: boolean;
  error?: string;
  resData?: any;
  structure?: ApiRootStructure;
}

export interface ApiRootStructure {
  api: Api;
  isArray: boolean;
  children: ApiFieldStructure[];
}

export interface ApiFieldStructure extends ApiRootStructure {
  key: string;
  path: ApiFieldStructure[];
}

export function parseApiResponseRootStructure(
  api: Api,
  data?: any,
  isArray: boolean = false
): ApiRootStructure {
  const resData = data ?? api.resData;
  if (typeof resData !== 'object' || resData === null) {
    return { api, isArray, children: [] };
  }
  if (Array.isArray(resData)) {
    if (resData.length) {
      // FIXME how to handle nested arrays ?
      return parseApiResponseRootStructure(api, resData[0], true);
    }
    return { api, isArray: true, children: [] };
  }
  return {
    api,
    isArray,
    children: Object.keys(resData).map(key =>
      parseApiResponseFieldStructure(api, key, resData[key], [])
    )
  };
}

function parseApiResponseFieldStructure(
  api: Api,
  key: string,
  data: any,
  path: ApiFieldStructure[],
  isArray: boolean = false
): ApiFieldStructure {
  if (typeof data !== 'object') {
    return { api, isArray, children: [], key, path };
  }
  if (Array.isArray(data)) {
    if (data.length) {
      // FIXME how to handle nested arrays ?
      return parseApiResponseFieldStructure(api, key, data[0], path, true);
    }
    return { api, isArray: true, children: [], key, path };
  }
  const parsedField: ApiFieldStructure = {
    api,
    isArray,
    path,
    key,
    children: []
  };
  const childPath = [...path, parsedField];
  parsedField.children = Object.keys(data).map(childKey =>
    parseApiResponseFieldStructure(api, childKey, data[childKey], childPath)
  );
  return parsedField;
}

export function getApiFieldData(
  resData: any,
  field: ApiFieldStructure,
  compIndex: number
) {
  let nestedData = resData;
  for (let parentField of field.path) {
    if (parentField.isArray) {
      nestedData = nestedData[parentField.key][compIndex];
    } else {
      nestedData = nestedData[parentField.key];
    }
  }
  if (field.isArray) {
    return nestedData[compIndex][field.key];
  }
  return nestedData[field.key];
}

export function getApiFieldLength(field: ApiFieldStructure): number {
  let nestedData = field.api.resData;
  if (field.api.structure?.isArray) {
    return nestedData.length;
  }
  for (let parentField of field.path) {
    if (parentField.isArray) {
      return nestedData[parentField.key].length;
    } else {
      nestedData = nestedData[parentField.key];
    }
  }
  if (field.isArray) {
    return nestedData.length;
  }
  return 1;
}
