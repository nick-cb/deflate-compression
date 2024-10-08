const { encode } = require("../huffman/index");
const { lz77 } = require("../lz77");

/** @param {string} input */
function compress(input) {
  console.log(lz77(encode(input)));
}

compress("repetitive repeat")
