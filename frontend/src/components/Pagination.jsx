const Pagination = ({ page, pages, onPageChange }) => {
  if (pages <= 1) return null;

  return (
    <div className="mt-4 flex items-center justify-center gap-3">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="rounded-md border border-border px-3 py-1.5 text-sm text-ink disabled:opacity-40"
      >
        Previous
      </button>
      <span className="text-sm text-ink-muted">
        Page {page} of {pages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pages}
        className="rounded-md border border-border px-3 py-1.5 text-sm text-ink disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
