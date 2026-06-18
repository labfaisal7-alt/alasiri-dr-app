import type {
  AppointmentListItem,
  AuthResponse,
  AuthUser,
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

const DEMO_USER: AuthUser = {
  id: "demo-user-001",
  fullName: "مدير المكتب التجريبي",
  email: "demo@lawoffice.sa",
  role: "admin",
  branch: "الفرع الرئيسي - الرياض",
  permissions: [
    "dashboard.view",
    "service_request.view",
    "service_request.create",
    "service_request.convert",
    "case.view",
    "case.create",
    "client.view",
    "client.create",
    "hearing.view",
    "deadline.view",
    "document.view",
    "invoice.view",
    "expense.view",
    "user.manage"
  ]
};

let serviceRequestsStore: ServiceRequestDetail[] = [
  {
    id: "sr-demo-001",
    requestNo: "SR-2026-0001",
    requesterName: "شركة السمو التجارية",
    requesterPhone: "0551001001",
    requesterEmail: "legal@sumou.sa",
    subject: "مطالبة تجارية وتعثر سداد",
    details:
      "طلب خدمة مبدئي لمراجعة عقد توريد وبدء إجراءات المطالبة بالمستحقات.",
    source: "website",
    priority: "high",
    status: "in_review",
    assignedTo: "أ. نورة الحربي",
    createdAt: "2026-06-15T08:30:00.000Z"
  },
  {
    id: "sr-demo-002",
    requestNo: "SR-2026-0002",
    requesterName: "محمد العمري",
    requesterPhone: "0507772233",
    requesterEmail: "m.alomari@example.com",
    subject: "استشارة عمالية",
    details: "استفسار حول إنهاء خدمة ومكافأة نهاية الخدمة وتسوية ودية.",
    source: "whatsapp",
    priority: "normal",
    status: "new",
    assignedTo: "أ. سارة الشهري",
    createdAt: "2026-06-17T10:15:00.000Z"
  },
  {
    id: "sr-demo-003",
    requestNo: "SR-2026-0003",
    requesterName: "مؤسسة الأفق للمقاولات",
    requesterPhone: "0113344556",
    requesterEmail: "claims@ofuq.sa",
    subject: "نزاع عقد مقاولة",
    details:
      "العميل يريد تقييم الموقف القانوني قبل رفع دعوى بخصوص تأخير واعتماد مستخلصات.",
    source: "referral",
    priority: "urgent",
    status: "converted",
    assignedTo: "أ. خالد القحطاني",
    createdAt: "2026-06-12T07:45:00.000Z",
    convertedCaseId: "case-demo-001"
  }
];

let casesStore: CaseDetail[] = [
  {
    id: "case-demo-001",
    caseRef: "CASE-2026-0001",
    title: "نزاع عقد مقاولة - مؤسسة الأفق",
    clientName: "مؤسسة الأفق للمقاولات",
    caseType: "تجاري",
    courtName: "المحكمة التجارية بالرياض",
    leadLawyer: "أ. خالد القحطاني",
    status: "in_progress",
    nextHearingDate: "2026-06-24T09:00:00.000Z",
    updatedAt: "2026-06-18T08:00:00.000Z",
    branchName: "فرع الرياض",
    description:
      "مطالبة مالية ناشئة عن عقد مقاولة وتأخر اعتماد المستخلصات مع مراسلات تمهيدية قائمة.",
    hearings: [
      {
        id: "hearing-case-001",
        date: "2026-06-24T09:00:00.000Z",
        purpose: "الجلسة الأولى وتبادل المذكرات",
        location: "عن بعد",
        status: "scheduled"
      }
    ],
    deadlines: [
      {
        id: "deadline-case-001",
        title: "تسليم مذكرة الرد",
        dueDate: "2026-06-22T12:00:00.000Z",
        assignedTo: "أ. خالد القحطاني",
        status: "pending"
      }
    ],
    filings: [
      {
        id: "filing-case-001",
        title: "صحيفة الدعوى",
        filingType: "دعوى أصلية",
        filingDate: "2026-06-13T08:00:00.000Z",
        status: "accepted"
      }
    ],
    documents: [
      {
        id: "doc-case-001",
        title: "عقد المشروع",
        fileType: "PDF",
        versionNo: 3,
        confidentiality: "confidential"
      }
    ],
    tasks: [
      {
        id: "task-case-001",
        title: "مراجعة بنود الشرط الجزائي",
        assignedTo: "أ. خالد القحطاني",
        priority: "high",
        status: "in_progress"
      }
    ]
  },
  {
    id: "case-demo-002",
    caseRef: "CASE-2026-0002",
    title: "دعوى عمالية - محمد العمري",
    clientName: "محمد العمري",
    caseType: "عمالي",
    courtName: "المحكمة العمالية بالرياض",
    leadLawyer: "أ. سارة الشهري",
    status: "filed",
    nextHearingDate: "2026-06-26T11:30:00.000Z",
    updatedAt: "2026-06-17T14:00:00.000Z",
    branchName: "فرع الرياض",
    description:
      "مطالبة بمستحقات عمالية وبدل إجازات مع مستندات ابتدائية مكتملة.",
    hearings: [],
    deadlines: [],
    filings: [
      {
        id: "filing-case-002",
        title: "لائحة الدعوى",
        filingType: "دعوى أصلية",
        filingDate: "2026-06-16T09:00:00.000Z",
        status: "submitted"
      }
    ],
    documents: [
      {
        id: "doc-case-002",
        title: "عقد العمل",
        fileType: "PDF",
        versionNo: 1,
        confidentiality: "normal"
      }
    ],
    tasks: []
  }
];

let clientsStore: ClientDetail[] = [
  {
    id: "client-demo-001",
    name: "شركة السمو التجارية",
    clientType: "company",
    identifier: "1010998877",
    phone: "0115552244",
    email: "legal@sumou.sa",
    primaryContact: "فهد السبيعي",
    address: "الرياض - حي العليا",
    notes: "عميل تجاري نشط لديه أكثر من ملف مفتوح.",
    contacts: [
      {
        id: "contact-demo-001",
        fullName: "فهد السبيعي",
        jobTitle: "مدير الشؤون القانونية",
        phone: "0555000001",
        email: "fahad@sumou.sa",
        isPrimary: true
      },
      {
        id: "contact-demo-002",
        fullName: "ريم العتيبي",
        jobTitle: "مسؤولة العقود",
        phone: "0555000002",
        email: "reem@sumou.sa",
        isPrimary: false
      }
    ]
  },
  {
    id: "client-demo-002",
    name: "محمد العمري",
    clientType: "individual",
    identifier: "1022334455",
    phone: "0507772233",
    email: "m.alomari@example.com",
    address: "الرياض",
    notes: "عميل فردي في ملف عمالي.",
    contacts: []
  }
];

const tasksStore: TaskListItem[] = [
  {
    id: "task-demo-001",
    title: "مراجعة مستندات النزاع التجاري",
    relatedTo: "CASE-2026-0001",
    assignedTo: "أ. خالد القحطاني",
    priority: "high",
    status: "in_progress",
    dueDate: "2026-06-21T12:00:00.000Z"
  },
  {
    id: "task-demo-002",
    title: "إعداد عرض أتعاب للعميل الجديد",
    relatedTo: "SR-2026-0002",
    assignedTo: "أ. نورة الحربي",
    priority: "normal",
    status: "open",
    dueDate: "2026-06-20T09:00:00.000Z"
  }
];

const appointmentsStore: AppointmentListItem[] = [
  {
    id: "appointment-demo-001",
    subject: "اجتماع استراتيجي مع شركة السمو",
    appointmentType: "اجتماع عميل",
    clientName: "شركة السمو التجارية",
    startAt: "2026-06-19T10:00:00.000Z",
    location: "قاعة الاجتماعات الرئيسية",
    status: "scheduled"
  },
  {
    id: "appointment-demo-002",
    subject: "اجتماع داخلي لفريق التقاضي",
    appointmentType: "اجتماع داخلي",
    startAt: "2026-06-19T13:00:00.000Z",
    location: "Microsoft Teams",
    status: "scheduled"
  }
];

const deadlinesStore: DeadlineListItem[] = [
  {
    id: "deadline-demo-001",
    caseRef: "CASE-2026-0001",
    title: "إيداع مذكرة الرد",
    assignedTo: "أ. خالد القحطاني",
    dueDate: "2026-06-22T12:00:00.000Z",
    status: "pending",
    daysLeft: 4
  },
  {
    id: "deadline-demo-002",
    caseRef: "CASE-2026-0002",
    title: "إرفاق كشف الرواتب",
    assignedTo: "أ. سارة الشهري",
    dueDate: "2026-06-20T12:00:00.000Z",
    status: "pending",
    daysLeft: 2
  }
];

let notificationsStore: NotificationListItem[] = [
  {
    id: "notification-demo-001",
    title: "جلسة قريبة خلال 48 ساعة",
    body: "قضية CASE-2026-0001 لديها جلسة قريبة وتتطلب مراجعة الملف النهائي.",
    channel: "in_app",
    isRead: false,
    createdAt: "2026-06-18T07:30:00.000Z"
  },
  {
    id: "notification-demo-002",
    title: "تم استلام مستند جديد",
    body: "تمت إضافة نسخة جديدة من عقد المشروع إلى وثائق القضية التجارية.",
    channel: "email",
    isRead: true,
    createdAt: "2026-06-17T15:20:00.000Z"
  }
];

const hearingsStore: HearingListItem[] = [
  {
    id: "hearing-demo-001",
    caseRef: "CASE-2026-0001",
    caseTitle: "نزاع عقد مقاولة - مؤسسة الأفق",
    hearingDate: "2026-06-24T09:00:00.000Z",
    location: "عن بعد",
    purpose: "الجلسة الأولى",
    status: "scheduled"
  },
  {
    id: "hearing-demo-002",
    caseRef: "CASE-2026-0002",
    caseTitle: "دعوى عمالية - محمد العمري",
    hearingDate: "2026-06-26T11:30:00.000Z",
    location: "المحكمة العمالية بالرياض",
    purpose: "جلسة مرافعة",
    status: "scheduled"
  }
];

const documentsStore: DocumentListItem[] = [
  {
    id: "document-demo-001",
    title: "مسودة مذكرة جوابية",
    relatedTo: "CASE-2026-0001",
    fileType: "DOCX",
    versionNo: 2,
    confidentiality: "confidential"
  },
  {
    id: "document-demo-002",
    title: "نموذج اتفاقية أتعاب",
    relatedTo: "Knowledge Base",
    fileType: "DOCX",
    versionNo: 5,
    confidentiality: "normal"
  }
];

const invoicesStore: InvoiceListItem[] = [
  {
    id: "invoice-demo-001",
    invoiceNo: "INV-2026-0101",
    clientName: "شركة السمو التجارية",
    total: 18500,
    status: "sent",
    issueDate: "2026-06-14T08:00:00.000Z"
  },
  {
    id: "invoice-demo-002",
    invoiceNo: "INV-2026-0102",
    clientName: "محمد العمري",
    total: 3500,
    status: "partial_paid",
    issueDate: "2026-06-16T08:00:00.000Z"
  }
];

const expensesStore: ExpenseListItem[] = [
  {
    id: "expense-demo-001",
    category: "رسوم قضائية",
    amount: 1200,
    expenseDate: "2026-06-15T08:00:00.000Z",
    description: "رسوم قيد دعوى تجارية"
  },
  {
    id: "expense-demo-002",
    category: "تنقلات",
    amount: 320,
    expenseDate: "2026-06-17T08:00:00.000Z",
    description: "زيارة عميل ومتابعة ملف"
  }
];

const delay = (ms = 120) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const toCaseListItem = (item: CaseDetail): CaseListItem => ({
  id: item.id,
  caseRef: item.caseRef,
  title: item.title,
  clientName: item.clientName,
  caseType: item.caseType,
  courtName: item.courtName,
  leadLawyer: item.leadLawyer,
  status: item.status,
  nextHearingDate: item.nextHearingDate,
  updatedAt: item.updatedAt
});

const toClientListItem = (item: ClientDetail): ClientListItem => ({
  id: item.id,
  name: item.name,
  clientType: item.clientType,
  identifier: item.identifier,
  phone: item.phone,
  email: item.email,
  primaryContact: item.primaryContact
});

const toServiceRequestListItem = (
  item: ServiceRequestDetail
): ServiceRequestListItem => ({
  id: item.id,
  requestNo: item.requestNo,
  requesterName: item.requesterName,
  subject: item.subject,
  source: item.source,
  priority: item.priority,
  status: item.status,
  assignedTo: item.assignedTo,
  createdAt: item.createdAt
});

const buildDashboard = (): DashboardData => ({
  metrics: [
    {
      label: "قضايا مفتوحة",
      value: String(casesStore.filter((item) => item.status !== "closed").length)
    },
    {
      label: "طلبات خدمة",
      value: String(serviceRequestsStore.length),
      tone: "warning"
    },
    {
      label: "جلسات قادمة",
      value: String(hearingsStore.filter((item) => item.status === "scheduled").length),
      tone: "success"
    },
    {
      label: "مدد حرجة",
      value: String(
        deadlinesStore.filter((item) => item.status === "pending" && item.daysLeft <= 4)
          .length
      ),
      tone: "danger"
    }
  ],
  urgentDeadlines: deadlinesStore.slice(0, 3).map((item) => ({
    id: item.id,
    title: item.title,
    subtitle: `${item.caseRef} - ${item.assignedTo}`,
    meta: `متبقي ${item.daysLeft} يوم`
  })),
  upcomingHearings: hearingsStore.slice(0, 3).map((item) => ({
    id: item.id,
    title: item.caseTitle,
    subtitle: item.purpose,
    meta: item.hearingDate
  })),
  recentServiceRequests: serviceRequestsStore.slice(0, 3).map((item) => ({
    id: item.id,
    title: item.subject,
    subtitle: item.requesterName,
    meta: item.requestNo
  }))
});

export const demoApi = {
  async login(input: LoginInput): Promise<AuthResponse> {
    await delay();

    const validEmail =
      input.email === DEMO_USER.email || input.email === "admin@lawoffice.sa";
    const validPassword = input.password === "123456" || input.password === "demo123";

    if (!validEmail || !validPassword) {
      throw new Error("INVALID_CREDENTIALS");
    }

    return {
      token: "demo-token",
      user: clone(DEMO_USER)
    };
  },

  async getDashboard(): Promise<DashboardData> {
    await delay();
    return clone(buildDashboard());
  },

  async getServiceRequests(): Promise<ServiceRequestListItem[]> {
    await delay();
    return clone(serviceRequestsStore.map(toServiceRequestListItem));
  },

  async getServiceRequestById(id: string): Promise<ServiceRequestDetail> {
    await delay();
    const item = serviceRequestsStore.find((entry) => entry.id === id);

    if (!item) {
      throw new Error("NOT_FOUND");
    }

    return clone(item);
  },

  async createServiceRequest(
    input: CreateServiceRequestInput
  ): Promise<ServiceRequestDetail> {
    await delay();

    const created: ServiceRequestDetail = {
      id: `sr-demo-${Date.now()}`,
      requestNo: `SR-2026-${String(serviceRequestsStore.length + 1).padStart(4, "0")}`,
      requesterName: input.requesterName,
      requesterPhone: input.requesterPhone,
      requesterEmail: input.requesterEmail,
      subject: input.subject,
      details: input.details,
      source: input.source,
      priority: input.priority,
      status: "new",
      assignedTo: input.assignedTo,
      createdAt: new Date().toISOString()
    };

    serviceRequestsStore = [created, ...serviceRequestsStore];
    notificationsStore = [
      {
        id: `notification-demo-${Date.now()}`,
        title: "طلب خدمة جديد",
        body: `تمت إضافة ${created.requestNo} إلى قائمة الاستقبال.`,
        channel: "in_app",
        isRead: false,
        createdAt: new Date().toISOString()
      },
      ...notificationsStore
    ];

    return clone(created);
  },

  async convertServiceRequestToCase(id: string): Promise<CaseDetail> {
    await delay();
    const request = serviceRequestsStore.find((entry) => entry.id === id);

    if (!request) {
      throw new Error("NOT_FOUND");
    }

    if (request.convertedCaseId) {
      const existing = casesStore.find((entry) => entry.id === request.convertedCaseId);

      if (!existing) {
        throw new Error("NOT_FOUND");
      }

      return clone(existing);
    }

    const created: CaseDetail = {
      id: `case-demo-${Date.now()}`,
      caseRef: `CASE-2026-${String(casesStore.length + 1).padStart(4, "0")}`,
      title: request.subject,
      clientName: request.requesterName,
      caseType: "عام",
      courtName: "تحت التعيين",
      leadLawyer: request.assignedTo,
      status: "intake",
      updatedAt: new Date().toISOString(),
      branchName: "فرع الرياض",
      description: request.details,
      hearings: [],
      deadlines: [],
      filings: [],
      documents: [],
      tasks: []
    };

    request.status = "converted";
    request.convertedCaseId = created.id;
    casesStore = [created, ...casesStore];

    return clone(created);
  },

  async getCases(): Promise<CaseListItem[]> {
    await delay();
    return clone(casesStore.map(toCaseListItem));
  },

  async getCaseById(id: string): Promise<CaseDetail> {
    await delay();
    const item = casesStore.find((entry) => entry.id === id);

    if (!item) {
      throw new Error("NOT_FOUND");
    }

    return clone(item);
  },

  async createCase(input: CreateCaseInput): Promise<CaseDetail> {
    await delay();

    const created: CaseDetail = {
      id: `case-demo-${Date.now()}`,
      caseRef: `CASE-2026-${String(casesStore.length + 1).padStart(4, "0")}`,
      title: input.title,
      clientName: input.clientName,
      caseType: input.caseType,
      courtName: input.courtName,
      leadLawyer: input.leadLawyer,
      status: "intake",
      updatedAt: new Date().toISOString(),
      branchName: "فرع الرياض",
      description: input.description,
      hearings: [],
      deadlines: [],
      filings: [],
      documents: [],
      tasks: []
    };

    casesStore = [created, ...casesStore];
    return clone(created);
  },

  async getClients(): Promise<ClientListItem[]> {
    await delay();
    return clone(clientsStore.map(toClientListItem));
  },

  async getClientById(id: string): Promise<ClientDetail> {
    await delay();
    const item = clientsStore.find((entry) => entry.id === id);

    if (!item) {
      throw new Error("NOT_FOUND");
    }

    return clone(item);
  },

  async createClient(input: CreateClientInput): Promise<ClientDetail> {
    await delay();

    const created: ClientDetail = {
      id: `client-demo-${Date.now()}`,
      name: input.name,
      clientType: input.clientType,
      identifier: input.identifier,
      phone: input.phone,
      email: input.email,
      address: input.address,
      notes: input.notes,
      contacts: []
    };

    clientsStore = [created, ...clientsStore];
    return clone(created);
  },

  async getTasks(): Promise<TaskListItem[]> {
    await delay();
    return clone(tasksStore);
  },

  async getAppointments(): Promise<AppointmentListItem[]> {
    await delay();
    return clone(appointmentsStore);
  },

  async getDeadlines(): Promise<DeadlineListItem[]> {
    await delay();
    return clone(deadlinesStore);
  },

  async getNotifications(): Promise<NotificationListItem[]> {
    await delay();
    return clone(notificationsStore);
  },

  async getHearings(): Promise<HearingListItem[]> {
    await delay();
    return clone(hearingsStore);
  },

  async getDocuments(): Promise<DocumentListItem[]> {
    await delay();
    return clone(documentsStore);
  },

  async getInvoices(): Promise<InvoiceListItem[]> {
    await delay();
    return clone(invoicesStore);
  },

  async getExpenses(): Promise<ExpenseListItem[]> {
    await delay();
    return clone(expensesStore);
  }
};
