type Props = {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};
/**
 * Pagination Component
 * 
 * Displays page navigation for search results.
 * Props:
 *  - page: number -> current page
 *  - totalPages: number -> total number of pages
 *  - onPrev: () => void -> callback for previous page
 *  - onNext: () => void -> callback for next page
 */

export function Pagination({ page, totalPages, onPrev, onNext }: Props) {
  return (
    <nav aria-label="Pagination" className="pagination">
      <button disabled={page === 1} onClick={onPrev}>
        Prev
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button disabled={page === totalPages} onClick={onNext}>
        Next
      </button>
    </nav>
  );
}
