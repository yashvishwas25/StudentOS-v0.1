import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import Pagination from "../components/Pagination";
import EmptyState from "../components/EmptyState";
import ConfirmDialog from "../components/ConfirmDialog";
import { usePaginatedResource } from "../hooks/usePaginatedResource";
import { useToast } from "../hooks/useToast";
import {
  getFiles,
  uploadFile,
  deleteFile,
} from "../api/files";

const Files = () => {
  const {
    items: files,
    page,
    pages,
    loading,
    error,
    setError,
    load,
  } = usePaginatedResource(getFiles);

  const { showToast } = useToast();

  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [uploading, setUploading] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    load({ page: 1, search });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    setActiveSearch(search);

    load({
      page: 1,
      search,
    });
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);
    setError("");

    try {
      await uploadFile(file);

      setActiveSearch("");

      load({
        page: 1,
        search,
      });

      showToast("File uploaded successfully");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Upload failed";

      setError(message);
      showToast(message, "error");
    } finally {
      setUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setDeleting(true);

    try {
      await deleteFile(deleteId);

      setDeleteId(null);

      const nextPage =
        page > 1 && files.length === 1
          ? page - 1
          : page;

      load({
        page: nextPage,
        search,
      });

      showToast("File deleted successfully");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Failed to delete file";

      setError(message);
      showToast(message, "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <h1 className="font-display text-3xl font-semibold text-ink">
        Files
      </h1>

      <p className="mt-1 text-sm text-ink-muted">
        Access your files from any device.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
        />

        <Button
          onClick={() =>
            fileInputRef.current?.click()
          }
          loading={uploading}
        >
          Upload file
        </Button>
      </div>

      <form
        onSubmit={handleSearchSubmit}
        className="mt-4 flex gap-3"
      >
        <Input
          placeholder="Search files..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />

        <Button
          type="submit"
          variant="outline"
        >
          Search
        </Button>
      </form>

      {error && (
        <p className="mt-4 text-sm text-danger">
          {error}
        </p>
      )}

      <div className="mt-6">
        {loading ? (
          <p className="text-sm text-ink-muted">
            Loading files...
          </p>
        ) : files.length === 0 ? (
          activeSearch ? (
            <EmptyState
              title="No matching files"
              description={`No files found for "${activeSearch}". Try a different search.`}
            />
          ) : (
            <EmptyState
              title="No files yet"
              description="Upload your first file to keep it with you across devices."
            />
          )
        ) : (
          <div className="divide-y divide-border rounded-lg border border-border bg-surface">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between px-4 py-3"
              >
                <div>
                  <Link
                    to={`/files/${file.id}`}
                    className="text-sm font-medium text-ink hover:text-primary hover:underline"
                  >
                    {file.filename}
                  </Link>

                  <p className="text-xs uppercase text-ink-muted">
                    {file.file_type}
                  </p>
                </div>

                <Button
                  variant="dangerGhost"
                  size="sm"
                  onClick={() =>
                    setDeleteId(file.id)
                  }
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Pagination
        page={page}
        pages={pages}
        onPageChange={(p) =>
          load({
            page: p,
            search,
          })
        }
      />

      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Delete file?"
        message="This file will be permanently deleted. This action cannot be undone."
        confirmLabel="Delete File"
        cancelLabel="Cancel"
        loading={deleting}
        onCancel={() => {
          if (!deleting) {
            setDeleteId(null);
          }
        }}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default Files;