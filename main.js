require('dotenv').config();
const express = require('express'),
	apiEndpoint = require('./routes/apiEndpot.js');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT;
mongoose.connect(process.env.MONGO_CONNECTION_STRING);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use((_, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

app.use('/uploads', express.static('public/images'));

app.use('/api', apiEndpoint);

app.listen(port, (err) => {
	err ? console.error(err.message) : console.log(`http://localhost:${port}`);
});
