const str =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec felis est. Suspendisse diam nibh, vestibulum euismod hendrerit ac, posuere nec purus. Vestibulum condimentum at dui ut cursus. Quisque tempus ultrices nisi non porta. Nam ac rhoncus ipsum. Mauris iaculis ultrices luctus. Ut at mollis neque. Ut massa magna, ullamcorper vel tortor sed, consectetur interdum lorem. Nam lobortis nulla sed purus rutrum porttitor vel non ipsum. Vestibulum molestie in odio sed gravida. Suspendisse hendrerit, turpis posuere luctus placerat, odio sem luctus justo, sed ultrices odio mi sit amet magna. Integer dignissim dui ac libero semper, ut hendrerit augue egestas. Vestibulum facilisis nulla id felis malesuada suscipit. Nam sit amet lectus rhoncus, mattis justo ut, rutrum lectus. Sed vulputate ante id leo rutrum pulvinar.";

/** @param {string} str */
function compress(str) {
  // I need to know how many symbols are there and what is their freq
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

  // sort the queue by frequency
  sortNodes(arr, 0, arr.length - 1);
}

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
