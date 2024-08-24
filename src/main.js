require("dotenv").config();

const CoinKey = require("coinkey");
const { Telegraf } = require("telegraf");
const logger = require("./logger");
const fs = require("fs");
const moment = require("moment");

const token = process.env.TOKEN ? process.env.TOKEN : "token";
const chat_id = process.env.CHAT_ID ? process.env.CHAT_ID : 1;

const bot = new Telegraf(token);

async function getAddress(path) {
	try {
		const data = fs.readFileSync(path).toString().split("\r\n");

		return data;
	} catch (error) {
		await bot.telegram.sendMessage(chat_id, error);
		return false;
	}
}

async function check(data, ck) {
	try {
		if (data.includes(`${ck.publicAddress}\\n`)) {
			console.log("Private Key (Wallet Import Format): " + ck.privateWif);
			console.log("Private Key (Hex): " + ck.privateKey.toString("hex"));
			console.log("Address: " + ck.publicAddress);
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
		await bot.telegram.sendMessage(chat_id, error);
		return false;
	}
}

exports.main = async function (attempt = 1000) {
	try {
		const data = await getAddress("./data.txts");
		if (!data) return false;

		for (let index = 0; index < attempt; index++) {
			let ck = new CoinKey.createRandom();
			await check(data, ck);
			ck.compressed = false;
			await check(data, ck);
		}
		const date = moment().format("MMM Do YY, h:mm:ss");

		console.log(date);
		logger.info(date);
	} catch (error) {
		await bot.telegram.sendMessage(chat_id, error);
		return false;
	}
};
