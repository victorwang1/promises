/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
// var http = require('http');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  fs.readFile(filePath, 'utf8', function(err, content) {
    console.log('reading form file ' + filePath);
    if (err) {
      callback(err);
    } else {
      var firstLine = content.split('\n')[0].trim();
      callback(err, firstLine);
    }
  })
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  request(url, function(err, res, body) {
    if (err) {
      callback(err);
    } else {
      callback(err, res.statusCode);
    }
  })
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
