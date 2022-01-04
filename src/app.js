import express from 'express';
import path from 'path';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { authenticateUser } from './passport/passport-config.js';
import { fileURLToPath } from 'url';
import { defaultRouter } from './routers/default.js';
import flash from 'express-flash';
import session from 'express-session';
import { UserModel } from './mongoose/userModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class App {
	app;
	server;
	port;
	databaseConnector;

	constructor(databaseConnector) {
		this.app = express();
		this.port = process.env.PORT;
		this.databaseConnector = databaseConnector;
	}

	applicationSet() {
		this.app.set('view-engine', 'ejs');
		this.app.set('views', path.join(__dirname, '/views'));
	}

	applicationUse() {
		this.app.use(flash());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(express.json());
		this.app.use(
			session({
				secret: process.env.SESSION_SECRET,
				resave: false,
				saveUninitialized: false,
			}),
		);
		this.app.use(passport.initialize());
		this.app.use(passport.session());
	}

	userRouters() {
		this.app.use(defaultRouter);
	}

	useMiddlewares() {}

	passportSetup() {
		passport.use(new Strategy({ usernameField: 'email' }, authenticateUser));
		passport.serializeUser((user, done) => {
			done(null, user.id);
		});
		passport.deserializeUser(async (id, done) => {
			UserModel.findById(id, (err, user) => {
				done(err, user);
			});
		});
	}

	init() {
		this.applicationSet();
		this.applicationUse();
		this.passportSetup();
		this.userRouters();
		this.useMiddlewares();

		this.server = this.app.listen(this.port);
		this.databaseConnector.init();
	}

	close() {
		this.server.close();
	}
}
