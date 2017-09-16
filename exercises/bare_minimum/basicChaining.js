/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var pluckFirstLineFromFileAsync = require('./promiseConstructor.js').pluckFirstLineFromFileAsync;
var getGitHubProfileAsync = require('./promisification.js').getGitHubProfileAsync;

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return fs.readFileAsync(readFilePath, 'utf8')
           .then(function(content) {
             return content.split('\n')[0];
           })
           .then(function(username) {
             return getGitHubProfileAsync(username);
           })
           .then(function(json) {
             return fs.writeFileAsync(writeFilePath, JSON.stringify(json));
           })
           .catch(function(err) {
             console.log(err);
           });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
