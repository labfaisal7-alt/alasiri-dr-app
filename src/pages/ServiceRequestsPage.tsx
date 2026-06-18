import { useState } from "react";
import type {
  CreateServiceRequestInput,
  ServiceRequestDetail,
  ServiceRequestListItem
} from "@law-office/shared";
import { ServiceRequestDetailPanel } from "./ServiceRequestDetailPanel";

interface ServiceRequestsPageProps {
  items: ServiceRequestListItem[];
  selectedItem: ServiceRequestDetail | null;
  onOpenItem: (id: string) => void;
  onCreateItem: (input: CreateServiceRequestInput) => Promise<void>;
  onConvertToCase: (id: string) => Promise<void>;
}

const initialForm: CreateServiceRequestInput = {
  requesterName: "",
  requesterPhone: "",
  requesterEmail: "",
  subject: "",
  details: "",
  source: "website",
  priority: "normal",
  assignedTo: ""
};

export const ServiceRequestsPage = ({
  items,
  selectedItem,
  onOpenItem,
  onCreateItem,
  onConvertToCase
}: ServiceRequestsPageProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState<CreateServiceRequestInput>(initialForm);

  return (
    <div className="page-grid">
      <article className="panel">
        <div className="section-head">
          <div>
            <h2>طلبات الخدمة</h2>
            <p>مرحلة الاستقبال قبل تحويل الطلب إلى عميل أو قضية.</p>
          </div>
          <button onClick={() => setIsCreating((value) => !value)} type="button">
            {isCreating ? "إغلاق النموذج" : "طلب خدمة جديد"}
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
            <input
              placeholder="اسم مقدم الطلب"
              value={form.requesterName}
              onChange={(event) =>
                setForm({ ...form, requesterName: event.target.value })
              }
            />
            <input
              placeholder="رقم الجوال"
              value={form.requesterPhone ?? ""}
              onChange={(event) =>
                setForm({ ...form, requesterPhone: event.target.value })
              }
            />
            <input
              placeholder="البريد الإلكتروني"
              value={form.requesterEmail ?? ""}
              onChange={(event) =>
                setForm({ ...form, requesterEmail: event.target.value })
              }
            />
            <input
              placeholder="الموضوع"
              value={form.subject}
              onChange={(event) => setForm({ ...form, subject: event.target.value })}
            />
            <input
              placeholder="المسؤول"
              value={form.assignedTo}
              onChange={(event) =>
                setForm({ ...form, assignedTo: event.target.value })
              }
            />
            <select
              value={form.source}
              onChange={(event) =>
                setForm({
                  ...form,
                  source: event.target.value as CreateServiceRequestInput["source"]
                })
              }
            >
              <option value="website">website</option>
              <option value="phone">phone</option>
              <option value="walk_in">walk_in</option>
              <option value="whatsapp">whatsapp</option>
              <option value="referral">referral</option>
              <option value="email">email</option>
            </select>
            <select
              value={form.priority}
              onChange={(event) =>
                setForm({
                  ...form,
                  priority: event.target.value as CreateServiceRequestInput["priority"]
                })
              }
            >
              <option value="low">low</option>
              <option value="normal">normal</option>
              <option value="high">high</option>
              <option value="urgent">urgent</option>
            </select>
            <textarea
              placeholder="تفاصيل الطلب"
              value={form.details}
              onChange={(event) => setForm({ ...form, details: event.target.value })}
            />
            <button type="submit">حفظ الطلب</button>
          </form>
        ) : null}

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>الرقم</th>
                <th>مقدم الطلب</th>
                <th>الموضوع</th>
                <th>المصدر</th>
                <th>الأولوية</th>
                <th>الحالة</th>
                <th>المسؤول</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="clickable-row"
                  onClick={() => onOpenItem(item.id)}
                >
                  <td>{item.requestNo}</td>
                  <td>{item.requesterName}</td>
                  <td>{item.subject}</td>
                  <td>{item.source}</td>
                  <td>{item.priority}</td>
                  <td>{item.status}</td>
                  <td>{item.assignedTo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      {selectedItem ? (
        <ServiceRequestDetailPanel
          item={selectedItem}
          onConvertToCase={onConvertToCase}
        />
      ) : null}
    </div>
  );
};
