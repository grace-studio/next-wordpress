import { ApiFactory } from '../factories/apiFactory';
import { DataFactory } from '../factories/dataFactory';
import { FetchOptions, NextArray, NextWordPressConfig } from '../types';
import { HttpClient } from '../data';
import { validateConfig } from '../utils';

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
    params?: Record<string, string>
  ) {
    const fullPath = ApiFactory.createPath(path, params);

    const response = await this.__httpClient.get(fullPath);

    const json = await response.json();

    const dataWithKeys: NextArray<T> =
      DataFactory.recursiveAddKeysToArray(json);

    return dataWithKeys;
  }

  get get() {
    const __this = this;

    const item = <T>(options: FetchOptions) => {
      const { path, params } = options;

      return this.__fetchFromApi<T>(path, params);
    };

    return {
      item,
    };
  }
}
