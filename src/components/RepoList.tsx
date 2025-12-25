import type { Repository } from "../types";


/**
 * RepoList Component - Displays a list of GitHub repositories 
 * 
 * Props:
 *  - repos: Repository[] -> array of repository objects to display
 */
export function RepoList({ repos }: { repos: Repository[] }) {
  return (
    <ul className="repo-list" role="list">
      {repos.map((repo) => (
        <li key={repo.id} role="listitem" className="repo-item">
          <a href={repo.html_url} target="_blank" >
            {repo.name}
          </a>
          {repo.description && <p className="repo-item">{repo.description}</p>}
          <span className="stars">{repo.stargazers_count.toLocaleString()}</span>
        </li>
      ))}
    </ul>
  );
}
