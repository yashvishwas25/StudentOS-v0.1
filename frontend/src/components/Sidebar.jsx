import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  ClipboardList,
  FileText,
  Brain,
  CalendarDays,
  NotebookPen,
  BarChart3,
  Lock,
} from "lucide-react";

import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import Button from "./Button";

const mainNavItems = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/projects",
    label: "Projects",
    icon: FolderKanban,
  },
  {
    to: "/assignments",
    label: "Assignments",
    icon: ClipboardList,
  },
  {
    to: "/files",
    label: "Files",
    icon: FileText,
  },
];

const futureNavItems = [
  {
    label: "AI Assistant",
    icon: Brain,
  },
  {
    label: "Calendar",
    icon: CalendarDays,
  },
  {
    label: "Notes",
    icon: NotebookPen,
  },
  {
    label: "Analytics",
    icon: BarChart3,
  },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { showToast } = useToast();

  const handleLogout = () => {
    logout();
    showToast("Logged out successfully");
  };

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-border bg-surface">
      {/* Brand */}

      <div className="border-b border-border px-6 py-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
          Academic OS
        </p>

        <h1 className="mt-1 font-display text-2xl font-semibold text-primary">
          StudentOS
        </h1>
      </div>

      {/* Main Navigation */}

      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">
          Workspace
        </p>

        <div className="space-y-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `
                    flex items-center gap-3
                    rounded-md
                    px-3 py-2.5
                    text-sm font-medium
                    transition-all duration-150

                    ${
                      isActive
                        ? "bg-accent-soft text-primary"
                        : "text-ink-muted hover:bg-paper hover:text-ink"
                    }
                  `
                }
              >
                <Icon size={18} strokeWidth={1.75} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Future Modules */}

        <div className="mt-10">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Coming Soon
          </p>

          <div className="space-y-1">
            {futureNavItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="
                    flex items-center justify-between
                    rounded-md
                    px-3 py-2.5
                    text-sm
                    text-ink-muted
                    opacity-60
                    cursor-not-allowed
                    select-none
                  "
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} strokeWidth={1.75} />
                    <span>{item.label}</span>
                  </div>

                  <Lock size={14} />
                </div>
              );
            })}
          </div>
        </div>
      </nav>

      {/* User */}

      <div className="border-t border-border p-5">
        <p className="text-xs uppercase tracking-wide text-ink-muted">
          Signed in as
        </p>

        <p className="mt-1 truncate font-medium text-ink">
          {user?.username}
        </p>

        <Button
          variant="ghost"
          size="sm"
          className="mt-4 w-full justify-start"
          onClick={handleLogout}
        >
          Log out
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;