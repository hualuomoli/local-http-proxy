var express = require('express');
var colors = require('colors');
var path = require('path');

var load = require('./load');
var file = require('./file');
var logger = require('./logger');

var app = express();

// set cache path
file.setPath(path.join(process.cwd(), '/.cache'));

// all route
app.get('/*', function (req, res) {
  var proxyUrl = req.url;
  if (!proxyUrl || proxyUrl === '/' || proxyUrl === '/favicon.ico') {
    res.send('welcom http proxy server.');
    return;
  }
  load.download(proxyUrl.substring(1), res);
});

// start server
var server = app.listen(9000, function () {
  logger.info('server started in '.green + 9000);
});