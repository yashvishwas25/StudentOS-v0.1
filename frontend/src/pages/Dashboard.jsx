import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Card from "../components/Card";
import { useAuth } from "../hooks/useAuth";

const modules = [
  { to: "/projects", label: "Projects", description: "Track your academic projects" },
  { to: "/assignments", label: "Assignments", description: "Manage coursework and deadlines" },
  { to: "/files", label: "Files", description: "Access your files from anywhere" },
];

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <h1 className="font-display text-2xl font-semibold text-ink">
        Welcome back, {user?.username}
      </h1>
      <p className="mt-1 text-sm text-ink-muted">
        Here's your academic workspace.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {modules.map((mod) => (
          <Link key={mod.to} to={mod.to}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <h3 className="font-display text-lg font-semibold text-primary">
                {mod.label}
              </h3>
              <p className="mt-1 text-sm text-ink-muted">{mod.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
