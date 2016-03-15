var fs = require('fs');
var path = require('path');

var http = require('http');
var https = require('https');

var colors = require('colors');

var tools = {
  // args        arguments
  // cachePath   cache file path
};

// init
tools.init = function () {
  createCachPath();
};

// get file
tools.getFile = function (url, res) {
  url = url.substring(1);
  console.log('url:  '.cyan + url);
  var encrypt = new Buffer(url).toString("base64");
  var cacheFile = path.join(getCachePath(), encrypt);

  console.log('file: '.cyan + encrypt);

  if (!fs.existsSync(cacheFile)) {
    console.log('get file from network.'.green);
    return loadAndSaveFile(url, cacheFile, res);
  } else {
    console.log('get file from local cache.'.green);
    return outFile(cacheFile, res);
  }

};

module.exports = tools;

//////////////////////
/// local function ///
//////////////////////
/**
 * get arguments
 */
function getArgs() {
  if (!tools.args) {
    tools.args = collectArguments(process.argv.slice(2));
  }
  return tools.args;
}
/**
 * convert arguments
 */
function collectArguments(args) {
  var argvs = {};
  for (var i = 0; i < args.length; i += 2) {
    argvs[args[i].substring(2)] = args[i + 1];
  }
  return argvs;
}

// get cache file path
function getCachePath() {
  if (!tools.cachePath) {
    var args = getArgs();
    var cachePath;
    if (args['path']) {
      cachePath = args['path'];
    } else {
      cachePath = path.join(process.cwd(), '.cache');
    }
    tools.cachePath = cachePath;
  }
  return tools.cachePath;
}

// create cache file path if there not exists
function createCachPath() {
  var cachePath = getCachePath();
  if (!fs.existsSync(cachePath)) {
    fs.mkdirSync(cachePath);
    console.log('create cache path %s', cachePath);
  }
}

// load file
function loadAndSaveFile(url, cacheFile, res) {
  if (url.substring(0, 6) === 'https:') {
    loadAndSaveFileHttps(url, cacheFile, res);
  } else if (url.substring(0, 5) === 'http:') {
    loadAndSaveFileHttp(url, cacheFile, res);
  }
}

// load by http
function loadAndSaveFileHttp(url, cacheFile, res) {
  http.get(url, function (response) {
    if (response.statusCode === 302) {
      // redirect
      url = response.headers.location;
      console.log('redirect to '.yellow + url);
      return loadAndSaveFileHttp(url, cacheFile, res);
    } else {
      response.pipe(fs.createWriteStream(cacheFile));
      response.pipe(res);
    }
  });



}

// load by https
function loadAndSaveFileHttps(url, cacheFile, res) {
  https.get(url, function (response) {
    if (response.statusCode === 302) {
      // redirect
      url = response.headers.location;
      console.log('redirect to '.yellow + url);
      return loadAndSaveFileHttps(url, cacheFile, res);
    } else {
      response.pipe(fs.createWriteStream(cacheFile));
      response.pipe(res);
    }
  });
}

// output file
function outFile(cacheFile, res) {
  return fs.createReadStream(cacheFile).pipe(res);
}