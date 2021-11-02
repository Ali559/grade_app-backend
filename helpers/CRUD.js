const Users = require('../models/users.model');
const Tokens = require('../models/tokens.model');
const crypto = require('crypto');
const CRUD = {
	findOneUser: async (req, res, next) => {
		const { email } = req.body;
		try {
			const user = await Users.findOne({ email });
			if (!user) {
				res.status(404).json({
					msg: `The email address ${email} 
						is not associated with any account. please check and try again!`
				});
			}
			req.user = user;
			next();
		} catch (error) {
			next(error.message);
			return;
		}
	},
	createUser: async (req, res, next) => {
		const { email, username, password } = req.body;

		try {
			const create = await Users.create({
				username,
				email,
				password
			});
			if (create) {
				req.user = create;
				next();
			}
		} catch (error) {
			next(error.message);
		}
	},
	findIfUserExists: async (req, res, next) => {
		const { email } = req.body;
		try {
			const alreadyExists = await Users.findOne({ email });
			if (alreadyExists) {
				return res
					.status(401)
					.json({ msg: 'This email is already associated with another account, please Login' });
			}
			next();
		} catch (error) {
			next(error.message);
		}
	},
	findToken: async (req, res, next) => {
		const { token } = req.params.token;
		try {
			const tk = await Tokens.findOne(token);
			if (tk) {
				req.token = tk;
				next();
			}
		} catch (error) {
			return res.status(4001).json({ error: error.message });
		}
	},
	findUserWithToken: async (req, res, next) => {
		const { token } = req;
		const { email } = req.params;
		try {
			const user = await Users.findOne({ _id: token._userId, email });
			if (user) {
				req.user = user;
				next();
			}
		} catch (error) {
			next(error.message);
		}
	},
	createToken: async (req, res, next) => {
		const { user } = req;
		try {
			const token = await Tokens.create({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
			req.token = token;
			next();
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	}
};
module.exports = CRUD;
