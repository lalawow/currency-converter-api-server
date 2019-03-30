const express = require('express');
const fs = require('fs')
const https = require('https')
const proxy = require('http-proxy-middleware');
const path = require('path');
const app = express()
require('dotenv').load();
const options = {
    maxAge: '1h'
}
const cors = require('cors')
app.use(cors());

const api = require('./routes/api');
app.use('/api', api);


app.use(express.static(path.join(__dirname, 'dist'), options));

app.listen(process.env.PORT_NUMBER)

module.exports = app;