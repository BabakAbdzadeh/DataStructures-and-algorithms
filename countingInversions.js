// Input: Array A, with a length equal to n
// Output: sorted array B and number of inversions of A
// Time complexity: O(nlogn)
// Algorithm:
// if n = 0, n = 1  return (A, 0);
// else:
//  (C, leftInv) := SortAndCountInv(first half of A)
//  (D, RightInv) := SortAndCountInv(Second half of A)
//  (B, SplitInv) := MergeAndCountSplitInv(C, D)
//  return (B, leftInv+RightInv+SplitInv)

//  MergeSort + modification for counting inversions
function merge(leftObj, rightObj) {

  const left = leftObj.array;
  const right = rightObj.array;
  let sortedArr = [];
  let inversions = leftObj.inversions + rightObj.inversions;

  while (left.length && right.length) {

    if (left[0] < right[0]) {
      sortedArr.push(left.shift());
    } else {
      sortedArr.push(right.shift());
      inversions += left.length;
    }
  }
  return {
    array: [...sortedArr, ...left, ...right],
    inversions: inversions
  };
};

function mergeSort(objectArr) {
  const arr = objectArr.array;
  const half = arr.length / 2;

  // the base case
  if (arr.length <= 1) {
    return {
      array: arr,
      inversions: objectArr.inversions
    };
  }
  const left = {
    array: arr.splice(0, half),
    inversions: 0
  };

  const right = {
    array: arr,
    inversions: 0
  };

  return merge(mergeSort(left), mergeSort(right));
};

function sortAndCountInv(arr) {
  const inputObj = {
    array: arr,
    inversions: 0
  };
  return mergeSort(inputObj);
};

function mergeAndCountSplitInv(leftObj, rightObj) {
  const leftArr = leftObj.array;
  const rightArr = rightObj.array;


  var leftIndex = 0,
    rightIndex = 0,
    n = 0,
    splitInv = 0;

  const length = leftArr.length + rightArr.length;

  const sortedArray = [];


  for (n; n < length; n++) {

    if (leftArr[leftIndex] < rightArr[rightIndex]) {
      sortedArray.push(leftArr[leftIndex]);

      leftIndex += 1;

    } else if (leftArr[leftIndex] > rightArr[rightIndex]) {
      sortedArray.push(rightArr[rightIndex]);

      rightIndex += 1;
      splitInv += ((length / 2) - leftIndex);
    } else {
      sortedArray.push(rightArr[rightIndex]);
    }

  }

  return {
    array: sortedArray,
    splitInv: splitInv,
    totalInversions: splitInv + leftObj.inversions + rightObj.inversions
  }
}

function countingInversions(arr) {
  const leftHalf = arr.splice(0, arr.length / 2);
  const rightHalf = arr;

  if (arr.length === 0 || arr.length === 1) {
    return {
      array: arr,
      inversions: 0
    }
  } else {
    return mergeAndCountSplitInv(sortAndCountInv(leftHalf), sortAndCountInv(rightHalf))
  }

}

console.log(countingInversions([2, 3, 1, 5, 99, 13, 77, 6, 777, 12, 91, 46]));
