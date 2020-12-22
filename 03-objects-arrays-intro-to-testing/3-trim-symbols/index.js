/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (typeof size !== 'number') {
    return string;
  }

  let destArr = [];
  let counter = 0;
  let previousCh = '';

  for (let currentCh of string) {
    if (currentCh !== previousCh) {
      previousCh = currentCh;
      counter = 1;
    } else {
      counter++;
    }

    if (counter <= size) {
      destArr.push(currentCh);
    }
  }

  return destArr.join('');
}
