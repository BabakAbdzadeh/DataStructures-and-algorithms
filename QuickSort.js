// QuickSort algorith
// Random pivot using Lomuto partitioning techninc
// Input: Unsorted array A, n = lenght
// Output: Sorted array A, n = lenght

function partition(arr, low, high){
  const pivot = arr[high];
  let i = low - 1;
  for(var j = low; j <= high; j++){
    if(arr[j] < pivot){
      i++;
      // swap
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i+1], arr[high]] = [arr[high], arr[i+1]]
  return i+1;
};

function partition_r(arr, low, high){
  // Randomg element from an array
  // Accurate r, other solutions mostly give errors or undefined!
  var r = Math.floor(low + Math.random() * (high - low + 1));

  console.log(r);
  console.log(high);
  console.log(low);
  [arr[r], arr[high]] = [arr[high], arr[r]];
  console.log(arr);
  console.log(arr[high]);
  return partition(arr, low, high);
};

function quickSort(arr, low, high){
  if(low<high){
    pi = partition_r(arr, low, high);
    quickSort(arr, low, pi-1);
    quickSort(arr, pi+1, high);
  }
  return arr;
};


const test = [2,3,5,1,4,9,99,33,44,12,11,15,19,7,21];

console.log(quickSort(test, 0, test.length -1));
