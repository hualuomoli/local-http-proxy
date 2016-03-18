var fs = require('fs');
var path = require('path');
var colors = require('colors');

var logger = require('./logger');

// 
var file = {
  // filepath   
  filepath: path.join(process.cwd(), '.cache')
};

file.setPath = function (filepath) {
  file.filepath = filepath;
}

file.exists = function (filename) {
  createPath();
  var f = path.join(file.filepath, filename);
  return fs.existsSync(f);
}

file.flush = function (filename, res) {
  createPath();
  var f = path.join(file.filepath, filename);
  return fs.createReadStream(f).pipe(res);
}

file.store = function (filename, data) {
  createPath();
  var f = path.join(file.filepath, filename);
  return fs.writeFileSync(f, data);
}

module.exports = file;


//
function createPath() {
  if (!fs.existsSync(file.filepath)) {
    logger.info('create path '.green + file.filepath);
    return fs.mkdirSync(file.filepath);
  }
}