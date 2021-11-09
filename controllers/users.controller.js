require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');
const Users = require('../models/users.model');
const controller = {
	login: (req, res) => {
		const { user } = req;
		const { email, password } = user;
		sign({ email, password }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' }, (err, token) => {
			if (err) return res.status(403).json({ error: err.message });
			if (!user.comparePasswords(password))
				return res.status(401).json({ message: 'Incorrect email or password' });
			if (!user.isVerified)
				return res.status(401).json({
					message: `
				Your Email has not been verified. Please click on resend
				`
				});
			return res.status(200).json({ token });
		});
	},
	verifyAccount: async (req, res) => {
		const { user } = req;
		if (user.isVerified) {
			return res.status(200).json({ message: 'User has been already verified. Please Login' });
		}
		try {
			await Users.findByIdAndUpdate(user._id, { isVerified: true });
			return res.status(200).json({ message: 'User was Verified Successfully' });
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	},
	getUser: (req, res) => {
		verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
			err ? res.status(403).json({ message: err.message }) : res.status(200).json({ authData });
		});
	},
	submitResetCode: async (req, res) => {
		const { code } = req;
		const { email } = req.params;
		try {
			const user = await Users.findOne({ _id: code._userId, email });
			if (!user) {
				return res
					.status(400)
					.json({ message: 'Could not find the user with the corresponding reset code, please try again!' });
			}
			const data = { email: user.email, code: code.code };
			res.status(200).json({ message: data });
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	},
	updatePassword: async (req, res) => {
		const { email } = req.params;
		const { password } = req.body;
		try {
			const user = await Users.findOne({ email });
			if (!user) return res.status(404).json({ message: `User account not found!` });
			user.password = password;
			await user.save();
			res.status(200).json({ message: 'Password was successfully reset, Login!' });
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}
};

module.exports = controller;
