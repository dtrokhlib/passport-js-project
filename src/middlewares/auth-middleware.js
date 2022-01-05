export const checkAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
    res.redirect('/login');
};

export const checkNotAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return res.redirect('/');
	}
	next();
};
