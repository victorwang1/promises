/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var Promise = require('bluebird');
var fs = require('fs');
var request = require('request');
var pluckFirstLineFromFile = require('./callbackReview.js').pluckFirstLineFromFile;


// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, 'utf8', function(err, content) {
      if (err) {
        reject(err);
      } else {
        var firstLine = content.split('\n')[0];
        resolve(firstLine);
      }
    })
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  return new Promise(function(resolve, reject) {
    request(url, function(err, res, body) {
      if (err) {
        reject(err);
      } else {
        resolve(res.statusCode);
      }
    })
  })
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
