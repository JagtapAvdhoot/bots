const fs = require("fs");

exports.readFile = (pathToFile) => {
  try {
    const data = fs.readFileSync(pathToFile, {
      encoding: "utf8",
    });
    return JSON.parse(data);
  } catch (error) {
    console.log(error, "error while reading file");
    return false;
  }
};

exports.writeFile = (pathToFile, data, encoding) => {
  try {
    fs.writeFileSync(pathToFile, JSON.stringify(data));
    return true;
  } catch (error) {
    console.log(error, "while writing file");
    return false;
  }
};

exports.changePages = (pathToFile, pageCount, keyword) => {
  try {
    let fileContent = fs.readFileSync(pathToFile, {
      encoding: "utf8",
    });

    fileContent = JSON.parse(fileContent);

    const keywordIndex = fileContent;
  } catch (error) {
    console.log(error, "from changing page function");
  }
};
