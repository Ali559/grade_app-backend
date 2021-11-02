const express = require('express');
const router = express.Router();
const { validateLogin } = require('../config/validation.js');
const { login, signup, getAll } = require('../controllers/users.controller.js');

router.post('/login', validateLogin, login);
router.get('/all', getAll);
module.exports = router;
