import { useEffect, useState } from "react";
import type {
  AuthUser,
  CaseDetail,
  CreateClientInput,
  CreateCaseInput,
  CreateServiceRequestInput,
  ServiceRequestDetail
} from "@law-office/shared";
import { AppShell } from "./components/AppShell";
import { LoginPage } from "./components/LoginPage";
import { api, isDemoMode, setApiToken } from "./lib/api";
import { AppointmentsPage } from "./pages/AppointmentsPage";
import { CasesPage } from "./pages/CasesPage";
import { ClientsPage } from "./pages/ClientsPage";
import { DashboardPage } from "./pages/DashboardPage";
import { DeadlinesPage } from "./pages/DeadlinesPage";
import { DocumentsPage } from "./pages/DocumentsPage";
import { FinancePage } from "./pages/FinancePage";
import { HearingsPage } from "./pages/HearingsPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { ServiceRequestsPage } from "./pages/ServiceRequestsPage";
import { TasksPage } from "./pages/TasksPage";
import type { AppDataState, AppRoute, SessionUser } from "./types";

const storedUser = localStorage.getItem("law_office_user");
const initialUser = storedUser ? (JSON.parse(storedUser) as AuthUser) : null;

const routeMeta: Record<AppRoute, { title: string; subtitle: string }> = {
  dashboard: {
    title: "لوحة التحكم",
    subtitle: "متابعة سريعة للمدد والجلسات والقضايا وطلبات الخدمة."
  },
  "service-requests": {
    title: "طلبات الخدمة",
    subtitle: "إدارة الطلبات الجديدة قبل تحويلها إلى عميل أو قضية."
  },
  cases: {
    title: "القضايا",
    subtitle: "متابعة القضايا المفتوحة وحالة كل ملف والمحامي المسؤول."
  },
  tasks: {
    title: "المهام",
    subtitle: "تنظيم العمل الداخلي والتفويضات والأولويات."
  },
  appointments: {
    title: "المواعيد",
    subtitle: "إدارة مواعيد العملاء والاجتماعات الداخلية."
  },
  deadlines: {
    title: "المدد النظامية",
    subtitle: "متابعة المدد الحرجة قبل فواتها."
  },
  notifications: {
    title: "الإشعارات",
    subtitle: "تنبيهات النظام والقواعد المرتبطة بها."
  },
  clients: {
    title: "العملاء",
    subtitle: "إدارة بيانات العملاء وجهات التواصل الخاصة بهم."
  },
  hearings: {
    title: "الجلسات",
    subtitle: "متابعة الجلسات القادمة والجلسات السابقة."
  },
  documents: {
    title: "الوثائق",
    subtitle: "إدارة الوثائق والإصدارات ومستويات السرية."
  },
  finance: {
    title: "المالية",
    subtitle: "الفواتير والمصروفات ومؤشرات الحركة المالية."
  }
};

export const App = () => {
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(initialUser);
  const [activeRoute, setActiveRoute] = useState<AppRoute>("dashboard");
  const [data, setData] = useState<AppDataState>({
    dashboard: null,
    serviceRequests: [],
    cases: [],
    tasks: [],
    appointments: [],
    deadlines: [],
    notifications: [],
    clients: [],
    selectedClient: null,
    hearings: [],
    documents: [],
    invoices: [],
    expenses: []
  });
  const [error, setError] = useState<string | null>(null);
  const [selectedServiceRequest, setSelectedServiceRequest] =
    useState<ServiceRequestDetail | null>(null);
  const [selectedCase, setSelectedCase] = useState<CaseDetail | null>(null);

  const isAuthenticated = Boolean(sessionUser);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    void Promise.all([
      api.getDashboard(),
      api.getServiceRequests(),
      api.getCases(),
      api.getTasks(),
      api.getAppointments(),
      api.getDeadlines(),
      api.getNotifications(),
      api.getClients(),
      api.getHearings(),
      api.getDocuments(),
      api.getInvoices(),
      api.getExpenses()
    ])
      .then(
        ([
          dashboard,
          serviceRequests,
          cases,
          tasks,
          appointments,
          deadlines,
          notifications,
          clients,
          hearings,
          documents,
          invoices,
          expenses
        ]) => {
          setData({
            dashboard,
            serviceRequests,
            cases,
            tasks,
            appointments,
            deadlines,
            notifications,
            clients,
            selectedClient: null,
            hearings,
            documents,
            invoices,
            expenses
          });
        }
      )
      .then(() => {
        setError(null);
      })
      .catch(() => {
        setError("تعذر تحميل البيانات من الخادم. تأكد من تشغيل API على المنفذ 4000.");
      });
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <LoginPage
        demoMode={isDemoMode}
        error={error}
        onLogin={async (payload) => {
          try {
            const response = await api.login(payload);
            setApiToken(response.token);
            localStorage.setItem("law_office_user", JSON.stringify(response.user));
            setSessionUser(response.user);
            setError(null);
          } catch {
            setError("بيانات الدخول غير صحيحة.");
          }
        }}
      />
    );
  }

  const meta = routeMeta[activeRoute];

  const openServiceRequest = async (id: string) => {
    try {
      const item = await api.getServiceRequestById(id);
      setSelectedServiceRequest(item);
      setError(null);
    } catch {
      setError("تعذر تحميل تفاصيل طلب الخدمة.");
    }
  };

  const openCase = async (id: string) => {
    try {
      const item = await api.getCaseById(id);
      setSelectedCase(item);
      setError(null);
    } catch {
      setError("تعذر تحميل تفاصيل القضية.");
    }
  };

  const createServiceRequest = async (input: CreateServiceRequestInput) => {
    try {
      const created = await api.createServiceRequest(input);
      const serviceRequests = await api.getServiceRequests();
      setData((current) => ({ ...current, serviceRequests }));
      setSelectedServiceRequest(created);
      setError(null);
      setActiveRoute("service-requests");
    } catch {
      setError("تعذر إنشاء طلب الخدمة.");
    }
  };

  const convertServiceRequestToCase = async (id: string) => {
    try {
      const createdCase = await api.convertServiceRequestToCase(id);
      const [serviceRequests, cases, refreshedRequest] = await Promise.all([
        api.getServiceRequests(),
        api.getCases(),
        api.getServiceRequestById(id)
      ]);

      setData((current) => ({
        ...current,
        serviceRequests,
        cases
      }));
      setSelectedServiceRequest(refreshedRequest);
      setSelectedCase(createdCase);
      setActiveRoute("cases");
      setError(null);
    } catch {
      setError("تعذر تحويل طلب الخدمة إلى قضية.");
    }
  };

  const createCase = async (input: CreateCaseInput) => {
    try {
      const created = await api.createCase(input);
      const cases = await api.getCases();
      setData((current) => ({ ...current, cases }));
      setSelectedCase(created);
      setError(null);
      setActiveRoute("cases");
    } catch {
      setError("تعذر إنشاء القضية.");
    }
  };

  const openClient = async (id: string) => {
    try {
      const item = await api.getClientById(id);
      setData((current) => ({ ...current, selectedClient: item }));
      setError(null);
    } catch {
      setError("تعذر تحميل تفاصيل العميل.");
    }
  };

  const createClient = async (input: CreateClientInput) => {
    try {
      const created = await api.createClient(input);
      const clients = await api.getClients();
      setData((current) => ({ ...current, clients, selectedClient: created }));
      setActiveRoute("clients");
      setError(null);
    } catch {
      setError("تعذر إنشاء العميل.");
    }
  };

  return (
    <AppShell
      activeRoute={activeRoute}
      onLogout={() => {
        setApiToken(null);
        localStorage.removeItem("law_office_user");
        setSessionUser(null);
      }}
      onNavigate={setActiveRoute}
      subtitle={meta.subtitle}
      title={meta.title}
      user={sessionUser!}
    >
      {error ? <div className="panel error-banner">{error}</div> : null}

      {activeRoute === "dashboard" ? <DashboardPage data={data.dashboard} /> : null}
      {activeRoute === "service-requests" ? (
        <ServiceRequestsPage
          items={data.serviceRequests}
          onCreateItem={createServiceRequest}
          onConvertToCase={convertServiceRequestToCase}
          onOpenItem={openServiceRequest}
          selectedItem={selectedServiceRequest}
        />
      ) : null}
      {activeRoute === "cases" ? (
        <CasesPage
          items={data.cases}
          onCreateItem={createCase}
          onOpenItem={openCase}
          selectedItem={selectedCase}
        />
      ) : null}
      {activeRoute === "tasks" ? <TasksPage items={data.tasks} /> : null}
      {activeRoute === "appointments" ? (
        <AppointmentsPage items={data.appointments} />
      ) : null}
      {activeRoute === "deadlines" ? (
        <DeadlinesPage items={data.deadlines} />
      ) : null}
      {activeRoute === "notifications" ? (
        <NotificationsPage items={data.notifications} />
      ) : null}
      {activeRoute === "clients" ? (
        <ClientsPage
          items={data.clients}
          onCreateItem={createClient}
          onOpenItem={openClient}
          selectedItem={data.selectedClient}
        />
      ) : null}
      {activeRoute === "hearings" ? <HearingsPage items={data.hearings} /> : null}
      {activeRoute === "documents" ? (
        <DocumentsPage items={data.documents} />
      ) : null}
      {activeRoute === "finance" ? (
        <FinancePage invoices={data.invoices} expenses={data.expenses} />
      ) : null}
    </AppShell>
  );
};
