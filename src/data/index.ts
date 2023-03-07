import { ApiFactory } from '../factories/apiFactory';
import { logger, validateConfig } from '../utils';
import { NextWordPressConfig } from '../types';

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
    const options = {
      headers: {
        ...ApiFactory.createAuthHeaders(this.__config.auth),
        ...this.__config.headers,
      },
    };

    const startTime = Date.now();

    const response = await fetch(url, options);

    const responseTime = Date.now() - startTime;
    logger({ fetchUrl: url, responseTime }, this.__config.verbose);

    const { status } = response;

    if (!response.ok) {
      throw new Error(`Unable to fetch from url: ${url}, status: ${status}`);
    }

    return response;
  }
}
