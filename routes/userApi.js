const express = require('express');
const router = express.Router();
const { validateLogin, validateSignup } = require('../config/validation.js');
const {
	createToken,
	findIfUserExists,
	findToken,
	findOneUser,
	createUser,
	findUserWithToken,
	createResetCode,
	findResetCode
} = require('../helpers/CRUD');
const {
	login,
	getUser,
	verifyAccount,
	submitResetCode,
	updatePassword
} = require('../controllers/users.controller.js');
const verifyJwtToken = require('../config/verifyJwtToken');
const { verifySignupEmail, sendResetCode } = require('../helpers/verifyEmail');

router.post('/login', validateLogin, findOneUser, login);

router.post('/signup', validateSignup, findIfUserExists, createUser, createToken, verifySignupEmail);

router.get('/all', verifyJwtToken, getUser);

router.get('/verfiy-email/:email/:token', findToken, findUserWithToken, verifyAccount);

router.post('/send-reset-code', findOneUser, createResetCode, sendResetCode);

router.post('/verify-reset-code/:email', findResetCode, submitResetCode);

router.post('/reset-password/:email', updatePassword);

module.exports = router;
