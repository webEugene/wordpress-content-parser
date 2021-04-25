const { existsSync, mkdirSync } = require('fs');

/**
 * Create new folder
 *
 * @param folderName
 */
const createFolder = (folderName) => {
  try {
    if (!existsSync(folderName)) {
      mkdirSync(folderName);
      console.log(`New directory ${folderName} successfully created.`);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = createFolder;
