const util = require("util");
/**
 * @typedef {Object} HuffNode
 * @property {number} freq
 * @property {HuffNode | undefined} left
 * @property {HuffNode | undefined} right
 * @property {string} code
 * @property {string | null} value
 */

// const str =
//   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec felis est. Suspendisse diam nibh, vestibulum euismod hendrerit ac, posuere nec purus. Vestibulum condimentum at dui ut cursus. Quisque tempus ultrices nisi non porta. Nam ac rhoncus ipsum. Mauris iaculis ultrices luctus. Ut at mollis neque. Ut massa magna, ullamcorper vel tortor sed, consectetur interdum lorem. Nam lobortis nulla sed purus rutrum porttitor vel non ipsum. Vestibulum molestie in odio sed gravida. Suspendisse hendrerit, turpis posuere luctus placerat, odio sem luctus justo, sed ultrices odio mi sit amet magna. Integer dignissim dui ac libero semper, ut hendrerit augue egestas. Vestibulum facilisis nulla id felis malesuada suscipit. Nam sit amet lectus rhoncus, mattis justo ut, rutrum lectus. Sed vulputate ante id leo rutrum pulvinar.";
const str = "this is an example of a huffman tree";

/** @param {string} str */
function compress(str) {
  // I need to know how many symbols are there and what is their freq
  /** @type {Array<{freq: number}>} */
  const arr = new Array();
  let lastIdx = 0;
  for (const c of str) {
    const index = arr.findIndex((node) => node?.value === c);
    if (index !== -1) {
      arr[index].freq += 1;
    } else {
      arr[lastIdx] = { value: c, freq: 1 };
      lastIdx += 1;
    }
  }

  const queue1 = [...arr];
  // const arr = [
  //   { value: "x", freq: 1 },
  //   { value: "u", freq: 1 },
  //   { value: "r", freq: 1 },
  //   { value: "p", freq: 1 },
  //   { value: "o", freq: 1 },
  //   { value: "l", freq: 1 },
  //   { value: "t", freq: 2 },
  //   { value: "s", freq: 2 },
  //   { value: "n", freq: 2 },
  //   { value: "m", freq: 2 },
  //   { value: "i", freq: 2 },
  //   { value: "h", freq: 2 },
  //   { value: "f", freq: 3 },
  //   { value: "e", freq: 4 },
  //   { value: "a", freq: 4 },
  //   { value: "space", freq: 7 },
  // ];
  // sort the queue by frequency
  sortNodes(queue1, 0, queue1.length - 1);

  /** @type Array<HuffNode> queue */
  const queue = [];
  /** @type {HuffNode | null} root */
  do {
    let left;
    let right;
    if (queue1[0]?.freq < queue[0]?.freq || queue.length === 0) {
      left = queue1.shift();
    } else {
      left = queue.shift();
    }
    if (queue1[0]?.freq < queue[0]?.freq || queue.length === 0) {
      right = queue1.shift();
    } else {
      right = queue.shift();
    }
    /** @type {HuffNode} node */
    const node = {
      freq: left.freq + right.freq,
      left,
      right,
    };
    queue.push(node);
    console.log("");
  } while (queue1.length || queue.length > 1);
  label(queue[0]);
}

/** @param {HuffNode} node */
function label(node) {
  if (node.right) {
    node.right.code = (node.code || "") + "1";
    label(node.right);
  }
  if (node.left) {
    node.left.code = (node.code || "") + "0";
    label(node.left);
  }
  if (!node.right || !node.left) {
    console.log({ value: node.value, code: node.code });
  }
}

/** @param {HuffNode} node */
function print(node) {}

function sortNodes(nodes, low, high) {
  if (low >= 0 && high >= 0 && low < high) {
    let p = partition(nodes, low, high);
    sortNodes(nodes, low, p);
    sortNodes(nodes, p + 1, high);
  }
}

/**
 * @param {Array<{value: String, freq: number}>} nodes
 * @param {number} start
 * @param {number} end
 */
function partition(nodes, low, high) {
  const pivot = nodes[low];
  let left = low - 1;
  let right = high + 1;
  let idx = 0;
  do {
    idx += 1;
    do {
      left += 1;
    } while (nodes[left].freq < pivot.freq);
    do {
      right -= 1;
    } while (nodes[right].freq > pivot.freq);
    if (left >= right) {
      return right;
    }

    const temp = nodes[left];
    nodes[left] = nodes[right];
    nodes[right] = temp;
  } while (true);
}

compress(str);
