/**
 * Extract alts from images tag
 *
 * @param content
 *
 * @returns {string|*[]}
 */
const altsImagesExtractor = (content) => {
  if (!content) return 'Alts are missing!';

  let arrayImagesAlts = [];
  const regFindImgAlt = /<img.*?alt="(.*?)".*?>/g;

  for (const match of content.matchAll(regFindImgAlt)) {
    if (match[1]) {
      arrayImagesAlts.push(match[1]);
    }
  }
  return arrayImagesAlts.join('; ');
};

module.exports = altsImagesExtractor;
