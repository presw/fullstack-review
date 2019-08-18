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

  search (term) {
    // console.log(`${term} was searched`);
    // $.post('/repos', { username: term }, (err, data) => {
    //   console.log('ERRRRROR:', err);
    //   console.log('Posted to DB:', data);
    // });
    $.get('/repos', (data) => {
      // NOTE: TODO: data can be used to setState for app
      console.log("SEARCH DATA:", data);
      return data;
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));