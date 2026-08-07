import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import Badge from "../components/Badge";
import Pagination from "../components/Pagination";
import EmptyState from "../components/EmptyState";
import ConfirmDialog from "../components/ConfirmDialog";
import { usePaginatedResource } from "../hooks/usePaginatedResource";
import { useToast } from "../hooks/useToast";
import {
  getAssignments,
  createAssignment,
  deleteAssignment,
} from "../api/assignments";
import { validateAssignmentTitle } from "../utils/validators";

const statusOptions = [
  "",
  "pending",
  "in-progress",
  "completed",
];

const badgeVariantMap = {
  pending: "warning",
  "in-progress": "info",
  completed: "success",
};

const Assignments = () => {
  const {
    items: assignments,
    page,
    pages,
    loading,
    error,
    setError,
    load,
  } = usePaginatedResource(getAssignments);

  const { showToast } = useToast();

  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: "",
  });

  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    load({
      page: 1,
      search,
      status: statusFilter,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const handleTitleChange = (e) => {
    setForm({
      ...form,
      title: e.target.value,
    });

    if (error) {
      setError("");
    }
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();

    setActiveSearch(search);

    load({
      page: 1,
      search,
      status: statusFilter,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const validationError =
      validateAssignmentTitle(form.title);

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await createAssignment({
        ...form,
        status: "pending",
      });

      setForm({
        title: "",
        description: "",
        due_date: "",
      });

      load({
        page: 1,
        search,
        status: statusFilter,
      });

      showToast("Assignment created successfully");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Failed to create assignment";

      setError(message);
      showToast(message, "error");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setDeleting(true);

    try {
      await deleteAssignment(deleteId);

      setDeleteId(null);

      const nextPage =
        page > 1 && assignments.length === 1
          ? page - 1
          : page;

      load({
        page: nextPage,
        search,
        status: statusFilter,
      });

      showToast("Assignment deleted successfully");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Failed to delete assignment";

      setError(message);
      showToast(message, "error");
    } finally {
      setDeleting(false);
    }
  };

  const isFiltering =
    activeSearch || statusFilter;

  return (
    <>
      <h1 className="font-display text-3xl font-semibold text-ink">
        Assignments
      </h1>

      <p className="mt-1 text-sm text-ink-muted">
        Track your coursework and deadlines.
      </p>

      <form
        onSubmit={handleCreate}
        className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-4"
      >
        <Input
          placeholder="Title"
          value={form.title}
          onChange={handleTitleChange}
          className="sm:col-span-2"
        />

        <Input
          placeholder="Due date (e.g. 2026-08-01)"
          value={form.due_date}
          onChange={(e) =>
            setForm({
              ...form,
              due_date: e.target.value,
            })
          }
        />

        <Button type="submit">
          Add assignment
        </Button>
      </form>

      <form
        onSubmit={handleFilterSubmit}
        className="mt-4 flex flex-wrap gap-3"
      >
        <Input
          placeholder="Search assignments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
        >
          {statusOptions.map((status) => (
            <option
              key={status}
              value={status}
            >
              {status || "All statuses"}
            </option>
          ))}
        </select>

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

      <div className="mt-6 space-y-3">
        {loading ? (
          <p className="text-sm text-ink-muted">
            Loading assignments...
          </p>
        ) : assignments.length === 0 ? (
          isFiltering ? (
            <EmptyState
              title="No matching assignments"
              description="Try a different search term or status filter."
            />
          ) : (
            <EmptyState
              title="No assignments yet"
              description="Add your first assignment above."
            />
          )
        ) : (
          assignments.map((assignment) => (
            <Card
              key={assignment.id}
              className="flex items-center justify-between"
            >
              <div>
                <Link
                  to={`/assignments/${assignment.id}`}
                  className="font-medium text-ink hover:text-primary hover:underline"
                >
                  {assignment.title}
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <Badge
                  variant={
                    badgeVariantMap[
                      assignment.status
                    ] || "default"
                  }
                >
                  {assignment.status}
                </Badge>

                <Button
                  variant="dangerGhost"
                  size="sm"
                  onClick={() =>
                    setDeleteId(assignment.id)
                  }
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      <Pagination
        page={page}
        pages={pages}
        onPageChange={(p) =>
          load({
            page: p,
            search,
            status: statusFilter,
          })
        }
      />

      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Delete assignment?"
        message="This assignment will be permanently deleted. This action cannot be undone."
        confirmLabel="Delete Assignment"
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

export default Assignments;