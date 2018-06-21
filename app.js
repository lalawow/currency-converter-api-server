let express = require('express');
let proxy = require('http-proxy-middleware');
let path = require('path');
let app = express()
require('dotenv').load();
const options = {
    maxAge: '1h'
}

app.use('/api', proxy({ target: process.env.PROXY_TARGET, changeOrigin: true }));
app.use('/images/uploads', proxy({ target: process.env.PROXY_TARGET, changeOrigin: true }));
app.use('/images/optimized', proxy({ target: process.env.PROXY_TARGET, changeOrigin: true }));
app.use(express.static(path.join(__dirname, 'dist'), options));

app.listen(process.env.PORT_NUMBER)
module.exports = app;