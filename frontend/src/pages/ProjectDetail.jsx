import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import { useToast } from "../hooks/useToast";
import { validateProjectName } from "../utils/validators";
import {
  getProject,
  updateProject,
  deleteProject,
} from "../api/projects";

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
        setError(
          err.response?.data?.message ||
            "Failed to load project"
        );
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
      const message =
        err.response?.data?.message ||
        "Failed to update project";

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
      const message =
        err.response?.data?.message ||
        "Failed to delete project";

      setError(message);
      showToast(message, "error");
    }
  };

  if (loading) {
    return (
      <p className="text-sm text-ink-muted">
        Loading project...
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/projects"
        className="text-sm font-medium text-primary hover:underline"
      >
        ← Back to Projects
      </Link>

      <div className="mt-4">
        <h1 className="font-display text-3xl font-semibold text-ink">
          Edit Project
        </h1>

        <p className="mt-2 text-sm text-ink-muted">
          Update your project information.
        </p>
      </div>

      {error && (
        <p className="mt-6 text-sm text-danger">
          {error}
        </p>
      )}

      {!error && (
        <Card
          hover={false}
          className="mt-8"
        >
          <form
            onSubmit={handleSave}
            className="space-y-6"
            noValidate
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-ink">
                Project Name
              </label>

              <Input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError("");
                }}
                error={nameError}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6">
              <Button
                type="submit"
                loading={saving}
              >
                Save Changes
              </Button>

              <Button
                type="button"
                variant="dangerGhost"
                onClick={handleDelete}
              >
                Delete Project
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};

export default ProjectDetail;