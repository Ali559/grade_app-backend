require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');
const usersModel = require('../models/users.model');
const controller = {
	login: (req, res) => {
		const { user } = req;
		const { email, password } = user;
		sign({ email, password }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' }, (err, token) => {
			if (err) return res.status(403).json({ error: err.message });
			if (!user.comparePasswords(password)) return res.status(401).json({ msg: 'Incorrect email or password' });
			if (!user.isVerified)
				return res.status(401).json({
					msg: `
				Your Email has not been verified. Please click on resend
				`
				});
			return res.status(200).json({ token });
		});
	},
	verifyAccount: async (req, res) => {
		const { user } = req;
		if (user.isVerified) {
			return res.status(200).json('User has been already verified. Please Login');
		}
		try {
			await usersModel.findByIdAndUpdate(user._id, { isVerified: true });
			return res.status(200).json({ msg: 'User was Verified Successfully' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	getUser: (req, res) => {
		verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
			err ? res.status(403).json({ error: err.message }) : res.status(200).json({ authData });
		});
	}
};

module.exports = controller;
