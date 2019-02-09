let express = require('express');
const fs = require('fs')
const https = require('https')
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
// app.use('/', proxy({ target: process.env.STATIC_OSS, changeOrigin: true }));
app.use(express.static(path.join(__dirname, 'dist'), options));
//刷新时将网址导引到history模式的app上去
app.use(function(req, res, next) {
    res.sendFile(path.join(__dirname, "tool", "redirect.html"));
});
app.listen(process.env.PORT_NUMBER)

// https.createServer({
//         key: fs.readFileSync('cert/server.key'),
//         cert: fs.readFileSync('cert/server.cert')
//     }, app)
//     .listen(process.env.PORT_NUMBER)


module.exports = app;