const fs = require('fs');
const path = require('path');
const sitemapParse = require('./modules/sitemapUrlsParse');
const pathJsonFile = './sitemap-urls.json';

const scriptRunning = process.env.npm_lifecycle_event;

// Start test parse script
if (scriptRunning === 'test') {
  const startParsingTest = require('./modules/parseDataTest');
  startParsingTest.parsing;
}
// Start test parse script
if (scriptRunning === 'gs') {
  const xmlUrl = process.argv[2];

  if (xmlUrl) {
    const xmlReg = /.xml/gm;
    if (!xmlReg.test(xmlUrl)) {
      console.error('Wrong xml url!');
    }
    sitemapParse.url(xmlUrl.toString().split(', '));
  }
}

if (scriptRunning === 'parse') {
  const startParsingTest = require('./modules/parseData');
  startParsingTest.parsing;
}
