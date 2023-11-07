require("dotenv").config();
const { Telegraf } = require("telegraf");

const { fetchFromAmazon } = require("./utils/puppeteer");
const commands = require("./utils/commands");
const fs = require("fs");
const { sendProduct } = require("./utils/message");
const { stopFunction, getRandomNumber } = require("./utils/functions");

let intervalId;

const bot = new Telegraf(process.env.TELEGRAM_BOT_ONE_TOKEN, {
  polling: true,
});

const botTwo = new Telegraf(process.env.TELEGRAM_BOT_TWO_TOKEN, {
  polling: true,
});

// bot.setWebHook("https://telebot-hdgc9btxk-jagtap.vercel.app");
// bot.launch();

// const express = require("express");
// const app = express();

// app.get("/", (req, res) => {
//   res.send("<h1>Demo</h1>");
// });
// app.use(bot.webhookCallback(process.env.VERCEL_DEPLOY_URL));
async function start() {
  bot.command("start", async (msg) => {
    try {
      if (msg.from.first_name === "no" || msg.from.last_name === "witness") {
        await bot.telegram.setMyCommands(commands);
        return await bot.telegram.sendMessage(msg.chat.id, `Hello sir...`);
      }
    } catch (error) {
      console.log(error);
    }
  });

  bot.command("fetch_from_amazon", async (msg) => {
    const haveSearched = fs.readFileSync("./data/db.json");

    const haveSearchedData = JSON.parse(haveSearched);

    for (let keyword in haveSearchedData) {
      await stopFunction(60000);

      const data = await fetchFromAmazon(
        haveSearchedData[keyword].search,
        Number(haveSearchedData[keyword].pages)
      );

      if (data == [] || !data)
        return bot.telegram.sendMessage(
          msg.chat.id,
          "no data abort. try again"
        );
      await bot.telegram.sendMessage(
        msg.chat.id,
        `Fetched ${haveSearchedData[keyword].search}`
      );

      const prods = fs.readFileSync("./data/products.json");
      let _prods = JSON.parse(prods);
      const today = new Date().toLocaleDateString();

      haveSearchedData[keyword].pages = haveSearchedData[keyword].pages + 1;

      if (!_prods[today]) {
        _prods[today] = data;
      } else {
        _prods[today] = [..._prods[today], ...data];
      }

      fs.writeFileSync("./data/products.json", JSON.stringify(_prods));
      fs.writeFileSync("./data/db.json", JSON.stringify(haveSearchedData));
    }
  });

  bot.command("send_temp_dir", async (message) => {
    const tempDir = "./temp/";
    const files = fs.readdirSync(tempDir);
    console.log("index.js:55", files);
    for (let file of files) {
      await bot.sendDocument(message.chat.id, `${tempDir}${file}`);
    }
    await bot.telegram.sendMessage(message.chat.id, `done 👍`);
  });

  bot.command("delete_temp_files", async (message) => {
    const tempDir = "./temp/";
    const files = fs.readdirSync(tempDir);
    for (let file of files) {
      fs.unlinkSync(`${tempDir}${file}`);
    }
    await bot.telegram.sendMessage(message.chat.id, `done 👍`);
  });

  bot.command("reset_files", async (message) => {
    fs.writeFileSync("./data/db.json", JSON.stringify([]));
    fs.writeFileSync("./data/products.json", JSON.stringify({}));
  });

  bot.command("note_keywords", async ({ chat }) => {
    await bot.telegram.sendMessage(
      chat.id,
      "send key words if multiple use , to separate them."
    );

    bot.on("message", async (msg) => {
      let _keyword = msg.text.split(", ");
      _keyword = _keyword.map((item) => item.replaceAll(" ", "+"));
      const haveSearched = fs.readFileSync("./data/db.json");

      const haveSearchedData = JSON.parse(haveSearched);
      console.log(haveSearched, haveSearchedData, _keyword);

      for (let words of _keyword) {
        console.log(words);
        const keyword = _keyword.findIndex((item) => item.search === words);

        if (keyword !== -1) {
          haveSearchedData[keyword].pages = Number(
            haveSearchedData[keyword].pages + 1
          );
          fs.writeFileSync("./data/db.json", JSON.stringify(haveSearchedData));
        } else {
          haveSearchedData.push({
            search: words,
            pages: 1,
            time: Date.now(),
          });
        }
      }

      fs.writeFileSync("./data/db.json", JSON.stringify(haveSearchedData));

      bot.removeAllListeners("message");
    });
  });

  bot.command("start_message", async (chat) => {
    const prodFile = fs.readFileSync("./data/products.json");

    const prodContent = JSON.parse(prodFile);
    const today = new Date().toLocaleDateString();
    await bot.telegram.sendMessage(chat.chat.id, "message started");

    if (!intervalId) {
      intervalId = setInterval(() => {
        const randomInt = getRandomNumber(0, prodContent[today].length);
        const prod = prodContent[today][randomInt];
        sendProduct(bot, chat, prod);
        botTwo.telegram.sendMessage(
          "1001726925930",
          `Buy ${prod.title.substring(0, 50)} \nat just @${
            prod.price
          } \nTotal ${prod.discount} discount \n[Buy now!](${prod.link})`,
          {
            parse_mode: "Markdown",
            disable_web_page_preview: true,
          }
        );
      }, 978000);
    }
  });

  bot.command("stop_message", async ({ chat }) => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    await bot.telegram.sendMessage(chat.id, "message stopped");
  });

  // await bot.telegram.setWebhook(process.env.VERCEL_DEPLOY_URL);
  await bot.launch();
}

start()
  .then((_data) => {
    console.log("running");
  })
  .catch((error) => {
    console.log(error);
  });
module.exports = start;
// app.listen(3001, () => {
//   console.log("running");
// });
