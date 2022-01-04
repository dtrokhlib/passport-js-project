import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema(
	{
		name: String,
		email: String,
		password: String,
	},
	{ timestamps: true },
);

UserSchema.statics.comparePasswords = async (user, password) => {
	const isMatch = await bcrypt.compare(password, user.password);
	return isMatch;
};

export const UserModel = mongoose.model('User', UserSchema);
