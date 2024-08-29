const logger = require("./logger");
const { sendMessage } = require("./send-message");

exports.checkAsArray = async function (data, ck) {
	try {
		if (data.includes(`${ck.publicAddress}`)) {
			console.log("Private Key (Wallet Import Format): " + ck.privateWif);
			console.log("Private Key (Hex): " + ck.privateKey.toString("hex"));
			console.log("Address: " + ck.publicAddress);
			logger.info("Private Key (Wallet Import Format): " + ck.privateWif);
			logger.info("Private Key (Hex): " + ck.privateKey.toString("hex"));
			logger.info("Address: " + ck.publicAddress);

			await sendMessage(
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
};

exports.checkAsOject = async function (data, ck) {
	try {
		if (data.has(`${ck.publicAddress}`)) {
			console.log("Private Key (Wallet Import Format): " + ck.privateWif);
			console.log("Private Key (Hex): " + ck.privateKey.toString("hex"));
			console.log("Address: " + ck.publicAddress);
			logger.info("Private Key (Wallet Import Format): " + ck.privateWif);
			logger.info("Private Key (Hex): " + ck.privateKey.toString("hex"));
			logger.info("Address: " + ck.publicAddress);

			await sendMessage(
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
};
