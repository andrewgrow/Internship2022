/**
 * 1. call https://jsonplaceholder.typicode.com/users and write it to file users.json
 * todo: install module to call this API, and use node FS module
 */
const fs = require('fs');

async function getUsersByApi() {
    return Promise.resolve('https://jsonplaceholder.typicode.com/users')
        .then(async (url) => {
            return await fetch(url);
        })
        .then(async (response) => {
            if (response.ok !== null && response.ok !== undefined) {
                return await response.json();
            } else {
                throw new Error('Response from remote server is bad.');
            }
        });
}

function writeDataToFile(data) {
    fs.writeFile('users.json', data, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

getUsersByApi()
    .then((response) => writeDataToFile(JSON.stringify(response)))
    .catch((err) => console.error(err));



/**
 * 2. Let's work with running node script with some environment variables
 * todo: Pass parameter ENV when you run this script. 
 * If param is PRODUCTION  get data from https://jsonplaceholder.typicode.com/todos and write it to file todos.json
 * If param is DEV get data from https://jsonplaceholder.typicode.com/albums and write if to file albums.json
 */
