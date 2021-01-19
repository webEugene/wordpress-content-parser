const { URL } = require('url');
const fs = require('fs');

const regex = new RegExp('^([^.]+)');

const defaultScrapingCriteria = {
  pageType: 'pageType',
  title: 'title',
  description: 'meta[name="description"]',
  home: {
    h1: 'h1',
    content: ['div.content-bl'],
  },
  page: {
    h1: 'h1',
    content: ['div.content-bl'],
  },
  single: {
    h1: 'h1',
    content: ['div.content-bl'],
  },
  archive: {
    h1: 'h1',
    content: ['div.content-bl'],
  },
  default: {
    h1: 'h1',
    content: ['div.content-bl'],
  },
};

const criteriaGenerator = (data) => {
  if (!data) throw new Error(`Url was not received!`);
  const parseDomain = new URL(data).host;
  const hostName = parseDomain.match(regex)[0];

  fs.writeFile(`./app/criteria/${hostName}.json`, JSON.stringify(defaultScrapingCriteria, null, 1), (err) => {
    if (err) throw new Error(`${err.message}`);

    console.log('*'.repeat(50));
    console.log(`Criteria for ${hostName} has been created!`);
    console.log('*'.repeat(50));
  });

};

module.exports = criteriaGenerator;