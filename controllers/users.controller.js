const User = require('../models/users.model');
const controller = {
	login: (req, res) => {
		const { email, password } = req.body;
		res.json({ email, password });
	},
	signup: (req, res) => {
		const { username, email, password } = req.body;
		const sgMail = require('@sendgrid/mail');
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);
		const msg = {
			to: 'atech9801@gmail.com', // Change to your recipient
			from: 'ali99yasin@gmail.com', // Change to your verified sender
			subject: 'Account Verification',
			text: `Hello ${username}, please verify your email address from the link below`,
			html: `    <h1>Verification Link:</h1><br>
    <a href="http://grade-app.herokuapp.com"></a>`
		};
		sgMail
			.send(msg)
			.then(() => {
				console.log('Email sent');
			})
			.catch((error) => {
				console.error(error);
			});
	},
	getAll: (req, res) => {
		res.send('<h1>Hello there</h1>');
	}
};

module.exports = controller;
