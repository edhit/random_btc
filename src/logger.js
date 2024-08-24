const pino = require("pino");
const logger = pino({
	transport: {
		targets: [
			{ target: "pino-pretty" },
			{
				target: "pino/file",
				options: {
					destination: "./app.log",
				},
			},
		],
	},
});

module.exports = logger;
