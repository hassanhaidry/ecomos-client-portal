export interface MonthlyData {
  month: string;
  listings: number;
  orders: number;
  revenue: number;
  cogs: number;
  fees: number;
  profit: number;
  roi: number;
}

export interface DailyData {
  date: string;
  listings: number;
  orders: number;
  revenue: number;
  totalPurchase: number;
  fees: number;
  profit: number;
  roi: number;
}

export interface SheetTotals {
  totalRevenue: number;
  totalOrders: number;
  totalProfit: number;
  avgRoi: number;
}

export interface SheetResponse {
  monthly: MonthlyData[];
  daily: DailyData[];
  totals: SheetTotals;
}

export interface Client {
  id: string;
  email: string;
  full_name: string;
  status: "pending" | "active" | "suspended";
  sheet_id: string | null;
  sheet_tab: string;
  investment_amount: number | null;
  platform: string;
  store_name: string | null;
  started_at: string | null;
  account_manager: string;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  client_id: string;
  type: "policy" | "invoice" | "milestone" | "announcement" | "general";
  title: string;
  message: string;
  is_read: boolean;
  action_url: string | null;
  created_at: string;
}

export interface Invoice {
  id: string;
  client_id: string;
  month: string;
  year: number;
  amount: number;
  status: "pending" | "paid" | "overdue";
  due_date: string | null;
  paid_at: string | null;
  pdf_url: string | null;
  created_at: string;
}

export interface SupportTicket {
  id: string;
  client_id: string;
  subject: string;
  category: string | null;
  priority: "normal" | "high" | "urgent";
  status: "open" | "in_progress" | "resolved" | "closed";
  message: string;
  admin_response: string | null;
  created_at: string;
  updated_at: string;
}
