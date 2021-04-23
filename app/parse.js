const sitemapParse = require('./modules/sitemapUrlsParse');
const startParsingTest = require('./modules/parseData');

const init = (url, action) => {
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
