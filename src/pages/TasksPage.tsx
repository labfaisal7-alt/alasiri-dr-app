import type { TaskListItem } from "@law-office/shared";

interface TasksPageProps {
  items: TaskListItem[];
}

export const TasksPage = ({ items }: TasksPageProps) => {
  return (
    <div className="page-grid">
      <article className="panel">
        <div className="section-head">
          <div>
            <h2>المهام الداخلية</h2>
            <p>متابعة التفويضات والأولويات والمواعيد النهائية داخل المكتب.</p>
          </div>
          <button type="button">مهمة جديدة</button>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>المهمة</th>
                <th>مرتبطة بـ</th>
                <th>المسؤول</th>
                <th>الأولوية</th>
                <th>الحالة</th>
                <th>الموعد النهائي</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.relatedTo}</td>
                  <td>{item.assignedTo}</td>
                  <td>{item.priority}</td>
                  <td>{item.status}</td>
                  <td>{item.dueDate ? formatDate(item.dueDate) : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  );
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("ar-SA", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
