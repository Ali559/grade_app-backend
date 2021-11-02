const express = require('express');
const router = express.Router();
const { validateLogin, validateSignup } = require('../config/validation.js');
const {
	createToken,
	findIfUserExists,
	findToken,
	findOneUser,
	createUser,
	findUserWithToken
} = require('../helpers/CRUD');
const { login, getUser, verifyAccount } = require('../controllers/users.controller.js');
const verifyJwtToken = require('../config/verifyJwtToken');
const { verifySignupEmail } = require('../helpers/verifyEmail');

router.post('/login', validateLogin, findOneUser, login);

router.post('/signup', validateSignup, findIfUserExists, createUser, createToken, verifySignupEmail);

router.get('/all', verifyJwtToken, getUser);

router.get('/verfiy-email/:email/:token', findToken, findUserWithToken, verifyAccount);

module.exports = router;
