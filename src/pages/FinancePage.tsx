import type { ExpenseListItem, InvoiceListItem } from "@law-office/shared";

interface FinancePageProps {
  invoices: InvoiceListItem[];
  expenses: ExpenseListItem[];
}

export const FinancePage = ({ invoices, expenses }: FinancePageProps) => (
  <div className="page-grid">
    <article className="panel">
      <h2>الفواتير</h2>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>رقم الفاتورة</th>
              <th>العميل</th>
              <th>القيمة</th>
              <th>الحالة</th>
              <th>تاريخ الإصدار</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((item) => (
              <tr key={item.id}>
                <td>{item.invoiceNo}</td>
                <td>{item.clientName}</td>
                <td>{item.total.toLocaleString("ar-SA")} ر.س</td>
                <td>{item.status}</td>
                <td>{formatDate(item.issueDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>

    <article className="panel">
      <h2>المصروفات</h2>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>الفئة</th>
              <th>القيمة</th>
              <th>التاريخ</th>
              <th>الوصف</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((item) => (
              <tr key={item.id}>
                <td>{item.category}</td>
                <td>{item.amount.toLocaleString("ar-SA")} ر.س</td>
                <td>{formatDate(item.expenseDate)}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  </div>
);

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("ar-SA", { dateStyle: "medium" }).format(new Date(value));
