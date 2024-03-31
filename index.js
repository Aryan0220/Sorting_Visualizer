let array = [];

const displayArray = (array, index) => {
  display.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.classList.add("bars");
    bar.style.height = array[i] + "%";
    bar.style.width = "10px";
    bar.style.backgroundColor = "black";
    if (index && index.includes(i)) bar.style.backgroundColor = "red";
    display.appendChild(bar);
  }
};

const selectionSort = (nums) => {
  const swaps = [];
  let n = nums.length;
  for (let i = 0; i < n - 1; i++) {
    let min = i;
    for (let j = i; j < n; j++) {
      if (nums[j] < nums[min]) min = j;
    }
    swaps.push([min, i]);
    [nums[min], nums[i]] = [nums[i], nums[min]];
  }
  return swaps;
};

const bubbleSort = (nums) => {
  let n = nums.length;
  const swaps = [];
  for (let i = n - 1; i >= 0; i--) {
    let didSwap = false;
    for (let j = 0; j < i; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
        swaps.push([j, j + 1]);
        didSwap = true;
      }
    }
    if (!didSwap) break;
  }
  return swaps;
};

const insertionSort = (nums) => {
  const swaps = [];
  let n = nums.length;
  for (let i = 0; i < n; i++) {
    let j = i;
    while (j > 0 && nums[j - 1] > nums[j]) {
      [nums[j], nums[j - 1]] = [nums[j - 1], nums[j]];
      swaps.push([j, j - 1]);
      j--;
    }
  }
  return swaps;
};

const merge = (nums, low, high, mid, animations) => {
  let temp = [];
  let left = low,
    right = mid + 1;
  while (left <= mid && right <= high) {
    if (nums[left] <= nums[right]) {
      temp.push(nums[left]);
      left++;
    } else {
      temp.push(nums[right]);
      right++;
    }
  }
  while (left <= mid) {
    temp.push(nums[left]);
    left++;
  }
  while (right <= high) {
    temp.push(nums[right]);
    right++;
  }
  for (let i = low; i <= high; i++) {
    nums[i] = temp[i - low];
    animations.push([i, temp[i - low]]);
  }
};

const divide = (nums, low, high, animations) => {
  if (low === high) return;
  let mid = Math.floor((low + high) / 2);
  divide(nums, low, mid, animations);
  divide(nums, mid + 1, high, animations);
  merge(nums, low, high, mid, animations);
};

const mergeSort = (nums) => {
  let n = nums.length;
  let animations = [];
  divide(nums, 0, n - 1, animations);
  return animations;
};

const partition = (nums, low, high, swaps) => {
  let pivot = nums[low];
  let i = low,
    j = high;
  while (i < j) {
    while (nums[i] <= pivot && i <= high - 1) {
      i++;
    }
    while (nums[j] > pivot && j >= low + 1) {
      j--;
    }
    if (i < j) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      swaps.push([i, j]);
    }
  }
  [nums[low], nums[j]] = [nums[j], nums[low]];
  swaps.push([low, j]);
  return j;
};

const qs = (nums, low, high, swaps) => {
  if (low < high) {
    let partitionIndex = partition(nums, low, high, swaps);
    qs(nums, low, partitionIndex - 1, swaps);
    qs(nums, partitionIndex + 1, high, swaps);
  }
};

const quickSort = (nums) => {
  let swaps = [];
  qs(nums, 0, nums.length - 1, swaps);
  return swaps;
};

const createArray = () => {
  array = [];
  for (let i = 0; i < 40; i++) {
    array.push(Math.floor(Math.random() * 100));
  }
  displayArray(array);
};

const sortArray = () => {
  let temp = [...array];
  let swaps = mergeSort(temp);
  animateMerge(swaps);
};

const selection = () => {
  let temp = [...array];
  let swaps = selectionSort(temp);
  animate(swaps);
};

const bubble = () => {
  let temp = [...array];
  let swaps = bubbleSort(temp);
  animate(swaps);
};

const insertion = () => {
  let temp = [...array];
  let swaps = insertionSort(temp);
  animate(swaps);
};

const quick = () => {
  let temp = [...array];
  let swaps = quickSort(temp);
  animate(swaps);
};

const animateMerge = (swaps) => {
  if (swaps.length === 0) return;
  const [index, newHeight] = swaps.shift();
  array[index] = newHeight;
  displayArray(array, [index]);
  setTimeout(() => {
    animateMerge(swaps);
  }, 100);
};

const animate = (swaps) => {
  if (swaps.length === 0) return;
  const [i, j] = swaps.shift();
  [array[i], array[j]] = [array[j], array[i]];
  displayArray(array, [i, j]);
  setTimeout(async () => {
    animate(swaps);
  }, 100);
};

document.querySelector("#create").addEventListener("click", createArray);
document.querySelector("#selection").addEventListener("click", selection);
document.querySelector("#bubble").addEventListener("click", bubble);
document.querySelector("#insertion").addEventListener("click", insertion);
document.querySelector("#merge").addEventListener("click", sortArray);
document.querySelector("#quick").addEventListener("click", quick);
