const ObjectsToCsv = require('objects-to-csv');
const storageDir = './app/storage';
const { URL } = require('url');
const date = new Date();

const saveToStorage = (link, data) => {

    const siteName = new URL(link).host;
    const dateFormed  = `${date.toLocaleDateString()}_${+new Date()}`;

    new ObjectsToCsv(data).toDisk(`${storageDir}/${dateFormed}_${siteName}.csv`);
    console.log('*'.repeat(50));
    console.log('Saved file to storage folder');
    console.log('*'.repeat(50));
};

module.exports = saveToStorage;