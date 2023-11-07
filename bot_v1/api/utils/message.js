exports.sendProduct = async (bot, chat, prod) => {
  if (prod.link.search("sspa") === -1) {
    await bot.sendMessage(
      chat.chat.id,
      `Buy ${prod.title.substring(0, 50)} \nat just @${prod.price} \nTotal ${
        prod.discount
      } discount \n[Buy now!](${prod.link})`,
      {
        parse_mode: "Markdown",
        disable_web_page_preview: true,
      }
    );
  }
};
