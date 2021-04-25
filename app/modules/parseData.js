const dataUrls = require('../static/sitemapUrls.json');
const iterateParsing = require('./parsingPageIterator');

/**
 * Parsing data main method
 */
const parsing = () => {
  if(!!dataUrls.length){
    iterateParsing();
  }else{
    console.log('*'.repeat(50));
    console.log('sitemapUrls.json is empty!');
    console.log('*'.repeat(50));
  }
}

module.exports = parsing;
