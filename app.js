var express = require('express');
var fs = require('fs');
var httpProxy = require('http-proxy');
var colors = require('colors');
var tools = require('./tools');

var app = express();

// create cache path
tools.init();


app.get('/*', function (req, res) {
  var url = req.url;
  if (url === '' || url === '/favicon.ico') {
    return;
  }
  // fs.readFile('D:/FlashFXP.zip', function (err, data) {
  //   res.send(data);
  // });
  tools.getFile(url, res);
});

//
// Create your proxy server and set the target in the options.
//
httpProxy.createProxyServer({
  target: 'http://localhost:9000'
}).listen(8000); // See (†)

var server = app.listen(9000, function () {
  console.log('server started in '.green + 9000);
});