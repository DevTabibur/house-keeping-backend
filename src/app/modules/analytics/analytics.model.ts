import { Schema, model } from "mongoose";
import { IDashboardAnalytics } from "./analytics.interface";

const AnalyticsSchema = new Schema<IDashboardAnalytics>(
  {
    totalUsers: { type: Number, default: 0 },
    activeUsers: { type: Number, default: 0 },
    totalOrder: { type: Number, default: 0 },
    completedOrder: { type: Number, default: 0 },
    pendingOrder: { type: Number, default: 0 },
    canceledOrder: { type: Number, default: 0 },
    totalIncome: { type: Number, default: 0 },
    refund: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const AnalyticsModel = model<IDashboardAnalytics>("Analytics", AnalyticsSchema);
export default AnalyticsModel;
