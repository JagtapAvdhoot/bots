require("dotenv").config();

const { Bot, webhookCallback } = require("grammy");

const functions = require("firebase-tools");

const commands = require("./utils/commands");

const bot = new Bot(process.env.BOT_TOKEN_ONE);
// const messageBot = new Bot("")

bot.command("start", async (ctx) => {
  try {
    if (ctx.from.first_name === "no" || ctx.from.last_name === "witness") {
      await bot.api.setMyCommands(commands);
      return await ctx.reply("hello master...");
    }
  } catch (error) {
    await ctx.reply("some error occurred");
  }
});

async function start() {
  const webhookInfo = await bot.api.getWebhookInfo();
  console.log(webhookInfo, "web hook info");
  //   process.env.WEBHOOK_URL
}

// start();
// bot
//   .start()
//   .then(() => {
//     console.log("bot running..");
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// export default webhookCallback(bot, "https");
export const helloWorld = functions.https.onRequest(webhookCallback(bot));
