import type { HearingListItem } from "@law-office/shared";

export const HearingsPage = ({ items }: { items: HearingListItem[] }) => (
  <div className="page-grid">
    <article className="panel">
      <div className="section-head">
        <div>
          <h2>الجلسات</h2>
          <p>متابعة الجلسات القادمة والمواقع والغرض من كل جلسة.</p>
        </div>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>القضية</th>
              <th>التاريخ</th>
              <th>الموقع</th>
              <th>الغرض</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.caseRef} - {item.caseTitle}</td>
                <td>{formatDate(item.hearingDate)}</td>
                <td>{item.location}</td>
                <td>{item.purpose}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  </div>
);

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("ar-SA", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));

