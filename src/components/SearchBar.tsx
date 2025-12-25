interface Props {
  query: string;
  language: string;
  sort: string;
  order: "asc" | "desc";
  onQueryChange: (v: string) => void;
  onLanguageChange: (v: string) => void;
  onSortChange: (v: string) => void;
  onOrderChange: (v: "asc" | "desc") => void;
  onClearAll: () => void; 
}

/**
 * SearchBar Component
 * 
 * Input component for search text and filters.
 * Props:
 *  - query: string -> current search text
 *  - language: string -> selected language filter
 *  - sort: string -> selected sort field
 *  - order: 'asc' | 'desc' -> sort order
 *  - onQueryChange: (v: string) => void -> callback for text change
 *  - onLanguageChange: (v: string) => void -> callback for language change
 *  - onSortChange: (v: string) => void -> callback for sort change
 *  - onOrderChange: (v: 'asc' | 'desc') => void -> callback for order change
 *  - onClearAll:() => void -> callback to clear all the filter
 */
export function SearchBar({
  query,
  language,
  sort,
  order,
  onQueryChange,
  onLanguageChange,
  onSortChange,
  onOrderChange,
  onClearAll,
}: Props) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search repositories..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />

      <select value={language} onChange={(e) => onLanguageChange(e.target.value)}>
        <option value="">All Languages</option>
        <option value="JavaScript">JavaScript</option>
        <option value="TypeScript">TypeScript</option>
        <option value="Python">Python</option>
        {/* add more */}
      </select>

      <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
        <option value="stars">Stars</option>
        <option value="forks">Forks</option>
        <option value="updated">Updated</option>
      </select>

      <select value={order} onChange={(e) => onOrderChange(e.target.value as "asc" | "desc")}>
        <option value="desc">Desc</option>
        <option value="asc">Asc</option>
      </select>

      {/* Clear All button */}
      <button type="button" className="clear-btn" onClick={onClearAll}>
        Clear All
      </button>
    </div>
  );
}
