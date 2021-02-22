var env = require('./config/domain');
var express = require('express');
var httpProxyMiddleware = require('http-proxy-middleware');
const path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});


app.listen( 8080, () => {
    console.log('Node server has been started on ' + (8080));
});
