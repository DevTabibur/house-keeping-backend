import BookingModel from "../booking/booking.model";
import UserModel from "../user/user.model";
import { IDashboardAnalytics, monthlyUsers } from "./analytics.interface";

const getDashboardAnalytics = async (): Promise<IDashboardAnalytics> => {
  const totalUsers = await UserModel.countDocuments();

  const activeUsers = await UserModel.countDocuments({ status: "active" });

  const totalOrder = await BookingModel.countDocuments();

  const completedOrder = await BookingModel.countDocuments({
    status: "completed",
  });

  const pendingOrder = await BookingModel.countDocuments({
    status: "pending",
  });

  const canceledOrder = await BookingModel.countDocuments({
    status: "canceled",
  });

  //   const incomeResult = await PaymentModel.aggregate([
  //     {
  //       $group: {
  //         _id: null,
  //         total: { $sum: "$amount" },
  //       },
  //     },
  //   ]);

  //   const totalIncome = incomeResult[0]?.total || 0;

  //   const refundResult = await PaymentModel.aggregate([
  //     {
  //       $match: { status: "refund" },
  //     },
  //     {
  //       $group: {
  //         _id: null,
  //         total: { $sum: "$amount" },
  //       },
  //     },
  //   ]);

  //   const refund = refundResult[0]?.total || 0;

  const monthlyUsers: monthlyUsers[] = await UserModel.aggregate([
    {
      $match: { createdAt: { $ne: null } },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m", date: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    { $limit: 12 },
  ]);

  return {
    totalUsers,
    activeUsers,
    totalOrder,
    completedOrder,
    pendingOrder,
    canceledOrder,
    // totalIncome,
    // refund,
    monthlyUsers,
  };
};

export const AnalyticsService = { getDashboardAnalytics };
