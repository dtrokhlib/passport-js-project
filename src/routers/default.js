import express from 'express';
import passport from 'passport';
import { userRegister } from '../controllers/default.js';
const defaultRouter = express.Router();

defaultRouter.get('/', (req, res) => {
	res.render('index.ejs', {
		name: 'Dmitriy',
	});
});

// LOGIN ROUTES
defaultRouter.get('/login', (req, res) => {
	res.render('login.ejs');
});

defaultRouter.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
		flash: true,
	}),
);

// REGISTER ROUTES
defaultRouter.get('/register', (req, res) => {
	res.render('register.ejs');
});

defaultRouter.post('/register', userRegister);

export { defaultRouter };
