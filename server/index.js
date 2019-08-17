const express = require('express');
const gh = require('../helpers/github.js');
const db = require('../database/index.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.urlencoded({ extended: true }));

app.post('/repos', (req, res) => {
  console.log('POST REQUUUUEST INCOMING');
  console.log('REQ BODY', req.body.username);
  gh.getReposByUsername(req.body.username, (err, data) => {
    if (err) {
      return (err, null);
    }
    let repoArray = JSON.parse(data);
    for (let i = 0; i < repoArray.length; i++) {
      let repo = repoArray[i];
      let url = repo.commits_url.slice(0, -6);
      gh.getCommitsByRepo(url, (err, data) => {
        if (err) {
          return (err, null);
        }
        let parsedData = JSON.parse(data);
        console.log('LENGTH:', parsedData.length); // number of commits
        repo.commits_quantity = parsedData.length;
        db.save(repo)

      })
    }
    var test = JSON.parse(data);
    console.log('BLOOM', Array.isArray(test));
  })
  res.end();
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  // Steps:
  // Take provided username from request
  // Send to Github API
  // GET data from API
    // iterate through data
      // GET commit data from API for each repo
        // NOTE: Use Promise.all() on an array of the GETs?
        // SAVE data to database
});

app.get('/repos', (req, res) => {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

