const sitemaps = require('sitemap-stream-parser');
const storeUrls = require('./storeUrls');
const generatorCriteria = require('./criteriaGenerator');

/**
 * Get urls from sitemap
 *
 * @param url
 */
const getUrls = (url) => {
  generatorCriteria(url);
  const allUrls = [];
  sitemaps.parseSitemaps(
    url,
    (urlEach) => {
      allUrls.push(urlEach);
    },
    (err, sitemaps) => {
      try {
        if (!allUrls.length || err) throw new Error(`Array is empty or url is wrong! Check it => ${sitemaps}`);
        storeUrls(allUrls);
      } catch (err) {
        console.log('*'.repeat(100));
        console.error(`${err.name}: ${err.message}`);
        console.log('*'.repeat(100));
      }
    },
  );
};

module.exports.url = getUrls;
