const express = require('express');
const router = express.Router();
const userApi = require('./userApi.js');
router.use('/users', userApi);

module.exports = router;
