const mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/fetcher', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("CONNNNNNNNECTED");
});

let repoSchema = mongoose.Schema({
  id: Number,
  name: String,
  owner: String,
  description: String,
  html_url: String,
  commits_url: String,
  commits_quantity: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo, callback) => {
    let test = new Repo({
      id: repo.id,
      name: repo.name,
      owner: repo.owner.name,
      description: repo.description,
      html_url: repo.html_url,
      commits_url: repo.commits_url,
      commits_quantity: repo.commits_quantity
    })
    console.log("HITTING SAVE");
    test.save();

  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;