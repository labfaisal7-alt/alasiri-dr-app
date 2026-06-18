import type { AppointmentListItem } from "@law-office/shared";

interface AppointmentsPageProps {
  items: AppointmentListItem[];
}

export const AppointmentsPage = ({ items }: AppointmentsPageProps) => {
  return (
    <div className="page-grid">
      <article className="panel">
        <div className="section-head">
          <div>
            <h2>المواعيد والاجتماعات</h2>
            <p>إدارة مواعيد العملاء والاجتماعات الداخلية والمكالمات.</p>
          </div>
          <button type="button">موعد جديد</button>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>الموضوع</th>
                <th>النوع</th>
                <th>العميل</th>
                <th>الوقت</th>
                <th>الموقع</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.subject}</td>
                  <td>{item.appointmentType}</td>
                  <td>{item.clientName ?? "-"}</td>
                  <td>{formatDate(item.startAt)}</td>
                  <td>{item.location}</td>
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
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
