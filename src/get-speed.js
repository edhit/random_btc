const moment = require("moment");
const logger = require("./logger");

exports.getSpeed = async function (index, speed) {
	let seconds = moment().format("ss");
	if (speed.sec !== seconds) {
		console.log(
			`${index}) ${index - speed.count} : ${moment().format(
				"MMM Do YY, h:mm:ss"
			)}`
		);
		speed.sec = seconds;
		speed.count = index;
	}

	return speed;
};
