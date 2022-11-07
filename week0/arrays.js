const myArray = [1, 10, 3, 6, 'ArrayElement'];

/**
 * 1. Log 3 and 6 elements from myArray to console
 * Please, use more than on solution
 */

// console.log(`3: ${}`);
console.log(`3: ${findElementViaIndex(myArray, 3)}`);
console.log(`3: ${findElementViaValue(myArray, 3)}`);
console.log(`3: ${findElementViaMatching(myArray, 3)}`);

// console.log(`6: ${}`);
console.log(`6: ${findElementViaIndex(myArray, 6)}`);
console.log(`6: ${findElementViaValue(myArray, 6)}`);
console.log(`6: ${findElementViaMatching(myArray.at, 6)}`);

// Note: there is a polyfill with .at method, that returns the item located at the specified index.
// It can be used too.

function findElementViaIndex(array, value) {
    const position = array.findIndex((el) => el === value);
    return array[position];
}

function findElementViaValue(array, value) {
    return array.find(el => el === value);
}

function findElementViaMatching(array, value) {
    const position = array.indexOf(value, 0);
    return array[position];
}

/**
 *  2. Log type of each element
 */

myArray.forEach(() => {
    console.log();
});

/**
 *  3. Check if all elements in array is Number
 *  Should return Boolean
 */

const isNumber = myArray.YOUR_METHOD;

console.log({
    isNumber,
});

/**
 * 4. Check if at least one element is bigger than 5
 * Should return Boolean
 */

const isBiggerThanFive = myArray.YOUR_METHOD;

console.log({
    isBiggerThanFive,
});

/**
 * 5. Create another variable that will include only elements that bigger than 5
 * Should return another Array
 */

const elementsBiggerThanFive = myArray.YOUR_METHOD;

console.log({
    elementsBiggerThanFive,
});

/**
 * 6. Multiply numbers of Array by 2
 * Should return another Array
 */

const multiplied = myArray.YOUR_METHOD;

console.log({
    multiplied,
});

/**
 * 7. Calculate array sum
 */

const sum = myArray.reduce();

console.log({
    sum,
});

/**
 * 8. Sort array in ascending and descending order
 */

const asc = myArray.YOUR_METHOD;
const desc = myArray.YOUR_METHOD;

console.log({
    asc,
    desc,
});
