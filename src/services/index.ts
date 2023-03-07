import { ApiFactory } from '../factories/apiFactory';
import { DataFactory } from '../factories/dataFactory';
import { HttpClient } from '../data';
import { logger, validateConfig } from '../utils';
import type {
  FetchOptions,
  FetchOptionsSingle,
  NextArray,
  NextWordPressConfig,
} from '../types';

export class NextWordPress {
  private __httpClient: HttpClient;

  private constructor(config: NextWordPressConfig) {
    this.__httpClient = HttpClient.create(config);
  }

  static create(config: NextWordPressConfig) {
    validateConfig(config);

    return new NextWordPress(config);
  }

  private async __fetchFromApi<T>(
    path: string,
    params?: Record<string, string>,
    verbose?: boolean
  ) {
    const fullPath = ApiFactory.createPath(path, params);

    logger({ fetchUrl: fullPath }, verbose);

    const response = await this.__httpClient.get(fullPath);

    const json = await response.json();

    const dataWithKeys: T = DataFactory.recursiveAddKeysToArray(json);

    return dataWithKeys;
  }

  get get() {
    const item = <T>(options: FetchOptions) => {
      const { path, params, verbose } = options;

      return this.__fetchFromApi<NextArray<T>>(path, params, verbose);
    };

    const singleItem = <T>(options: FetchOptionsSingle) => {
      const { path, params, id, verbose } = options;

      return this.__fetchFromApi<T>(`${path}/${id}`, params, verbose);
    };

    return {
      item,
      singleItem,
    };
  }
}
