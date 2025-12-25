import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchRepositories } from "./api/github";
import { buildSearchQuery } from "./utils/buildSearchQuery";
import type { RepositoryResponse } from "./types";
import { useDebounce } from "./hooks/useDebounce";
import { SearchBar } from "./components/SearchBar";
import { RepoList } from "./components/RepoList";
import { Pagination } from "./components/Pagination";

const PER_PAGE = 10;
/**
 * App Component
 * 
 * Main container for the GitHub Repository Search application.
 */

export default function App() {
  const queryClient = useQueryClient();

  const [text, setText] = useState("");
  const [language, setLanguage] = useState("");
  const [sort, setSort] = useState("stars");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);

  const debouncedText = useDebounce(text, 500);

  const filters = {
    text: debouncedText,
    language,
  };

  const searchQuery = buildSearchQuery(filters);

  // Clear query cache when search is empty
  useEffect(() => {
    if (debouncedText === "") {
      setPage(1);
      queryClient.removeQueries({ queryKey: ["repos"], exact: false });
    }
  }, [debouncedText, queryClient]);

  /* tanstack query hook to fetch repositories with 
  *  caching, loading/error states, and previous data retention
  */

  const { data, isLoading, isError } = useQuery<RepositoryResponse, Error>({
    queryKey: ["repos", searchQuery, sort, order, page],
    queryFn: () => fetchRepositories(searchQuery, sort, order, page),
    enabled: searchQuery.length > 0,
  });

  const totalPages = data
    ? Math.min(100, Math.ceil(data.total_count / PER_PAGE))
    : 0;



  const clearAllFilters = () => {
    setText("");
    setLanguage("");
    setSort("stars");
    setOrder("desc");
    setPage(1);
  };
  return (
    <div className="container">
      <h1 className="title">GitHub Repository Search</h1>

      <SearchBar
        query={text}
        language={language}
        sort={sort}
        order={order}
        onQueryChange={(v) => {
          setText(v);

          // If text is empty, reset all filters
          if (v === "") {
            setLanguage("");
            setSort("stars");
            setOrder("desc");
            setPage(1);
          } else {
            setPage(1);
          }
        }}
        onLanguageChange={(v) => {
          setLanguage(v);
          setPage(1);
        }}
        onSortChange={(v) => {
          setSort(v);
          setPage(1);
        }}
        onOrderChange={(v) => {
          setOrder(v);
          setPage(1);
        }}
        onClearAll={clearAllFilters}
      />


      {searchQuery && (
        <div className="query-preview" aria-live="polite">
          <span className="label">GitHub Query:</span>
          <code>{searchQuery}</code>
        </div>
      )}

      {isLoading && <p>Loading repositories…</p>}
      {isError && <p>Something went wrong.</p>}

      {!data && debouncedText === "" && (
        <div className="empty-state">Enter a search query</div>
      )}

      {data && data.items.length === 0 && (
        <div className="empty-state">No repositories found</div>
      )}

      {data && data.items.length > 0 && (
        <>
          <RepoList repos={data.items} />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPrev={() => setPage((p) => Math.max(1, p - 1))}
            onNext={() =>
              setPage((p) => Math.min(totalPages, p + 1))
            }
          />
        </>
      )}
    </div>
  );
}
