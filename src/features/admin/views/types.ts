export interface ViewStats {
  total: number;
  unique: number;
  today: number;
  week: number;
}

export interface TopPage {
  path: string;
  count: number;
}

export interface RecentView {
  id: string;
  path: string;
  referrer?: string | null;
  createdAt: string;
}

export interface ViewsData {
  stats: ViewStats;
  topPages: TopPage[];
  recent: RecentView[];
}
