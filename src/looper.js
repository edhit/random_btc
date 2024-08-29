const CoinKey = require("coinkey");
const moment = require("moment");
const { getSpeed } = require("./get-speed");
const { checkAsOject, checkAsArray } = require("./check");

const attempt = process.env.ATTEMPT ? process.env.ATTEMPT : 100000;

const speed = {
	sec: moment().format("ss"),
	count: 0,
};

exports.asObjectTest = async function (data) {
	for (let index = 0; index < attempt; index++) {
		await getSpeed(index, speed);
		let ck = new CoinKey.createRandom();
		await checkAsOject(data, ck);
		ck.compressed = false;
		await checkAsOject(data, ck);
	}
};

exports.asArrayTest = async function (data) {
	for (let index = 0; index < attempt; index++) {
		await getSpeed(index, speed);
		let ck = new CoinKey.createRandom();
		await checkAsArray(data, ck);
		ck.compressed = false;
		await checkAsArray(data, ck);
	}
};

exports.asObject = async function (data) {
	for (let index = 0; index < attempt; index++) {
		let ck = new CoinKey.createRandom();
		await checkAsOject(data, ck);
		ck.compressed = false;
		await checkAsOject(data, ck);
	}
};

exports.asArray = async function (data) {
	for (let index = 0; index < attempt; index++) {
		let ck = new CoinKey.createRandom();
		await checkAsArray(data, ck);
		ck.compressed = false;
		await checkAsArray(data, ck);
	}
};
