import Button from "./Button";

const Pagination = ({
  page,
  pages,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Backward compatibility
  const activePage = currentPage ?? page;
  const total = totalPages ?? pages;

  if (!total || total <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className="mt-6 flex items-center justify-between gap-4"
    >
      <Button
        variant="outline"
        onClick={() => onPageChange(activePage - 1)}
        disabled={activePage === 1}
      >
        Previous
      </Button>

      <div className="text-sm text-ink-muted">
        Page{" "}
        <span className="font-medium text-ink">
          {activePage}
        </span>{" "}
        of{" "}
        <span className="font-medium text-ink">
          {total}
        </span>
      </div>

      <Button
        variant="outline"
        onClick={() => onPageChange(activePage + 1)}
        disabled={activePage === total}
      >
        Next
      </Button>
    </nav>
  );
};

export default Pagination;