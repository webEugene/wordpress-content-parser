const sitemapParse = require('./helpers/sitemapUrlsParse');
const startParsingTest = require('./helpers/parseData');

const init = (url, action) => {
  console.log(action);
    switch (action) {
      case 'gs':
        sitemapParse.url(url);
        break;
      case 'parse':
        startParsingTest();
        break;
  }
}

module.exports.init = init;
