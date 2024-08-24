const CoinKey = require("coinkey");
const logger = require("./logger");
const fs = require("fs");

async function getAddress(path) {
	const data = fs.readFileSync(path).toString().split("\r\n");

	return data;
}

async function check(data, ck) {
	if (data.includes(`${ck.publicAddress}\\n`)) {
		console.log("Private Key (Wallet Import Format): " + ck.privateWif);
		console.log("Private Key (Hex): " + ck.privateKey.toString("hex"));
		console.log("Address: " + ck.publicAddress);
		logger.info("Private Key (Wallet Import Format): " + ck.privateWif);
		logger.info("Private Key (Hex): " + ck.privateKey.toString("hex"));
		logger.info("Address: " + ck.publicAddress);
	}
}

exports.main = async function (attempt = 1000000) {
	const data = await getAddress("./data.txt");
	const ck = new CoinKey.createRandom();

	for (let index = 0; index < attempt; index++) {
		await check(data, ck);
		ck.compressed = false;
		await check(data, ck);
	}
	const date = new Date().toString();

	console.log(date);
	logger.info(date);
};
