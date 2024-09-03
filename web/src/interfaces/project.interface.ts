export interface ICreateProjectResponse {
  projectId: string;
}

export interface ICreateProject {
  owner: string;
  name: string;
  url: string;
  stars: number;
  forks: number;
  issues: number;
  createdAt: number;
  userId: string;
}
