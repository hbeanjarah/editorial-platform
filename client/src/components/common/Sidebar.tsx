import { NavLink } from "react-router";
import { LayoutDashboard, FileText, Tags, Bell, Upload } from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Tableau de bord" },
  { to: "/articles", icon: FileText, label: "Articles" },
  { to: "/categories", icon: Tags, label: "Catégories" },
  { to: "/notifications", icon: Bell, label: "Notifications" },
  { to: "/import", icon: Upload, label: "Import" },
];

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-60 bg-navy flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white tracking-tight">
          Editorial <span className="text-brand">CMS</span>
        </h1>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand text-white"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
