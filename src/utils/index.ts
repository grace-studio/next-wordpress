import { NextWordPressConfig } from '../types';
import { randomUUID } from 'crypto';

export const throwError = (message: string, ...otherMessages: string[]) => {
  console.error(...otherMessages);
  throw new Error(`NextWordPress: ${message}`);
};

export const generateUUID = () =>
  randomUUID({ disableEntropyCache: true }).replace(/[\W_]+/g, '');

export const validateConfig = (config: NextWordPressConfig) => {
  if (!config) {
    throwError('No config provided.');
  }

  if (!config.apiUrl) {
    throwError('No apiUrl provided in config');
  }
};
