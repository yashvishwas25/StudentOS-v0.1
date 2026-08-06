import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import { useToast } from "../hooks/useToast";
import { validateAssignmentTitle } from "../utils/validators";
import {
  getAssignment,
  updateAssignment,
  deleteAssignment,
} from "../api/assignments";

const statusOptions = [
  "pending",
  "in-progress",
  "completed",
];

const AssignmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: "",
    status: "pending",
  });

  const [titleError, setTitleError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await getAssignment(id);

        setForm({
          title: res.data.title,
          description: res.data.description || "",
          due_date: res.data.due_date || "",
          status: res.data.status,
        });
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load assignment"
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

    const validationError = validateAssignmentTitle(form.title);

    if (validationError) {
      setTitleError(validationError);
      return;
    }

    setSaving(true);
    setError("");

    try {
      await updateAssignment(id, form);

      showToast("Assignment updated successfully");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Failed to update assignment";

      setError(message);
      showToast(message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAssignment(id);

      showToast("Assignment deleted successfully");

      navigate("/assignments");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Failed to delete assignment";

      setError(message);
      showToast(message, "error");
    }
  };

  if (loading) {
    return (
      <p className="text-sm text-ink-muted">
        Loading assignment...
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/assignments"
        className="text-sm font-medium text-primary hover:underline"
      >
        ← Back to Assignments
      </Link>

      <div className="mt-4">
        <h1 className="font-display text-3xl font-semibold text-ink">
          Edit Assignment
        </h1>

        <p className="mt-2 text-sm text-ink-muted">
          Update assignment details and keep your coursework
          organized.
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
                Assignment Title
              </label>

              <Input
                value={form.title}
                onChange={(e) => {
                  setForm({
                    ...form,
                    title: e.target.value,
                  });

                  setTitleError("");
                }}
                error={titleError}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-ink">
                Description
              </label>

              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                rows={5}
                className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink transition-colors duration-150 focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-ink">
                Due Date
              </label>

              <Input
                value={form.due_date}
                placeholder="2026-08-01"
                onChange={(e) =>
                  setForm({
                    ...form,
                    due_date: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-ink">
                Status
              </label>

              <select
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value,
                  })
                }
                className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink transition-colors duration-150 focus:border-primary focus:outline-none"
              >
                {statusOptions.map((status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                ))}
              </select>
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
                Delete Assignment
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};

export default AssignmentDetail;