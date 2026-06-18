import type {
  AppointmentListItem,
  AuthResponse,
  CaseDetail,
  CaseListItem,
  ClientDetail,
  ClientListItem,
  CreateCaseInput,
  CreateClientInput,
  CreateServiceRequestInput,
  DashboardData,
  DeadlineListItem,
  DocumentListItem,
  ExpenseListItem,
  HearingListItem,
  InvoiceListItem,
  LoginInput,
  NotificationListItem,
  ServiceRequestDetail,
  ServiceRequestListItem
} from "@law-office/shared";
import type { TaskListItem } from "@law-office/shared";
import { demoApi } from "./demo-data";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";

export const isDemoMode =
  import.meta.env.VITE_DEMO_MODE === "true" ||
  (import.meta.env.PROD && !import.meta.env.VITE_API_BASE_URL);

let authToken = localStorage.getItem("law_office_token");

export const setApiToken = (token: string | null) => {
  authToken = token;

  if (token) {
    localStorage.setItem("law_office_token", token);
  } else {
    localStorage.removeItem("law_office_token");
  }
};

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: authToken
      ? {
          Authorization: `Bearer ${authToken}`
        }
      : undefined
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

async function sendJson<TResponse, TBody>(
  path: string,
  body: TBody
): Promise<TResponse> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(authToken
        ? {
            Authorization: `Bearer ${authToken}`
          }
        : {})
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return (await response.json()) as TResponse;
}

const liveApi = {
  login: (input: LoginInput) =>
    sendJson<AuthResponse, LoginInput>("/auth/login", input),
  getDashboard: () => getJson<DashboardData>("/dashboard"),
  getServiceRequests: async () => {
    const result = await getJson<{ items: ServiceRequestListItem[] }>(
      "/service-requests"
    );
    return result.items;
  },
  getCases: async () => {
    const result = await getJson<{ items: CaseListItem[] }>("/cases");
    return result.items;
  },
  getClients: async () => {
    const result = await getJson<{ items: ClientListItem[] }>("/clients");
    return result.items;
  },
  getClientById: (id: string) => getJson<ClientDetail>(`/clients/${id}`),
  createClient: (input: CreateClientInput) =>
    sendJson<ClientDetail, CreateClientInput>("/clients", input),
  getCaseById: (id: string) => getJson<CaseDetail>(`/cases/${id}`),
  createCase: (input: CreateCaseInput) =>
    sendJson<CaseDetail, CreateCaseInput>("/cases", input),
  getHearings: async () => {
    const result = await getJson<{ items: HearingListItem[] }>("/hearings");
    return result.items;
  },
  getTasks: async () => {
    const result = await getJson<{ items: TaskListItem[] }>("/tasks");
    return result.items;
  },
  getAppointments: async () => {
    const result = await getJson<{ items: AppointmentListItem[] }>(
      "/appointments"
    );
    return result.items;
  },
  getDeadlines: async () => {
    const result = await getJson<{ items: DeadlineListItem[] }>("/deadlines");
    return result.items;
  },
  getNotifications: async () => {
    const result = await getJson<{ items: NotificationListItem[] }>(
      "/notifications"
    );
    return result.items;
  },
  getDocuments: async () => {
    const result = await getJson<{ items: DocumentListItem[] }>("/documents");
    return result.items;
  },
  getInvoices: async () => {
    const result = await getJson<{ items: InvoiceListItem[] }>(
      "/finance/invoices"
    );
    return result.items;
  },
  getExpenses: async () => {
    const result = await getJson<{ items: ExpenseListItem[] }>(
      "/finance/expenses"
    );
    return result.items;
  },
  getServiceRequestById: (id: string) =>
    getJson<ServiceRequestDetail>(`/service-requests/${id}`),
  createServiceRequest: (input: CreateServiceRequestInput) =>
    sendJson<ServiceRequestDetail, CreateServiceRequestInput>(
      "/service-requests",
      input
    ),
  convertServiceRequestToCase: (id: string) =>
    sendJson<CaseDetail, Record<string, never>>(
      `/service-requests/${id}/convert-to-case`,
      {}
    )
};

export const api = isDemoMode ? demoApi : liveApi;
