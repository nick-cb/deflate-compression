const { describe, it } = require("node:test");
const assert = require("node:assert");
const { lz77 } = require("../lz77/index");

describe("lz77 unit test", () => {
  it("works", () => {
    const str = "repetitive repeat";
    const result = lz77(str);
    console.log(result);
    assert.deepStrictEqual(result, [
      { chars: "e", offset: 2, length: 1 },
      { chars: "ti", offset: 2, length: 2 },
      { chars: "e", offset: 6, length: 1 },
      { chars: "repe", offset: 11, length: 4 },
      { chars: "t", offset: 10, length: 1 },
    ]);
  });
});
