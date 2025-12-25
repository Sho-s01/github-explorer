export type Repository = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
};

export type RepositoryResponse = {
  items: Repository[];
  total_count: number;
};
