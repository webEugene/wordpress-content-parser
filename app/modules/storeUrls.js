const fs = require('fs');
const Constants = require('../constants');

/**
 * Store urls to JSON file
 *
 * @param data
 */
const storeUrls = (data) => {
  fs.writeFile(Constants.SITEMAP_URLS, JSON.stringify(data, null, 1), (err) => {
    if (err) throw new Error(`Error writing data: ${err}`);
    console.log('*'.repeat(30));
    console.log('All urls have been saved!');
    console.log('*'.repeat(30));
  });
};

module.exports = storeUrls;
