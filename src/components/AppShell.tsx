import type { ReactNode } from "react";
import type { AppRoute, SessionUser } from "../types";

interface AppShellProps {
  activeRoute: AppRoute;
  title: string;
  subtitle: string;
  user: SessionUser;
  onNavigate: (route: AppRoute) => void;
  onLogout: () => void;
  children: ReactNode;
}

const navItems: Array<{ key: AppRoute; label: string }> = [
  { key: "dashboard", label: "لوحة التحكم" },
  { key: "service-requests", label: "طلبات الخدمة" },
  { key: "cases", label: "القضايا" },
  { key: "tasks", label: "المهام" },
  { key: "appointments", label: "المواعيد" },
  { key: "deadlines", label: "المدد" },
  { key: "notifications", label: "الإشعارات" },
  { key: "clients", label: "العملاء" },
  { key: "hearings", label: "الجلسات" },
  { key: "documents", label: "الوثائق" },
  { key: "finance", label: "المالية" }
];

export const AppShell = ({
  activeRoute,
  title,
  subtitle,
  user,
  onNavigate,
  onLogout,
  children
}: AppShellProps) => {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand-block">
          <p className="eyebrow">Law Office</p>
          <h2>نظام المكتب</h2>
          <span>{user.branch}</span>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={item.key === activeRoute ? "nav-item active" : "nav-item"}
              onClick={() => onNavigate(item.key)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <strong>{user.fullName}</strong>
          <span>{user.role}</span>
          <button className="ghost-button" onClick={onLogout} type="button">
            تسجيل الخروج
          </button>
        </div>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>

          <div className="topbar-card">
            <span>المستخدم الحالي</span>
            <strong>{user.fullName}</strong>
          </div>
        </header>

        <section className="page-content">{children}</section>
      </div>
    </div>
  );
};
