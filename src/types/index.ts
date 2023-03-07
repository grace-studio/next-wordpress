export type NextArray<T> = (T & { _key: string })[];

export type BasicAuth = {
  type: 'basic';
  user: string;
  password: string;
};

export type ApiKeyAuth = {
  type: 'apiKey';
  apiKey: string;
};

export type Auth = BasicAuth | ApiKeyAuth;

export type NextWordPressConfig = {
  apiUrl: string;
  auth?: Auth;
  headers?: Record<string, string>;
  verbose?: boolean;
};

export type FetchOptions = {
  path: string;
  params?: Record<string, string>;
};

export type FetchOptionsSingle = FetchOptions & {
  id: number;
};
