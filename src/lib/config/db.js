import mongoose from 'mongoose';
import { AppConfig } from './appConfig.js';
/* 
export const connect = async () => {
	return await connectWithUrl(config.dbUrl);
};
 */
export const connect = async (connectionUrl) => {
	if (!connectionUrl || connectionUrl == '') {
		throw Error('No connection string provided');
	}
	await mongoose.connect(connectionUrl, {
		serverSelectionTimeoutMS: 10000,
		connectTimeoutMS: 5000,
		minPoolSize: 5,
		maxPoolSize: 100,
		autoCreate: true,
		autoIndex: true
	});
	return mongoose.connection;
};

//mongoose.set('debug', config.logQueries);
try {
	console.log('Establishing DB connection ... ' + AppConfig.dbUrl);
	connect(AppConfig.dbUrl);
} catch (err) {
	console.log('Error connecting to DB %s', +AppConfig.dbUrl, err);
	process.exit(1);
}
