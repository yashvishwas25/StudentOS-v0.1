import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Card from "../components/Card";
import { useToast } from "../hooks/useToast";
import { getFile, deleteFile } from "../api/files";

const FileDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getFile(id);
        setFile(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load file");
      } finally {
        setLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteFile(id);
      showToast("File deleted successfully");
      navigate("/files");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to delete file";
      setError(message);
      showToast(message, "error");
    }
  };

  if (loading) {
    return <p className="text-sm text-ink-muted">Loading file...</p>;
  }

  return (
    <>
      <Link to="/files" className="text-sm font-medium text-primary hover:underline">
        ← Back to Files
      </Link>

      <h1 className="mt-3 font-display text-2xl font-semibold text-ink">File Details</h1>

      {error && <p className="mt-4 text-sm text-danger">{error}</p>}

      {!error && file && (
        <Card className="mt-6 max-w-lg">
          <div className="space-y-3">
            <div>
              <p className="text-xs uppercase text-ink-muted">Filename</p>
              <p className="text-sm font-medium text-ink">{file.filename}</p>
            </div>

            <div>
              <p className="text-xs uppercase text-ink-muted">File type</p>
              <p className="text-sm font-medium text-ink">{file.file_type}</p>
            </div>

            <div>
              <p className="text-xs uppercase text-ink-muted">Stored path</p>
              <p className="break-all text-sm font-medium text-ink">{file.file_path}</p>
            </div>
          </div>

          <button
            onClick={handleDelete}
            className="mt-6 text-sm font-medium text-danger hover:underline"
          >
            Delete file
          </button>
        </Card>
      )}
    </>
  );
};

export default FileDetail;