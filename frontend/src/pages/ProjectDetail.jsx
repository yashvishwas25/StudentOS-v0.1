import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import { useToast } from "../hooks/useToast";
import { validateProjectName } from "../utils/validators";
import { getProject, updateProject, deleteProject } from "../api/projects";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getProject(id);
        setName(res.data.name);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load project");
      } finally {
        setLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();

    const validationError = validateProjectName(name);
    if (validationError) {
      setNameError(validationError);
      return;
    }

    setSaving(true);
    setError("");
    try {
      await updateProject(id, name);
      showToast("Project updated successfully");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to update project";
      setError(message);
      showToast(message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProject(id);
      showToast("Project deleted successfully");
      navigate("/projects");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to delete project";
      setError(message);
      showToast(message, "error");
    }
  };

  if (loading) {
    return <p className="text-sm text-ink-muted">Loading project...</p>;
  }

  return (
    <>
      <Link to="/projects" className="text-sm font-medium text-primary hover:underline">
        ← Back to Projects
      </Link>

      <h1 className="mt-3 font-display text-2xl font-semibold text-ink">Edit Project</h1>

      {error && <p className="mt-4 text-sm text-danger">{error}</p>}

      {!error && (
        <Card className="mt-6 max-w-lg">
          <form onSubmit={handleSave} className="space-y-4" noValidate>
            <div>
              <label className="mb-1 block text-sm font-medium text-ink">Project name</label>
              <Input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError("");
                }}
                error={nameError}
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" loading={saving}>Save changes</Button>
              <button
                type="button"
                onClick={handleDelete}
                className="text-sm font-medium text-danger hover:underline"
              >
                Delete project
              </button>
            </div>
          </form>
        </Card>
      )}
    </>
  );
};

export default ProjectDetail;