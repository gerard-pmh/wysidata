export function objToBase64Uri(obj: any): string {
  return btoa(JSON.stringify(obj))
    .replaceAll('+', '.')
    .replaceAll('/', '_')
    .replaceAll('=', '-');
}

export function base64UriToObj(base64Uri: string): any {
  const base64 = base64Uri
    .replaceAll('.', '+')
    .replaceAll('_', '/')
    .replaceAll('-', '=');
  return JSON.parse(atob(base64));
}
