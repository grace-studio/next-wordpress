import { ApiFactory } from '../factories/apiFactory';
import { NextWordPressConfig } from '../types';
import { validateConfig } from '../utils';

export class HttpClient {
  private __config: NextWordPressConfig;

  private constructor(config: NextWordPressConfig) {
    this.__config = config;
  }

  static create(config: NextWordPressConfig) {
    validateConfig(config);

    return new HttpClient(config);
  }

  async get(path: string) {
    const url = ApiFactory.createUrl(this.__config.apiUrl, path);
    console.log(url);

    const response = await fetch(url);

    const { status } = response;

    if (!response.ok) {
      throw new Error(`Unable to fetch from url: ${url}, status: ${status}`);
    }

    return response;
  }
}
