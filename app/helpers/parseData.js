const dataUrls = require('../sitemap-urls.json');
const iterateParsing = require('./parsingPageIterator');

const parsing = () => {
  if(!!dataUrls.length){
    iterateParsing();
  }else{
    console.log('*'.repeat(50));
    console.log('sitemap-urls.json is empty!');
    console.log('*'.repeat(50));
  }
}

module.exports = parsing;