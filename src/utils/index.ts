import crypto from 'crypto';
import { NextWordPressConfig } from '../types';

export const throwError = (message: string, ...otherMessages: string[]) => {
  console.error(...otherMessages);
  throw new Error(`NextWordPress: ${message}`);
};

export const generateUUID = () => crypto.randomUUID().replace(/[\W_]+/g, '');

export const validateConfig = (config: NextWordPressConfig) => {
  if (!config) {
    throwError('No config provided.');
  }

  if (!config.apiUrl) {
    throwError('No apiUrl provided in config');
  }
};
