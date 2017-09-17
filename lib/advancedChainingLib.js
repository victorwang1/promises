const request = require('request');
const Promise = require('bluebird');
const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'a7dd8e481ba54fa49d92c5bfa87fa56f'
});

/*
 * getIntersection(arrays) =>
 *   @param {Array} arrays - an array of arrays, each containing a set of values
 *   @return {Array} - a single array with the intersection of values from all arrays
 */

var getIntersection = function(arrays) {
  return arrays.shift().filter(function(v) {
    return arrays.every(function(a) {
      return a.indexOf(v) !== -1;
    });
  });
};

/**
 * getGitHubProfile(handle) =>
 *   @param {String} handle - the handle of a GitHub user
 *   @return {Promise} - resolves with the user's profile in the following format:
 *     {
 *       handle: 'danthareja',
 *       name: 'Dan Thareja',
 *       avatarUrl: 'https://avatars.githubusercontent.com/u/6980359?v=3.jpg'
 *     }
 */

var getGitHubProfile = function(user) {
  var options = {
    url: 'https://api.github.com/users/' + user,
    headers: { 'User-Agent': 'request' },
    json: true  // will JSON.parse(body) for us
  };

  return new Promise(function(resolve, reject) {
    request.get(options, function(err, data, body) {
      if (err) { return reject(err); }

      var simpleProfile = {
        handle: body.login,
        name: body.name,
        avatarUrl: body.avatar_url + '.jpg', // extension necessary for image tagger
      };
      resolve(simpleProfile);
    });
  });
};

var tagImage = function(imageUrl) {
  return app.models.predict(Clarifai.GENERAL_MODEL, imageUrl)
                   .then(function(response) {
                     return response.outputs[0].data.concepts.map(concept => concept.name);
                   })
                   .catch(function(err) {
                     return err;
                   })
};


module.exports = {
  tagImage: tagImage,
  getIntersection: getIntersection,
  getGitHubProfile: getGitHubProfile
};
