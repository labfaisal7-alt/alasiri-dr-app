import type { DeadlineListItem } from "@law-office/shared";

interface DeadlinesPageProps {
  items: DeadlineListItem[];
}

export const DeadlinesPage = ({ items }: DeadlinesPageProps) => {
  return (
    <div className="page-grid">
      <article className="panel">
        <div className="section-head">
          <div>
            <h2>المدد النظامية</h2>
            <p>متابعة المدد الحرجة، المسؤول عنها، وحالة كل إجراء.</p>
          </div>
          <button type="button">إضافة مدة</button>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>القضية</th>
                <th>الوصف</th>
                <th>المسؤول</th>
                <th>الاستحقاق</th>
                <th>المتبقي</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.caseRef}</td>
                  <td>{item.title}</td>
                  <td>{item.assignedTo}</td>
                  <td>{formatDate(item.dueDate)}</td>
                  <td>{renderDaysLeft(item.daysLeft)}</td>
                  <td>{item.status}</td>
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
    dateStyle: "medium"
  }).format(new Date(value));

const renderDaysLeft = (daysLeft: number) => {
  if (daysLeft < 0) {
    return `متأخرة ${Math.abs(daysLeft)} يوم`;
  }

  if (daysLeft === 0) {
    return "اليوم";
  }

  return `${daysLeft} يوم`;
};
