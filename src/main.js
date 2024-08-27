require("dotenv").config();

const CoinKey = require("coinkey");
const { Telegraf } = require("telegraf");
const logger = require("./logger");
const fs = require("fs");
const moment = require("moment");

const token = process.env.TOKEN ? process.env.TOKEN : "token";
const chat_id = process.env.CHAT_ID ? process.env.CHAT_ID : 1;

const bot = new Telegraf(token);

async function sendMessage(message) {
	try {
		await bot.telegram.sendMessage(chat_id, message);
	} catch (error) {
		logger.error(error);
	}
}

async function getAddress(path) {
	try {
		const data = fs.readFileSync(path).toString().split("\n");

		return data;
	} catch (error) {
		await sendMessage(error);
		logger.error(error);
		return false;
	}
}

async function check(data, ck) {
	try {
		if (data.includes(`${ck.publicAddress}`)) {
			// console.log("Private Key (Wallet Import Format): " + ck.privateWif);
			// console.log("Private Key (Hex): " + ck.privateKey.toString("hex"));
			// console.log("Address: " + ck.publicAddress);
			logger.info("Private Key (Wallet Import Format): " + ck.privateWif);
			logger.info("Private Key (Hex): " + ck.privateKey.toString("hex"));
			logger.info("Address: " + ck.publicAddress);

			await bot.telegram.sendMessage(
				chat_id,
				`${ck.publicAddress} - ${
					ck.privateWif
				} - ${ck.privateKey.toString("hex")}`
			);
		}
	} catch (error) {
		await sendMessage(error);
		logger.error(error);
		return false;
	}
}

exports.main = async function (attempt = 1000000) {
	try {
		const data = await getAddress("./data.txt");
		if (!data) return false;

		for (let index = 0; index < attempt; index++) {
			let ck = new CoinKey.createRandom();
			await check(data, ck);
			ck.compressed = false;
			await check(data, ck);
		}

		const date = moment().format("MMM Do YY, h:mm:ss");
		const night = moment().format("H");

		logger.info(date);

		if (parseInt(night) <= 3) {
			await bot.telegram.sendMessage(chat_id, date);
		}
	} catch (error) {
		await sendMessage(error);
		logger.error(error);
		return false;
	}
};
