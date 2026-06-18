import type { NotificationListItem } from "@law-office/shared";

interface NotificationsPageProps {
  items: NotificationListItem[];
}

export const NotificationsPage = ({ items }: NotificationsPageProps) => {
  return (
    <div className="page-grid">
      <article className="panel">
        <div className="section-head">
          <div>
            <h2>الإشعارات</h2>
            <p>تنبيهات النظام المتعلقة بالمدد والمواعيد وتغييرات القضايا.</p>
          </div>
          <button type="button">قواعد التنبيه</button>
        </div>

        <ul className="activity-list">
          {items.map((item) => (
            <li key={item.id} className={item.isRead ? "notification-read" : "notification-unread"}>
              <strong>{item.title}</strong>
              <span>{item.body}</span>
              <small>
                {item.channel} - {formatDate(item.createdAt)}
              </small>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("ar-SA", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
