import type {
  AppointmentListItem,
  AuthUser,
  CaseListItem,
  ClientDetail,
  ClientListItem,
  DashboardData,
  DeadlineListItem,
  DocumentListItem,
  ExpenseListItem,
  HearingListItem,
  InvoiceListItem,
  NotificationListItem,
  ServiceRequestListItem
} from "@law-office/shared";
import type { TaskListItem } from "@law-office/shared";

export type AppRoute =
  | "dashboard"
  | "service-requests"
  | "cases"
  | "tasks"
  | "appointments"
  | "deadlines"
  | "notifications"
  | "clients"
  | "hearings"
  | "documents"
  | "finance";

export type SessionUser = AuthUser;

export interface AppDataState {
  dashboard: DashboardData | null;
  serviceRequests: ServiceRequestListItem[];
  cases: CaseListItem[];
  tasks: TaskListItem[];
  appointments: AppointmentListItem[];
  deadlines: DeadlineListItem[];
  notifications: NotificationListItem[];
  clients: ClientListItem[];
  selectedClient: ClientDetail | null;
  hearings: HearingListItem[];
  documents: DocumentListItem[];
  invoices: InvoiceListItem[];
  expenses: ExpenseListItem[];
}
