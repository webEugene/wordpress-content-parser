const ObjectsToCsv = require('objects-to-csv');
const createFolder = require('./createFolder');
const Constants = require('../constants');
const { URL } = require('url');
const date = new Date();

/**
 * Save parsed data to storage
 *
 * @param link
 * @param data
 *
 * @returns {Promise<void>}
 */
const saveToStorage = async (link, data) => {

  const siteName = new URL(link).host;
  const dateFormed = `${date.toLocaleDateString()}_${+new Date()}`;

  await createFolder(Constants.STORAGE_DIR);

  await new ObjectsToCsv(data).toDisk(`${Constants.STORAGE_DIR}/${dateFormed}_${siteName}.csv`);
  console.log('*'.repeat(50));
  console.log('Saved file to storage folder');
  console.log('*'.repeat(50));
};

module.exports = saveToStorage;
