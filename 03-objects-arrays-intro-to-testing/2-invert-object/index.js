/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
  if (typeof obj !== "object") {
    return undefined;
  }

  const invertFn = Object.entries(obj).map(([prop, value]) => [value, prop]);
  return Object.fromEntries(invertFn);
}
