import { generateUUID } from '../utils';

const isObject = (data: any) =>
  Object.prototype.toString.call(data) === '[object Object]';
const isArray = (data: any) =>
  Object.prototype.toString.call(data) === '[object Array]';

const recursiveAddKeysToArray = (data: any) => {
  if (isArray(data)) {
    return data.map((item: any) =>
      isObject(item)
        ? recursiveAddKeysToArray({ ...item, _key: generateUUID() })
        : item
    );
  }

  if (isObject(data)) {
    for (const key in data) {
      data[key] = recursiveAddKeysToArray(data[key]);
    }
  }

  return data;
};

export const DataFactory = {
  recursiveAddKeysToArray,
};
