import { useState, useCallback } from "react";

export function usePaginatedResource(fetchFn) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(
    async (params = {}) => {
      setLoading(true);
      setError("");

      try {
        const res = await fetchFn(params);
        setItems(res.data.items);
        setPage(res.data.page);
        setPages(res.data.pages);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    },
    [fetchFn]
  );

  return { items, page, pages, loading, error, setError, load };
}