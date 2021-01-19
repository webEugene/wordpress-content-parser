const sitemapParse = require('./helpers/sitemapUrlsParse');
const startParsingTest = require('./helpers/parseData');

class ActionFactory {
  create(action, url = '') {
    if(action === 'gs'){
      return sitemapParse.url(url);
    }
    if(action === 'parse'){
      return startParsingTest();
    }
  }
}

const factory = new ActionFactory();

const init = (xmlUrl, scriptRunning) => {
  factory.create(scriptRunning, xmlUrl);
}

module.exports.init = init;
