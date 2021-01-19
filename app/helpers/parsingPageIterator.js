const cheerio = require('cheerio');
const axios = require('axios');
const dataUrls = require('../sitemap-urls.json');
const saveToStorageModule = require('./saveToStorage');
const gatherData = [];
const getSiteCriteria = require('./getSiteCriteria');
const typePagesList = ['home', 'single', 'page', 'archive'];

const startParsing = () => {
  if (!!dataUrls.length) {
    let interval = setInterval(
      (gen) => {

        const siteCriteria = getSiteCriteria(dataUrls[0]);
        const { value, done } = gen.next();

        if (done) {
          clearInterval(interval);
          saveToStorageModule(dataUrls[0], gatherData);
        } else {
          axios
            .get(value)
            .then((response) => {
              if (!response.data) throw new Error(`Parsing page ${value} has been missed! Status: 404`);

              const $ = cheerio.load(response.data, {
                decodeEntities: false,
              });
              const bodyClass = $('body').attr('class');

              if (bodyClass === 'undefined') throw new Error(`Parsing page ${value} has been missed! Status: 404`);

              const currentPage = typePagesList.filter((item) => bodyClass.split(' ').includes(item)).join(', ');
              let titleTmp = $(siteCriteria[0].title).html();
              let descriptionTmp = $(siteCriteria[0].description).attr('content');
              let h1Title = $(siteCriteria[0][currentPage].h1).html().trim();
              let content = siteCriteria[0][currentPage].content.map((contentClass) => {
                return $(contentClass).html()
                  ? $(contentClass)
                    .html()
                    .trim()
                    .replace(/\s\s+/g, '')
                  : '';
              }).join(' ');

              const cheerioRules = {
                title: titleTmp || 'Title is missing!',
                description: descriptionTmp || 'Description is missing!',
                h1Title: h1Title || 'h1 title is missing!',
                content: content || 'Content is missing!',
              };

              gatherData.push({
                'Date time': new Date().toLocaleString(),
                'Page Type': currentPage,
                'Parsing Link': value,
                'Meta Title': cheerioRules.title,
                'Meta Description': cheerioRules.description,
                'Main Title h1': cheerioRules.h1Title,
                'Main content': `<div class='content-wrapper'>${cheerioRules.content}</div>`,
              });
              console.log(
                `Parsing page ${value} is finished! Status: ${response.status}`,
              );
            }).catch((err) => {
            console.error(err.message);
          });
        }
      },
      1000,
      dataUrls[Symbol.iterator](),
    );
  }
};

module.exports = startParsing;