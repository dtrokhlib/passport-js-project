import { App } from './app.js';
import { databaseConnector } from './mongoose/db.js';
import { config } from 'dotenv';
async function main() {
	config();
	const app = new App(new databaseConnector());
	await app.init();
}

main();
