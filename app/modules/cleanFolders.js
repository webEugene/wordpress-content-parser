const fs = require('fs');
const removeDirFiles = require('./removeFiles');
const Constants = require('../constants');
const folders = [Constants.CRITERIA_DIR, Constants.STORAGE_DIR];

/**
 * Clean folders
 *
 * @returns {Promise<void>}
 */
const cleanFolders = async () => {

  fs.writeFile(Constants.SITEMAP_URLS, JSON.stringify([], null, 1), (err) => {
    if (err) throw new Error(`Error writing data: ${err}`);
    console.log('*'.repeat(30));
    console.log('All urls deleted successfully!');
    console.log('*'.repeat(30));
  });

  for (let index = 0; index < folders.length; index++) {
    await removeDirFiles(folders[index]);
  }

  console.log('*'.repeat(50));
  console.log('cleaning has been finished successfully!');
  console.log('*'.repeat(50));

};

module.exports = cleanFolders;
