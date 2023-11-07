const puppeteer = require("puppeteer");
const Agent = require("user-agents");
const puppeteerAgent = require("puppeteer-extra-plugin-anonymize-ua");
const puppeteerRecaptcha = require("puppeteer-extra-plugin-recaptcha");
const puppeteerExtra = require("puppeteer-extra");
const Stealth = require("puppeteer-extra-plugin-stealth");
const { extractData, extractDataTwo } = require("./amazon");
const { stopFunction } = require("./functions");

// puppeteerExtra.use(puppeteerRecaptcha());

exports.convertToKeyword = (search) => {
  return search.split(" ").join("+");
};

const amazonBaseUrl = "https://www.amazon.in";

exports.fetchFromAmazon = async (keywords, limit = 5) => {
  const results = [];
  try {
    puppeteerExtra.use(Stealth());
    puppeteerExtra.use(puppeteerAgent());

    // // Ignore the certificate
    // process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

    const browser = await puppeteerExtra.default.launch({
      headless: true,
    });

    const page = await browser.newPage();

    // for (let i = 1; i < limit; i++) {
    const int = Math.floor(Math.random() * (9000 - 6000 + 1)) + 6000;
    await stopFunction(int);

    await page.goto(`${amazonBaseUrl}/s?k=${keywords}&page=${page}`);

    const retrievedOne = await extractDataTwo(page);

    results.push(retrievedOne);
    // }

    await browser.close();

    const flatArray = results.flatMap((item) => item);
    const filteredArray = flatArray.filter((item) => item.title !== "");

    return filteredArray;
  } catch (error) {
    console.log("puppeteer.js:37", error);
  }
};

exports.fetchAffiliateLinks = async (data) => {
  try {
    // puppeteerExtra.use(Stealth());
    // puppeteerExtra.use(puppeteerAgent());

    // process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

    const browser = await puppeteer.default.launch({
      executablePath:
        "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe",
      // userDataDir:"C:/Users/Admin/AppData/Local/BraveSoftware/Brave-Browser/User Data/",
      headless: false,
      ignoreDefaultArgs: true,
      args: [
        "--user-data-dir=C:/Users/Admin/AppData/Local/BraveSoftware/Brave-Browser/User Data/",
      ],
    });
    browser.userAgent = new Agent({
      platform: "Win32",
    });
    const page = await browser.newPage();
    await page.goto(amazonBaseUrl);
  } catch (error) {
    console.log("puppeteer.js: from fetch affiliate", error);
  }
};
