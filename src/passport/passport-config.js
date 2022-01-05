import { UserModel } from '../mongoose/userModel.js';

export const authenticateUser = async (email, password, done) => {
	const user = await UserModel.findOne({ email });
	if (user == null) {
		console.log('1');
		return done(null, false, { message: 'No user found with this email ' });
	}
	try {
		const isMatch = await UserModel.comparePasswords(user, password);
		if (isMatch) {
			return done(null, user);
		} else {
			return done(null, false, { message: 'Password is not correct ' });
		}
	} catch (error) {
		return done(error);
	}
};
