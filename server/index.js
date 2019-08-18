const express = require('express');
const gh = require('../helpers/github.js');
const db = require('../database/index.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.urlencoded({ extended: true }));

app.post('/repos', (req, res) => {
  // Get all repos for provided username
  gh.getReposByUsername(req.body.username, (err, data) => {
    if (err) {
      return (err, null);
    }
    // For every repo, get the number of commits to that repo
    let repoArray = JSON.parse(data);
    for (let i = 0; i < repoArray.length; i++) {
      let repo = repoArray[i];
      let url = repo.commits_url.slice(0, -6);
      gh.getCommitsByRepo(url, (err, data) => {
        if (err) {
          return (err, null);
        }
        // Parse the data into an object, then save to DB
        let parsedData = JSON.parse(data);
        repo.commits_quantity = parsedData.length;
        db.save(repo, (err, data) => {
          if (err) {
            return err;
          }
          res.end();
        });
      })
    }
  })
  res.end();
});

app.get('/repos', (req, res) => {
  db.get((err, data) => {
    if (err) {
      return err;
    }
    res.json(data);
  });
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
