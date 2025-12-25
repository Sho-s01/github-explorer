export type SearchFilters = {
  text: string;
  language?: string;
  stars?: number;
  forks?: number;
  topic?: string;
  user?: string;
  license?: string;
  archived?: boolean;
};

/*
 * Builds the `q` parameter for GitHub's repository search API.
 *
 * This Generic function supports multiple GitHub search qualifiers.
 * UI may use only a subset of these.
 * 
 */

export function buildSearchQuery(filters: SearchFilters): string {
  const parts: string[] = [];

  if (filters.text) parts.push(filters.text);
  if (filters.language) parts.push(`language:${filters.language}`);
  if (filters.stars) parts.push(`stars:>=${filters.stars}`);
  if (filters.forks) parts.push(`forks:>=${filters.forks}`);
  if (filters.topic) parts.push(`topic:${filters.topic}`);
  if (filters.user) parts.push(`user:${filters.user}`);
  if (filters.license) parts.push(`license:${filters.license}`);
  if (filters.archived !== undefined) {
    parts.push(`archived:${filters.archived}`);
  }

  return parts.join(" ");
}
