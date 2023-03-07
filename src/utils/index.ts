import cryptoModule from 'crypto';
import { NextWordPressConfig } from '../types';

export const throwError = (message: string, ...otherMessages: string[]) => {
  console.error(...otherMessages);
  throw new Error(`NextWordPress: ${message}`);
};

const isBrowser = typeof window !== 'undefined';

export const generateUUID = () => {
  let rawString: string;
  if (isBrowser) {
    rawString = crypto.randomUUID();
  } else {
    rawString = cryptoModule.randomUUID();
  }

  return rawString.replace(/[\W_]+/g, '');
};

export const validateConfig = (config: NextWordPressConfig) => {
  if (!config) {
    throwError('No config provided.');
  }

  if (!config.apiUrl) {
    throwError('No apiUrl provided in config');
  }
};

export const logger = (message: object, verbose?: boolean) =>
  verbose &&
  console.log(
    JSON.stringify({ timestamp: new Date().toISOString(), message }, null, 2)
  );
