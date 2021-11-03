export function findResponseAttr(responseData: any): string[] {
  if (typeof responseData == 'string') {
    return [responseData];
  } else if (Array.isArray(responseData)) {
    if (responseData.length > 0) {
      return findResponseAttr(responseData[0]);
    } else {
      return [];
    }
  } else {
    return Object.keys(responseData);
  }
}
