import { Link } from "react-router-dom";
import {
  FolderKanban,
  ClipboardList,
  FileText,
  Plus,
  Upload,
} from "lucide-react";

import Card from "../components/Card";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";

const modules = [
  {
    to: "/projects",
    title: "Projects",
    description: "Track your academic projects",
    icon: FolderKanban,
  },
  {
    to: "/assignments",
    title: "Assignments",
    description: "Manage coursework and deadlines",
    icon: ClipboardList,
  },
  {
    to: "/files",
    title: "Files",
    description: "Access your files from anywhere",
    icon: FileText,
  },
];

const quickActions = [
  {
    to: "/projects",
    label: "New Project",
    icon: Plus,
  },
  {
    to: "/assignments",
    label: "New Assignment",
    icon: Plus,
  },
  {
    to: "/files",
    label: "Upload File",
    icon: Upload,
  },
];

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Header */}

      <section>
        <h1 className="font-display text-3xl font-semibold text-ink">
          Welcome back, {user?.username}
        </h1>

        <p className="mt-2 text-sm text-ink-muted">
          Here's your academic workspace for today.
        </p>
      </section>

      {/* Quick Actions */}

      <section>
        <h2 className="mb-4 font-display text-lg font-semibold text-ink">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link key={action.label} to={action.to}>
                <Button variant="outline">
                  <Icon size={16} strokeWidth={1.75} />
                  {action.label}
                </Button>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Workspace */}

      <section>
        <h2 className="mb-4 font-display text-lg font-semibold text-ink">
          Workspace
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon;

            return (
              <Link key={module.to} to={module.to}>
                <Card
                  hover
                  className="flex h-full flex-col"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-paper">
                    <Icon
                      size={20}
                      strokeWidth={1.75}
                      className="text-primary"
                    />
                  </div>

                  <h3 className="font-display text-lg font-semibold text-ink">
                    {module.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-ink-muted">
                    {module.description}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Future Area */}

      <section>
        <h2 className="mb-4 font-display text-lg font-semibold text-ink">
          Recent Activity
        </h2>

        <Card>
          <p className="text-sm text-ink-muted">
            Recent activity, upcoming deadlines and AI insights will appear
            here in future versions of StudentOS.
          </p>
        </Card>
      </section>
    </div>
  );
};

export default Dashboard;