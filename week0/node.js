/**
 * 1. call https://jsonplaceholder.typicode.com/users and write it to file users.json
 * todo: install module to call this API, and use node FS module
 */
const fs = require('fs');

async function getDataByApi(url) {
    return Promise.resolve(url)
        .then(async (url) => {
            return await fetch(url);
        })
        .then(async (response) => {
            if (response.ok !== null && response.ok !== undefined) {
                const data = await response.json();
                return JSON.stringify(data);
            } else {
                throw new Error('Response from remote server is bad.');
            }
        });
}

function writeDataToFile(path, data) {
    fs.writeFile(path, data, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

getDataByApi('https://jsonplaceholder.typicode.com/users')
    .then((data) => writeDataToFile('users.json', data))
    .catch((err) => console.error(err));



/**
 * 2. Let's work with running node script with some environment variables
 * todo: Pass parameter ENV when you run this script. 
 * If param is PRODUCTION  get data from https://jsonplaceholder.typicode.com/todos and write it to file todos.json
 * If param is DEV get data from https://jsonplaceholder.typicode.com/albums and write if to file albums.json
 */

require('dotenv').config();
const VARIABLES = {};
VARIABLES.url = process.env.ENV === 'PRODUCTION' ? 'https://jsonplaceholder.typicode.com/todos' : 'https://jsonplaceholder.typicode.com/albums';
VARIABLES.file = process.env.ENV === 'PRODUCTION' ? 'todos.json' : 'albums.json';

getDataByApi(VARIABLES.url)
    .then((data) => writeDataToFile(VARIABLES.file, data))
    .catch((err) => console.error(err));