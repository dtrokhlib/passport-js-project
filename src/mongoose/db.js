import mongoose from 'mongoose';

export class databaseConnector {
	mongodb_url;

	constructor() {
		this.mongodb_url = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/passport-js';
	}

	init() {
		mongoose.connect(this.mongodb_url, () => {
			console.log('Connection to db has been established');
		});
	}
}
