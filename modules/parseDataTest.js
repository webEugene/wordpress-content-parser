const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

const defaultScrapingCriterias = {
  datetime: 'datetime',
  link: 'link',
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
    h1: 'h1.page-title',
    content: ['div.content-bl'],
  },
  default: {
    h1: 'h1',
    content: ['div.content-bl'],
  },
};

const dataUrls = JSON.parse(
  fs.readFileSync('./sitemap-urls.json', {
    encoding: 'utf8',
    flag: 'r',
  }),
);

const data = [];

let interval = setInterval(
  (gen) => {
    const { value, done } = gen.next();
    const d = new Date();

    if (done) {
      clearInterval(interval);
    } else {
      let pages = {};
      let h1 = '';
      let title = '';
      let description = '';
      let pageType = '';
      let content = '';
      let alts = '';

      axios
        .get(value)
        .then((response) => {
          const $ = cheerio.load(response.data, {
            decodeEntities: false,
          });

          const cheerioRules = {
            title: $(defaultScrapingCriterias.title).html()
              ? $(defaultScrapingCriterias.title).html().trim()
              : 'Title is missing!',
            description: $(defaultScrapingCriterias.description).attr(
              'content',
            )
              ? $(defaultScrapingCriterias.description)
                  .attr('content')
                  .trim()
              : 'Description is missing!',
          };

          let bodyClass = $('body').attr('class');

          const typePagesList = ['home', 'single', 'page', 'archive'];

          const currentPageArr = typePagesList.filter(function (
            item,
          ) {
            return bodyClass.includes(item);
          });

          // const capitalize = (s) => {
          //   if (typeof s !== 'string') return ''
          //   return s.charAt(0).toUpperCase() + s.slice(1)
          // }

          let currentPage = (pageName) => {
            if (pageName.length === 0 && !pageName) return '';
            return pageName[0].toString();
          };

          if (
            0 !== currentPageArr.length &&
            currentPage(currentPageArr)
          ) {
            const pageName = currentPage(currentPageArr);
            pageType = pageName;
            h1 = $(defaultScrapingCriterias[pageName].h1).html()
              ? $(defaultScrapingCriterias[pageName].h1).html().trim()
              : '';
            title = cheerioRules.title;
            description = cheerioRules.description;
            content = defaultScrapingCriterias[pageName].content
              .map((contentClass) => {
                return $(contentClass).html()
                  ? $(contentClass)
                      .html()
                      .trim()
                      .replace(/\s\s+/g, '')
                  : '';
              })
              .join(' ');
          } else {
            pageType = 'unknown page type';
            h1 = $(defaultScrapingCriterias.default.h1).html()
              ? $(defaultScrapingCriterias.default.h1).html().trim()
              : '';
            title = cheerioRules.title;
            description = cheerioRules.description;
            content = defaultScrapingCriterias.default.content
              .map((contentClass) => {
                return $(contentClass).html()
                  ? $(contentClass)
                      .html()
                      .trim()
                      .replace(/\s\s+/g, '')
                  : '';
              })
              .join(' ');
          }

          if (content) {
            let imgsArray = [];
            const regFindImg = /<img[^>]*[^>]*>/g;
            for (const match of content.matchAll(regFindImg)) {
              if ($(match[0]).attr('alt')) {
                imgsArray.push($(match[0]).attr('alt'));
              }
            }
            alts = imgsArray.join('; ');
          }

          pages = {
            Datetime: d.toLocaleString(),
            'Page Type': pageType,
            'Parsing Link': value,
            'Meta Title': title,
            'Meta Description': description,
            H1: h1,
            'Main content': `<div class="wrapper">${content}</div>`,
            'Content Images Alt': alts,
          };

          data.push(pages);
          // console.log(pages);

          console.log(
            `Parsing page ${value} is finished! Status: ${response.status}`,
          );
        })
        .catch(function (error) {
          pages = {
            Datetime: d.toLocaleString(),
            'Page Type': '404',
            'Parsing Link': value,
            'Meta Title': '',
            'Meta Description': '',
            H1: '',
            'Main content': '',
            'Content Images Alt': '',
          };

          data.push(pages);
          // handle error
          console.log(
            `Status: ${error.response.status}. Parsing page ${value} was missed!`,
          );
        });
    }
  },
  1000,
  dataUrls[Symbol.iterator](),
);

module.exports.parsing = interval;
