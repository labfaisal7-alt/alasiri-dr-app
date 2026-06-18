import { useState } from "react";
import type { ClientDetail, ClientListItem, CreateClientInput } from "@law-office/shared";

interface ClientsPageProps {
  items: ClientListItem[];
  selectedItem: ClientDetail | null;
  onOpenItem: (id: string) => void;
  onCreateItem: (input: CreateClientInput) => Promise<void>;
}

const initialForm: CreateClientInput = {
  name: "",
  clientType: "individual",
  identifier: "",
  phone: "",
  email: "",
  address: "",
  notes: ""
};

export const ClientsPage = ({
  items,
  selectedItem,
  onOpenItem,
  onCreateItem
}: ClientsPageProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState<CreateClientInput>(initialForm);

  return (
    <div className="page-grid">
      <article className="panel">
        <div className="section-head">
          <div>
            <h2>العملاء</h2>
            <p>إدارة العملاء وجهات التواصل الأساسية الخاصة بهم.</p>
          </div>
          <button onClick={() => setIsCreating((v) => !v)} type="button">
            {isCreating ? "إغلاق النموذج" : "عميل جديد"}
          </button>
        </div>

        {isCreating ? (
          <form
            className="inline-form"
            onSubmit={async (event) => {
              event.preventDefault();
              await onCreateItem(form);
              setForm(initialForm);
              setIsCreating(false);
            }}
          >
            <input value={form.name} placeholder="اسم العميل" onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <select value={form.clientType} onChange={(e) => setForm({ ...form, clientType: e.target.value as CreateClientInput["clientType"] })}>
              <option value="individual">individual</option>
              <option value="company">company</option>
            </select>
            <input value={form.identifier} placeholder="الهوية أو السجل" onChange={(e) => setForm({ ...form, identifier: e.target.value })} />
            <input value={form.phone ?? ""} placeholder="الهاتف" onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input value={form.email ?? ""} placeholder="البريد الإلكتروني" onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input value={form.address ?? ""} placeholder="العنوان" onChange={(e) => setForm({ ...form, address: e.target.value })} />
            <textarea value={form.notes ?? ""} placeholder="ملاحظات" onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            <button type="submit">حفظ العميل</button>
          </form>
        ) : null}

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>الاسم</th>
                <th>النوع</th>
                <th>المعرف</th>
                <th>الهاتف</th>
                <th>جهة التواصل</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="clickable-row" onClick={() => onOpenItem(item.id)}>
                  <td>{item.name}</td>
                  <td>{item.clientType}</td>
                  <td>{item.identifier}</td>
                  <td>{item.phone ?? "-"}</td>
                  <td>{item.primaryContact ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      {selectedItem ? (
        <article className="panel detail-panel">
          <h2>تفاصيل العميل</h2>
          <div className="detail-grid">
            <div><span>الاسم</span><strong>{selectedItem.name}</strong></div>
            <div><span>النوع</span><strong>{selectedItem.clientType}</strong></div>
            <div><span>المعرف</span><strong>{selectedItem.identifier}</strong></div>
            <div><span>الهاتف</span><strong>{selectedItem.phone ?? "-"}</strong></div>
            <div><span>البريد</span><strong>{selectedItem.email ?? "-"}</strong></div>
            <div><span>العنوان</span><strong>{selectedItem.address ?? "-"}</strong></div>
          </div>
          <p className="detail-text">{selectedItem.notes ?? "لا توجد ملاحظات."}</p>
        </article>
      ) : null}
    </div>
  );
};

