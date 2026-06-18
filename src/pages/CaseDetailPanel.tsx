import { useState } from "react";
import type { CaseDetail } from "@law-office/shared";

interface CaseDetailPanelProps {
  item: CaseDetail;
}

type DetailTab = "overview" | "hearings" | "deadlines" | "filings" | "documents" | "tasks";

const tabs: Array<{ key: DetailTab; label: string }> = [
  { key: "overview", label: "نظرة عامة" },
  { key: "hearings", label: "الجلسات" },
  { key: "deadlines", label: "المدد" },
  { key: "filings", label: "الإيداعات" },
  { key: "documents", label: "الوثائق" },
  { key: "tasks", label: "المهام" }
];

export const CaseDetailPanel = ({ item }: CaseDetailPanelProps) => {
  const [activeTab, setActiveTab] = useState<DetailTab>("overview");

  return (
    <article className="panel detail-panel">
      <div className="section-head">
        <div>
          <h2>تفاصيل القضية</h2>
          <p>{item.caseRef} - {item.title}</p>
        </div>
      </div>

      <div className="tab-list">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={activeTab === tab.key ? "tab-button active" : "tab-button"}
            onClick={() => setActiveTab(tab.key)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" ? (
        <>
          <div className="detail-grid">
            <div>
              <span>المرجع</span>
              <strong>{item.caseRef}</strong>
            </div>
            <div>
              <span>الحالة</span>
              <strong>{item.status}</strong>
            </div>
            <div>
              <span>العميل</span>
              <strong>{item.clientName}</strong>
            </div>
            <div>
              <span>النوع</span>
              <strong>{item.caseType}</strong>
            </div>
            <div>
              <span>المحكمة</span>
              <strong>{item.courtName}</strong>
            </div>
            <div>
              <span>الفرع</span>
              <strong>{item.branchName}</strong>
            </div>
            <div>
              <span>المحامي</span>
              <strong>{item.leadLawyer}</strong>
            </div>
            <div>
              <span>الجلسة القادمة</span>
              <strong>
                {item.nextHearingDate ? formatDate(item.nextHearingDate) : "-"}
              </strong>
            </div>
          </div>
          <p className="detail-text">{item.description}</p>
        </>
      ) : null}

      {activeTab === "hearings" ? (
        <SimpleTable
          columns={["التاريخ", "الغرض", "الموقع", "الحالة"]}
          rows={item.hearings.map((hearing) => [
            formatDate(hearing.date),
            hearing.purpose,
            hearing.location,
            hearing.status
          ])}
          emptyText="لا توجد جلسات مرتبطة بهذه القضية."
        />
      ) : null}

      {activeTab === "deadlines" ? (
        <SimpleTable
          columns={["الوصف", "الاستحقاق", "المسؤول", "الحالة"]}
          rows={item.deadlines.map((deadline) => [
            deadline.title,
            formatDate(deadline.dueDate),
            deadline.assignedTo,
            deadline.status
          ])}
          emptyText="لا توجد مدد مرتبطة بهذه القضية."
        />
      ) : null}

      {activeTab === "filings" ? (
        <SimpleTable
          columns={["العنوان", "النوع", "تاريخ الإيداع", "الحالة"]}
          rows={item.filings.map((filing) => [
            filing.title,
            filing.filingType,
            formatDate(filing.filingDate),
            filing.status
          ])}
          emptyText="لا توجد إيداعات مرتبطة بهذه القضية."
        />
      ) : null}

      {activeTab === "documents" ? (
        <SimpleTable
          columns={["العنوان", "النوع", "الإصدار", "السرية"]}
          rows={item.documents.map((document) => [
            document.title,
            document.fileType,
            `v${document.versionNo}`,
            document.confidentiality
          ])}
          emptyText="لا توجد وثائق مرتبطة بهذه القضية."
        />
      ) : null}

      {activeTab === "tasks" ? (
        <SimpleTable
          columns={["المهمة", "المسؤول", "الأولوية", "الحالة"]}
          rows={item.tasks.map((task) => [
            task.title,
            task.assignedTo,
            task.priority,
            task.status
          ])}
          emptyText="لا توجد مهام مرتبطة بهذه القضية."
        />
      ) : null}
    </article>
  );
};

interface SimpleTableProps {
  columns: string[];
  rows: string[][];
  emptyText: string;
}

const SimpleTable = ({ columns, rows, emptyText }: SimpleTableProps) => {
  if (rows.length === 0) {
    return <p className="empty-state">{emptyText}</p>;
  }

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("ar-SA", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
