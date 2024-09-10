import winston from 'winston';
import { config } from '$config/config.js';
import { format as _format, transports, createLogger } from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, align, printf, errors } = _format;

const fileRotateTransport = new winston.transports.DailyRotateFile({
	filename: 'app-%DATE%.log',
	datePattern: 'YYYY-MM-DD',
	maxSize: '10m',
	maxFiles: '7d',
	dirname: config.logdir
});

const logFormat = combine(
	errors({ stack: true }),
	timestamp(),
	align(),
	printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
);

fileRotateTransport.on('rotate', function (oldFilename, newFilename) {
	logger.info({ message: 'New Logger file created: ' + newFilename });
});

export const logger = new createLogger({
	transports: [
		new winston.transports.Console({
			format: logFormat,
			transports: [new transports.Console()]
			//transports: [fileRotateTransport, new transports.Console()]
		})
	],
	format: _format.combine(logFormat)
});
