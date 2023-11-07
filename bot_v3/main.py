
import os
import json
from telebot import TeleBot
from dotenv import load_dotenv
from selenium import webdriver

from utils.commands import commands
from utils.scrapper import create_keyword_string
load_dotenv()

bot = TeleBot(os.environ.get("BOT_TOKEN_ONE"), parse_mode="HTML")


@bot.message_handler(commands=["start"])
def start_handler(message):
    chat_id = message.from_user.id
    if message.from_user.first_name == "no" and message.from_user.last_name == "witness":
        bot.set_my_commands(commands=commands)
        bot.send_message(chat_id, "Hello sir")
        return
    bot.send_message(chat_id, "hello from demo python server")


# handler saving today keywords
@bot.message_handler(commands=["fetch_from_amazon"])
def fetch_from_amazon_handler(message):
    chat_id = message.from_user.id
    keywords = []
    if message.text:
        msg = message.text.split(" ", 1)[1].split(",")
        reader = open(os.path.join(os.getcwd(), "bot_v3",
                      "data", "search.json"), "r")
        search_content = json.load(reader.read())
        # with open(os.path.join(os.getcwd(),"bot_v3","data","search.json")) as search_file_reader:
        #     pass
        # for kw in search_content:

        # see if already searched
        # if yes then give it a priority number
        # if no then give it priority number and write it to search file

    bot.send_message(chat_id, "no keywords provided")


# handler for stop messaging
# handler to get saved files


if __name__ == "__main__":
    print("bot started")
    bot.infinity_polling()
