export interface DashboardStats {
  lifetimeRevenue: number;
  weekRevenue: number;
  todayRevenue: number;
  totalSales: number;
  todaySales: number;
  weekSales: number;
  totalLeads: number;
  newLeads: number;
  todayLeads: number;
  weekLeads: number;
  totalCourses: number;
  totalViews: number;
  todayViews: number;
  uniqueViews: number;
}

export interface LeadsByStatus {
  status: string;
  count: number;
}

export interface SalesDay {
  date: string;
  count: number;
  amount: number;
}

export interface RecentLead {
  id: string;
  name: string;
  phone: string;
  course: string;
  status: string;
  createdAt: string;
}

export interface RecentSale {
  id: string;
  customerName: string;
  amount: string;
  createdAt: string;
  courses: string[];
}

export interface TopPage {
  path: string;
  count: number;
}

export interface DashboardData {
  stats: DashboardStats;
  salesLast7Days: SalesDay[];
  leadsByStatus: LeadsByStatus[];
  recentLeads: RecentLead[];
  recentSales: RecentSale[];
  topPages: TopPage[];
}
