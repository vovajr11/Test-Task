import axios from "axios";
import { ICreateProjectResponse } from "../interfaces/project.interface";

export const saveProject = async (repoPath: string, userId: string) => {
  const [owner, repo] = repoPath.split("/");

  try {
    const resRepoData = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`
    );

    const repoData = {
      owner: resRepoData.data.owner.login,
      name: resRepoData.data.name,
      url: resRepoData.data.html_url,
      stars: resRepoData.data.stargazers_count,
      forks: resRepoData.data.forks_count,
      issues: resRepoData.data.open_issues_count,
      createdAt: new Date(resRepoData.data.created_at).getTime() / 1000, // Unix timestamp
      userId,
    };

    const response = await axios.post<ICreateProjectResponse>(
      "/projects/create",
      repoData
    );

    return { ...repoData, _id: response.data.projectId };
  } catch (error: any) {
    const res = error.response.data;
    return res;
  }
};

export const getProjectsByUserId = async (userId: string) => {
  const response = await axios.get(`/projects?userId=${userId}`);
  return response.data;
};

export const deleteProjectsById = async (id: string) => {
  const response = await axios.delete(`/projects/${id}`);
  return response.data;
};
