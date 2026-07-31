import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Pagination from "../components/Pagination";
import EmptyState from "../components/EmptyState";
import { getFiles, uploadFile, deleteFile } from "../api/files";

const Files = () => {
  const [files, setFiles] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const loadFiles = async (targetPage = page, targetSearch = search) => {
    setLoading(true);
    setError("");

    try {
      const res = await getFiles({ page: targetPage, search: targetSearch });
      setFiles(res.data.items);
      setPage(res.data.page);
      setPages(res.data.pages);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load files");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFiles(1, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadFiles(1, search);
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      await uploadFile(file);
      loadFiles(1, search);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFile(id);
      loadFiles(page, search);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete file");
    }
  };

  return (
    <>
      <h1 className="font-display text-2xl font-semibold text-ink">Files</h1>
      <p className="mt-1 text-sm text-ink-muted">Access your files from any device.</p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          loading={uploading}
        >
          Upload file
        </Button>
      </div>

      <form onSubmit={handleSearchSubmit} className="mt-4 flex gap-3">
        <Input
          placeholder="Search files..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" variant="outline">Search</Button>
      </form>

      {error && <p className="mt-4 text-sm text-danger">{error}</p>}

      <div className="mt-6">
        {loading ? (
          <p className="text-sm text-ink-muted">Loading files...</p>
        ) : files.length === 0 ? (
          <EmptyState
            title="No files yet"
            description="Upload your first file to keep it with you across devices."
          />
        ) : (
          <div className="divide-y divide-border rounded-lg border border-border bg-surface">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-ink">{file.filename}</p>
                  <p className="text-xs uppercase text-ink-muted">{file.file_type}</p>
                </div>
                <button
                  onClick={() => handleDelete(file.id)}
                  className="text-xs font-medium text-danger hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Pagination page={page} pages={pages} onPageChange={(p) => loadFiles(p, search)} />
    </>
  );
};

export default Files;