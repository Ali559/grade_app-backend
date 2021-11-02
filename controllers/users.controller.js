const User = require('../models/users.model');
const controller = {
	login: (req, res) => {
		const { email, password } = req.body;
		res.json({ email, password });
	},
	signup: (req, res) => {},
	getAll: (req, res) => {}
};

module.exports = controller;
