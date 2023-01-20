export type NextArray<T> = (T & { _key: string })[];

export type NextWordPressConfig = {
  apiUrl: string;
};

export type FetchOptions = {
  path: string;
  params?: Record<string, string>;
};

export type FetchOptionsSingle = FetchOptions & {
  id: number;
};
