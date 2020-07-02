"use strict";

/**
 * Check if value is null or undefined
 */
const isEmpty = val => val === null || val === undefined;

/**
 * Similar to lodash.get https://www.npmjs.com/package/lodash.get
 * @todo handle undefined path
 * @todo handle non-string path, like arrays
 *
 * @param {object|array} obj - object or array to search.
 * @param {string} path - key path to value
 * @optional default value to return
 */
const get = (obj, path, defaultValue = undefined) => {
  const result = path
    .split(/[[\].]+?/)
    .filter(Boolean) // removes empty string results for path with array notation
    .reduce((res, key) => (!isEmpty(res) ? res[key] : res), obj);
  return result === undefined || result === obj ? defaultValue : result;
};

module.exports = get;
