const typePagesList = ['home', 'single', 'page', 'archive'];

const findCurrentPage = (bodyClass) => {
  return typePagesList.find((item) => bodyClass.split(" ").includes(item)) ?? 'default';
}

module.exports = findCurrentPage;