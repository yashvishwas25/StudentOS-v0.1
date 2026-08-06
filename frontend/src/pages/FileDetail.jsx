import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import { useToast } from "../hooks/useToast";
import { getFile, deleteFile } from "../api/files";

const FileDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await getFile(id);
        setFile(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load file"
        );
      } finally {
        setLoading(false);
      }
    };

    load();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);

    try {
      await deleteFile(id);

      showToast("File deleted successfully");

      navigate("/files");
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

  if (loading) {
    return (
      <p className="text-sm text-ink-muted">
        Loading file...
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/files"
        className="text-sm font-medium text-primary hover:underline"
      >
        ← Back to Files
      </Link>

      <div className="mt-4">
        <h1 className="font-display text-3xl font-semibold text-ink">
          File Details
        </h1>

        <p className="mt-2 text-sm text-ink-muted">
          View information about your uploaded file.
        </p>
      </div>

      {error && (
        <p className="mt-6 text-sm text-danger">
          {error}
        </p>
      )}

      {!error && file && (
        <Card
          hover={false}
          className="mt-8"
        >
          <div className="space-y-6">
            <div>
              <p className="mb-2 text-sm font-medium text-ink">
                Filename
              </p>

              <p className="text-sm text-ink-muted">
                {file.filename}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-ink">
                File Type
              </p>

              <p className="text-sm text-ink-muted uppercase">
                {file.file_type}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-ink">
                Stored Path
              </p>

              <p className="break-all text-sm text-ink-muted">
                {file.file_path}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6">
              <Button
                type="button"
                variant="dangerGhost"
                loading={deleting}
                onClick={handleDelete}
              >
                Delete File
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default FileDetail;