const Joi = require('joi');

async function validateLogin(req, res, next) {
	const { email, password } = req.body;
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(8).max(32).required()
	});
	try {
		const { error } = await schema.validate({ email, password });
		if (error) return res.status(401).json({ error: error.details[0].message });
		next();
	} catch (err) {
		return res.status(401).json({ error: err.message });
	}
}

module.exports = { validateLogin };
