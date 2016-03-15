var fs = require('fs');
var express = require('express');
var https = require('https');

var app = express();

app.get('/abc', function (req, res) {
  // fs.readFile('D:/FlashFXP.zip', function (err, datas) {
  //   res.send(datas);
  // });
  console.log('redirect to /test/1234');
  res.redirect('http://localhost:1000/test/1234');
});

app.get('/test/*', function (req, res) {
  https.get('https://www.baidu.com/img/bd_logo1.png', function (response) {
    response.pipe(res);
  });
});

var server = app.listen(1000, function () {
  console.log('server started in 1000.');
});