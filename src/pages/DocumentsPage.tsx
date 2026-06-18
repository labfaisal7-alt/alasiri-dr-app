import type { DocumentListItem } from "@law-office/shared";

export const DocumentsPage = ({ items }: { items: DocumentListItem[] }) => (
  <div className="page-grid">
    <article className="panel">
      <div className="section-head">
        <div>
          <h2>الوثائق</h2>
          <p>عرض الوثائق وإصداراتها ومستوى سريتها.</p>
        </div>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>العنوان</th>
              <th>مرتبط بـ</th>
              <th>النوع</th>
              <th>الإصدار</th>
              <th>السرية</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.relatedTo}</td>
                <td>{item.fileType}</td>
                <td>v{item.versionNo}</td>
                <td>{item.confidentiality}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  </div>
);

