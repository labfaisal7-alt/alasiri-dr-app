export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  branch: string;
  permissions: string[];
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export type AppointmentStatus =
  | "scheduled"
  | "completed"
  | "cancelled"
  | "rescheduled";

export interface AppointmentListItem {
  id: string;
  subject: string;
  appointmentType: string;
  clientName?: string;
  startAt: string;
  location: string;
  status: AppointmentStatus;
}

export type CaseStatus =
  | "intake"
  | "filed"
  | "in_progress"
  | "judged"
  | "execution"
  | "closed";

export interface CaseListItem {
  id: string;
  caseRef: string;
  title: string;
  clientName: string;
  caseType: string;
  courtName: string;
  leadLawyer: string;
  status: CaseStatus;
  nextHearingDate?: string;
  updatedAt: string;
}

export interface CaseDetail extends CaseListItem {
  description: string;
  branchName: string;
  hearings: CaseHearingItem[];
  deadlines: CaseDeadlineItem[];
  filings: CaseFilingItem[];
  documents: CaseDocumentItem[];
  tasks: CaseTaskItem[];
}

export interface CreateCaseInput {
  title: string;
  clientName: string;
  caseType: string;
  courtName: string;
  leadLawyer: string;
  description: string;
}

export interface CaseHearingItem {
  id: string;
  date: string;
  purpose: string;
  location: string;
  status: "scheduled" | "held" | "postponed" | "cancelled";
}

export interface CaseDeadlineItem {
  id: string;
  title: string;
  dueDate: string;
  assignedTo: string;
  status: "pending" | "done" | "missed" | "cancelled";
}

export interface CaseFilingItem {
  id: string;
  title: string;
  filingType: string;
  filingDate: string;
  status: "draft" | "submitted" | "received" | "accepted" | "rejected";
}

export interface CaseDocumentItem {
  id: string;
  title: string;
  fileType: string;
  versionNo: number;
  confidentiality: "normal" | "confidential" | "restricted";
}

export interface CaseTaskItem {
  id: string;
  title: string;
  assignedTo: string;
  priority: "low" | "normal" | "high" | "urgent";
  status: "open" | "in_progress" | "waiting" | "completed" | "cancelled";
}

export interface ClientListItem {
  id: string;
  name: string;
  clientType: "individual" | "company";
  identifier: string;
  phone?: string;
  email?: string;
  primaryContact?: string;
}

export interface ClientDetail extends ClientListItem {
  address?: string;
  notes?: string;
  contacts: ClientContact[];
}

export interface ClientContact {
  id: string;
  fullName: string;
  jobTitle?: string;
  phone?: string;
  email?: string;
  isPrimary: boolean;
}

export interface CreateClientInput {
  name: string;
  clientType: "individual" | "company";
  identifier: string;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
}

export interface DashboardMetric {
  label: string;
  value: string;
  tone?: "default" | "danger" | "success" | "warning";
}

export interface DashboardActivityItem {
  id: string;
  title: string;
  subtitle: string;
  meta: string;
}

export interface DashboardData {
  metrics: DashboardMetric[];
  urgentDeadlines: DashboardActivityItem[];
  upcomingHearings: DashboardActivityItem[];
  recentServiceRequests: DashboardActivityItem[];
}

export type DeadlineStatus = "pending" | "done" | "missed" | "cancelled";

export interface DeadlineListItem {
  id: string;
  caseRef: string;
  title: string;
  assignedTo: string;
  dueDate: string;
  status: DeadlineStatus;
  daysLeft: number;
}

export interface DocumentListItem {
  id: string;
  title: string;
  relatedTo: string;
  fileType: string;
  versionNo: number;
  confidentiality: "normal" | "confidential" | "restricted";
}

export interface InvoiceListItem {
  id: string;
  invoiceNo: string;
  clientName: string;
  total: number;
  status: "draft" | "sent" | "partial_paid" | "paid" | "overdue" | "cancelled";
  issueDate: string;
}

export interface ExpenseListItem {
  id: string;
  category: string;
  amount: number;
  expenseDate: string;
  description: string;
}

export interface HearingListItem {
  id: string;
  caseRef: string;
  caseTitle: string;
  hearingDate: string;
  location: string;
  purpose: string;
  status: "scheduled" | "held" | "postponed" | "cancelled";
}

export interface NotificationListItem {
  id: string;
  title: string;
  body: string;
  channel: "in_app" | "email" | "sms" | "whatsapp";
  isRead: boolean;
  createdAt: string;
}

export type ServiceRequestPriority = "low" | "normal" | "high" | "urgent";

export type ServiceRequestStatus =
  | "new"
  | "in_review"
  | "waiting_client"
  | "converted"
  | "rejected"
  | "closed";

export interface ServiceRequestSummary {
  id: string;
  requestNo: string;
  requesterName: string;
  subject: string;
  priority: ServiceRequestPriority;
  status: ServiceRequestStatus;
}

export interface ServiceRequestListItem extends ServiceRequestSummary {
  source: "walk_in" | "phone" | "website" | "whatsapp" | "referral" | "email";
  assignedTo: string;
  createdAt: string;
}

export interface ServiceRequestDetail extends ServiceRequestListItem {
  requesterEmail?: string;
  requesterPhone?: string;
  details: string;
  convertedCaseId?: string;
}

export interface CreateServiceRequestInput {
  requesterName: string;
  requesterPhone?: string;
  requesterEmail?: string;
  subject: string;
  details: string;
  source: ServiceRequestListItem["source"];
  priority: ServiceRequestPriority;
  assignedTo: string;
}

export type TaskPriority = "low" | "normal" | "high" | "urgent";

export type TaskStatus =
  | "open"
  | "in_progress"
  | "waiting"
  | "completed"
  | "cancelled";

export interface TaskListItem {
  id: string;
  title: string;
  relatedTo: string;
  assignedTo: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: string;
}
