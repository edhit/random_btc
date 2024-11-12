const { Telegraf } = require("telegraf");

const token = process.env.TOKEN ? process.env.TOKEN : "token";
const chat_id = process.env.CHAT_ID ? process.env.CHAT_ID : 1;
const logger = require("./logger");

const bot = new Telegraf(token);

exports.sendMessage = async function (message) {
	try {
		await bot.telegram.sendMessage(chat_id, message);

		return true;
	} catch (error) {
		logger.error(error);
		return false;
	}
};
