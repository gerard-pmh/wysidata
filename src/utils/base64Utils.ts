export function objToUriBase64(obj: any): string {
  return btoa(JSON.stringify(obj))
    .replace('+', '.')
    .replace('/', '_')
    .replace('=', '-');
}

export function base64UriToObj(base64Uri: string): any {
  const base64 = base64Uri
    .replace('.', '+')
    .replace('_', '/')
    .replace('-', '=');
  return JSON.parse(atob(base64));
}
