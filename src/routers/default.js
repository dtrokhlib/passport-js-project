import express from 'express';
import passport from 'passport';
import { userRegister } from '../controllers/default.js';
const defaultRouter = express.Router();
import { checkAuthenticated, checkNotAuthenticated } from '../middlewares/auth-middleware.js';

defaultRouter.get('/', checkAuthenticated, (req, res) => {
	res.render('index.ejs', {
		name: 'User' || req.user.name,
		user: req.user | null,
	});
});

// LOGIN ROUTES
defaultRouter.get('/login', checkNotAuthenticated, (req, res) => {
	res.render('login.ejs');
});

defaultRouter.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true,
	}),
);

// REGISTER ROUTES
defaultRouter.get('/register', checkNotAuthenticated, (req, res) => {
	res.render('register.ejs');
});

defaultRouter.post('/register', userRegister);

//LOGOUT ROUTES
defaultRouter.delete('/logout', (req, res) => {
	req.logOut();
	res.redirect('/login');
});

export { defaultRouter };
