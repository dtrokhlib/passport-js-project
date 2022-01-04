import { UserModel } from '../mongoose/userModel.js';
import bcrypt from 'bcrypt';

export const userRegister = async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, Number(process.env.SALT));
		const user = new UserModel({
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword,
		});
		await user.save();
		res.redirect('/login');
	} catch (error) {
		res.status(500).send({ message: 'Was not able to create new user', info: error.message });
	}
};
