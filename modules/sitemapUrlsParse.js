const pathjsonFile = './sitemap-urls.json';
const sitemaps = require('sitemap-stream-parser');
const fs = require('fs');

// Store urls to sitemap-urls.json
const storeUrls = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data, null, 1));
    return true;
  } catch (err) {
    console.error(err);
  }
};

// Get urls from sitemap
const getUrls = (urls) => {
  all_urls = [];
  sitemaps.parseSitemaps(
    urls,
    (url) => {
      all_urls.push(url);
    },
    (err, sitemaps) => {
      try {
        if (all_urls.length !== 0) {
          storeUrls(all_urls, pathjsonFile);
          console.log(
            `All urls were written to file ${pathjsonFile}`,
          );
        } else {
          throw new Error('Array is empty');
        }
      } catch (err) {
        console.error(`${err}`);
      }
    },
  );
};

module.exports.url = getUrls;
