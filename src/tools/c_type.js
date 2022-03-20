export class C_TYPE {
  static isString = function (value) {
    return typeof value === 'string';
  };

  static isFunction = function (value) {
    return typeof value === 'function';
  };

  static isNumber = function (value) {
    return typeof value === 'number';
  };

  static isUndefined = function (value) {
    return typeof value === 'undefined';
  };

  static isObject = function (value) {
    return typeof value === 'object';
  };

  static isNotFalse = function (value) {
    return value !== false;
  };
}
