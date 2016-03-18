var express = require('express');
var colors = require('colors');
var path = require('path');
var load = require('./load');
var file = require('./file');

var app = express();

// create cache path


app.get('/*', function (req, res) {
  var proxyUrl = req.url;
  if (!proxyUrl || proxyUrl === '/' || proxyUrl === '/favicon.ico') {
    res.send('welcom http proxy server.');
    return;
  }
  load.download(proxyUrl.substring(1), res);
});

var server = app.listen(9000, function () {
  file.setPath(path.join(process.cwd(), '/.cache'));
  console.log('server started in '.green + 9000);
});