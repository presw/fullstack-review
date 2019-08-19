import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.refreshRepos();
  }

  refreshRepos() {
    $.get('/repos', (data, something, res) => {
      this.setState({ repos: data });
    })
  }

  search (term) {
    console.log(`${term} was searched`);
    $.post('/repos', { username: term }, (data, success, res) => {
    }).done(() => {
      // BUG: This appears to be happening before $.post is complete
      this.refreshRepos();
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search} onClick={this.refreshRepos} />
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
