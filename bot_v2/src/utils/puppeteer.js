const cheerio = require("cheerio");
const axios = require("axios");
const UserAgent = require("user-agents");
const { readFile } = require("./fs");
const path = require("path");
const { generateRandomIP } = require("./functions");

const AMAZON_URL = "https://amazon.com";

exports.createKeywords = (str) => {
  if (!str) return;
  let arrayOfWords;
  arrayOfWords = str.split(",");

  arrayOfWords = arrayOfWords.map((item) => item.trim());

  return arrayOfWords;
};

// exports.fetchFromAmazon = async (keyword, page) => {
//   try {
//     const browser = await puppeteer.launch();
//
//     const page = await browser.newPage();
//
//     await page.goto(AMAZON_URL + "/s?k=" + keyword);
//
//     await page.waitForSelector(
//       ".s-main-slot.s-result-list.s-search-results.sg-row",
//     );
//     const data = await page.$eval(
//       ".s-main-slot.s-result-list.s-search-results.sg-row",
//       (element) => extractData(element),
//     );
//
//     console.log(data);
//
//     // for (let a = 0; a < page; a++) {}
//   } catch (error) {
//     console.log(error, "error from fetching amazon products");
//   }
// };

// const extractData = (parentElement) => {
//   let data = [];
//   try {
//     const elements = parentElement.querySelectorAll(
//       '[data-component-type="s-search-result"]',
//     );
//
//     for (let element of elements) {
//       const product = {
//         title: "",
//         price: "",
//         discount: "",
//         mrp: "",
//         rating: "",
//         star: "",
//       };
//
//       let title = element.querySelector(
//         ".a-size-base-plus.a-color-base.a-text-normal",
//       ).innerText;
//       let price = element.querySelector(
//         ".a-price > span.a-price-whole",
//       ).innerText;
//       let discount = element.querySelector("span.a-letter-space").nextSibling
//         .innerText;
//       let mrp = element.querySelector(
//         ".a-price.a-text-price > span.a-offscreen",
//       ).innerText;
//       let rating = element.querySelector(
//         ".a-link-normal.s-underline-text.s-underline-link-text.s-link-style > .a-size-base.s-underline-text",
//       ).innerText;
//       let star = element.querySelector(".a-row.a-size-small").firstChild
//         .ariaLabel;
//
//       if (!title) {
//         title = element.querySelector("");
//         product["title"] = title;
//       }
//
//       if (price) {
//         product["price"] = price;
//       }
//
//       if (discount) {
//         product["discount"] = discount;
//       }
//
//       if (mrp) {
//         product["mrp"] = mrp;
//       }
//
//       if (rating) {
//         product["rating"] = rating;
//       }
//
//       if (star) {
//         product["star"] = star;
//       }
//       console.log("product", product, "product");
//       if (!title || !price || !discount || !mrp || !rating || !star) return;
//
//       data.push(product);
//     }
//
//     return data;
//   } catch (error) {
//     console.log(error, "from extract data");
//   }
// };
//
exports.fetchFromAmazon = async (keyword) => {
  try {
    const pageInt = Math.floor(Math.random() * 10) + 1;
    const searchJson = readFile(
      path.join(process.cwd(), "src", "data", "search.json"),
    );
    console.log(pageInt, searchJson, "page int");
    const _keywordObj = searchJson.find((item) => item.word === keyword);
    const _keyword = keyword.split(" ").join("+");
    // const _page = Number(_keywordObj.page);
    console.log(_keywordObj, "some shit");
    // const randomInt = Math.floor(Math.random() * searchJson.length);

    // for (let o = _page; o < pageInt + 1; o++) {
    const userAgent = new UserAgent();
    const axiosConfig = {
      proxy: {
        host: generateRandomIP(),
        port: 80,
      },
      headers: {
        "User-Agent": userAgent.data,
      },
    };

    console.log(userAgent, "axios");

    axios.default
      .get(AMAZON_URL + `/s?k=${_keyword}` + `&page=${2}`, axiosConfig)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error, "from axios fetch from amazon okay");
      });
    // }
    // update page in search.json;
  } catch (error) {
    console.log(error, "from extract data");
  }
};
