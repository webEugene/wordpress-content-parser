// Store urls to sitemap-urls.json
const fs = require('fs');

const storeUrls = (data, path) => {
  fs.writeFile(path, JSON.stringify(data, null, 1), (err) => {
    if (err) throw new Error(`Error writing data: ${err}`);
    console.log('*'.repeat(30));
    console.log('All urls have been saved!');
    console.log('*'.repeat(30));
  })
};

module.exports = storeUrls;