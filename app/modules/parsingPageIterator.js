const axios = require('axios');
const dataUrls = require('../static/sitemapUrls.json');
const saveToStorageModule = require('./saveToStorage');
const getSiteCriteria = require('./getSiteCriteria');
const formattingData = require('./formattingData');
const gatherData = [];

/**
 *  Start parsing data
 */
const startParsing = () => {

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

            let getFormattedData = formattingData(response.data, siteCriteria, value);

            gatherData.push(getFormattedData);
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
};

module.exports = startParsing;
