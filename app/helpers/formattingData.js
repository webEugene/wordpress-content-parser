const cheerio = require('cheerio');
const typePagesList = ['home', 'single', 'page', 'archive'];

const formattingData = (data, criteria, link) => {
  const $ = cheerio.load(data, {
    decodeEntities: false,
  });
  const bodyClass = $('body').attr('class');

  if (bodyClass === 'undefined') throw new Error(`Parsing page ${link} has been missed! Status: 404`);

  const currentPage = typePagesList.find((item) => bodyClass.split(" ").includes(item));
  let titleTmp = $(criteria[0].title).html();
  let descriptionTmp = $(criteria[0].description).attr('content');
  let h1Title = $(criteria[0][currentPage].h1).html().trim();
  let content = criteria[0][currentPage].content.map((contentClass) => {
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

  return {
    'Date time': new Date().toLocaleString(),
    'Page Type': currentPage,
    'Parsing Link': link,
    'Meta Title': cheerioRules.title,
    'Meta Description': cheerioRules.description,
    'Main Title h1': cheerioRules.h1Title,
    'Main content': `<div class='content-wrapper'>${cheerioRules.content}</div>`,
  }
};

module.exports = formattingData;