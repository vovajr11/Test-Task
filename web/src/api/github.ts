import { IGitHubApiError } from "./../interfaces/github.interface";
import axios from "axios";

export const fetchGitHubRepoData = async (repoPath: string) => {
  const [owner, repo] = repoPath.split("/");

  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`
    );
    return {
      status: response.status.toString(),
      owner: response.data.owner.login,
      name: response.data.name,
      url: response.data.html_url,
      stars: response.data.stargazers_count,
      forks: response.data.forks_count,
      issues: response.data.open_issues_count,
      createdAt: new Date(response.data.created_at).getTime() / 1000, // Unix timestamp
    };
  } catch (error: any) {
    if (error.response && error.response.data) {
      const res: IGitHubApiError = error.response.data;
      return res;
    }
  }
};
