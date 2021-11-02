require('dotenv').config();
const express = require('express'),
	apiEndpoint = require('./routes/apiEndpot.js');
const app = express();
const mongoose = require('mongoose');

const port = process.env.PORT;
mongoose.connect(process.env.MONGO_CONNECTION_STRING);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('public/images'));

app.use('/api', apiEndpoint);

app.listen(port, (err) => {
	err ? console.error(err.message) : console.log(`http://localhost:${port}`);
});
