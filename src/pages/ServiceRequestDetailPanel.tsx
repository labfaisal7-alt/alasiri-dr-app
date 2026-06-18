import type { ServiceRequestDetail } from "@law-office/shared";

interface ServiceRequestDetailPanelProps {
  item: ServiceRequestDetail;
  onConvertToCase: (id: string) => Promise<void>;
}

export const ServiceRequestDetailPanel = ({
  item,
  onConvertToCase
}: ServiceRequestDetailPanelProps) => {
  return (
    <article className="panel detail-panel">
      <div className="section-head">
        <div>
          <h2>تفاصيل طلب الخدمة</h2>
          <p>{item.requestNo} - {item.subject}</p>
        </div>

        <button
          disabled={Boolean(item.convertedCaseId)}
          onClick={() => onConvertToCase(item.id)}
          type="button"
        >
          {item.convertedCaseId ? "تم التحويل إلى قضية" : "تحويل إلى قضية"}
        </button>
      </div>

      <div className="detail-grid">
        <div>
          <span>الرقم</span>
          <strong>{item.requestNo}</strong>
        </div>
        <div>
          <span>الحالة</span>
          <strong>{item.status}</strong>
        </div>
        <div>
          <span>الاسم</span>
          <strong>{item.requesterName}</strong>
        </div>
        <div>
          <span>الهاتف</span>
          <strong>{item.requesterPhone ?? "-"}</strong>
        </div>
        <div>
          <span>البريد</span>
          <strong>{item.requesterEmail ?? "-"}</strong>
        </div>
        <div>
          <span>المصدر</span>
          <strong>{item.source}</strong>
        </div>
        <div>
          <span>الأولوية</span>
          <strong>{item.priority}</strong>
        </div>
        <div>
          <span>المسؤول</span>
          <strong>{item.assignedTo}</strong>
        </div>
        <div>
          <span>تاريخ الإنشاء</span>
          <strong>{formatDate(item.createdAt)}</strong>
        </div>
        <div>
          <span>القضية الناتجة</span>
          <strong>{item.convertedCaseId ?? "-"}</strong>
        </div>
      </div>

      <p className="detail-text">{item.details}</p>
    </article>
  );
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("ar-SA", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
