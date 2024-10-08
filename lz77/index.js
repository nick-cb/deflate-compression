const windowLen = 15;
const lookAheadBufferLen = 4;
const searchBufferLen = windowLen - lookAheadBufferLen;
/** @param {string} input */
exports.lz77 = function lz77(input) {
  const compressedArray = [];
  let compressedStr = "";
  /* @type {string} searchBuffer */
  let cutoffCount = 0;
  let searchBuffer = "";
  let length = 1;
  for (let i = 0; i < input.length; i += length) {
    length = 1;
    let offset = 0;
    let j = searchBuffer.length - 1;
    /*            r e p e t i t i v e _ r e p e a t
     *j:            [---)
     *i:          [-----)
     *offset:       [---)
     *offset = i - j => j = i - offset, vd: i = 3, j = 1 => offset = 2
     */
    do {
      let char = input.slice(i, i + length);
      const existChar =
        offset === 0
          ? searchBuffer.slice(j, j + length)
          : searchBuffer.slice(i - offset - cutoffCount, j + 1);
      if (char === existChar) {
        if (offset === 0) {
          offset = i - j - cutoffCount;
        }
        length += 1;
        if (length > lookAheadBufferLen) {
          length -= 1;
          break;
        }
        j += 1;
      } else {
        if (offset !== 0) {
          length -= 1;
          break;
        }
        j -= 1;
      }

      if (j < 0 || j >= searchBuffer.length) {
        if (offset !== 0) {
          length -= 1;
        }
        break;
      }
    } while (true);
    if (offset !== 0) {
      compressedArray.push({
        chars: input.slice(i, i + length),
        offset,
        length,
      });
      if (length > 2) {
        compressedStr += offset;
        compressedStr += length;
      } else {
        compressedStr += input.slice(i, i + length);
      }
    } else {
      compressedStr += input.slice(i, i + length);
    }
    searchBuffer = searchBuffer.concat(input.slice(i, i + length));
    if (searchBuffer.length > searchBufferLen) {
      cutoffCount += searchBuffer.length - searchBufferLen;
      searchBuffer = searchBuffer.slice(searchBuffer.length - searchBufferLen);
    }
  }

  return { input, output: compressedStr, compressedArray };
};
