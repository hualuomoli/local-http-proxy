var colors = require('colors');
var request = require('request');
var ProgressBar = require('progress');
// 
var file = require('./file');
var logger = require('./logger');

// 
var load = {};

load.download = function (archiveUrl, response) {

  logger.debug('downloading '.green + archiveUrl);

  var filename = new Buffer(archiveUrl).toString("base64");

  if (file.exists(filename)) {
    logger.debug('load file from local cache.');
    return file.flush(filename, response);
  }

  var req = request({
    url: archiveUrl,
    rejectUnauthorized: false,
    encoding: null,
    proxy: null
  }, function (err, res, body) {
    // save to filesystem
    file.store(filename, body);
  })

  req.on('response', function (res) {
    var bar = new ProgressBar('Downloading [:bar]  :percent  :etas', {
      complete: '=',
      incomplete: ' ',
      width: 30,
      total: parseInt(res.headers['content-length'], 10)
    });

    res.on('data', function (chunk) {
      bar.tick(chunk.length);
    });

    res.on('end', function () {
      logger.debug('download '.green + archiveUrl);
    })

  });

  // 
  // req.pipe(fs.createWriteStream(cacheFile));
  req.pipe(response);


}


module.exports = load;