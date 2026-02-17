import { BillingModel } from "./billing.model";

const getMyBillings = async (userId: string) => {
  return await BillingModel.find({ user: userId })
    .populate("booking")
    .sort({ createdAt: -1 });
};

export const BillingService = {
  getMyBillings,
};
