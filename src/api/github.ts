import type { RepositoryResponse } from "../types";

const BASE_URL = "https://api.github.com/search/repositories";

export async function fetchRepositories(
  searchQuery: string,
  sort: string,
  order: string,
  page: number
): Promise<RepositoryResponse> {
  const params = new URLSearchParams({
    q: searchQuery,
    sort,
    order,
    page: String(page),
    per_page: "10",
  });

  const token = import.meta.env.VITE_GITHUB_TOKEN; //Github personal access token

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}?${params.toString()}`, { headers });

  if (!response.ok) {
    throw new Error("Failed to fetch repositories");
  }

  return response.json();
}
