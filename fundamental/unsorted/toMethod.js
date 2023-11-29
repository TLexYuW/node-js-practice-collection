const arr = [5, 3, 14, 2, 3, 1, 0]

// arr.sort((a, b) => a - b); // mutate

const newArr = arr.toSorted((a, b) => a - b); // no mutate
const newArr2 = newArr.toReversed();

console.log(newArr);
console.log(newArr2);
console.log(arr); 