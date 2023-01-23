import { Auth } from '../types';

const stringifyParams = (params: Record<string, string>) =>
  Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&')
    .replace(/^/, '?');

const convertToBase64 = (str: string) => Buffer.from(str).toString('base64');

const createPath = (path: string, params?: Record<string, string>) =>
  [path, params && stringifyParams(params)].join('');

const createUrl = (baseUrl: string, path: string) =>
  [
    baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`,
    'wp-json/wp/v2',
    path.startsWith('/') ? path : `/${path}`,
  ].join('');

const createAuthHeaders = (auth?: Auth): HeadersInit => {
  switch (auth?.type) {
    case 'basic':
      const userPass = `${auth.user}:${auth.password}`;

      return {
        Authorization: `Basic ${convertToBase64(userPass)}`,
      };

    case 'apiKey':
      return {
        Authorization: `Bearer ${auth.apiKey}`,
      };

    default:
      return {};
  }
};

export const ApiFactory = {
  createUrl,
  createPath,
  createAuthHeaders,
};
