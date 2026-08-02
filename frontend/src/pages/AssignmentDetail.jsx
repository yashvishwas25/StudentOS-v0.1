import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import { useToast } from "../hooks/useToast";
import { validateAssignmentTitle } from "../utils/validators";
import { getAssignment, updateAssignment, deleteAssignment } from "../api/assignments";

const statusOptions = ["pending", "in-progress", "completed"];

const AssignmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [form, setForm] = useState({ title: "", description: "", due_date: "", status: "pending" });
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
        setError(err.response?.data?.message || "Failed to load assignment");
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
      const message = err.response?.data?.message || "Failed to update assignment";
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
      const message = err.response?.data?.message || "Failed to delete assignment";
      setError(message);
      showToast(message, "error");
    }
  };

  if (loading) {
    return <p className="text-sm text-ink-muted">Loading assignment...</p>;
  }

  return (
    <>
      <Link to="/assignments" className="text-sm font-medium text-primary hover:underline">
        ← Back to Assignments
      </Link>

      <h1 className="mt-3 font-display text-2xl font-semibold text-ink">Edit Assignment</h1>

      {error && <p className="mt-4 text-sm text-danger">{error}</p>}

      {!error && (
        <Card className="mt-6 max-w-lg">
          <form onSubmit={handleSave} className="space-y-4" noValidate>
            <div>
              <label className="mb-1 block text-sm font-medium text-ink">Title</label>
              <Input
                value={form.title}
                onChange={(e) => {
                  setForm({ ...form, title: e.target.value });
                  setTitleError("");
                }}
                error={titleError}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-ink">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4}
                className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-ink">Due date</label>
              <Input
                value={form.due_date}
                onChange={(e) => setForm({ ...form, due_date: e.target.value })}
                placeholder="2026-08-01"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-ink">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-3">
              <Button type="submit" loading={saving}>Save changes</Button>
              <button
                type="button"
                onClick={handleDelete}
                className="text-sm font-medium text-danger hover:underline"
              >
                Delete assignment
              </button>
            </div>
          </form>
        </Card>
      )}
    </>
  );
};

export default AssignmentDetail;