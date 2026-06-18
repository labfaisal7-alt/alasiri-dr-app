import type { DashboardData } from "@law-office/shared";

interface DashboardPageProps {
  data: DashboardData | null;
}

export const DashboardPage = ({ data }: DashboardPageProps) => {
  if (!data) {
    return <div className="panel">جاري تحميل بيانات لوحة التحكم...</div>;
  }

  return (
    <div className="page-grid">
      <section className="stats-grid">
        {data.metrics.map((metric) => (
          <article
            key={metric.label}
            className={`panel stat-card tone-${metric.tone ?? "default"}`}
          >
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </section>

      <section className="content-grid">
        <article className="panel">
          <h2>مدد حرجة</h2>
          <ul className="activity-list">
            {data.urgentDeadlines.map((item) => (
              <li key={item.id}>
                <strong>{item.title}</strong>
                <span>{item.subtitle}</span>
                <small>{item.meta}</small>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <h2>جلسات قادمة</h2>
          <ul className="activity-list">
            {data.upcomingHearings.map((item) => (
              <li key={item.id}>
                <strong>{item.title}</strong>
                <span>{item.subtitle}</span>
                <small>{item.meta}</small>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <article className="panel">
        <h2>أحدث طلبات الخدمة</h2>
        <ul className="activity-list">
          {data.recentServiceRequests.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong>
              <span>{item.subtitle}</span>
              <small>{item.meta}</small>
            </li>
          ))}
        </ul>
      </article>

      <article className="panel dashboard-note">
        <h2>الوحدات الجاهزة الآن</h2>
        <p>
          الواجهة تحتوي الآن على: لوحة التحكم، طلبات الخدمة، القضايا، المهام،
          المواعيد، المدد، والإشعارات.
        </p>
      </article>
    </div>
  );
};
