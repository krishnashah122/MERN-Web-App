const express = require('express');
const app = express();
const db = require('./config/mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config({path: './config.env'});

const PORT = process.env.PORT || 8000;

app.use(cookieParser());

app.use(express.json());

app.use(require('./routes'));

app.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}.`);
});