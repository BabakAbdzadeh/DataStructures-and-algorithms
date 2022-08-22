// merge sort 

const unsortedArray = [2,3,1,5,99,13,77,6,777,12,91,46];
// devide and conquer
// 1. split the array in two, recursion D
// 2. merge the arrays C

// Conquer
function merge(left, right){
  
  let sortedArr = [];
  while(left.length && right.length){

    if(left[0] < right[0]){
      sortedArr.push(left.shift());
    }else{
      sortedArr.push(right.shift());
    }
  }
    return [...sortedArr, ...left, ...right];
};

// Divide
function mergeSort(arr){
  const half = arr.length /2;

  // the base case
  if(arr.length <= 1){
    return arr;
  }
  const left = arr.splice(0, half);
  const right = arr;
  return merge(mergeSort(left), mergeSort(right));
};

console.log(mergeSort(unsortedArray));