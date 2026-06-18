import type { CaseDetail, CaseListItem, CreateCaseInput } from "@law-office/shared";
import { useState } from "react";
import { CaseDetailPanel } from "./CaseDetailPanel";

interface CasesPageProps {
  items: CaseListItem[];
  selectedItem: CaseDetail | null;
  onOpenItem: (id: string) => void;
  onCreateItem: (input: CreateCaseInput) => Promise<void>;
}

const initialForm: CreateCaseInput = {
  title: "",
  clientName: "",
  caseType: "",
  courtName: "",
  leadLawyer: "",
  description: ""
};

export const CasesPage = ({
  items,
  selectedItem,
  onOpenItem,
  onCreateItem
}: CasesPageProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState<CreateCaseInput>(initialForm);

  return (
    <div className="page-grid">
      <article className="panel">
        <div className="section-head">
          <div>
            <h2>القضايا</h2>
            <p>متابعة القضايا المفتوحة وحالتها والمحامي المسؤول عنها.</p>
          </div>
          <button onClick={() => setIsCreating((value) => !value)} type="button">
            {isCreating ? "إغلاق النموذج" : "قضية جديدة"}
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
              placeholder="عنوان القضية"
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
            />
            <input
              placeholder="اسم العميل"
              value={form.clientName}
              onChange={(event) =>
                setForm({ ...form, clientName: event.target.value })
              }
            />
            <input
              placeholder="نوع القضية"
              value={form.caseType}
              onChange={(event) =>
                setForm({ ...form, caseType: event.target.value })
              }
            />
            <input
              placeholder="المحكمة"
              value={form.courtName}
              onChange={(event) =>
                setForm({ ...form, courtName: event.target.value })
              }
            />
            <input
              placeholder="المحامي المسؤول"
              value={form.leadLawyer}
              onChange={(event) =>
                setForm({ ...form, leadLawyer: event.target.value })
              }
            />
            <textarea
              placeholder="وصف القضية"
              value={form.description}
              onChange={(event) =>
                setForm({ ...form, description: event.target.value })
              }
            />
            <button type="submit">حفظ القضية</button>
          </form>
        ) : null}

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>المرجع</th>
                <th>العنوان</th>
                <th>العميل</th>
                <th>النوع</th>
                <th>المحكمة</th>
                <th>المحامي</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="clickable-row"
                  onClick={() => onOpenItem(item.id)}
                >
                  <td>{item.caseRef}</td>
                  <td>{item.title}</td>
                  <td>{item.clientName}</td>
                  <td>{item.caseType}</td>
                  <td>{item.courtName}</td>
                  <td>{item.leadLawyer}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      {selectedItem ? <CaseDetailPanel item={selectedItem} /> : null}
    </div>
  );
};
