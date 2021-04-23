const altsImagesExtractor = (content) => {
  if (!content) return [];

  let arrayImagesAlts = [];
  const regFindImgAlt = /<img.*?alt="(.*?)".*?>/g;

  for (const match of content.matchAll(regFindImgAlt)) {
    if (match[1]) {
      arrayImagesAlts.push(match[1]);
    }
  }
  return arrayImagesAlts.join("; ");
}

module.exports = altsImagesExtractor;