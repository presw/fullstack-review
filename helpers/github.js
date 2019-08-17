const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {

  let options = {
    url: `https://api.github.com/users/${username}/repos`, //gets REPOS for a user
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (error, response, body) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, body);
    }
  })
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
}

let getCommitsByRepo = (commitsUrl, callback) => {

  let options = {
    url: `${commitsUrl}`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (error, response, body) => {
    if (error) {
      callback(error, null)
    } else {
      callback(null, body);
    }
  })
}

module.exports.getReposByUsername = getReposByUsername;
module.exports.getCommitsByRepo = getCommitsByRepo;
