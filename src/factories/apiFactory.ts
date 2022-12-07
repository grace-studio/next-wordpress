const stringifyParams = (params: Record<string, string>) =>
  Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&')
    .replace(/^/, '?');

const createPath = (path: string, params?: Record<string, string>) =>
  [path, params && stringifyParams(params)].join('');

const createUrl = (baseUrl: string, path: string) =>
  [
    baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`,
    'wp-json/wp/v2',
    path.startsWith('/') ? path : `/${path}`,
  ].join('');

export const ApiFactory = {
  createUrl,
  createPath,
};
