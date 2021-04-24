const fs = require('fs');
const removeDirFiles = require('../helpers/removeFiles');
const sitemapUrlsJson = './app/sitemap-urls.json';
const folders = ['./app/criteria', './app/storage'];

const cleanFolders = async () => {

  fs.writeFile(sitemapUrlsJson, JSON.stringify([], null, 1), (err) => {
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