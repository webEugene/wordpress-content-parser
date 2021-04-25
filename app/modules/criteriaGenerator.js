const { URL } = require('url');
const fs = require('fs');
const createFolder = require('./createFolder');
const Constants = require('../constants');

/**
 * Regular expression helps to extract only hostname below in the script.
 *
 * Ex: tester.test.com will be 'tester' or builder.com will be 'builder'
 *
 * @type {RegExp}
 */
const regex = new RegExp('^([^.]+)');

/**
 * Default criteria JSON
 *
 * @type {{single: {h1: string, content: [string]}, default: {h1: string, content: [string]}, pageType: string, description: string, archive: {h1: string, content: [string]}, page: {h1: string, content: [string]}, title: string, home: {h1: string, content: [string]}}}
 */
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

/**
 * Generator criteria
 *
 * @param data
 */
const criteriaGenerator = (data) => {
  if (!data) throw new Error(`Url was not received!`);
  const { host } = new URL(data);
  const hostName = host.match(regex)[0];

  createFolder(Constants.CRITERIA_DIR);

  fs.writeFile(`${Constants.CRITERIA_DIR}/${hostName}.json`, JSON.stringify(defaultScrapingCriteria, null, 1), (err) => {
    if (err) throw new Error(`${err.message}`);

    console.log('*'.repeat(50));
    console.log(`Criteria for ${hostName} has been created!`);
    console.log('*'.repeat(50));
  });

};

module.exports = criteriaGenerator;
