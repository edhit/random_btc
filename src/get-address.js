const fs = require("fs");
const logger = require("./logger");
const { sendMessage } = require("./send-message");

exports.getAddress = async function (path) {
	try {
		const data = fs.readFileSync(path).toString().split("\n");

		return data;
	} catch (error) {
		await sendMessage(error);
		logger.error(error);
		return false;
	}
};
