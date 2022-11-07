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
console.log(`6: ${findElementViaMatching(myArray, 6)}`);

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

myArray.forEach((el) => console.log(typeof el));

/**
 *  3. Check if all elements in array is Number
 *  Should return Boolean
 */
const isNumber = myArray.every((value) => typeof value === 'number');

console.log({
    isNumber,
});

/**
 * 4. Check if at least one element is bigger than 5
 * Should return Boolean
 */

const isBiggerThanFive = myArray.some((value) => value > 5);

console.log({
    isBiggerThanFive,
});

/**
 * 5. Create another variable that will include only elements that bigger than 5
 * Should return another Array
 */

const elementsBiggerThanFive = myArray.filter((value) => value > 5);

console.log({
    elementsBiggerThanFive,
});

/**
 * 6. Multiply numbers of Array by 2
 * Should return another Array
 */

function isNum(value) {
    return typeof value === 'number';
}

const multiplied = myArray.filter((value) => isNum(value)).map((value) => value * 2);

console.log({
    multiplied,
});

/**
 * 7. Calculate array sum
 */

const sum = myArray
    .filter((value) => isNum(value))
    .reduce((sum, value) => sum + value);

console.log({
    sum,
});

/**
 * 8. Sort array in ascending and descending order
 */

const asc = myArray.slice(0)
    .filter((value) => isNum(value))
    .sort((a, b) => comparator('ASC', a, b));
const desc = myArray.slice(0)
    .filter((value) => isNum(value))
    .sort((a, b) => comparator('DESC', a, b));

console.log({
    asc,
    desc,
});

function comparator(type, a, b) {
    if (a === b) return 0;
    switch (type) {
        case 'ASC' : return (a < b) ? -1 : 1;
        case 'DESC' : return (a > b) ? -1 : 1;
        default: throw new Error('Unexpected Command');
    }
}