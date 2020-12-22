/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const props = path.split('.');
  return obj => {
    let nested = obj;
    for (const propName of props) {
      if (nested && nested.hasOwnProperty(propName)) {
        nested = nested[propName];
      } else {
        return undefined;
      }
    }
    return nested;
  };
}
