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
