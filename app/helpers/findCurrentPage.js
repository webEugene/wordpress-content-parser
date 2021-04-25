const typePagesList = ['home', 'single', 'page', 'archive'];
/**
 * Find current page
 *
 * @param bodyClass
 * @returns {string}
 */
const findCurrentPage = (bodyClass) => {
  return typePagesList.find((item) => bodyClass.split(' ').includes(item)) ?? 'default';
};

module.exports = findCurrentPage;
