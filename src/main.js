require("dotenv").config();

const moment = require("moment");
const { getAddress } = require("./get-address");
const { sendMessage } = require("./send-message");
const { asObject, asArray, asObjectTest, asArrayTest } = require("./looper");
const logger = require("./logger");

const faster = process.env.FASTER ? process.env.FASTER : 1;
const dev = process.env.DEV ? process.env.DEV : true;
const path_data = process.env.PATH_DATA ? process.env.PATH_DATA : "./data.txt";

const start = moment();

exports.main = async function () {
	try {
		const data = await getAddress(path_data);
		const set = new Set(data);

		if (parseInt(dev) === 1) {
			if (parseInt(faster) === 1) {
				logger.info("MODE: DEVELOP | DATA: OBJECT");
				await asObjectTest(set);
			} else {
				logger.info("MODE: DEVELOP | DATA: ARRAY");
				await asArrayTest(data);
			}
		} else {
			if (parseInt(faster) === 1) {
				await asObject(set);
			} else {
				await asArray(data);
			}
		}

		const date = moment().format("MMM Do YY, h:mm:ss");
		const night = moment().format("H");

		logger.info(
			`${date} | ${moment.duration(moment().diff(start)).minutes()} min`
		);

		//if (parseInt(night) <= 1) {
			await sendMessage(date);
		//}
	} catch (error) {
		await sendMessage(error);
		logger.error(error);
		return false;
	}
};
