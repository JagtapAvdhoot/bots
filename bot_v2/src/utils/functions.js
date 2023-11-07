const { readFile, writeFile } = require("./fs");
const path = require("path");
const { createKeywords } = require("./puppeteer");

exports.updateSearchData = (keywords) => {
  // let currentDayData;
  try {
    const _keywords = createKeywords(keywords);
    const searchFilePath = path.join(
      process.cwd(),
      "src",
      "data",
      "search.json",
    );
    let staleSearchData = readFile(searchFilePath);
    // const today = new Date().toLocaleDateString();

    // if (Array.isArray(staleSearchData[today])) {
    //   currentDayData = staleSearchData[today];
    // } else {
    //   currentDayData = [];
    // }

    for (let keyword of _keywords) {
      const searchExists = staleSearchData.findIndex(
        (data) => data.text === keyword,
      );

      if (searchExists === -1) {
        staleSearchData.push({
          text: keyword,
          page: 1,
          lastSearch: Date.now(),
        });
      } else {
        staleSearchData[searchExists] = {
          page: staleSearchData[searchExists].page + 1,
          lastSearch: Date.now(),
        };
      }
    }

    // staleSearchData[today] = currentDayData;

    writeFile(searchFilePath, staleSearchData);
    return _keywords.join("+");
  } catch (error) {
    console.log(error, "from update search data");
  }
};

exports.generateRandomIP = () => {
  const segment = () => Math.floor(Math.random() * 256);
  const ipSegments = Array.from({ length: 4 }, segment);
  const ipAddress = ipSegments.join(".");
  return ipAddress;
};
