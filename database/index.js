const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind( console, 'connection error:' ));
db.once('open', () => { console.log("Connected to MongoDB" ); });

let repoSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  name: String,
  owner: String,
  description: String,
  html_url: String,
  commits_url: String,
  commits_quantity: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo, callback) => {

  let document = new Repo({
    id: repo.id,
    name: repo.name,
    owner: repo.owner.login,
    description: repo.description,
    html_url: repo.html_url,
    commits_url: repo.commits_url,
    commits_quantity: repo.commits_quantity
  });

  document.save((err, repo) => {
    if (err) {
      callback(err);
    }
    callback(repo);
  });
}

let get = (callback) => {

  let data = Repo.find()

  Repo.find({}, (err, repos) => {
    if (err) {
      callback(err);
    }
    callback(null, repos);
  })
}

module.exports.save = save;
module.exports.get = get;
