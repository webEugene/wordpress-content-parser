const { existsSync, readdirSync, statSync, unlinkSync } = require('fs');

const removeDirFiles = (folder) => {
  if (!existsSync(folder)) {
    console.log(`Directory path ${folder} not found.`);
    return false;
  }

  const files = readdirSync(folder);
  if (files.length === 0) {
    console.log(`No files found in the directory ${folder}.`);
    return false;
  }

  files.forEach((filename) => {
    if (statSync(`${folder}/${filename}`).isDirectory()) {
      removeDirFiles(`${folder}/${filename}`);
    } else {
      unlinkSync(`${folder}/${filename}`);
    }
  });
  console.log('*'.repeat(50));
  console.log(`cleaning folder ${folder} has been finished!`);
  console.log('*'.repeat(50));
};

module.exports = removeDirFiles;