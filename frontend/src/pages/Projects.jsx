import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import Pagination from "../components/Pagination";
import EmptyState from "../components/EmptyState";
import ConfirmDialog from "../components/ConfirmDialog";
import { usePaginatedResource } from "../hooks/usePaginatedResource";
import { useToast } from "../hooks/useToast";
import {
  getProjects,
  createProject,
  deleteProject,
} from "../api/projects";
import { validateProjectName } from "../utils/validators";

const Projects = () => {
  const {
    items: projects,
    page,
    pages,
    loading,
    error,
    setError,
    load,
  } = usePaginatedResource(getProjects);

  const { showToast } = useToast();

  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [newName, setNewName] = useState("");

  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    load({ page: 1, search });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);

    if (error) {
      setError("");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    setActiveSearch(search);

    load({
      page: 1,
      search,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const validationError = validateProjectName(newName);

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await createProject(newName.trim());

      setNewName("");

      load({
        page: 1,
        search,
      });

      showToast("Project created successfully");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Failed to create project";

      setError(message);
      showToast(message, "error");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setDeleting(true);

    try {
      await deleteProject(deleteId);

      setDeleteId(null);

      const nextPage =
        page > 1 && projects.length === 1
          ? page - 1
          : page;

      load({
        page: nextPage,
        search,
      });

      showToast("Project deleted successfully");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Failed to delete project";

      setError(message);
      showToast(message, "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <h1 className="font-display text-3xl font-semibold text-ink">
        Projects
      </h1>

      <p className="mt-1 text-sm text-ink-muted">
        Organize and track your academic projects.
      </p>

      <form
        onSubmit={handleCreate}
        className="mt-6 flex gap-3"
      >
        <Input
          placeholder="New project name"
          value={newName}
          onChange={handleNameChange}
          className="flex-1"
        />

        <Button type="submit">
          Add project
        </Button>
      </form>

      <form
        onSubmit={handleSearchSubmit}
        className="mt-4 flex gap-3"
      >
        <Input
          placeholder="Search projects..."
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
            Loading projects...
          </p>
        ) : projects.length === 0 ? (
          activeSearch ? (
            <EmptyState
              title="No matching projects"
              description={`No projects found for "${activeSearch}". Try a different search.`}
            />
          ) : (
            <EmptyState
              title="No projects yet"
              description="Create your first project to get started."
            />
          )
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="flex items-center justify-between"
              >
                <Link
                  to={`/projects/${project.id}`}
                  className="font-medium text-ink hover:text-primary hover:underline"
                >
                  {project.name}
                </Link>

                <Button
                  variant="dangerGhost"
                  size="sm"
                  onClick={() => setDeleteId(project.id)}
                >
                  Delete
                </Button>
              </Card>
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
        title="Delete project?"
        message="This project will be permanently deleted. This action cannot be undone."
        confirmLabel="Delete Project"
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

export default Projects;