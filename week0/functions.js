/**
 * 1. Write a function that accepts your firstName and lastName
 * Should return 'I'm firstName lastName'
 */

function sayWho(firstName = 'firstName', lastName = 'lastName') {
    return `I'm ${firstName} ${lastName}'`;
}

console.log(sayWho());

/**
 * 2. Write a function that accepts numbers and return their sum
 * No limits for arguments count
 */

function countSum(...numbers) {
    return Array.from(numbers).reduce((sum, element) => sum + element);
}

console.log('countSum(4, 5, 23):', countSum(4, 5, 23));
console.log('countSum(10, 50, 212, 300, 22):', countSum(10, 50, 212, 300, 22));
console.log('countSum(1, 2):', countSum(1, 2));

/**
 * 3. Write a function that count number of letters in provided string
 */

function countLetters(string, letter) {
    return [...string].filter((value) => value === letter).length;
}

console.log(`countLetters:`, countLetters('Node developer', 'd'));

/**
 *  4. Write function that will return random integer in range that you provided
 */

function getRandom(start, end) {
    const min = Math.ceil(start <= end ? start : end);
    let max = Math.floor(start <= end ? end : start);
    return Math.round(Math.random() * (max - min) + min);
}

console.log('getRandom(0, 10):', getRandom(0, 10));
console.log('getRandom(90, 200):', getRandom(90, 200));
