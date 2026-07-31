import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import Pagination from "../components/Pagination";
import EmptyState from "../components/EmptyState";
import { getProjects, createProject, deleteProject } from "../api/projects";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProjects = async (targetPage = page, targetSearch = search) => {
    setLoading(true);
    setError("");

    try {
      const res = await getProjects({ page: targetPage, search: targetSearch });
      setProjects(res.data.items);
      setPage(res.data.page);
      setPages(res.data.pages);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects(1, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadProjects(1, search);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    try {
      await createProject(newName.trim());
      setNewName("");
      loadProjects(1, search);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create project");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      loadProjects(page, search);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete project");
    }
  };

  return (
    <DashboardLayout>
      <h1 className="font-display text-2xl font-semibold text-ink">Projects</h1>
      <p className="mt-1 text-sm text-ink-muted">Organize and track your academic projects.</p>

      <form onSubmit={handleCreate} className="mt-6 flex gap-3">
        <Input
          placeholder="New project name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">Add project</Button>
      </form>

      <form onSubmit={handleSearchSubmit} className="mt-4 flex gap-3">
        <Input
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" variant="outline">Search</Button>
      </form>

      {error && <p className="mt-4 text-sm text-danger">{error}</p>}

      <div className="mt-6">
        {loading ? (
          <p className="text-sm text-ink-muted">Loading projects...</p>
        ) : projects.length === 0 ? (
          <EmptyState
            title="No projects yet"
            description="Create your first project to get started."
          />
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.id} className="flex items-center justify-between">
                <span className="font-medium text-ink">{project.name}</span>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="text-xs font-medium text-danger hover:underline"
                >
                  Delete
                </button>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Pagination page={page} pages={pages} onPageChange={(p) => loadProjects(p, search)} />
    </DashboardLayout>
  );
};

export default Projects;
