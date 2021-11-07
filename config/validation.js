const Joi = require('joi');

async function validateLogin(req, res, next) {
	const { email, password } = req.body;
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(8).max(32).required()
	});
	try {
		const { error } = await schema.validate({ email, password });
		if (error) return res.status(401).json({ message: error.details[0].message });
		next();
	} catch (err) {
		return res.status(401).json({ message: err.message });
	}
}
async function validateSignup(req, res, next) {
	const { username, email, password } = req.body;
	const schema = Joi.object({
		username: Joi.string().min(3).max(20).required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(8).max(32).required()
	});
	try {
		const { error } = await schema.validate({ username, email, password });
		if (error) return res.status(401).json({ message: error.details[0].message });
		next();
	} catch (err) {
		return res.status(401).json({ message: err.message });
	}
}

module.exports = { validateLogin, validateSignup };
