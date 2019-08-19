import React from 'react';
import Repo from './Repo.jsx';

const RepoList = (props) => {

  let repoList = props.repos.map((repo, index) => {
    return <Repo key={index} repo={repo} />
  })

  return (
    <div>
      <h4> Repo List Component </h4>
      There are {props.repos.length} repos.
      {repoList}
    </div>
  )
}

export default RepoList;