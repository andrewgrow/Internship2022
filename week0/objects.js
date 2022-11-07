const invoice = {
    firstName: 'Node',
    lastName: 'Developer',
    createdAt: '2022-10-31T22:50:59.305Z',
    amount: 150,
    currency: 'USD',
};

/**
 * 1. Log firstName and lastName in dot notation and bracket notation
 */

console.log(`First name: ${invoice.firstName}`);
console.log(`Last name: ${invoice['lastName']}`);

/**
 * 2. Log Object Keys
 */

isFunction = function(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
};


invoice.getKeys = function () { return Object.keys(this).filter((key) => !isFunction(this[`${key}`]))};
const keys = invoice.getKeys();

console.log({
    keys,
});

/**
 * 3. Log Object values
 */

invoice.getValues = function () { return Object.values(this).filter((value) => !isFunction(value)) };
const values = invoice.getValues();

console.log({
    values,
});

/**
 * 4. Log Object entries
 */

invoice.getEntries = function () { return Object.entries(this) };
const entries = invoice.getEntries();

console.log({
    entries,
});

/**
 * 5. Create second variable invoice from original
 * Please, use more than one solution
 */

const copiedInvoice = Object.assign({}, invoice); // clone with methods
// const copiedInvoice2 = { ...invoice } // clone with methods 2
// const copiedInvoice = JSON.parse(JSON.stringify(invoice)); // clone only keys:values (without methods)
// const copiedInvoice = structuredClone(invoice); // not working in nodejs yet

console.log({
    copiedInvoice
});

/**
 * 6. Modify copiedInvoice amount value
 * Important: original invoice amount shouldn't be modified
 */

copiedInvoice.amount = 300;

console.log({
    invoice,
    copiedInvoice,
});

/**
 * 7. Loop through object and log key-values
 */
console.log(invoice.getEntries());