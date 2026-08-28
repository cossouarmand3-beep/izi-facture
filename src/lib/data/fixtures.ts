import { InvoiceStatus } from "@/components/ui/InvoiceStatusBadge";

export interface DashboardStats {
  overdueAmount: number;
  dueNextMonthAmount: number;
  averageTimeToGetPaid: number; // in days
  availableAmount: number; 
}

export interface Client {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
}

export interface InvoiceLine {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceItem {
  id: string;
  number: string;
  clientId: string;
  clientName: string;
  clientCompany: string | null;
  clientEmail?: string;
  clientAddress?: string;
  clientAvatar?: string;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  lines: InvoiceLine[];
  subtotal: number;
  taxAmount: number;
  total: number;
}

export const mockDashboardStats: DashboardStats = {
  overdueAmount: 18500000,
  dueNextMonthAmount: 104500000,
  averageTimeToGetPaid: 12,
  availableAmount: 128500000,
};

export const mockClients: Client[] = [
  { id: "c_1", name: "Amadou Diallo", company: "Tech Dakar", email: "amadou@techdakar.sn", phone: "+221 77 123 45 67", address: "Plateau, Dakar, Sénégal" },
  { id: "c_2", name: "Fatou Sow", company: "Sénégal Digital", email: "fatou@sendigital.sn", phone: "+221 76 987 65 43", address: "Almadies, Dakar, Sénégal" },
  { id: "c_3", name: "Kofi Annan", company: "Accra Solutions", email: "kofi@accrasolutions.gh", phone: "+233 24 123 4567", address: "Osu, Accra, Ghana" },
  { id: "c_4", name: "Marie Dubois", company: "Abidjan Import", email: "marie@abidjanimport.ci", phone: "+225 07 12 34 56 78", address: "Cocody, Abidjan, Côte d'Ivoire" },
];

export const mockInvoices: InvoiceItem[] = [
  {
    id: "inv_1",
    number: "FAC-2023-042",
    clientId: "c_1",
    clientName: "Amadou Diallo",
    clientCompany: "Tech Dakar",
    clientEmail: "amadou@techdakar.sn",
    clientAddress: "Plateau, Dakar, Sénégal",
    issueDate: "2023-10-05",
    dueDate: "2023-11-05",
    status: "overdue",
    lines: [
      { id: "l_1", description: "Développement application web", quantity: 1, unitPrice: 38135593 },
    ],
    subtotal: 38135593,
    taxAmount: 6864407,
    total: 45000000,
  },
  {
    id: "inv_2",
    number: "FAC-2023-045",
    clientId: "c_2",
    clientName: "Fatou Sow",
    clientCompany: "Sénégal Digital",
    clientEmail: "fatou@sendigital.sn",
    clientAddress: "Almadies, Dakar, Sénégal",
    issueDate: "2023-10-12",
    dueDate: "2023-11-12",
    status: "sent",
    lines: [
      { id: "l_2", description: "Consulting SEO (Octobre)", quantity: 1, unitPrice: 13771186 },
    ],
    subtotal: 13771186,
    taxAmount: 2478814,
    total: 16250000,
  },
  {
    id: "inv_3",
    number: "FAC-2023-046",
    clientId: "c_3",
    clientName: "Kofi Annan",
    clientCompany: "Accra Solutions",
    issueDate: "2023-10-15",
    dueDate: "2023-11-15",
    status: "paid",
    lines: [
      { id: "l_3", description: "Licences Logiciel", quantity: 10, unitPrice: 2694915 },
    ],
    subtotal: 26949150,
    taxAmount: 4850850,
    total: 31800000,
  },
  {
    id: "inv_4",
    number: "FAC-2023-041",
    clientId: "c_4",
    clientName: "Marie Dubois",
    clientCompany: "Abidjan Import",
    issueDate: "2023-10-01",
    dueDate: "2023-11-01",
    status: "draft",
    lines: [
      { id: "l_4", description: "Audit de sécurité", quantity: 1, unitPrice: 30932203 },
    ],
    subtotal: 30932203,
    taxAmount: 5567797,
    total: 36500000,
  },
];

export const mockMonthlyRevenue = [
  { month: "Jan", revenue: 4000000 },
  { month: "Fév", revenue: 3000000 },
  { month: "Mar", revenue: 5500000 },
  { month: "Avr", revenue: 4500000 },
  { month: "Mai", revenue: 6000000 },
  { month: "Juin", revenue: 8000000 },
  { month: "Juil", revenue: 7500000 },
  { month: "Août", revenue: 9000000 },
  { month: "Sep", revenue: 8500000 },
  { month: "Oct", revenue: 11000000 },
  { month: "Nov", revenue: 15000000 },
  { month: "Déc", revenue: 0 },
];
