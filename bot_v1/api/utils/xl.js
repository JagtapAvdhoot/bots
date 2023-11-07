const path = require("path");
const xlsx = require("xlsx");
const fs = require("fs");
const { stopFunction } = require("./functions");

const columns = [
  "Index",
  "Title",
  "Price",
  "Discount",
  "Star",
  "Review",
  "Link",
  "Image",
];

exports.writeFileWithName = async (name, data) => {};

const saveFolder = path.join(__dirname + "/build/xlsx/");

exports.convertJsonToXlsx = async (jsonData, filename) => {
  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.json_to_sheet(jsonData);
  xlsx.utils.book_append_sheet(workbook, worksheet, "amazon_products");
  xlsx.writeFile(workbook, saveFolder + filename);
  await stopFunction(1000);
  return true;
};

exports.readXlFile = (path) => {
  let data = [],
    file;
  file = xlsx.readFile(path);

  if (!file) return false;

  const temp = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]); // only read first sheet in file
  temp.forEach((res) => {
    data.push(res);
  });

  if (!data) return false;

  return data;
};
