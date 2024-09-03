export interface IRepo {
  _id: string;
  owner: string;
  name: string;
  url: string;
  stars: number;
  forks: number;
  issues: number;
  createdAt: number;
}

export interface ICreateRepoResponse {
  owner: string;
  name: string;
  url: string;
  stars: number;
  forks: number;
  issues: number;
  createdAt: number;
}

export interface IGitHubApiError {
  documentation_url: string;
  message: string;
  status: string;
}
