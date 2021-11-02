export function findResponseAttr (response) {
  if ((typeof response) == 'string') {
    return [response]
  } else if (Array.isArray(response)) {
    if (response.length > 0) {
      return findResponseAttr(response[0])
    } else {
      return []
    }
  } else {
    return Object.keys(response)
  }
}