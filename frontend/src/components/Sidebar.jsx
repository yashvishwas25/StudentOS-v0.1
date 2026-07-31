import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const navItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/projects", label: "Projects" },
  { to: "/assignments", label: "Assignments" },
  { to: "/files", label: "Files" },
];

const Sidebar = () => {
  const { user, logout } = useAuth();

  return (
    <aside className="flex h-screen w-56 shrink-0 flex-col border-r border-border bg-surface">
      <div className="border-b border-border px-5 py-5">
        <span className="font-display text-lg font-semibold text-primary">
          StudentOS
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-accent-soft text-primary"
                  : "text-ink-muted hover:bg-paper hover:text-ink"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border px-4 py-4">
        <p className="truncate text-sm font-medium text-ink">{user?.username}</p>
        <button
          onClick={logout}
          className="mt-2 text-xs font-medium text-ink-muted hover:text-danger"
        >
          Log out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
