export type monthlyUsers = {
  _id: string;
  count: number;
};

export interface IDashboardAnalytics {
  totalUsers?: number;
  monthlyUsers?: monthlyUsers[];
  activeUsers?: number;
  totalOrder?: number;
  completedOrder?: number;
  pendingOrder?: number;
  canceledOrder?: number;
  totalIncome?: number;
  refund?: number;
}
